"use client";
import React from "react";
// import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";


export default function SignupPage() {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();

  // const onSubmit = (data) => {
  //   console.log("Signup Data:", data);
  //   // Simulate signup success
  //   alert("Signup successful!");
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  console.log("Name:", name)
  return (
    <div className="min-h-screen text-sm pt-20 flex items-center justify-center bg-[#f3f3f3]">
      <form
        // onSubmit={handleSubmit(onSubmit)}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>

        {/* Full Name */}
        <div className="mb-4">
          <input
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
            placeholder="Full Name"
            // {...register("name", { required: "Full Name is required" })}
            className="mt-1 block w-full px-3 py-2 border rounded"
          />
          {/* {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )} */}
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
          onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            placeholder="Email"
            // {...register("email", {
            //   required: "Email is required",
            //   pattern: {
            //     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            //     message: "Invalid email format",
            //   },
            // })}
            className="mt-1 block w-full px-3 py-2 border rounded"
          />
          {/* {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )} */}
        </div>

        {/* Password */}
        <div className="mb-4">
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            placeholder="Password"
            // {...register("password", {
            //   required: "Password is required",
            //   minLength: {
            //     value: 6,
            //     message: "Password must be at least 6 characters",
            //   },
            // })}
            className="mt-1 block w-full px-3 py-2 border rounded"
          />
          {/* {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )} */}
        </div>

        {/* Confirm Password */}
        {/* <div className="mb-4">
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            // {...register("confirmPassword", {
            //   required: "Please confirm your password",
            //   validate: (value) =>
            //     value === watch("password") || "Passwords do not match",
            // })}
            className="mt-1 block w-full px-3 py-2 border rounded"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div> */}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mb-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
        <div className="text-red-600 font-semibold">{error}</div>

        <div className="flex flex-col items-end gap-2">
        <Link className=" " href="/login">Already have an account? <span className="underline text-blue-600"> Login here.</span> 
        </Link>
        </div>
      </form>
    </div>
  );
}
