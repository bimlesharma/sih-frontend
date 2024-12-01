export default function Features() {
    return (
      <section id="features" className="py-20 bg-gray-100 text-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center">Features</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard title="Make/Model Search" description="Find products by their make and model seamlessly." />
            <FeatureCard title="Specification Search" description="Filter products with detailed specification criteria." />
            <FeatureCard title="Service Search" description="Locate services tailored to your needs." />
          </div>
        </div>
      </section>
    );
  }
  
  function FeatureCard({ title, description }) {
    return (
      <div className="bg-white shadow-md p-6 rounded-lg text-center">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
    );
  }
  