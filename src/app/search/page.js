"use client";
import Link from "next/link";
import Image from "next/image";

export default function SearchPage() {
  return (
    <div className="min-h-screen text-sm flex flex-col items-center justify-center py-20 lg:py-0">
      <h1 className="text-3xl font-bold mb-6">Select a Search Option</h1>
      <section className=" text-gray-800">
        <div className="max-w-7xl  mx-auto px-5 lg:px-20">
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-20 ">
            <FeatureCard
              title="Make/Model Search"
              description="Find products by their make and model seamlessly."
              img="/img/f3.jpg"
              href="/search/make-model"
            />
            <FeatureCard
              title="Specification Search"
              description="Filter products with detailed specification criteria."
              img="/img/f2.jpg"
              href="/search/specification"
            />
            <FeatureCard
              title="Service Search"
              description="Locate services tailored to your needs."
              img="/img/f1.jpg"
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
    <div className="bg-gray-200 shadow-md p-6 rounded-3xl text-center flex flex-col justify-center items-center">
      <Image
        src={img}
        alt="feature"
        width={200}
        height={200}
        className=" w-[100px] md:w-[120px] lg:w-[200px] my-5 rounded-xl"
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
