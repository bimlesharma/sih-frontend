// import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
// import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
    {/* <Header /> */}
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Contact />
      {/* <Footer /> */}
    </div>
  );
}
