import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState(""); // description
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        if (data.ownerId !== auth.currentUser.uid) {
          alert("You are not allowed to edit this product");
          navigate("/products");
          return;
        }

        setName(data.name);
        setPrice(data.price);
        setUrl(data.url || "");
        setDesc(data.desc || "");
      } else {
        alert("Product not found");
        navigate("/products");
      }
    };

    fetchProduct();
  }, [id]);

  const updateProduct = async () => {
    if (!name || !price) {
      alert("Name and price are required");
      return;
    }

    setLoading(true);

    try {
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, {
        name,
        price: Number(price),
        url,
        desc, // update description
      });

      navigate("/products");
    } catch (err) {
      console.error(err);
      alert("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 mt-10 rounded shadow">
      <h2 className="text-xl font-bold mb-3">Edit Product</h2>

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
        onClick={updateProduct}
        disabled={loading}
        className="w-full p-2 bg-green-600 text-white rounded disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Product"}
      </button>
    </div>
  );
}
