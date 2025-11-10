import React from 'react'
import Navbar from '../components/Navbar'

const AllCourses = () => {
  return (
    <div className='min-h-screen flex bg-gray-50'>
      <Navbar />
      
      {/* SideBar */}
      <aside className='w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-[130px] border-r border-gray-200 shadow-md transition-transform duration-300 z-5'>

      </aside>
    </div>
  )
}

export default AllCourses