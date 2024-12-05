"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState("request"); // 'request', 'verify', or 'reset'
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle sending OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setMessage("OTP sent to your email. Please check your inbox.");
        setStep("verify");
      } else {
        setMessage("Error sending OTP. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  // Handle verifying OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      if (response.ok) {
        setMessage("OTP verified successfully. You can now reset your password.");
        setStep("reset");
      } else {
        setMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  // Handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp, newPassword }),
        }
      );

      if (response.ok) {
        setMessage("Password reset successful. Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setMessage("Failed to reset password. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f3f3]">
      <form
        onSubmit={
          step === "request"
            ? handleSendOtp
            : step === "verify"
            ? handleVerifyOtp
            : handleResetPassword
        }
        className="w-full max-w-md bg-white p-6 rounded shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">
          {step === "request"
            ? "Forgot Password"
            : step === "verify"
            ? "Verify OTP"
            : "Reset Password"}
        </h1>

        {/* Request OTP Step */}
        {step === "request" && (
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Enter your email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded"
              required
            />
          </div>
        )}

        {/* Verify OTP Step */}
        {step === "verify" && (
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium">
              Enter OTP
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded"
              required
            />
          </div>
        )}

        {/* Reset Password Step */}
        {step === "reset" && (
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${
            loading ? "cursor-wait" : ""
          }`}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : step === "request"
            ? "Send OTP"
            : step === "verify"
            ? "Verify OTP"
            : "Reset Password"}
        </button>

        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
}
