import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useLoginDashboardMutation,useDashboardLoginMutation} from '../../../store/slices/apiSlice.js'


const Login = () => {
  const navigate = useNavigate();
  const [loginDashboard] = useLoginDashboardMutation();
  const [dashboardLogin, {isLoading,error}] = useDashboardLoginMutation()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dashboardLogin({ email, password }).unwrap();
      // Assuming backend returns { token: "..." }
      if (response) {
        localStorage.setItem("token1212", response.access);
        navigate("/"); // redirect to dashboard
      } else {
        alert("Invalid credentials or missing token");
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1d2733]">
      <div className="bg-[#2c3b4a] rounded-lg border border-[#C1C1C1] shadow-lg p-10 w-[500px]">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src="/lg.png" alt="Logo" className="w-28 h-24 mb-2" />
          <h1 className="text-xl font-bold text-[#A6C5F3]">ALPHA</h1>
          <p className="text-gray-300 text-sm">Motivation</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-200 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#1d2733] text-gray-200 border border-[#C1C1C1] focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-200 mb-1">Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#1d2733] text-gray-200 border border-[#C1C1C1] focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-blue-400 bg-[#343F4F] focus:ring-blue-500 rounded"
            />
            <label htmlFor="remember" className="text-gray-300 text-sm">
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black font-semibold py-2 rounded-md hover:bg-gray-200 transition"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>

          {error && (
            <p className="text-red-400 text-sm mt-2 text-center">
              {error?.data?.message || "Invalid credentials"}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
