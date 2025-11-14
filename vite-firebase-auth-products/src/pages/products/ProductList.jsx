import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const load = async () => {
    const snap = await getDocs(collection(db, "products"));
    setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const del = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    await deleteDoc(doc(db, "products", id));
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Products</h2>
        <Link to="/products/add" className="bg-green-600 text-white px-3 py-1 rounded">
          Add
        </Link>
      </div>

      {products.map(p => (
        <div
          key={p.id}
          className="border p-4 rounded mb-3 flex justify-between items-start"
        >
          <div>
            <p className="font-semibold">{p.name}</p>
            <p className="text-sm text-gray-600">₹ {p.price}</p>
            {p.desc && <p className="text-gray-500 text-sm">{p.desc}</p>}
          </div>

          {auth.currentUser?.uid === p.ownerId && (
            <div className="flex flex-col gap-2">
              <Link
                to={`/products/edit/${p.id}`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => del(p.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
