// import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";


const poppins = Poppins({
  subsets: ["latin"], 
  weight: ["400", "600", "700"], 
  variable: "--font-poppins",
});
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="h-screen bg-[#F3F3F3]">
          <Toaster />
          <Navbar />
          {children}
          <Footer />
      </body>
    </html>
  );
}
