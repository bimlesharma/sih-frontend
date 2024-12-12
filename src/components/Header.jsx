"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
// import ThemeToggle from '@/components/ThemeToggle';


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("/api/users/userinfo");
        if (response.data?.success) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/users/logout");
      setIsLoggedIn(false);
      router.push("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <header className="bg-[#F3f3f3] absolute text-sm w-full z-50 py-2 text-gray-600">
      <div className="w-full lg:px-20 md:px-8 mx-auto px-4 sm:px-6 flex justify-between items-center h-10">
        {/* Logo Section */}
        <div className="h-10 rounded-full shadow-sm px-1 py gap-2 pr-4 flex bg-white items-center">
          <Image
            src="/logo.png"
            className="rounded-full bg-black"
            width={32}
            height={32}
            alt="Logo"
          />
          <Link href="/" className="text-gray-900 font-semibold">
            Platform Name | Brahma Bytes
          </Link>
        </div>

        {/* Navbar Links */}
        <div className="hidden lg:flex space-x-6 shadow-sm rounded-full px-2 py-2 bg-white items-center h-10">
          <nav>
            <Link href="/" className="hover:text-gray-900 px-3">
              Home
            </Link>
            <Link href="#features" className="hover:text-gray-900 px-3">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-gray-900 px-3">
              How It Works
            </Link>
            <Link href="#contact" className="hover:text-gray-900 px-3">
              Contact Us
            </Link>

            {/* Render login/logout links dynamically */}
            {isLoggedIn ? (
              <>
                <Link href="/profile" className="hover:text-gray-900 px-3">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-900 px-3"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-gray-900 px-3">
                  Login
                </Link>
                <Link href="/signup" className="hover:text-gray-900 px-3">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white space-y-2 py-4">
          <Link href="/" className="block px-4 hover:text-gray-900">
            Home
          </Link>
          <Link href="#features" className="block px-4 hover:text-gray-900">
            Features
          </Link>
          <Link href="#how-it-works" className="block px-4 hover:text-gray-900">
            How It Works
          </Link>
          <Link href="#contact" className="block px-4 hover:text-gray-900">
            Contact Us
          </Link>

          {/* Render login/logout links dynamically */}
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="block px-4 hover:text-gray-900"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block px-4 hover:text-gray-900"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block px-4 hover:text-gray-900">
                Login
              </Link>
              <Link href="/signup" className="block px-4 hover:text-gray-900">
                Sign Up
              </Link>
            </>
          )}

          {/*  */}
          {/* <ThemeToggle /> */}
        </div>
      )}
    </header>
  );
}