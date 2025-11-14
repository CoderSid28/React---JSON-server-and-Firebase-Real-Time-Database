// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-indigo-600 flex-1">
        <div className="max-w-7xl mx-auto py-24 px-6 sm:py-32 lg:px-8 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
            Welcome to Firebase CRUD App!
          </h1>
          <p className="mt-6 text-lg text-indigo-100 max-w-2xl">
            Manage products, user profiles, and explore the dashboard with ease.
          </p>
        </div>

        
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">Secure Authentication</h2>
          <p className="text-gray-600 mb-4">
            Users can sign up and login securely using Firebase Authentication.
          </p>
        </div>
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">Manage Products</h2>
          <p className="text-gray-600 mb-4">
            Add, edit, and delete products easily once logged in.
          </p>
        </div>
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">Profile Management</h2>
          <p className="text-gray-600 mb-4">
            Update your profile information securely after login.
          </p>
        </div>
      </div>

     
    </div>
  );
}
