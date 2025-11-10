import React, { useState } from "react";
import logo from "../assets/logo.png";
import { IoPersonCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { setUserData } from "../store/slices/userSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import { ImCancelCircle } from "react-icons/im";


const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [showHam, setShowHam] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const result = await axiosInstance.get("/auth/logout", {
        withCredentials: true,
      });
      toast.success("User logout Succesfully");
      dispatch(setUserData(null));
      navigate("/")
      setShowHam(false)
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <div>
      <div className="w-full h-[70px] fixed top-0 px-5 py-5 flex items-center justify-between bg-[#00000047] z-10">
        {/* LOGO */}
        <div className="lg:w-[20%] w-[40%] lg:pl-[50px] ">
          <img
            src={logo}
            alt=""
            className="w-[60px] rounded-[5px] border-2 border-white "
          />
        </div>

        {/* Right Side */}
        <div className="w-[30%] lg:flex items-center justify-center gap-4 hidden">
          {!userData && (
            <IoPersonCircle
              onClick={() => setShow(!show)}
              className="w-[50px] h-[50px] fill-white cursor-pointer"
            />
          )}

          {userData && (
            <div
              onClick={() => setShow(!show)}
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
            >
              <img
                src={
                  userData?.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="profile"
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
            </div>
          )}

          {userData && userData?.role === "educator" && (
            <div
              onClick={() => navigate("/dashboard")}
              className="px-5 py-2.5 border-2 lg:border-white border-black lg:text-white bg-black text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer "
            >
              Dashboard
            </div>
          )}

          {!userData ? (
            <span
              onClick={() => navigate("/login")}
              className="px-5 py-2.5 border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5]"
            >
              Login
            </span>
          ) : (
            <span
              onClick={logoutHandler}
              className="px-5 py-2.5 border-2 bg-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer"
            >
              Logout
            </span>
          )}

          {show && (
            <div className="absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-white px-[15px] py-2.5 border-2 border-black hover:border-white hover:text-white hover:bg-black cursor-pointer">
              <span
                onClick={() => navigate("/profile")}
                className="bg-black text-white px-[30px] py-2.5 rounded-2xl hover:bg-gray-600"
              >
                My Profile
              </span>
              <span
                className="bg-black text-white px-[30px] py-2.5 rounded-2xl hover:bg-gray-600">
                My Courses
              </span>
            </div>
          )}
        </div>
        <RxHamburgerMenu
          onClick={() => setShowHam(!showHam)}
          className="w-[35px] h-[35px] lg:hidden text-white cursor-pointer"
        />

        {showHam && (
          <div
            className={`fixed top-0 left-0 w-screen h-screen bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden transform transition-transform duration-1000 ${
              showHam ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Cross  */}
            <ImCancelCircle
              onClick={() => setShowHam(!showHam)}
              className="absolute w-[35px] h-[35px] fill-white top-5 right-[4%]"
            />

            {/* User Icon */}
            {!userData && (
              <IoPersonCircle className="w-[50px] h-[50px] fill-white cursor-pointer" />
            )}
            {userData && (
              <div
                onClick={() => setShow(!show)}
                className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
              >
                <img
                  src={
                    userData?.avatar ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="profile"
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
              </div>
            )}

            <div
              onClick={() => navigate("/profile")}
              className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white bg-black text-white rounded-[10px] text-[18px] font-light cursor-pointer"
            >
              My Profile
            </div>

            <div
              onClick={()=>navigate("/courses")}
              className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white bg-black text-white rounded-[10px] text-[18px] font-light cursor-pointer">
              My Courses
            </div>

            {/* Role by divider */}
            {userData && userData?.role === "educator" && (
              <div
                onClick={() => navigate("/dashboard")}
                className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white bg-black text-white rounded-[10px] text-[18px] font-light cursor-pointer"
              >
                Dashboard
              </div>
            )}

            {/* Login and Logout */}
            {!userData ? (
              <span
                onClick={() => navigate("/login")}
                className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white bg-black text-white rounded-[10px] text-[18px] font-light cursor-pointer"
              >
                Login
              </span>
            ) : (
              <span
                onClick={logoutHandler}
                className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white bg-black text-white rounded-[10px] text-[18px] font-light cursor-pointer"
              >
                Logout
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
