import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login"); // redirect if not logged in
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (!user) return null; // prevent flashing empty page

  return (
    <div className="max-w-md mx-auto bg-white p-6 mt-10 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      <p className="mb-2">
        <span className="font-semibold">Email:</span> {user.email}
      </p>

      <p className="mb-2">
        <span className="font-semibold">UID:</span> {user.uid}
      </p>

      <button
        onClick={logout}
        className="w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
}
