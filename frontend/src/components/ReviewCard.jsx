import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const ReviewCard = ({comment, rating, avatar, fullName, title}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 max-w-sm w-full">
      <div className="flex items-center mb-3 text-yellow-300 text-sm">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <span key={1}>{i < rating ? <FaStar /> : <FaRegStar />}</span>
          ))}
      </div>
      <p className="text-gray-700 text-sm mb-5">
        Review for: <span className="font-semibold">{title}</span>
      </p>
      <p className="text-gray-700 text-sm mb-5">
        Review : <span className='font-semibold'>{comment}</span>
      </p>

      <div className="flex items-center gap-2">
        <img
          src={avatar}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <h2 className="font-semibold text-sm text-gray-800 mt-2">
          {fullName?.firstName + " " + fullName?.lastName}
        </h2>
      </div>
    </div>
  );
}

export default ReviewCard