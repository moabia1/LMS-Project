import React,{useState} from 'react'
import logo from "../assets/logo.png";
import google from "../assets/google.jpg";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-toastify';
import {ClipLoader} from "react-spinners"
import { useDispatch } from 'react-redux';
import { setUserData } from '../store/slices/userSlice';
import { FaArrowLeftLong } from "react-icons/fa6";


const Login = () => {

  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const result = await axiosInstance.post("/auth/login", {
        identifier,
        password
      }, { withCredentials: true })
      console.log(result)
      setLoading(false)
      dispatch(setUserData(result.data))
      navigate("/")
      toast.success("User loggedin successfully")
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#dddbdb] w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex relative"
      >
        <FaArrowLeftLong className="absolute top-[16%] left-[5%] w-[22px] h-[22px] cursor-pointer" onClick={()=>navigate('/')} />
        {/* Left Div */}
        <div className="md:w-[50%] w-full flex flex-col items-center justify-center gap-3">
          <div>
            <h1 className="font-semibold text-black text-2xl">
              Welcome Back !
            </h1>
            <h2 className="text-[#999797] text-[18px]">
              Login to your Account
            </h2>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="identifier" className="font-semibold">
              Email or username
            </label>
            <input
              type="text"
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-5"
              placeholder="Enter Email or username"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
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

          {/* Submit Button */}
          <button
            disabled={loading}
            className="w-[80%] h-10 bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]"
          >
            {loading ? <ClipLoader color="white" size={30} /> : "Login"}
          </button>
          <span
            onClick={() => navigate("/forget")}
            className="text-[16px] cursor-pointer text-[#585757]"
          >
            Forgot your Password ?
          </span>

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
            onClick={() => {
              window.location.href = "http://localhost:5000/api/auth/google";
            }}
            className="w-[80%] h-10 border border-black rounded-xs flex items-center justify-center hover:border-2 cursor-pointer"
          >
            <img src={google} alt="" className="w-[30px]" />
            <span className="text-[18px] text-gray-500">oogle</span>
          </div>
          <span className="text-[#6f6f6f]">
            Don't have account ?{" "}
            <Link
              to="/register"
              className="underline underline-offset-1 text-black"
            >
              register
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
  );}

export default Login