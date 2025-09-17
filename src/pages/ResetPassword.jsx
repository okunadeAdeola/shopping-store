import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import gif from '../assets/image/gif.gif';
import axiosInstance from '../axiosInstance';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    // ✅ Get email saved from ForgotPassword step
    const email = localStorage.getItem("userEmail");

    // ✅ Validation schema
    const validationSchema = yup.object({
        otp: yup.string()
            .required('OTP is required')
            .matches(/^\d{4,6}$/, 'OTP must be 4-6 digits'),
        password: yup.string()
            .required('Password is required')
            .matches(/(?=.*[a-z])/, 'Must contain at least one lowercase letter')
            .matches(/(?=.*[A-Z])/, 'Must contain at least one uppercase letter')
            .matches(/(?=.*[0-9])/, 'Must contain at least one number')
            .matches(/(?=.{8,})/, 'Must be at least 8 characters long'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
            otp: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const response = await axiosInstance.post('/reset-password', {
                    email, // from localStorage
                    otp: values.otp,
                    newPassword: values.password,
                });

                if (response.data.success || response.data.status) {
                    toast.success('Password reset successful! Redirecting...');
                    localStorage.removeItem("userEmail"); // cleanup
                    setTimeout(() => navigate('/login'), 3000);
                } else {
                    toast.error(response.data.message || 'Something went wrong');
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'Server error');
            }
            setLoading(false);
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="text-center mb-6">
                    <MdOutlineShoppingBag className="mx-auto text-orange-500 bg-gray-100 rounded-full p-3" size={40} />
                    <h2 className="text-xl font-semibold mt-2">Reset Password</h2>
                </div>

                <form onSubmit={formik.handleSubmit}>
                    {/* OTP Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">OTP</label>
                        <input
                            type="text"
                            name="otp"
                            className="border border-gray-300 p-2 w-full rounded-md"
                            placeholder="Enter OTP"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.otp}
                        />
                        {formik.touched.otp && formik.errors.otp && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.otp}</p>
                        )}
                    </div>

                    {/* New Password Field */}
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 font-medium">New Password</label>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            name="password"
                            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Enter new password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        <span
                            onClick={togglePasswordVisibility}
                            className="absolute top-9 right-3 cursor-pointer text-gray-600"
                        >
                            {passwordVisible ? <FaEyeSlash /> : <FaRegEye />}
                        </span>
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 font-medium">Confirm Password</label>
                        <input
                            type={confirmPasswordVisible ? 'text' : 'password'}
                            name="confirmPassword"
                            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Confirm new password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                        />
                        <span
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute top-9 right-3 cursor-pointer text-gray-600"
                        >
                            {confirmPasswordVisible ? <FaEyeSlash /> : <FaRegEye />}
                        </span>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? <img src={gif} alt="Loading" className="w-5 h-5" /> : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
