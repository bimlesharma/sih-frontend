// import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import Header from "@/components/Header";
// import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
// import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="items-center justify-center grid">
      <main className="bg-blue-600 text-white py-20 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold">Revolutionizing Procurement Data Analysis</h1>
        <p className="mt-4 text-lg">
          Simplify your search for products and services with Make/Model-wise, Specification-wise, and Service-wise solutions.
        </p>
        <Button className="mt-8 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-md">
          Get Started
        </Button>
      </div>
    </main>
    {/* <Header /> */}
      {/* <Hero /> */}
      <Features />
      <HowItWorks />
      <Testimonials />
      <Contact />
      {/* <Footer /> */}
      <footer className="">
        Dummy Link
        <Link href="/search">Search</Link>
      </footer>
    </div>
  );
}
