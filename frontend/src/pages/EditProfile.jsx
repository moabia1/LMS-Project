import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { axiosInstance } from "../lib/axios";
import { setUserData } from "../store/slices/userSlice";
import { toast } from "react-toastify";


const EditProfile = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState(userData.fullName?.firstName || "")
  const [lastName, setLastName] = useState(userData.fullName?.lastName || "")
  const [username, setUsername] = useState(userData.username || "")
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  
  const handleSubmit = async () => {
    setLoading(true)

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("username", username);
    formData.append("photo", avatarUrl);
    
    try {
      const result = await axiosInstance.post("/auth/update-profile", formData, { withCredentials: true })
      console.log(result)
      dispatch(setUserData(result.data))
      setLoading(false)
      navigate("/profile")
      toast.success("Profile Updated")
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative">
        <FaArrowLeftLong
          className="absolute top-[8%] left-[5%] w-[22px] h-[22px] cursor-pointer"
          onClick={() => navigate("/profile")}
        />

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Edit Profile
        </h2>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          {/* Logo */}
          <div className="flex flex-col items-center text-center">
            {userData?.avatar ? (
              <img
                src={userData?.avatar}
                className="w-24 h-24 rounded-full object-cover border-4 border-black "
              />
            ) : (
              <div className="w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-white">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  className="w-24 h-24 rounded-full object-cover border-4 border-black "
                />
              </div>
            )}
          </div>

          {/* Avatar */}
          <div className="">
            <label
              htmlFor="image"
              className="text-sm font-medium text-gray-700"
            >
              Select Avatar
            </label>
            <input
              onChange={(e) => setAvatarUrl(e.target.files[0])}
              type="file"
              id="image"
              accept="image/*"
              placeholder="Photo url"
              className="w-full px-4 py-2 border rounded-md text-sm "
            />
          </div>

          {/* Full Name */}
          <div className=" w-full flex gap-2">
            <div>
              <label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-700"
              >
                FirstName
              </label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                id="firstName"
                placeholder={userData.fullName?.firstName}
                className="w-full px-4 py-2 border rounded-md text-sm "
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-700"
              >
                LastName
              </label>
              <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                id="lastName"
                placeholder={userData.fullName?.lastName}
                className="w-full px-4 py-2 border rounded-md text-sm "
              />
            </div>
          </div>

          {/* Username */}
          <div className="">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder={userData.username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-sm "
            />
          </div>

          {/* Email */}
          <div className="">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              disabled={true}
              readOnly
              placeholder={userData.email}
              className="w-full px-4 py-2 border rounded-md text-sm "
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-black active:bg-[#4b4b4b] text-white py-2 rounded-md font-medium transition cursor-pointer"
          >
            {loading ? <ClipLoader color="white" size={30} /> : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
