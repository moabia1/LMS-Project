import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const EditCourses = () => {
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

        <form className="space-y-6">
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
              <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-1">Course Category</label>
              <select id="" className="">
                <option value="">Select Ctaegory</option>
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
            <div></div>

            {/* Price */}
            <div></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourses;
