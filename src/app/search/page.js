"use client";
import Link from "next/link";
import Image from "next/image";

export default function SearchPage() {
  return (
    <div className="min-h-screen text-sm flex flex-col items-center justify-center py-20 lg:py-0">
      <h1 className="text-3xl font-bold mb-6">Select a Search Option</h1>
      <section id="features" className=" text-gray-800">
        <div className="max-w-7xl  mx-auto px-5 lg:px-20">
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-20 ">
            <FeatureCard
              title="Make/Model Search"
              description="Find products by their make and model seamlessly."
              img="/logo.png"
              href="/search/make-model"
            />
            <FeatureCard
              title="Specification Search"
              description="Filter products with detailed specification criteria."
              img="/logo.png"
              href="/search/specification"
            />
            <FeatureCard
              title="Service Search"
              description="Locate services tailored to your needs."
              img="/logo.png"
              href="/search/service"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, description, img, href }) {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg text-center flex flex-col justify-center items-center">
      <Image
        src={img}
        alt="feature"
        width={200}
        height={200}
        className=" w-[100px] md:w-[120px] lg:w-[200px] py-5 rounded-lg"
      />
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="my-2 text-gray-600">{description}</p>
      <Link
        href={href}
        className="block px-6 py-3 bg-gray-700 text-white text-center rounded hover:bg-gray-900"
      >
        Get Started
      </Link>
    </div>
  );
}
