import React, { useState } from "react";
import logo from "../assets/logo.png";
import google from "../assets/google.jpg";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify"
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../store/slices/userSlice";



const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const result = await axiosInstance.post("/auth/register", {
        username: username,
        email:email,
        fullName: {
          firstName: firstName,
          lastName: lastName
        },
        password: password,
        role:role
      }, { withCredentials: true });
      console.log(result)
      dispatch(setUserData(result.data))
      setLoading(false)
      toast.success("User Registered Successfully")
      navigate("/")
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  };

  return (
    <div className="bg-[#dddbdb] w-screen h-screen flex items-center justify-center p-4">
      <form
        onSubmit={submitHandler}
        className="
        w-full max-w-4xl 
        h-full md:h-[90vh] 
        bg-white shadow-xl rounded-2xl 
        flex flex-col md:flex-row 
        overflow-y-auto
      "
      >
        {/* LEFT SECTION */}
        <div className="md:w-1/2 w-full px-8 py-2 flex flex-col items-center gap-4">
          {/* Heading Section */}
          <div className="w-full text-center">
            <h1 className="font-bold text-3xl text-black">Let’s get started</h1>
            <h2 className="text-gray-600 text-lg mt-1">Create your account</h2>
          </div>

          {/* INPUTS */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 -mt-1">
            <div className="flex flex-col gap-0.5">
              <label className="font-semibold">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border h-11 border-gray-300 rounded px-4"
                placeholder="First Name"
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <label className="font-semibold">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border h-11 border-gray-300 rounded px-4"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-0.5">
            <label className="font-semibold">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border h-11 border-gray-300 rounded px-4"
              placeholder="Enter username"
            />
          </div>

          <div className="w-full flex flex-col gap-0.5">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border h-11 border-gray-300 rounded px-4"
              placeholder="Your Email"
            />
          </div>

          {/* Password */}
          <div className="w-full flex flex-col gap-0.5 relative">
            <label className="font-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border h-11 border-gray-300 rounded px-4"
              placeholder="Enter your password"
            />
            {showPassword ? (
              <IoEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-11 text-xl cursor-pointer"
              />
            ) : (
              <IoEyeOff
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-11 text-xl cursor-pointer"
              />
            )}
          </div>

          {/* Role */}
          <div className="flex items-center justify-center gap-6 pt-0.5">
            <span
              onClick={() => setRole("student")}
              className={`px-2 py-1 border-2 rounded-2xl cursor-pointer ${
                role === "student"
                  ? "border-black font-semibold"
                  : "border-gray-400"
              }`}
            >
              Student
            </span>
            <span
              onClick={() => setRole("educator")}
              className={`px-2 py-1 border-2 rounded-2xl cursor-pointer ${
                role === "educator"
                  ? "border-black font-semibold"
                  : "border-gray-400"
              }`}
            >
              Educator
            </span>
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full h-16 bg-black text-white rounded-md flex items-center justify-center mt-1 text-lg cursor-pointer"
          >
            {loading ? <ClipLoader color="white" size={28} /> : "Register"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 w-full mt-1">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-600 text-sm">Or Continue</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Login */}
          <div
            onClick={() =>
              (window.location.href =
                "https://lms-project-wqss.onrender.com/api/auth/google")
            }
            className="w-full h-11 border border-black rounded-md flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100"
          >
            <img src={google} alt="" className="w-6" />
            <span className="text-gray-700 text-base">
              Continue with Google
            </span>
          </div>

          <div className="text-gray-600 text-sm mt-0">
            Already have an account?{" "}
            <Link to="/login" className="underline text-black">
              Login
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex w-1/2 bg-black items-center justify-center flex-col p-10">
          <img src={logo} alt="logo" className="w-40 mb-4" />
          <span className="text-3xl text-white font-semibold">SKILL NEST</span>
        </div>
      </form>
    </div>
  );

};

export default Register;
