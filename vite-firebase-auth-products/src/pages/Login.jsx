import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) navigate("/");
    });
    return () => unsubscribe();
  }, []);

  const login = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate("/"); // Redirect after login
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setErr("");
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 mt-10 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {err && <p className="text-red-500 mb-2">{err}</p>}

      <form onSubmit={login} className="space-y-3">
        <input
          className="w-full p-2 border rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <button
        onClick={googleLogin}
        disabled={loading}
        className="w-full bg-red-600 text-white p-2 rounded mt-3 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Login with Google"}
      </button>
    </div>
  );
}
