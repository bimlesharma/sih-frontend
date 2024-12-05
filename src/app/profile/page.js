"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
// import { useAuthRedirect } from "@/helper/useAuthRedirect";

export default function ProfilePage() {
  // useAuthRedirect(false); // Redirect if not logged in

  const router = useRouter();
  const [data, setData] = useState("nothing");

  
  
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/userinfo");
      console.log(res.data);
      setData(res.data.id);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="">Profile Page</h1>

      <hr />
      <h2 className="p-1 rounded bg-green-500">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>

      <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        GetUser Details
      </button>
    </div>
  );
}
