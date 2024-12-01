export default function Contact() {
    return (
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center">Contact Us</h2>
          <form className="mt-10 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 gap-6">
              <input type="text" placeholder="Name" className="p-4 rounded-md" />
              <input type="email" placeholder="Email" className="p-4 rounded-md" />
              <textarea placeholder="Message" className="p-4 rounded-md" rows="4"></textarea>
              <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-md">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
  