import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

const AddExport = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newProduct = {
      productName: form.productName.value,
      subCategory: form.subCategory.value,
      sellerName: user?.displayName,
      sellerEmail: user?.email,
      price: parseFloat(form.price.value),
      rating: parseFloat(form.rating.value),
      availableQuantity: parseInt(form.availableQuantity.value),
      pictureURL: form.pictureURL.value,
      description: form.description.value,
      originCountry: form.originCountry.value || "Unknown",
      createdAt: new Date(),
    };

    try {
      const res1 = await fetch("http://localhost:4000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data1 = await res1.json();

      if (!data1.insertedId) {
        Swal.fire({
          title: "Error!",
          text: data1.message || "Failed to add product",
          icon: "error",
          confirmButtonColor: "#d33",
        });
        return;
      }


      const res2 = await fetch("http://localhost:4000/exports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: newProduct.productName,
          pictureURL: newProduct.pictureURL,
          price: newProduct.price,
          rating: newProduct.rating,
          originCountry: newProduct.originCountry,
          availableQuantity: newProduct.availableQuantity,
          sellerEmail: newProduct.sellerEmail,
        }),
      });

      const data2 = await res2.json();

      if (data2.insertedId) {
        Swal.fire({
          title: "Product Added Successfully!",
          text: `${newProduct.productName} has been added.`,
          icon: "success",
          confirmButtonColor: "#6d28d9",
        });
        form.reset();


        navigate("/my-exported-products");
      } else {
        Swal.fire({
          title: "Error!",
          text: data2.message || "Failed to add export record",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Server Error!",
        text: error.message || "Something went wrong",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <section className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 py-20 min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <div className="bg-white p-10 md:p-14 rounded-3xl shadow-2xl max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">
            Add a New Product
          </h1>

          <form onSubmit={handleAddProduct} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Product Name</label>
                <input type="text" name="productName" placeholder="Enter product name" className="input input-bordered w-full border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600" required />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Sub-category</label>
                <select name="subCategory" className="input input-bordered w-full border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600" required>
                  <option value="">Select category</option>
                  <option value="Chocolate">Chocolate</option>
                  <option value="Coffee Beans">Coffee Beans</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Soft Drinks">Soft Drinks</option>
                  <option value="Dry Fruits">Dry Fruits</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Seller Name</label>
                <input type="text" value={user?.displayName || ""} readOnly className="input input-bordered w-full bg-gray-100 border-gray-300 rounded-lg p-3" />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Seller Email</label>
                <input type="email" value={user?.email || ""} readOnly className="input input-bordered w-full bg-gray-100 border-gray-300 rounded-lg p-3" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Price ($)</label>
                <input type="number" step="0.01" name="price" placeholder="Price" className="input input-bordered w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-600" required />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Available Quantity</label>
                <input type="number" name="availableQuantity" placeholder="Available Quantity" className="input input-bordered w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-600" required />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Rating</label>
                <input type="number" step="0.1" name="rating" placeholder="e.g. 4.8" className="input input-bordered w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-600" required />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Origin Country</label>
              <input type="text" name="originCountry" placeholder="Origin Country" className="input input-bordered w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-600" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Picture URL</label>
              <input type="url" name="pictureURL" placeholder="Enter image URL" className="input input-bordered w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-600" required />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea name="description" placeholder="Write a short description..." rows="4" className="input input-bordered w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-600" required></textarea>
            </div>

            <div className="text-center pt-4">
              <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                Add Export/Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddExport;
