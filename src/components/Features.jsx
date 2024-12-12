import Image from "next/image";

export default function Features() {
  return (
    <section id="features" className="py-10 pb-14 bg-white text-gray-800">
      <div className="max-w-full mx-auto flex flex-col  justify-center items-center px-5">
        <h2 className="text-4xl font-bold text-center">Features</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 w-[70%]  gap-20">
          <FeatureCard
            title="Make/Model Search"
            description="Find products by their make and model seamlessly."
            img="/img/f3.jpg"
          />
          <FeatureCard
            title="Specification Search"
            description="Filter products with detailed specification criteria."
            img="/img/f2.jpg"
          />
          <FeatureCard
            title="Service Search"
            description="Locate services tailored to your needs."
            img="/img/f1.jpg"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, description, img }) {
  return (
    <div className="bg-[#f3f3f3] shadow-md p-6 w-auto rounded-3xl text-center flex flex-col justify-center items-center">
      <Image src={img} alt="feature" width={300} height={300} className=" w-[100px] md:w-[120px] lg:w-[180px] my-6 rounded-xl"/>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
}
