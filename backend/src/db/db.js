import mongoose from "mongoose";
import config from "../config/config.js"


async function connectToDB() {
  try {
    await mongoose.connect(config.MONGO_URI)
    console.log("MongoDB Connected")
  } catch (error) {
    console.log("DB Error: ",error)
  }
}

export default connectToDB