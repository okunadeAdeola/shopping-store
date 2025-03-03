import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('resetEmail'); // Get stored email

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/verifyOtp', { email, otp });
      toast.success(response?.data?.message);
      localStorage.setItem('isOtpVerified', 'true');
    //   navigate('/reset-password');
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="otp-container">
      <h2>Enter OTP</h2>
      <form onSubmit={handleVerifyOtp}>
        <input
          type="text"
          maxLength="6"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default OtpVerification;
