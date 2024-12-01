// import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen bg-red-500">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
