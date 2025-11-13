import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

const RecentProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const recent = sorted.slice(0, 6);
        setProducts(recent);
      })
      .catch(err => console.error(err));
  }, []);


  return (
    <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-purple-700 mb-3">
            Featured Products
          </h2>
          <p className="text-gray-600 text-lg">
            Handpicked food & beverage items for your import & export needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div
              key={product._id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={product.pictureURL}
                alt={product.toyName} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-purple-700 mb-2">
                  {product.toyName || product.name}
                </h2>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(Math.round(product.rating))].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                  <span className="text-gray-500 text-sm">
                    ({product.rating})
                  </span>
                </div>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-pink-500">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-gray-500 text-sm">
                    Stock: {product.availableQuantity || 0}
                  </span>
                  <button
                    onClick={() => navigate(`/product-details/${product._id}`)}
                    className="px-5 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition duration-300 text-xs"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-7">
          <Link
            className="px-5 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition duration-300"
            to="/all-products"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentProducts;
