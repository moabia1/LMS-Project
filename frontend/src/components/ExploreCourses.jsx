import React from 'react'
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { GiArtificialHive } from "react-icons/gi";
import { GiMaterialsScience } from "react-icons/gi";
import { MdOutlineAnalytics } from "react-icons/md";
import { SiOpenaigym } from "react-icons/si";


const ExploreCourses = () => {
  return (
    <div className='w-screen min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center px-[30px] gap-4'>
      {/* Left/top div */}
      <div className='w-full lg:w-[350px] lg:h-full h-[400px] flex flex-col items-start justify-center gap-1 md:px-10 px-5'>
        <span className='text-[35px] font-semibold'>Explore</span>
        <span className='text-[35px] font-semibold'>Our Courses</span>
        <p className='text-[17px]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, dicta.</p>
        <button className='px-5 py-2.5 border-2 bg-black border-white text-white rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer mt-10'>
          Explore Courses <SiViaplay className="w-[30px] h-[30px] fill-white" />
        </button>
      </div>

      {/* Right/Bottom Div */}
      <div className='w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-0'>
        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
            <TbDeviceDesktopAnalytics className='w-[60px] h-[60px] text-[#6d6c6c]'/>
          </div>
          Web Dev
        </div>

        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center'>
            <LiaUikit className='w-[60px] h-[60px] text-[#6d6c6c]'/>
          </div>
          UI/UX Designing
        </div>

        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-[100px] h-[90px] bg-[#b0a3ef] rounded-lg flex items-center justify-center'>
            <MdAppShortcut className='w-[50px] h-[50px] text-[#6d6c6c]'/>
          </div>
          APP Dev
        </div>
        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-[100px] h-[90px] bg-[#ef9180] rounded-lg flex items-center justify-center'>
            <FaHackerrank className='w-[50px] h-[50px] text-[#6d6c6c]'/>
          </div>
          Ethical Hacking
        </div>

        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-[100px] h-[90px] bg-[#ade7efb6] rounded-lg flex items-center justify-center'>
            <GiArtificialHive className='w-[55px] h-[55px] text-[#6d6c6c]'/>
          </div>
          AI/ML
        </div>

        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-[100px] h-[90px] bg-[#ddd8a2] rounded-lg flex items-center justify-center'>
            <GiMaterialsScience className='w-[50px] h-[50px] text-[#6d6c6c]'/>
          </div>
          Data Science
        </div>

        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-[100px] h-[90px] bg-[#a5efba] rounded-lg flex items-center justify-center'>
            <MdOutlineAnalytics className='w-[50px] h-[50px] text-[#6d6c6c]'/>
          </div>
          Data Analytics
        </div>

        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
          <div className='w-[100px] h-[90px] bg-[#ecbca6] rounded-lg flex items-center justify-center'>
            <SiOpenaigym className='w-[50px] h-[50px] text-[#6d6c6c]'/>
          </div>
          Ai Tools
        </div>
      </div>
    </div>
  )
}

export default ExploreCourses