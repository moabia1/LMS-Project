import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Forget = () => {

  const [step, setStep] = useState(3)
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      {/* Step 1 */}
      {step == 1 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800 '>
          Forget Your Password
        </h2>
        <form className='space-y-4'>
          <div>
            <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Enter your email address</label>
            <input type="email" id='email' className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black' placeholder='you@example.com' required/>
          </div>
          <button className='w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer'>
            Send OTP
          </button>
        </form>

        <div
          onClick={()=>navigate("/login")}
          className='test-sm mt-4 text-center cursor-pointer'>
          Back to Login
        </div>
      </div>}

      {/* Step 2 */}
      {step == 2 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800 '>
          Enter OTP
        </h2>
        <form className='space-y-4'>
          <div>
            <label htmlFor="otp" className='block text-sm font-medium text-gray-700'>Please enter the 4-digit code sent to your email</label>
            <input type="text" id='otp' className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black' placeholder='* * * *' required/>
          </div>
          <button className='w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer'>
            Verify OTP
          </button>
        </form>

        <div
          onClick={()=>navigate("/login")}
          className='test-sm mt-4 text-center cursor-pointer'>
          Back to Login
        </div>
      </div>}

      {/* Step 3 */}
      {step == 3 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800 '>
          Reset Your Password
        </h2>
        <p className='text-sm text-gray-500 text-center mb-6'>
          Enter a new Password below to remain access to your account.
        </p>
        <form className='space-y-4'>
          <div>
            <label htmlFor="password" className='block text-sm font-medium text-gray-700'>New Password</label>
            <input type="text" id='password' className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black' placeholder='********' required/>
          </div>
          {/* Re-Enter */}
          <div>
            <label htmlFor="cnfpassword" className='block text-sm font-medium text-gray-700'>Confirm Password</label>
            <input type="text" id='cnfpassword' className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black' placeholder='********' required/>
          </div>
          <button className='w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer'>
            Reset Password
          </button>
        </form>

        <div
          onClick={()=>navigate("/login")}
          className='test-sm mt-4 text-center cursor-pointer'>
          Back to Login
        </div>
      </div>}
    </div>
  )
}

export default Forget