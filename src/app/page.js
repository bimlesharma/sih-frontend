import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

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
