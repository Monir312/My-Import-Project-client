import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

const MyExports = () => {
  const { user } = useContext(AuthContext);
  const [exportsData, setExportsData] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user exports
  useEffect(() => {
    if (!user) return;

    const fetchExports = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/exports?userEmail=${user.email}`);
        const data = await res.json();
        setExportsData(data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to fetch exports", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchExports();
  }, [user]);

  // Delete product
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:4000/exports/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.deletedCount || data.success) {
          setExportsData(exportsData.filter((p) => p._id !== id));
          Swal.fire("Deleted!", "Product has been deleted.", "success");
        } else {
          Swal.fire("Error", data.message || "Failed to delete product", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete product", "error");
      }
    }
  };

  // Open edit modal
  const handleEdit = (product) => {
    setEditProduct(product);
  };

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/exports/${editProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editProduct)
      });
      const data = await res.json();

      if (data.modifiedCount || data.acknowledged) {
        setExportsData(exportsData.map((p) => (p._id === editProduct._id ? editProduct : p)));
        setEditProduct(null);
        Swal.fire("Updated!", "Product updated successfully.", "success");
      } else {
        Swal.fire("Error", data.message || "Failed to update product", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update product", "error");
    }
  };

  if (loading) {
    return <p className="text-gray-500 text-center py-10">Loading exports...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Exports</h1>

      {exportsData.length === 0 ? (
        <p className="text-gray-500">You have not exported any products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exportsData.map((product) => (
            <div key={product._id} className="border rounded-lg shadow-md p-4 flex flex-col">
              <img
                src={product.pictureURL}
                alt={product.productName}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-xl font-semibold mt-2">{product.productName}</h2>
              <p className="text-gray-700">Price: ${product.price?.toFixed(2)}</p>
              <p className="text-gray-700">Rating: {product.rating} ⭐</p>
              <p className="text-gray-700">Origin: {product.originCountry || "N/A"}</p>
              <p className="text-gray-700">Available Quantity: {product.availableQuantity}</p>

              <div className="mt-auto flex justify-between items-center gap-2">
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex-1"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 flex-1"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Update Product</h2>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                value={editProduct.productName}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, productName: e.target.value })
                }
                placeholder="Product Name"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="url"
                value={editProduct.pictureURL}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, pictureURL: e.target.value })
                }
                placeholder="Image URL"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="number"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })
                }
                placeholder="Price"
                className="w-full border p-2 rounded"
                step="0.01"
                required
              />
              <input
                type="text"
                value={editProduct.originCountry || ""}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, originCountry: e.target.value })
                }
                placeholder="Origin Country"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="number"
                value={editProduct.availableQuantity}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, availableQuantity: parseInt(e.target.value) })
                }
                placeholder="Available Quantity"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="number"
                value={editProduct.rating}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, rating: parseFloat(e.target.value) })
                }
                placeholder="Rating"
                step="0.1"
                min="0"
                max="5"
                className="w-full border p-2 rounded"
                required
              />
              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => setEditProduct(null)}
                  className="px-3 py-1 rounded bg-gray-400 hover:bg-gray-500 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyExports;
