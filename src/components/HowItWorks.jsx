export default function HowItWorks() {
    return (
      <section id="how-it-works" className="py-20 bg-white text-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center">How It Works</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            {["Step 1", "Step 2", "Step 3", "Step 4"].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 mx-auto rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <h3 className="mt-4 font-bold">{step}</h3>
                <p className="text-gray-600">Description of {step} goes here.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  