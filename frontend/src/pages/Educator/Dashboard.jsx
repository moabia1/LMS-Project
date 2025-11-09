import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const Dashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <FaArrowLeftLong
        className="absolute top-[10%] left-[10%] w-[22px] h-[22px] cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="w-full px-6 py-10 bg-gray-50 space-y-10">
        {/* Top Section */}
        {/* Images */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
          <img
            src={
              userData?.avatar ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            className="w-28 h-28 rounded-full object-cover border-4 border-black shadow-md "
          />
          {/* Name & Earnings */}
          <div className="text-center md:text-left space-y-1">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome,
              {" " +
                userData?.fullName?.firstName +
                " " +
                userData?.fullName?.lastName}{" "}
              👋
            </h1>
            <h1 className="text-xl font-semibold text-gray-800">
              Total Earnings: 0
            </h1>
            <p></p>
            <h1
              className="px-2.5 text-center py-2.5 border-2 bg-black border-black text-white rounded-xl text-[15px] font-light flex items-center justify-center cursor-pointer"
              onClick={() => navigate("/create-course")}
            >
              Create Courses
            </h1>
          </div>
        </div>

        {/* Graph Section */}
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
