import React, { useState } from 'react';
import { MdOutlineShoppingBag } from "react-icons/md";
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
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
      setLoading(true);
      try {
        const response = await axiosInstance.post('/forgotPassword', values);
        toast.success(response?.data?.message);

        // Save email for OTP step
        localStorage.setItem('resetEmail', values.email);

        // Redirect to OTP page
        navigate('/otp');
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div id='background' className="form-membership min-h-screen flex items-center justify-center py-10">
      <div className="content bg-white mx-10 p-8 rounded-lg shadow-md w-full max-w-sm">
        <div id="logo" className="mb-6 text-center">
          <MdOutlineShoppingBag className='mx-auto text-center bg-orange-500 rounded-full p-3' size={30} />
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
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <span className='text-red-500 text-[12px]'>{formik.errors.email}</span>
            )}
          </div>
          <button 
            type='submit' 
            disabled={loading}
            className="btn btn-block w-full bg-orange-500 text-white py-3 rounded-md hover:bg-gray-200 hover:text-orange-500"
          >
            {loading ? <img src={gif} alt="Loading..." className='w-[25px] mx-auto' /> : 'Continue'}
          </button>
          <Link to='/otp'>otp</Link>
        </form>
      </div>
    </div>
  );
};

export default ForgottenPassword;
