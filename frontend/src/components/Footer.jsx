import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto flex lg:items-center items-start justify-center gap-10 lg:gap-36 flex-col lg:flex-row">
        <div className="lg:w-[40%] md:w-[50%] w-full">
          <img src={logo} alt="" className="h-10 mb-3 border rounded-[5px]" />
          <h2 className="text-xl font-bold text-white mb-3">Skills Nest</h2>
          <p className="text-sm">
            AI-powered learning platform to help you grow smarter. Learn
            anything, anytime, anywhere.
          </p>
        </div>

        <div className="lg:w-[30%] md:w-full">
          <div className="text-white font-semibold mb-2">Quick Links</div>
          <ul className="text-sm space-y-1">
            <li
              onClick={() => navigate("/")}
              className="hover:text-white cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={() => navigate("/all-courses")}
              className="hover:text-white cursor-pointer"
            >
              All Courses
            </li>
            <li
              onClick={() => navigate("/login")}
              className="hover:text-white cursor-pointer"
            >
              Login
            </li>
            <li
              onClick={() => navigate("/profile")}
              className="hover:text-white cursor-pointer"
            >
              My Profile
            </li>
          </ul>
        </div>

        <div className="lg:w-[30%] md:w-full">
          <div className="text-white font-semibold mb-2">Quick Links</div>
          <ul className="text-sm space-y-1">
            <li className="hover:text-white ">Web Development</li>
            <li className="hover:text-white ">App Development</li>
            <li className="hover:text-white ">Data Science</li>
            <li className="hover:text-white">UI/UX</li>
            <li className="hover:text-white ">AI/ML</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-5 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} {" "}
        Skill Nest. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
