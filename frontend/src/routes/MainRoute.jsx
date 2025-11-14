import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import { useSelector } from 'react-redux'
import Profile from '../pages/Profile'
import Forget from '../pages/Forget'
import EditProfile from '../pages/EditProfile'
import Dashboard from '../pages/Educator/Dashboard'
import Courses from '../pages/Educator/Courses'
import EditCourses from '../pages/Educator/EditCourses'
import CreateCourses from '../pages/Educator/CreateCourses'
import AllCourses from '../pages/AllCourses'
import CreateLecture from '../pages/Educator/CreateLecture'
import EditLectures from '../pages/Educator/EditLectures'
import ViewCourse from '../pages/ViewCourse'
import ViewLectures from '../pages/ViewLectures'
import MyEnrolledCourses from '../pages/MyEnrolledCourses'

const MainRoute = () => {

  const {userData} = useSelector((state)=> state.user);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/register"
        element={!userData ? <Register /> : <Navigate to="/" />}
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile"
        element={userData ? <Profile /> : <Navigate to="/register" />}
      />
      <Route path="/forget" element={<Forget />} />
      <Route
        path="/edit-profile"
        element={userData ? <EditProfile /> : <Navigate to="/register" />}
      />
      <Route
        path="/dashboard"
        element={userData?.role === "educator" ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route
        path="/courses"
        element={userData?.role === "educator" ? <Courses /> : <Navigate to="/" />}
      />
      <Route
        path="/all-courses"
        element={userData ? <AllCourses /> : <Navigate to="/login" />}
      />
      <Route
        path="/create-course"
        element={userData?.role === "educator" ? <CreateCourses /> : <Navigate to="/register" />}
      />
      <Route
        path="/edit-course/:courseId"
        element={userData?.role === "educator" ? <EditCourses /> : <Navigate to="/" />}
      />
      <Route
        path="/create-lecture/:courseId"
        element={userData?.role === "educator" ? <CreateLecture /> : <Navigate to="/" />}
      />
      <Route
        path="/edit-lecture/:lectureId"
        element={userData?.role === "educator" ? <EditLectures /> : <Navigate to="/" />}
      />
      <Route
        path="/view-course/:courseId"
        element={userData ? <ViewCourse /> : <Navigate to="/" />}
      />
      <Route
        path="/view-lecture/:courseId"
        element={userData ? <ViewLectures /> : <Navigate to="/" />}
      />
      <Route
        path="/my-courses"
        element={userData ? <MyEnrolledCourses /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default MainRoute