import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { FaStar } from "react-icons/fa";

const ProductDetails = () => {
  const { productId } = useParams();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch product details
  useEffect(() => {
    fetch(`http://localhost:4000/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [productId]);

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-500 text-xl">
        Loading Product...
      </div>
    );
  }

  const handleImport = async () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "You need to login first to import a product",
      });
      return;
    }

    if (quantity < 1 || quantity > product.availableQuantity) {
      Swal.fire({
        icon: "error",
        title: "Invalid Quantity",
        text: `Available quantity is ${product.availableQuantity}`,
      });
      return;
    }

    const importData = {
      productId: product._id,
      userEmail: user.email,
      importedQuantity: quantity,
      productName: product.productName,
      pictureURL: product.pictureURL,
      price: product.price,
      rating: product.rating,
      originCountry: product.originCountry || "Unknown",
    };

    try {
      // Save import in imports collection
      const res = await fetch("http://localhost:4000/imports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(importData),
      });
      const data = await res.json();

      if (data.insertedId) {
        // Update product quantity in DB
        await fetch(`http://localhost:4000/products/${product._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ $inc: { availableQuantity: -quantity } }),
        });

        // Update UI
        setProduct({
          ...product,
          availableQuantity: product.availableQuantity - quantity,
        });

        Swal.fire({
          icon: "success",
          title: "Imported Successfully",
          text: `${quantity} ${product.productName} imported`,
        });

        setQuantity(1);
        setModalOpen(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Import Failed",
          text: data.message || "Something went wrong",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Server error occurred",
      });
    }
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Product Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={product.pictureURL}
            alt={product.productName}
            className="rounded-2xl shadow-lg max-h-[400px] object-cover w-full"
          />
        </div>

        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold text-purple-700">
            {product.productName}
          </h1>
          <p className="text-gray-700 text-lg">{product.description}</p>

          <div className="space-y-2">
            <p className="text-lg font-semibold">
              Price: <span className="text-green-600">${product.price?.toFixed(2)}</span>
            </p>

            <p className="text-lg font-semibold flex items-center">
              Rating:{" "}
              <span className="flex ml-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={`h-5 w-5 ${i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"
                      }`}
                  />
                ))}
              </span>
              <span className="ml-2 text-gray-600">{product.rating}</span>
            </p>

            <p className="text-lg font-semibold">
              Available Quantity: <span className="text-blue-600">{product.availableQuantity}</span>
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-6 py-3 rounded-lg font-semibold text-white shadow-lg bg-purple-600 hover:bg-purple-700 transition-all duration-300"
          >
            Import Now
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-125 relative">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Import Quantity</h2>

            <input
              type="number"
              min="1"
              max={product.availableQuantity}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border border-gray-300 rounded-lg w-full px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 text-center"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={quantity < 1 || quantity > product.availableQuantity}
                className={`px-4 py-2 rounded-lg text-white font-semibold transition ${quantity < 1 || quantity > product.availableQuantity
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
                  }`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default ProductDetails;
