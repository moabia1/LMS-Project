import React, { useEffect } from 'react'
import { axiosInstance } from '../lib/axios'
import { useDispatch } from 'react-redux'
import { setReviewData } from '../store/slices/reviewSlice'

const getAllReviews = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const allReviews = async () => {
      try {
        const result = await axiosInstance.get("/review/get-review", { withCredentials: true })
        console.log(result)
        dispatch(setReviewData(result.data))
        console.log(result.data)
      } catch (error) {
        console.log("review getting :",error)
      }
    }
    allReviews()
  },[])
}

export default getAllReviews