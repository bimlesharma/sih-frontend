"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div>
          <Link href="/" className="text-2xl font-bold">SIH Project Logo</Link>
        </div>

        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-gray-400">Home</Link>
          <Link href="#features" className="hover:text-gray-400">Features</Link>
          <Link href="#how-it-works" className="hover:text-gray-400">How It Works</Link>
          <Link href="#contact" className="hover:text-gray-400">Contact Us</Link>
          <Link href="/login" className="hover:text-gray-400">Login/Sign Up</Link>
        </nav>

        <button className="hidden md:block bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md">
          Get Started
        </button>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
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
        <div className="md:hidden bg-gray-800 space-y-2 py-4">
          <Link href="/" className="block px-4 hover:text-gray-400">Home</Link>
          <Link href="#features" className="block px-4 hover:text-gray-400">Features</Link>
          <Link href="#how-it-works" className="block px-4 hover:text-gray-400">How It Works</Link>
          <Link href="#contact" className="block px-4 hover:text-gray-400">Contact Us</Link>
          <Link href="/login" className="block px-4 hover:text-gray-400">Login/Sign Up</Link>
        </div>
      )}
    </header>
  );
}
