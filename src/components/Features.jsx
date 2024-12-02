import Image from "next/image";

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white text-gray-800">
      <div className="max-w-7xl  mx-auto px-5">
        <h2 className="text-4xl font-bold text-center">Features</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Make/Model Search"
            description="Find products by their make and model seamlessly."
            img="/logo.png"
          />
          <FeatureCard
            title="Specification Search"
            description="Filter products with detailed specification criteria."
            img="/logo.png"
          />
          <FeatureCard
            title="Service Search"
            description="Locate services tailored to your needs."
            img="/logo.png"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, description, img }) {
  return (
    <div className="bg-[#f3f3f3] shadow-md p-6 rounded-lg text-center flex flex-col justify-center items-center">
      <Image src={img} alt="feature" width={300} height={300} className=" w-[100px] md:w-[150px] lg:w-[300px] py-5 rounded-lg"/>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}
