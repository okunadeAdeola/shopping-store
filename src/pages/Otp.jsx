import React, { useState, useEffect } from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import gif from "../assets/image/gif.gif";
import axiosInstance from "../axiosInstance";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem("userEmail");

  // Redirect if email is missing
  // useEffect(() => {
  //   if (!email) {
  //     toast.error("Session expired. Please start again.", { position: "top-center" });
  //     navigate("/login");
  //   }
  // }, [email, navigate]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const trimmedOtp = otp.trim();

    if (!/^\d{4,6}$/.test(trimmedOtp)) {
      toast.error("Please enter a valid OTP", { position: "top-center" });
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post("/verifyOtp", { email, otp: trimmedOtp });

      toast.success(response?.data?.message || "OTP verified successfully", {
        position: "top-center",
      });

      localStorage.setItem("isOtpVerified", "true");

      navigate("/reset-password");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid OTP. Try again.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10">
      <div className="bg-white mx-10 p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="mb-6 text-center">
          <MdOutlineShoppingBag
            className="mx-auto bg-orange-500 text-white rounded-full p-3"
            size={40}
          />
        </div>
        <h2 className="text-center text-xl font-semibold mb-6">OTP Verification</h2>
        <form onSubmit={handleVerifyOtp}>
          <div className="h-[50px] mb-5">
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="h-[50px] w-full p-3 border rounded-md focus:outline-none border-gray-300 focus:ring-2 focus:ring-pink-400"
              placeholder="Enter the 4-6 digit OTP"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md transition ${
              loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-gray-200 hover:text-orange-500"
            }`}
          >
            {loading ? (
              <img src={gif} alt="Loading..." className="w-[25px] mx-auto" />
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Otp;
