// import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"], // Subsets optimize the font for specific languages.
  weight: ["400", "600", "700"], // Define font weights you want to include.
  variable: "--font-poppins", // Optional: Define a custom CSS variable.
});
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="h-screen bg-[#F3F3F3]">
          <Navbar />
          {children}
          <Footer />
      </body>
    </html>
  );
}
