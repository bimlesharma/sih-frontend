"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#F3f3f3,0] fixed w-full z-50 py-3  text-gray-600">      
      <div className="w-full lg:px-20 md:px-8 mx-auto px-4 sm:px-6 flex justify-between items-center h-16">
        <div className=" h-14 rounded-full shadow-sm px-2 py-2 gap-2 pr-4 flex bg-white items-center">
          <Image
            src="/logo.png"
            className=" rounded-full bg-black"
            width={40}
            height={40}
            alt="Logo"
          />
          <Link href="/" className="text-gray-900 font-bold">
            Platform Name | Brahma Bytes
          </Link>
        </div>
        <div className=" hidden lg:flex space-x-6 shadow-sm rounded-full px-6 py-2 bg-white  items-center h-14 font-semibold">
          <nav className="">
            <Link href="/" className="hover:text-gray-900 px-4">
              Home
            </Link>
            <Link href="#features" className="hover:text-gray-900 px-4">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-gray-900 px-4">
              How It Works
            </Link>
            <Link href="#contact" className="hover:text-gray-900 px-4">
              Contact Us
            </Link>
            <Link href="/login" className="hover:text-gray-900 px-4">
              Login
            </Link>
            <Link href="/signup" className="hover:text-gray-900 px-4">
              Sign Up
            </Link>
          </nav>
        </div>

        {/* <button className="hidden md:block bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md">
          Get Started
        </button> */}

        {/* Mobile Menu */}
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
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white space-y-2 py-4">
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
          <Link href="/login" className="block px-4 hover:text-gray-900">
            Login
          </Link>
          <Link href="/signup" className="block px-4 hover:text-gray-900">
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
