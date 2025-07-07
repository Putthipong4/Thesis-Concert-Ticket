import React, { useState, useEffect } from "react";
import ModalLogin from "./ModalLogin";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

   const refreshUser = () => {
    setIsAuthLoading(true);
    Axios.get("http://localhost:3001/api/checkAuth", { withCredentials: true })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  };

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    window.refreshNavbarUser = refreshUser;
    return () => { delete window.refreshNavbarUser; };
  }, []);
  const handleLogout = () => {
    document.activeElement.blur();
    Axios.post(
      "http://localhost:3001/api/logout",
      {},
      { withCredentials: true },
    )
      .then(() => {
        setUser(null);
        navigate('/')
      })
      .catch((err) => {
        console.error("Logout failed", err);
      });
  };

  const navigate = useNavigate();

  return (
    <div className="navbar sticky top-0 left-0 z-50 w-full bg-red-500 p-5 shadow-sm saturate-100">
      <div className="navbar-start">
        <a
          className="kanit-medium mx-auto max-w-screen-xl cursor-pointer text-3xl"
          onClick={() => navigate("/")}
        >
          Concert Ticket
        </a>
      </div>
      <div className="navbar-end">
        {isAuthLoading ? (
          <div className="loading loading-spinner mx-auto text-white"></div>
        ) : user ? (
          <div className="dropdown dropdown-end mx-auto max-w-screen-xl">
            <div className="flex items-center gap-2">
              <label className="kanit-medium text-xl">{user.Firstname}</label>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box kanit-medium z-1 mt-1 w-62 p-2 shadow"
            >
              <li>
                <a className="text-lg" onClick={() => navigate("/Profile")}>
                  ข้อมูลส่วนตัว
                </a>
              </li>
              <li>
                <a className="text-lg">บัตรของฉัน</a>
              </li>
              <li>
                <a onClick={handleLogout} className="text-lg">
                  ออกจากระบบ
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <button
            className="btn btn-outline btn-sm kanit-medium mx-auto max-w-screen-xl rounded-full"
            onClick={() => {
              document.activeElement.blur();
              document.getElementById("my_modal_1").showModal();
            }}
          >
            เข้าสู่ระบบ
          </button>
        )}
      </div>
      <ModalLogin setUser={setUser} />
    </div>
  );
}

export default Navbar;
