import { useEffect } from "react"
import { axiosInstance } from "../lib/axios"
import { useDispatch } from "react-redux"
import { setUserData } from "../store/slices/userSlice";

const getCurrentUser = async () => {

  const dispatch = useDispatch();

  useEffect(() =>{
    const fetchUser = async () => {
      try {
        const result = await axiosInstance.get("/auth/get-user",{withCredentials:true});
        dispatch(setUserData(result.data))
      } catch (error) {
        console.log("Fetch current USer :",error)
      }
    }
    fetchUser();
  },[])
}

export default getCurrentUser