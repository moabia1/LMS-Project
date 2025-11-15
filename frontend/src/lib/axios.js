import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "https://lms-project-wqss.onrender.com/api",
  withCredentials: true,
});