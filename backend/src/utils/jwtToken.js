import jwt from "jsonwebtoken"
import config from "../config/config.js"


const jwtGenerator = async (user,message,statusCode,res) => {
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn:"3d"
  })

  return res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    })
    .json({
      success: true,
      message,
      user
    });
}

export default jwtGenerator