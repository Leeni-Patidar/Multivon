const About = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        
            {/* About Content */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            About Us
          </h2>

          <div className="w-20 h-1 bg-blue-950 mx-auto mb-6"></div>

          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            We are a design, consultancy, and marketing firm focused on helping brands grow with clarity and impact. By blending strategic thinking, creative design, and data-driven marketing, we build meaningful brand experiences that connect with the right audience and deliver measurable results.
          </p>

         <button className="mt-8 bg-blue-950 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-semibold transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
