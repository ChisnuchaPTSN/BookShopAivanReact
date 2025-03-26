export default function Home() {
  return (

    
    <div className="min-h-screen bg-gray-50">
    {/* Hero Section */}
    <section className="relative h-96 bg-gray-800">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700 opacity-90"></div>
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            ComSci Book Shop
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Unlocking the world of computer science, one book at a time.
          </p>
          <div className="mt-10">
            <a
              href="#about"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
            >
              Discover Our Collection
            </a>
          </div>
        </div>
      </div>
    </section>
    

    {/* Vision Section with Image */}
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h2 className="text-base text-gray-600 font-semibold tracking-wide uppercase">Our Vision</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Empowering Minds Through Code
            </p>
            <p className="mt-4 text-lg text-gray-500">
              At ComSci Book Shop, we envision a world where computer science knowledge is accessible to all. We strive to be more than just a bookstore – we're a gateway to innovation, creativity, and problem-solving.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Our carefully selected collection spans from programming fundamentals to cutting-edge AI research, ensuring that whether you're a beginner or an expert, you'll find resources that challenge and inspire you.
            </p>
            <div className="mt-8">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
                >
                  Visit Our Store
                </a>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <div className="aspect-w-5 aspect-h-3 rounded-lg overflow-hidden shadow-lg">
              <img
                src="../images/book0.jpg"
                alt="Students studying computer science books"
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500 text-center italic">
              "Code is poetry for the digital age"
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Quote/Slogan Banner */}
    <section className="bg-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            "The computer science section of your mind needs a good book."
          </h2>
          <p className="mt-4 text-xl text-gray-300">
            Our passion is to leverage knowledge through curated computer science literature that inspires innovation and growth.
          </p>
        </div>
      </div>
    </section>

    {/* Image Grid */}
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-gray-600 font-semibold tracking-wide uppercase">Our Atmosphere</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A Place for Learning and Discovery
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img src="../images/book1.jpg" alt="ComSci Book Shop interior" className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Welcoming Environment</h3>
              <p className="mt-2 text-base text-gray-500">Our shop is designed to be a comfortable space where you can browse, read, and discover.</p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img src="../images/book2.jpg" alt="Book discussion" className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Community Events</h3>
              <p className="mt-2 text-base text-gray-500">Regular meetups, author talks, and coding workshops bring our community together.</p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img src="../images/book3.jpg" alt="Computer science books" className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Curated Selection</h3>
              <p className="mt-2 text-base text-gray-500">Every book is handpicked to ensure quality and relevance to modern computer science.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Ready to expand your knowledge?</span>
          <span className="block text-gray-600">Visit our store today.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
            >
              Find Our Location
            </a>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>

    
  </div>
    

  );
}
