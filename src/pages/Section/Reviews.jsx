import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "David Miller",
      picture: "https://i.pravatar.cc/150?img=32",
      rating: 5,
      review:
        "The coffee beans I imported through Food & Beverage Trade Hub were exceptionally fresh and aromatic. Highly satisfied with their service!"
    },
    {
      id: 2,
      name: "Sophia Chen",
      picture: "https://i.pravatar.cc/150?img=47",
      rating: 4,
      review:
        "Their chocolate export quality is world-class. The packaging was neat, and delivery was faster than expected. Highly recommended!"
    },
    {
      id: 3,
      name: "Amit Sharma",
      picture: "https://i.pravatar.cc/150?img=15",
      rating: 5,
      review:
        "Excellent platform for global food trade. Easy to manage exports and imports. Customer support is very responsive."
    },
    {
      id: 4,
      name: "Maria Lopez",
      picture: "https://i.pravatar.cc/150?img=58",
      rating: 5,
      review:
        "I love how smooth and secure the trading process is. I was able to import premium snacks for my store without any hassle."
    },
    {
      id: 5,
      name: "Abdul Rahman",
      picture: "https://i.pravatar.cc/150?img=60",
      rating: 4,
      review:
        "Great collection of beverages and dry fruits. Everything arrived perfectly packed and tasted amazing!"
    },
    {
      id: 6,
      name: "Emily Johnson",
      picture: "https://i.pravatar.cc/150?img=22",
      rating: 5,
      review:
        "I’ve worked with many exporters, but this hub stands out for professionalism, product quality, and trust."
    }
  ];

  return (
    <section className="bg-gradient-to-br from-yellow-50 to-pink-50 py-20">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-gray-800 drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          What Our Customers Say
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col items-center">
                <img
                  src={review.picture}
                  alt={review.name}
                  className="w-20 h-20 rounded-full mb-4 object-cover shadow-md"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{review.name}</h3>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-center leading-relaxed">{review.review}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
