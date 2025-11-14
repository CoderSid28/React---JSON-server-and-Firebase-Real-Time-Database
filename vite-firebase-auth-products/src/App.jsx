import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddProduct from "./pages/products/AddProduct";
import ProductList from "./pages/products/ProductList";
import EditProduct from "./pages/products/EditProduct";
import Profile from "./pages/Profile";
import Home from "./pages/Home"; // <- Import Home

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsub();
  }, []);

  return (
    <div className="p-4">
      <nav className="flex justify-between bg-white p-4 shadow rounded">
        <h1 className="font-bold text-xl">Firebase CRUD + Auth</h1>

        <div className="space-x-4">
          {!user && (
            <>
              <Link to="/login" className="text-blue-600">Login</Link>
              <Link to="/signup" className="text-blue-600">Signup</Link>
            </>
          )}

          {user && (
            <>
              <Link to="/products" className="text-blue-600">Products</Link>
              <Link to="/profile" className="text-blue-600">Profile</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {user ? (
          <>
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </div>
  );
}
