import { config as dotenvConfig } from "dotenv"

dotenvConfig();

const _config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  EMAIL_USER: process.env.EMAIL_USER,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};

export default _config