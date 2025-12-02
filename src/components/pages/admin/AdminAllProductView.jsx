import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminAllProductView() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/login");

    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/products", {
          headers: { Authorization: "Bearer " + token },
        });
        setProducts(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate, token, loading]);

  if (loading)
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        All Products
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-blue-600 text-white text-left">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Brand</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((prod) => (
                <tr
                  key={prod.productId}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 text-gray-700">{prod.productId}</td>
                  <td className="px-4 py-3">
                    {prod.images?.length > 0 ? (
                      <img
                        src={prod.images[0]}
                        alt={prod.productName}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {prod.productName}
                  </td>
                  <td className="px-4 py-3 text-gray-700">${prod.price}</td>
                  <td className="px-4 py-3 text-gray-700">{prod.stock}</td>
                  <td className="px-4 py-3 text-gray-700">{prod.category}</td>
                  <td className="px-4 py-3 text-gray-700">{prod.brand}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/dashboard/editproducts/`, {
                          state: { product: prod },
                        })
                      }
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        const confirmDelete = window.confirm(
                          "Are you sure you want to delete this product?"
                        );
                        if (confirmDelete) {
                          axios
                            .delete(
                              `http://localhost:3000/api/products/${prod.productId}`,
                              {
                                headers: {
                                  Authorization: "Bearer " + token,
                                },
                              }
                            )
                            .then(() => {
                              alert("Product deleted successfully.");
                              setLoading(true);
                            })
                            .catch((err) => console.error(err));
                        }
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
