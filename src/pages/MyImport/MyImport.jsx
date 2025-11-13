import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

const MyImport = () => {
  const { user } = useContext(AuthContext);
  const [imports, setImports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editImport, setEditImport] = useState(null); 


  useEffect(() => {
    if (!user) return;

    const fetchImports = async () => {
      try {
        const res = await fetch(`http://localhost:4000/imports?userEmail=${user.email}`);
        const data = await res.json();
        setImports(data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to fetch imports", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchImports();
  }, [user]);


  const handleRemove = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this import!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:4000/imports/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.deletedCount || data.success) {
          setImports(imports.filter((item) => item._id !== id));
          Swal.fire("Removed!", "Import has been removed.", "success");
        } else {
          Swal.fire("Error", data.message || "Failed to remove import.", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editImport) return;

    const payload = {
      productName: editImport.productName,
      pictureURL: editImport.pictureURL,
      price: parseFloat(editImport.price),
      originCountry: editImport.originCountry || "Unknown",
      availableQuantity: parseInt(editImport.availableQuantity),
      rating: parseFloat(editImport.rating),
    };

    try {
      const res = await fetch(`http://localhost:4000/imports/${editImport._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.modifiedCount || data.acknowledged) {
        setImports(imports.map((item) => (item._id === editImport._id ? { ...item, ...payload } : item)));
        setEditImport(null);
        Swal.fire("Updated!", "Import updated successfully.", "success");
      } else {
        Swal.fire("Error", data.message || "Failed to update import", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update import", "error");
    }
  };

  if (loading) return <p className="text-gray-500 text-center py-10">Loading imports...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Imports</h1>

      {imports.length === 0 ? (
        <p className="text-gray-500">You have not imported any products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {imports.map((item) => (
            <div key={item._id} className="border rounded-lg shadow-md p-4 flex flex-col">
              <img src={item.pictureURL} alt={item.productName} className="w-full h-40 object-cover rounded" />
              <h2 className="text-xl font-semibold mt-2">{item.productName}</h2>
              <p>Price: ${item.price?.toFixed(2)}</p>
              <p>Rating: {item.rating} ⭐</p>
              <p>Origin: {item.originCountry || "N/A"}</p>
              <p>Available Quantity: {item.availableQuantity}</p>

              <div className="mt-auto flex gap-2">
                <button
                  onClick={() => handleRemove(item._id)}
                  className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
                <button
                  onClick={() => setEditImport(item)}
                  className="flex-1 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editImport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Update Import</h2>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                value={editImport.productName}
                onChange={(e) => setEditImport({ ...editImport, productName: e.target.value })}
                placeholder="Product Name"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="url"
                value={editImport.pictureURL}
                onChange={(e) => setEditImport({ ...editImport, pictureURL: e.target.value })}
                placeholder="Image URL"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="number"
                value={editImport.price}
                onChange={(e) => setEditImport({ ...editImport, price: parseFloat(e.target.value) })}
                placeholder="Price"
                step="0.01"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                value={editImport.originCountry}
                onChange={(e) => setEditImport({ ...editImport, originCountry: e.target.value })}
                placeholder="Origin Country"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="number"
                value={editImport.availableQuantity}
                onChange={(e) =>
                  setEditImport({ ...editImport, availableQuantity: parseInt(e.target.value) })
                }
                placeholder="Available Quantity"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="number"
                value={editImport.rating}
                onChange={(e) => setEditImport({ ...editImport, rating: parseFloat(e.target.value) })}
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
                  onClick={() => setEditImport(null)}
                  className="px-3 py-1 rounded bg-gray-400 hover:bg-gray-500 text-white"
                >
                  Cancel
                </button>
                <button type="submit" className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white">
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

export default MyImport;
