import { useState } from "react"
import { MdOutlineShoppingBag } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import gif from "../assets/image/gif.gif"
import axiosInstance from "../axiosInstance"

const OtpVerification = () => {
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const email = localStorage.getItem("resetEmail") // Get stored email

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    if (!otp.trim()) {
      toast.error("Please enter OTP")
      return
    }

    setLoading(true)
    try {
      const response = await axiosInstance.post("/verifyOtp", { email, otp })
      toast.success(response?.data?.message)
      localStorage.setItem("isOtpVerified", "true")
      // Uncomment the line below to navigate after verification
      // navigate('/reset-password');
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid OTP")
    } finally {
      setLoading(false)
    }
  }

  return (
    // <div id='background' className="form-membership min-h-screen flex items-center justify-center py-10">
    //   <h2>Enter OTP</h2>
    //   <form onSubmit={handleVerifyOtp}>
    //     <input
    //       type="text"
    //       maxLength="6"
    //       placeholder="Enter OTP"
    //       value={otp}
    //       onChange={(e) => setOtp(e.target.value)}
    //       required
    //     />
    //     <button type="submit">Verify OTP</button>
    //   </form>
    // </div>
    // <div id='background' className="form-membership min-h-screen flex items-center justify-center py-10">
    //         <div className="preloader absolute inset-0 flex items-center justify-center">
    //           <div className="preloader-icon animate-spin"></div>
    //         </div>
    //         <div className="content bg-white mx-10 p-8 rounded-lg shadow-md w-full max-w-sm">
    //           <div id="logo" className="mb-6 text-center">
    //             <MdOutlineShoppingBag className='mx-auto text-center bg-pink-500 rounded-full p-3' size={30} />
    //           </div>
    //           <h5 className="text-center mb-6">Forgotten Password</h5>
    //           <form onSubmit={formik.handleSubmit}>
    //             <div className="h-[50px] mb-5">
    //               <input
    //                 type="email"
    //                 className={`h-[50px] w-full p-3 border rounded-md focus:outline-none focus:ring-2 
    //                   ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
    //                 placeholder="Email"
    //                 name="email"
    //                 onBlur={formik.handleBlur}
    //                 onChange={formik.handleChange}
    //               />
    //               {formik.touched.email && formik.errors.email && (
    //                 <span className='text-red-500 text-[12px]'>{formik.errors.email}</span>
    //               )}
    //             </div>
    //             <button type='submit' className="btn btn-block w-full bg-pink-500 text-white py-3 rounded-md hover:bg-gray-200 hover:text-pink-500">
    //               {loading ? <img src={gif} alt="Loading..." className='w-[25px] text-center mx-auto' /> : 'Continue'}
    //             </button>
    //           </form>
    //         </div>
    //       </div>
    <div id="background" className="form-membership min-h-screen flex items-center justify-center py-10">
      <div className="preloader absolute inset-0 flex items-center justify-center">
        <div className="preloader-icon animate-spin"></div>
      </div>
      <div className="content bg-white mx-10 p-8 rounded-lg shadow-md w-full max-w-sm">
        <div id="logo" className="mb-6 text-center">
          <MdOutlineShoppingBag className="mx-auto text-center bg-pink-500 rounded-full p-3" size={30} />
        </div>
        <h5 className="text-center mb-6">OTP Verification</h5>
        <form onSubmit={handleVerifyOtp}>
          <div className="h-[50px] mb-5">
            <input
              type="text"
              className="h-[50px] w-full p-3 border rounded-md focus:outline-none focus:ring-2 border-gray-300"
              placeholder="Enter OTP"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-block w-full bg-pink-500 text-white py-3 rounded-md hover:bg-gray-200 hover:text-pink-500"
          >
            {loading ? (
              <img src={gif || "/placeholder.svg"} alt="Loading..." className="w-[25px] text-center mx-auto" />
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
