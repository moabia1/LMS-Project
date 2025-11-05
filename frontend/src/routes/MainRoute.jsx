import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import { useSelector } from 'react-redux'
import Profile from '../pages/Profile'
import Forget from '../pages/Forget'

const MainRoute = () => {

  const {userData} = useSelector((state)=> state.user);
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={!userData ? <Register/> : <Navigate to="/"/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={userData ? <Profile/> : <Navigate to="/register" />}/>
      <Route path='/forget' element={<Forget/>}/>
    </Routes>
  )
}

export default MainRoute