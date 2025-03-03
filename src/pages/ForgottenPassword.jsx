import React, { useState } from 'react';
import { MdOutlineShoppingBag } from "react-icons/md";
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import gif from '../assets/image/gif.gif';
import * as yup from 'yup';
import axiosInstance from '../axiosInstance';

const ForgottenPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object({
      email: yup.string()
        .email('Invalid email format')
        .required('This field is required'),
    }),
    onSubmit: async (values) => {
      console.log(values);
      setLoading(true);
      try {
        const response = await axiosInstance?.post('/forgotPassword', values);
        console.log(response);
        toast.success(response?.data?.message);
        navigate('/otp');
        localStorage.setItem('user', JSON.stringify(response.data.user.email));
        localStorage.setItem('shoppinToken', JSON.stringify(response.data.token));
        localStorage.setItem('userDetails', JSON.stringify(response.data.user));
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <div id='background' className="form-membership min-h-screen flex items-center justify-center py-10">
        <div className="preloader absolute inset-0 flex items-center justify-center">
          <div className="preloader-icon animate-spin"></div>
        </div>
        <div className="content bg-white mx-10 p-8 rounded-lg shadow-md w-full max-w-sm">
          <div id="logo" className="mb-6 text-center">
            <MdOutlineShoppingBag className='mx-auto text-center bg-pink-500 rounded-full p-3' size={30} />
          </div>
          <h5 className="text-center mb-6">Forgotten Password</h5>
          <form onSubmit={formik.handleSubmit}>
            <div className="h-[50px] mb-5">
              <input
                type="email"
                className={`h-[50px] w-full p-3 border rounded-md focus:outline-none focus:ring-2 
                  ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Email"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email && (
                <span className='text-red-500 text-[12px]'>{formik.errors.email}</span>
              )}
            </div>
            <button type='submit' className="btn btn-block w-full bg-pink-500 text-white py-3 rounded-md hover:bg-gray-200 hover:text-pink-500">
              {loading ? <img src={gif} alt="Loading..." className='w-[25px] text-center mx-auto' /> : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgottenPassword;
