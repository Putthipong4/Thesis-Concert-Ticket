const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv').config();
const secret = process.env.JWT_SECRET



app.use(cors({
  credentials: true,
  origin: ["http://localhost:5173"],
}));
app.use(express.json());
app.use(cookieParser());

const initMySQL = async () => {
  db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "concertticket",

  });
};


app.listen('3001', async () => {
  await initMySQL();
  console.log('Server is running on port 3001');
});


app.get('/api/concert', (req, res) => {
  db.query("SELECT * FROM concert", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }

  });
});

app.post('/api/register', async (req, res) => {
  try {
    const { Firstname, Lastname, Telephone, Email, Password } = req.body;

    const [EmailCheck] = await db.promise().query(
      "SELECT Email FROM member where Email = ?",
      [Email]
    );

    if (EmailCheck.length > 0) {
      return res.status(400).send({ error: "Email already exists" });
    }

    const [lastIdResult] = await db.promise().query(
      "SELECT Member_id FROM member ORDER BY Member_id DESC LIMIT 1"
    );

    let newId = "M01";

    if (lastIdResult.length > 0) {
      const lastId = lastIdResult[0].Member_id
      const numericPart = parseInt(lastId.substring(1));
      const nextNumber = numericPart + 1;
      newId = "M" + nextNumber.toString().padStart(2, "0");
    }


    const hashedPassword = await bcrypt.hash(Password, 10);
    const user = {
      Member_id: newId,
      Firstname,
      Lastname,
      Telephone,
      Email,
      Password: hashedPassword
    }
    const [result] = await db.promise().query('INSERT INTO member SET ?', user)

    return res.status(200).send({ message: "Member added successfully", Member_id: newId })

  } catch (err) {
    console.error("Server error", err);
    return res.status(500).send({ error: "Internal server error" });
  }

});

app.post('/api/loginMember', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [results] = await db.promise().query('SELECT * from member where email = ?', [email])
    const userData = results[0];
    const match = await bcrypt.compare(password, userData.Password)
    if (!match) {
      res.status(400).send({
        message: 'login fail wrong email or password'
      })
      return false
    }
    // สร้าง token jwt token
    const token = jwt.sign({ email, role: 'member' }, secret, { expiresIn: '1h' })
    res.cookie('token', token, {
      maxAge: 3600000,
      secure: true,
      httpOnly: true,
      sameSite: "none",
    })
    res.status(200).send({
      message: 'login success',
      userData
    })
  } catch (error) {
    console.log('error', error);
    res.status(401).send({
      message: 'login fail',
      error: error.message
    })
  }
})

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send({ message: 'No Token Provided' });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).send({ message: 'Invalid or Expired ' });
    req.user = user;
    next();
  });
};

app.get('/api/checkAuth', authenticateToken, async (req, res) => {
  try {
    const [results] = await db.promise().query('SELECT * FROM member WHERE email = ?', [req.user.email])
    if (!results[0]) {
      return res.status(404).json({ message: 'User not found', password });
    }
    res.json({ user: results[0] });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
});

app.get('/api/concert/:id', async (req, res) => {
  const Concert_id = req.params.id;
  try {
    const [results] = await db.promise().query('SELECT * FROM concert WHERE Concert_id = ?', [Concert_id])
    res.send(results[0])
  } catch (error) {
    console.log('error', error);
    res.status(403).send({
      message: 'fail',
      error
    })
  }

});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  res.send({ message: 'Logged out' });
});

app.put('/api/updateProfile', authenticateToken, async (req, res) => {
  try {
    const { Firstname, Lastname, Telephone, Email, Member_id } = req.body;

    // อัปเดตข้อมูลโปรไฟล์
    const [result] = await db.promise().query(
      'UPDATE member SET Firstname = ?, Lastname = ?, Telephone = ?, Email = ? WHERE Member_id = ?',
      [Firstname, Lastname, Telephone, Email, Member_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User not found or no changes made.' });
    }

    // ออก token ใหม่ถ้าอีเมลเปลี่ยน
    const newToken = jwt.sign({ email: Email, role: 'member' }, secret, { expiresIn: '1h' });
    res.cookie('token', newToken, {
      maxAge: 3600000,
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });

    res.json({ success: true, message: 'Profile updated successfully.' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});