import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwtGenerator from "../utils/jwtToken.js";
import sendEmail from "../config/sendMail.js";

export const registerController = async (req, res) => {
  const { email, password, username, fullName: { firstName, lastName }, role = "student" } = req.body;

  const existingUser = await User.findOne({
    $or:[{username: username}, {email:email}]
  })
  
  if (existingUser) {
    return res.status(400).json({message: "User already Exists"})
  }

  const hashPassword = await bcrypt.hash(password, 10);
  
  const user = await User.create({
    email,
    password:hashPassword,
    username,
    fullName: {
      firstName,
      lastName
    },
    role
  })

  jwtGenerator(user, "User Signup Successfully", 201, res);
};

export const googleAuthCallback = async (req, res) => {
  const user = req.user
  console.log(user)
  const isUserExists = await User.findOne({
    $or:[{email: user.emails[0].value},{googleId:user.id}]
  }) 

  if (isUserExists) {
    jwtGenerator(isUserExists,"User loggen in successfully",201,res)
  }

  const newUser = await User.create({
    googleId: user.id,
    email: user.emails[0].value,
    fullName: {
      firstName: user.name.givenName,
      lastName: user.name.familyName
    },
    username: user.name.givenName,
    avatar:user.photos.value
  })

  jwtGenerator(newUser,"User registered Successfully",201,res)
}

export const loginController = async (req, res) => {
  const { identifier, password } = req.body;
  
  const user = await User.findOne({
    $or:[{email:identifier}, {username:identifier}]
  })

  if (!user) {
    return res.status(409).json({
      message: "User not found"
    })
  }

  const validPassword = await bcrypt.compare(password, user.password)
  
  if (!validPassword) {
    return res.status(400).json({
      message: "Incorrect Password"
    })
  }

  jwtGenerator(user,"Login Successfully",201,res)
}

export const getUserController = async (req, res) => {
  
  const id = req.id;

  const user = await User.findById(id)

  if (!user) {
    return res.status(400).json({message: "User not Found"})
  }

  res.status(201).json(user)

}

export const logoutController = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure:true
  })

  return res.status(201).json({
    message:"User Logout Successfully"
  })
}

export const sendOtp = async (req, res) => {
  
  const { email } = req.body;
  
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({message: "User not found"})
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  user.resetOtp = otp;
  user.otpExpires = Date.now() + 5 * 60 * 1000;
  user.isOtpVerified = false

  await user.save();
  await sendEmail(email, otp);

  return res.status(200).json({message: "Otp Send Successfully"})
}

export const verifyOtp = async (req,res) => {
  const { email, otp } = req.body;
  
  const user = await User.findOne({ email: email });

  if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
    return res.status(404).json({ message: "Invalid OTP" });
  }

  user.isOtpVerified = true;
  user.resetOtp = undefined;
  user.otpExpires = undefined;

  await user.save();

  return res.status(200).json({ message: "Otp Verified Successfully" });
}

export const resetPassword = async (req, res) => {
  
  const { email, password } = req.body;
  
  const user = await User.findOne({ email: email });
  
  if (!user || !user.isOtpVerified) {
    return res
      .status(404)
      .json({ message: "Something went Wrong Invalid User" });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  
  user.password = hashPassword
  user.isOtpVerified = false

  await user.save();

  return res.status(200).json({message: "Password Reset Successfully"});
}