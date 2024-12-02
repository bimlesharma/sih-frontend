export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="/" className="hover:text-gray-300">Home</a>
                </li>
                <li>
                  <a href="#features" className="hover:text-gray-300">Features</a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-gray-300">How It Works</a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-gray-300">Contact Us</a>
                </li>
                <li>
                  <a href="/login" className="hover:text-gray-300">Login</a>
                </li>
                <li>
                  <a href="/signup" className="hover:text-gray-300">Sign Up</a>
                </li>
              </ul>
            </div>
  
            {/* Contact Details */}
            <div>
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>Email: <a href="mailto:contact@sihproject.com" className="hover:text-gray-300">contact.brahmabytes@gmail.com</a></li>
                <li>Phone: <a href="tel:+1234567890" className="hover:text-gray-300">+91 1234567890</a></li>
                <li>Location: New Delhi, India</li>
              </ul>
            </div>
  
            {/* Social Media Links */}
            <div>
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="hover:text-gray-300" aria-label="Facebook">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54v-2.197c0-2.508 1.493-3.89 3.777-3.89 1.093 0 2.238.195 2.238.195v2.459h-1.26c-1.243 0-1.63.772-1.63 1.562v1.872h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-gray-300" aria-label="Twitter">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 4a4.48 4.48 0 00-4.48 4.48 4.29 4.29 0 00.11.92A12.94 12.94 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-gray-300" aria-label="LinkedIn">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 20h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75c.966 0 1.75.785 1.75 1.75s-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-1.346-.025-3.078-1.877-3.078-1.879 0-2.17 1.467-2.17 2.985v5.697h-3v-11h2.878v1.507h.041c.4-.756 1.375-1.552 2.834-1.552 3.031 0 3.59 1.994 3.59 4.584v6.461z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
  
          <div className="mt-8 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Team Brahma Bytes. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }
  