import React, { useState, useEffect } from 'react'; 
import { FaSearch, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router";

const AllProduct = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);


  const filteredProducts = products.filter((p) =>
    p.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Loading products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-blue-50 p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-purple-700 mb-4">
          Explore Our Product Collection
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Discover a wide range of creative and fun products for all ages. From premium chocolates to healthy snacks and drinks, find the perfect item that sparks delight and joy.
        </p>
      </div>

      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full max-w-sm mb-10 mx-auto">
        <input
          type="text"
          placeholder="Search by product name..."
          className="flex-1 px-3 py-2 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setCurrentPage(1)} 
          className="bg-[#f8f6f6] text-white px-3 py-2 hover:bg-[#f8f6f6] cursor-pointer"
        >
          <FaSearch className='text-blue-300' />
        </button>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 text-xl mt-10">
          No matching products found.
        </div>
      ) : (
        <>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 relative group"
              >
                <img
                  src={product.pictureURL}
                  alt={product.productName}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-purple-700 mb-2">
                    {product.productName}
                  </h2>
                  <p className="text-gray-600 text-sm mb-2">
                    {product.subCategory}
                  </p>
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar
                        key={i}
                        className={`h-4 w-4 ${i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="text-gray-500 text-sm ml-2">
                      {product.rating?.toFixed(1) || 0}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-700 font-bold text-lg">
                      ${product.price?.toFixed(2)}
                    </span>
                    <span className="text-gray-500 text-sm">
                      Stock: {product.availableQuantity || 0}
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-purple-700 bg-opacity-70 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-3xl">
                  <button
                    onClick={() => navigate(`/product-details/${product._id}`)}
                    className="px-6 py-2 bg-yellow-400 text-purple-700 font-bold rounded-full hover:bg-yellow-300 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10 gap-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="text-gray-700 font-semibold self-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllProduct;
