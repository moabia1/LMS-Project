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
        path="/edit-course/:courseId"
        element={userData?.role === "educator" ? <EditCourses /> : <Navigate to="/" />}
      />
      <Route
        path="/courses"
        element={userData?.role === "educator" ? <Courses /> : <Navigate to="/" />}
      />
      <Route
        path="/create-course"
        element={userData?.role === "educator" ? <CreateCourses /> : <Navigate to="/register" />}
      />
    </Routes>
  );
}

export default MainRoute