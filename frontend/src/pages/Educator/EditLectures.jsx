import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import {toast} from "react-toastify"
import { setLectureData } from "../../store/slices/lectureSlice";
import { ClipLoader } from "react-spinners";

const EditLectures = () => {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { lectureData } = useSelector((state) => state.lecture);

  const selectedLecture = lectureData.find(
    (lecture) => lecture._id === lectureId
  );
  const [title, setTitle] = useState(selectedLecture.title)
  const [videoUrl, setVideoUrl] = useState("")
  const [previewFree, setPreviewFree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)

  const formData = new FormData();
  formData.append("title", title)
  formData.append("videoUrl", videoUrl)
  formData.append("isPreviewFree", previewFree)
  
  const handleEditCourse = async () => {
    setLoading(true)
    try {
      const result = await axiosInstance.post(`/lecture/update/${lectureId}`, formData, { withCredentials: true });
      console.log(result.data)
      dispatch(setLectureData([...lectureData, result.data]))
      toast.success("Lecture updated")
      navigate(-1)
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

  const handleRemove = async () => {
    setLoading1(true)
    try {
      const result = await axiosInstance.delete(`/lecture/remove/${lectureId}`, { withCredentials: true })
      console.log(result.data)
      toast.success("Lecture Deleted")
      navigate("/courses")
      setLoading1(false)
    } catch (error) {
      setLoading1(false)
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <FaArrowLeftLong
            onClick={() => navigate(-1)}
            className="text-gray-600 cursor-pointer"
          />
          <h2 className="text-xl font-semibold text-gray-800">
            Update course Lecture
          </h2>
        </div>

        {/* Remove Lecture button */}
        <button
          onClick={handleRemove}
          disabled={loading1}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-sm">
          {loading1 ?<ClipLoader size={30} color="white"/> :"Remove Lecture"}
        </button>

        {/* Update Content */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title*
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:outline-none"
              required
            />
          </div>

          {/* Video URL */}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Video*
            </label>
            <input
              onChange={(e)=>setVideoUrl(e.target.files[0])}
              type="file"
              className="w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-700 file:text-white hover:file:bg-gray-500"
              accept="video/*"
              required
            />
          </div>

          {/* Video free or not */}
          <div className="flex items-center gap-3">
            <input onChange={()=>setPreviewFree(!previewFree)} type="checkbox" id="preview" className="accent-black h-4 w-4" />
            <label htmlFor="preview" className="text-sm text-gray-700">Is this video FREE</label>
          </div>
          <p>{loading ? "Uploading Video ... Please wait..." : ""}</p>
        </div>

        {/* Update Button */}
        <div className="pt-4">
          <button
            onClick={handleEditCourse}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-700 transition">
            {loading ? <ClipLoader size={30} color="white"/> :"Update Lecture"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLectures;
