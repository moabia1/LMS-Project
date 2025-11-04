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
    <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex"
      >
        {/* Left Div */}
        <div className="md:w-[50%] w-[100%] flex flex-col items-center justify-center gap-3">
          <div>
            <h1 className="font-semibold text-black text-2xl">
              Let's get started
            </h1>
            <h2 className="text-[#999797] text-[18px]">Create your Account</h2>
          </div>

          {/* First & Last Name */}
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="first Name" className="font-semibold">
              First Name
            </label>
            <input
              type="text"
              id="first Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-5"
              placeholder="First Name"
            />
            <label htmlFor="last Name" className="font-semibold">
              Last Name
            </label>
            <input
              type="text"
              id="last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-5"
              placeholder="First Name"
            />
          </div>

          {/* Username */}
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="username" className="font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-5"
              placeholder="Enter username"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-5"
              placeholder="Your Email"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-5"
              placeholder="Enter Your Password"
            />
            {showPassword ? (
              <IoEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute w-5 h-5 cursor-pointer right-[5%] bottom-[10%]"
              />
            ) : (
              <IoEyeOff
                onClick={() => setShowPassword(!showPassword)}
                className="absolute w-5 h-5 cursor-pointer right-[5%] bottom-[10%]"
              />
            )}
          </div>

          {/* Role */}
          <div className="flex md:w-[50%] w-[70%] items-center justify-between">
            <span
              onClick={() => setRole("student")}
              className={`px-2.5 py-1.5 border-2 border-[#e7e6e6] rounded-2xl cursor-pointer hover:border-black ${
                role == "student" ? "border-black" : "border-[#646464]"
              }`}
            >
              Student
            </span>
            <span
              onClick={() => setRole("educator")}
              className={`px-2.5 py-1.5 border-2 border-[#e7e6e6] rounded-2xl cursor-pointer hover:border-black ${
                role == "educator" ? "border-black" : "border-[#646464]"
              }`}
            >
              Educator
            </span>
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            className="w-[80%] h-10 bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]"
          >
            {loading ? <ClipLoader color="white" size={30} /> : "Register"}
          </button>

          {/* Continue Google button */}
          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
            <div className="w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center">
              Or Continue
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
          </div>

          {/* Google icon with button */}
          <div
            onClick={() => navigate(`/auth/google`)}
            className="w-[80%] h-10 border border-black rounded-xs flex items-center justify-center hover:border-2 cursor-pointer"
          >
            <img src={google} alt="" className="w-[30px]" />
            <span className="text-[18px] text-gray-500">oogle</span>
          </div>
          <span className="text-[#6f6f6f]">
            Already have an account ?{" "}
            <Link
              to="/login"
              className="underline underline-offset-1 text-black"
            >
              login
            </Link>
          </span>
        </div>

        {/* Right Div */}
        <div className="w-[50%] h-[100%] rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col hidden">
          <img src={logo} alt="logo" className="w-30 shadow-2xl" />
          <span className="text-2xl text-white">SKILL NEST</span>
        </div>
      </form>
    </div>
  );
};

export default Register;
