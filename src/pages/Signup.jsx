import React, { useState } from 'react';
import { MdOutlineShoppingBag } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup'
import axiosInstance from '../axiosInstance';
import gif from '../assets/image/gif.gif';
import { toast } from 'react-toastify';
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
//  <FaRegEye />

{/* <FaEyeSlash /> */}




const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  let lower = new RegExp(`(?=.*[a-z])`);
  let upper = new RegExp(`(?=.*[A-Z])`);
  let number = new RegExp(`(?=.*[0-9])`);
  let length = new RegExp(`(?=.{8,})`);

  let formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      setLoading(true);
      console.log(values);
      try {
        const response = await axiosInstance?.post('/signup', values)
        console.log(response);
        toast.success(`${response?.data?.message}`)
        setLoading(false);
        navigate('/login')
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error(`${error?.response?.data?.message}`)
      }
    },
    validationSchema: yup.object({
      firstname: yup.string().required(<span className='flex'><span>This field is required</span></span>),
      lastname: yup.string().required(<span className='flex'><span>This field is required</span></span>),
      email: yup.string().email('Invalid email format').required(<span className='flex'><span>This field is required</span></span>),
      password: yup.string().matches(lower, "Must include lowercase letter").matches(upper, "Must include uppercase letter").matches(number, "Must include a number").matches(length, "Must not be less than 8 characters").required("This field is required"),
    })
  })
  return (
    <>
    <div id='background' className="form-membership min-h-screen flex items-center justify-center py-10">
      <div className="preloader absolute inset-0 flex items-center justify-center">
      </div>
      <div className="content bg-amber-50 mx-10 p-8 rounded-lg shadow-md w-full max-w-sm">
        <div id="logo" className="mb-6 text-center">
          <MdOutlineShoppingBag className='mx-auto text-center bg-orange-500 rounded-full p-3' size={30} />
        </div>
        <h5 className="text-center mb-6">Create account</h5>
        <form onSubmit={formik.handleSubmit}>
          <div className="h-[50px] mb-5">
            <input type="text" className="h-[50px] w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Firstname" name='firstname' onBlur={formik.handleBlur} onChange={formik.handleChange} />
            <span className='text-red-500 text-[12px]'>{formik.touched.firstname && formik.errors.firstname}</span>
          </div>
          <div className="h-[50px] mb-5">
            <input type="text" className="h-[50px] w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Lastname" name='lastname' onBlur={formik.handleBlur} onChange={formik.handleChange} />
            <span className='text-red-500 text-[12px]'>{formik.touched.lastname && formik.errors.lastname}</span>
          </div>
          <div className="h-[50px] mb-5">
            <input type="email" className="h-[50px] w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Email" name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} />
            <span className='text-red-500 text-[12px]'>{formik.touched.email && formik.errors.email}</span>
          </div>
          {/* <div className="h-[50px] mb-5">
            <input type={passwordVisible ? "text" : "password"} 
            className="h-[50px] w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Password" name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} />
            <span className='text-red-500 text-[12px]'>{formik.touched.password && formik.errors.password}</span>
            <span onClick={togglePasswordVisibility} className="absolute top-[42px] right-5 cursor-pointer">
                            {!passwordVisible ? <FaRegEye /> : <FaEyeSlash />}
                        </span>
          </div> */}
           <div className="h-[80px] relative my-3">
                       
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            autoComplete="off"
                            className="border-[2px] mt-1 border-gray-300 py-2 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                            placeholder='Password'
                            name="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <span className="text-red-500 my-1">{formik.errors.password}</span>
                        )}
                        <span onClick={togglePasswordVisibility} className="absolute top-[22px] right-5 cursor-pointer">
                            {!passwordVisible ? <FaRegEye /> : <FaEyeSlash />}
                        </span>
                    </div>
          <button type='submit'  className="btn btn-block w-full bg-orange-500 text-white py-3 rounded-md hover:bg-gray-200 hover:text-orange-500">
          {loading? <img src={gif} alt="" className='w-[25px] text-center mx-auto' /> : 'Sign Up'}
             </button>
          <hr className="my-6" />
          <p className="text-center text-gray-600 mb-4">Already have an account?</p>
          <div className='text-center border font-bold text-sm w-[20%] mx-auto border-gray-300  my-5 hover:bg-gray-400 hover:border-gray-300 rounded'>
            <Link to="/login" >Sign in!</Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Signup;
