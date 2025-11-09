import React, { useRef, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import image from "../../assets/empty.jpg";
import { FaEdit } from "react-icons/fa";

const EditCourses = () => {
  const thumb = useRef();
  const navigate = useNavigate();
  const [isPublished, setIsPublished] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      {/* Top Bar */}
      <div className="flex items-center justify-center gap-5 md:justify-between flex-col md:flex-row mb-6 relative">
        <FaArrowLeftLong
          className="absolute top-[-20%] md:top-[20%] left-0 md:left-[2%]  w-[22px] h-[22px] cursor-pointer"
          onClick={() => navigate("/courses")}
        />

        <h2 className="text-2xl font-semibold md:pl-[60px]">
          Add Details Information regarding the Course
        </h2>

        <div className="space-y-2 space-x-2">
          <button className="bg-black text-white px-4 py-2 rounded-md cursor-pointer">
            Go To Lecture Page
          </button>
        </div>
      </div>

      {/* Form Detail Page */}
      <div className="bg-gray-50 p-6 rounded-md">
        <h2 className="text-lg font-medium mb-4">Basic Course Information</h2>

        {/* Buttons */}
        <div className="space-y-2 space-x-2">
          {!isPublished ? (
            <button
              onClick={() => setIsPublished(!isPublished)}
              className="bg-green-100 text-green-600 px-4 py-2 rounded-md border"
            >
              Click to Publish
            </button>
          ) : (
            <button
              onClick={() => setIsPublished(!isPublished)}
              className="bg-red-100 text-red-600 px-4 py-2 rounded-md border"
            >
              Click to Unpublish
            </button>
          )}
          <button className="bg-red-600 text-white px-4 py-2 rounded-md ">
            Remove Course
          </button>
        </div>

        <form
          onSubmit={(e)=>e.preventDefault()}
          className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              className="w-full border px-4 py-2 rounded-md"
              type="text"
              id="title"
              placeholder="Course Title"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label
              htmlFor="subtitle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subtitle
            </label>
            <input
              className="w-full border px-4 py-2 rounded-md"
              type="text"
              id="subtitle"
              placeholder="Course Subtitle"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              className="w-full border px-4 py-2 rounded-md h-24 resize-none"
              type="text"
              id="description"
              placeholder="Course Description"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            {/* Category */}
            <div className="flex-1">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Category
              </label>
              <select
                id=""
                className="w-full border px-4 py-2 rounded-md bg-white"
              >
                <option value="">Select Category</option>
                <option value="App Development">App Development</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Data Science">Data Science</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="Web Development">Web Development</option>
                <option value="UI/UX">UI/UX</option>
                <option value="AI Tools">AI Tools</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Level */}
            <div className="flex-1">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Level
              </label>
              <select
                id=""
                className="w-full border px-4 py-2 rounded-md bg-white"
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Price */}
            <div className="flex-1">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Price (INR)
              </label>
              <input
                type="number"
                id="price"
                className="w-full border px-4 py-2 rounded-md"
                placeholder="₹ "
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course Thumbnail
            </label>
            <input type="file" hidden ref={thumb} accept="image/*" />
          </div>

          {/* Thumbnail Reference */}
          <div className="relative w-[300px] h-[170px]">
            <img
              src={image}
              alt=""
              onClick={() => thumb.current.click()}
              className="w-full h-full border border-black rounded-[5px] "
            />
            <FaEdit
              onClick={() => thumb.current.click()}
              className="w-5 h-5 absolute top-2 right-2"
            />
          </div>

          <div className="flex items-center justify-start gap-4">
            <button
              className="bg-[#e9e8e8] hover:bg-red-200 text-black border border-black cursor-pointer px-4 py-2 rounded-md"
              onClick={() => navigate("/courses")}
            >
              Cancel
            </button>
            <button className="bg-black text-white px-7 py-2 rounded-md hover:bg-gray-500 cursor-pointer">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourses;
