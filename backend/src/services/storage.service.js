import { v2 as cloudinary } from "cloudinary";
import config from "../config/config.js";
import fs from "fs"

const uploadOnCloudinary = async (filePath) => {
  cloudinary.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
  });

  try {
    if (!filePath) {
      return null;
    }

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(filePath)
    return uploadResult.secure_url


  } catch (error) {
    fs.unlinkSync(filePath);
    console.log(first)
  }
};


export default uploadOnCloudinary