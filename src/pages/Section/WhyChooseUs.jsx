import React from "react";
import { motion } from "framer-motion";
import { FaCoffee, FaAppleAlt, FaCookieBite, FaWineBottle, FaLeaf, FaShippingFast } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <FaCoffee className="text-5xl text-yellow-400 mx-auto mb-4" />,
      title: "Premium Quality Products",
      description: "We carefully select the finest coffee beans, chocolates, and snacks to ensure unmatched taste and freshness."
    },
    {
      id: 2,
      icon: <FaCookieBite className="text-5xl text-pink-400 mx-auto mb-4" />,
      title: "Wide Range of Choices",
      description: "From dry fruits to soft drinks — our diverse catalog satisfies every food and beverage need."
    },
    {
      id: 3,
      icon: <FaShippingFast className="text-5xl text-green-400 mx-auto mb-4" />,
      title: "Global Export Network",
      description: "We connect suppliers and importers worldwide through a smooth, reliable trade platform."
    },
    {
      id: 4,
      icon: <FaWineBottle className="text-5xl text-red-400 mx-auto mb-4" />,
      title: "Trusted Packaging & Delivery",
      description: "Every product is securely packaged and shipped with care, ensuring freshness upon arrival."
    },
    {
      id: 5,
      icon: <FaLeaf className="text-5xl text-emerald-400 mx-auto mb-4" />,
      title: "Eco-Friendly Practices",
      description: "We support sustainable sourcing and green packaging to protect our planet."
    },
    {
      id: 6,
      icon: <FaAppleAlt className="text-5xl text-orange-400 mx-auto mb-4" />,
      title: "Healthy & Organic Options",
      description: "We promote natural and nutritious products for a healthy lifestyle."
    }
  ];

  return (
    <section className="bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 py-20 text-white">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Why Choose <span className="text-yellow-300">Food & Beverage Trade Hub?</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="bg-white text-gray-800 rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-lg text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <a
            href="#"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Get Started Today!
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
