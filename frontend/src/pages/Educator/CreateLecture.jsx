import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { ClipLoader } from "react-spinners";
import { setLectureData } from "../../store/slices/lectureSlice";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";

const CreateLecture = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { lectureData } = useSelector(state => state.lecture);

  const handleCreateLecture = async () => {
    setLoading(true);
    try {
      const result = await axiosInstance.post(
        `/lecture/create/${courseId}`,
        { title },
        { withCredentials: true }
      );
      console.log(result.data);
      dispatch(setLectureData([...lectureData, result.data.lecture]));
      setLoading(false);
      toast.success("Lecture added!");
      setTitle("");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response?.data.message);
    }
  };

  useEffect(() => {
    const getCourseLecture = async () => {
      try {
        const result = await axiosInstance.get(`/lecture/${courseId}`, {
          withCredentials: true,
        });
        console.log(result.data);
        dispatch(setLectureData(result.data.lectures));
      } catch (error) {
        console.log(error)
      }
    };
    getCourseLecture()
  }, []);

  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">
            Let's add a Lecture
          </h1>
          <p className="text-sm text-gray-500">
            Enter the title and add your video lectures to enhance your course
            content.
          </p>
        </div>

        {/* Input Area */}
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 mb-4 focus:ring-black"
          placeholder="e.g Introduction to Mern Stack"
        />

        {/* Bottom */}
        <div className="gap-4 flex mb-6">
          <button
            onClick={() => navigate(`/edit-course/${courseId}`)}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-medium"
          >
            <FaArrowLeftLong />
            Back to Course
          </button>
          <button
            onClick={handleCreateLecture}
            disabled={loading}
            className="px-5 py-2 rounded-md bg-black text-white hover:bg-gray-600 transition-all text-sm font-medium shadow"
          >
            {loading ? (
              <ClipLoader size={30} color="white" />
            ) : (
              "+ Create Lectures"
            )}
          </button>
        </div>

        {/* Lecture Area */}
        <div className="space-y-2">
          {lectureData?.map((lecture, index) => (
            <div key={index} className="bg-gray-100 rounded-md flex items-center justify-between p-3 text-sm font-medium text-gray-700">
              <span>Lecture - {index + 1}: {lecture?.title}</span>
              <FaEdit
                onClick={()=>navigate(`/edit-lecture/${lecture._id}`)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
