import React, { useState } from "react";
import { db, auth } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState(""); // description
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addProduct = async () => {
    if (!name || !price) {
      alert("Name and price are required");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "products"), {
        name,
        price: Number(price),
        url,
        desc, // add description
        ownerId: auth.currentUser.uid,
      });

      navigate("/products");
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 mt-10 rounded shadow">
      <h2 className="text-xl font-bold mb-3">Add Product</h2>

      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <button
        onClick={addProduct}
        disabled={loading}
        className="w-full p-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </div>
  );
}
