import { FaCheckCircle, FaTags, FaBolt, FaUsers } from "react-icons/fa";

const WhyChoose = () => {
  const features = [
    {
      icon: <FaCheckCircle size={40} />,
      title: "Trusted Agency",
      description:
        "We have built a reputation for reliability and trustworthiness in the real estate market.",
    },
    {
      icon: <FaTags size={40} />,
      title: "Best Price",
      description:
        "Competitive pricing and transparent transactions ensure you get the best value for your investment.",
    },
    {
      icon: <FaBolt size={40} />,
      title: "Fast Service",
      description:
        "Quick response times and efficient processes to help you move forward without delays.",
    },
    {
      icon: <FaUsers size={40} />,
      title: "Expert Team",
      description:
        "Our experienced professionals provide expert consultation and guidance every step of the way.",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Why Choose Us?
          </h2>
          <div className="w-20 h-1 bg-blue-950 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the advantages of working with a dedicated team committed to your success
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px -4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 text-blue-950 rounded-full mb-4">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-black mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
