"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", {
        email: user.email,
        password: user.password,
      });

      setUser({
        email: "",
        password: "",
      });
      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-center",
        });
        setLoading(true);
        toast.loading("Redirecting to dashboard...", {
          position: "bottom-center",
          duration: 500,
        });
        setTimeout(() => {
          setLoading(false);
          router.push("/profile");
        }, 1500);
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div  className="min-h-screen flex items-center">
    
    <div className="max-w-md min-hs w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
        Welcome
      </h2>
      <p className="text-neutral-600 text-center text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to get started with our platform
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4"></div>
        <LabelInputContainer className="mb-4">
          {/* <Label htmlFor="email">Email Address</Label> */}
          <Input
            id="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
            placeholder="Email"
            type="email"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          {/* <Label htmlFor="password">Password</Label> */}
          <Input
            id="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            value={user.password}
            placeholder="Password"
            type="password"
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Login &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex items-center justify-center space-x-2">
          <span className="text-neutral-600 dark:text-neutral-300">
            {"Don't have an account?"}
          </span>

          <Link
            href={"/signup"}
            className="text-neutral-800 dark:text-neutral-200 font-medium hover:underline"
          >
            Signup
          </Link>
        </div>
      </form>
      <Toaster />
    </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};


// import React from "react";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function LoginPage() {
//   const router = useRouter();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     console.log("Login Data:", data);
//     // Simulate login success
//     router.push("/search");
//   };

//   return (
//     <div className="min-h-screen pt-20  text-sm flex items-center justify-center bg-[#f3f3f3}">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-md bg-white p-6 rounded shadow-md"
//       >
//         <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

//         {/* Email */}
//         <div className="mb-4">
//           <input
//             id="email"
//             type="email"
//             placeholder="Email"
//             {...register("email", {
//               required: "Email is required",
//               pattern: {
//                 value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                 message: "Invalid email format",
//               },
//             })}
//             className="mt-1 block w-full px-3 py-2 border rounded"
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//           )}
//         </div>

//         {/* Password */}
//         <div className="mb-4">
//           <input
//             id="password"
//             type="password"
//             placeholder="Password"
//             {...register("password", {
//               required: "Password is required",
//               minLength: {
//                 value: 8,
//                 message: "Password must be at least 6 characters",
//               },
//             })}
//             className="mt-1 block w-full px-3 py-2 border rounded"
//           />
//           {errors.password && (
//             <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full mb-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//         >
//           Login
//         </button>
//         <div className="flex flex-col items-end gap-2">
//           <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800">
//             Forgot your password?
//           </Link>
//         <Link className=" " href="/signup">Don't have an account? <span className="underline text-blue-600"> Sign up here.</span> 
//         </Link>
//         </div>
//       </form>
//     </div>
//   );
// }