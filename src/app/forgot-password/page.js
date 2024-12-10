"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/forgot-password", { email });
      
      toast.success(response.data.message || "Reset link sent to your email.", { 
        position: "top-center" 
      });

      setEmail("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong.", 
        { position: "bottom-center" }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="max-w-md w-full mx-auto rounded-lg p-8 shadow-lg bg-white dark:bg-gray-800">
        <h2 className="text-xl font-bold text-center text-gray-800 dark:text-gray-200">
          Forgot Password
        </h2>
        <p className="text-center text-sm text-gray-600 mt-2 dark:text-gray-300">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
