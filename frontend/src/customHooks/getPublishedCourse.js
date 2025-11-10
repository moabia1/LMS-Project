import React, { useEffect } from 'react'
import { axiosInstance } from '../lib/axios'
import { useDispatch } from 'react-redux'
import { setCourseData } from '../store/slices/courseSlice';

const getPublishedCourse = () => {

  const dispatch = useDispatch();

  return (
    useEffect(() => {
      const getCourseData = async () => {
        try {
          const result = await axiosInstance.get("/course/published", { withCredentials: true });
          dispatch(setCourseData(result.data));
          console.log(result.data)
        } catch (error) {
          console.log("Get CourseData",error)
        }
      }
      getCourseData();
    },[])
  )
}

export default getPublishedCourse