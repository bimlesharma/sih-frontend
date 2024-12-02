import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[#F3F3F3] mx-auto pt-20 flex flex-col justify-center h-screen w-full">
      <div className="md:py-20 px-5 md:px-20 flex flex-col md:flex-row md:justify-between items-center bg-orange-30">
        <div className="left bg-pink-40 mt-10">
          <p className="md:text-lg lg:text-xl text-base w-[80%]">Save time and money!</p>
          <p className="md:text-lg lg:text-xl text-base w-[80%]">
            Simplify your search for products and services with:
            {/* <ul>
              <li>Make/Model-wise</li>
              <li>Specification-wise</li>
              <li>Service-wise solutions</li>
            </ul> */}
          </p>
          <h1 className="md:text-7xl lg:text-9xl text-5xl my-2">Platform Name</h1>
          <div className="w-full">
            <button className=" bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md">
              Get Started
            </button>
          </div>
          {/* <h1 className=" text-9xl ">
            Revolutionizing Procurement Process
          </h1> */}
        </div>
        <div className="right">
          <Image
            src="/img/hero-img.svg"
            className="px-10 md:px-0"
            width={500}
            height={500}
            alt="Hero Image"
          />
        </div>
      </div>
    </section>
  );
}
