import React, { useEffect } from 'react'
import { axiosInstance } from '../lib/axios'
import { useDispatch, useSelector } from 'react-redux'
import { setCreatorCourse } from '../store/slices/courseSlice';

const getCreatorCourse = () => {

  const {userData} = useSelector((state)=> state.user)
  const dispatch = useDispatch();

  return (
    useEffect(() => {
      const creatorCourses = async () => {
        try {
          const result = await axiosInstance.get("/course/creator", { withCredentials: true });
          console.log(result.data)
          dispatch(setCreatorCourse(result.data))
        } catch (error) {
          console.log(error)
        }
      }
      creatorCourses();
    },[userData])
  )
}

export default getCreatorCourse