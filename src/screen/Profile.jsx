import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Axios from "axios";
import ModalEditProfile from "../components/ModalEditProfile";
function Profile() {
  
  const [user, setUser] = useState(null);
  const [formdata, setFormdata] = useState({
    Member_id: "",
    Firstname: "",
    Lastname: "",
    Telephone: "",
    Email: "",
  });

  const fetchCurrentUser = () => {
    Axios.get("http://localhost:3001/api/checkAuth", { withCredentials: true })
      .then((response) => {
        setUser(response.data.user);
        setFormdata({
          Member_id: response.data.user.Member_id,
          Firstname: response.data.user.Firstname,
          Lastname: response.data.user.Lastname,
          Telephone: response.data.user.Telephone,
          Email: response.data.user.Email,
        });
      })
      .catch((error) => {
        console.error("Error fetching current user data:", error);
        setUser(null);
      });
  };

  // เรียกใช้ฟังก์ชันดึงข้อมูลผู้ใช้เมื่อคอมโพเนนต์ Mount
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // ฟังก์ชันที่จะถูกเรียกเมื่อโปรไฟล์ถูกอัปเดตใน ModalEditProfile
  const handleProfileUpdate = () => {
    fetchCurrentUser(); // ดึงข้อมูลผู้ใช้ล่าสุดอีกครั้งเพื่ออัปเดต UI
  };

  if (!user) {
    return <div className="p-4">กำลังโหลดข้อมูลโปรไฟล์...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex h-screen flex-col items-center justify-center ">
        <h2 className="kanit-medium text-2xl shadow-md">ข้อมูลส่วนตัว</h2>
        <div className="card skeleton bg-base-200 mt-4 h-50 w-150 max-w-screen shadow-md">
          <div className="p-8">
            <p className="kanit-medium text-lg">ชื่อ : {formdata.Firstname}</p>
            <p className="kanit-medium pt-2 text-lg">
              นามสกุล : {formdata.Lastname}
            </p>
            <p className="kanit-medium pt-2 text-lg">
              เบอร์โทรศัพท์ : {formdata.Telephone}
            </p>
            <p className="kanit-medium pt-2 text-lg">
              อีเมล : {formdata.Email}
            </p>
          </div>
        </div>
        <div className="m-5 flex justify-center">
          <div className="flex flex-row gap-12">
            <button
              className="btn btn-warning kanit-medium w-30 shadow-md"
              onClick={() => document.getElementById("my_modal_4").showModal()}
            >
              แก้ไข
            </button>
            <button className="btn btn-info kanit-medium shadow-md">
              เปลี่ยนรหัสผ่าน
            </button>
          </div>
        </div>
     
      </div>
       <ModalEditProfile onProfileUpdate={handleProfileUpdate} />
    </div>
  );
}

export default Profile;
