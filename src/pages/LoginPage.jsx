// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/react.svg"; // temporary logo
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider
} from "firebase/auth";
import { auth } from "../firebaseConfig"; // make sure this file exports `auth`

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  // Email/password sign-in
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }
    setBusy(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log("Email sign-in success:", userCred.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Email sign-in error:", err);
      alert(err.message || "Sign in failed.");
    } finally {
      setBusy(false);
    }
  };

  // Google popup
  const handleGoogleLogin = async () => {
    setBusy(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Google sign-in success:", result.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Google sign-in error:", err);
      alert(err.message || "Google sign-in failed.");
    } finally {
      setBusy(false);
    }
  };

  // Facebook popup
  const handleFacebookLogin = async () => {
    setBusy(true);
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Facebook sign-in success:", result.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Facebook sign-in error:", err);
      alert(err.message || "Facebook sign-in failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4 text-white">
      <div className="absolute top-6 left-6 flex items-center space-x-2">
        <img src={logo} alt="FitFlow Logo" className="w-10 h-10" />
        <span className="text-2xl font-bold text-purple-400">FitFlow</span>
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg p-8 w-full max-w-md border border-purple-800/30">
        <h1 className="text-3xl font-bold mb-4 text-center text-purple-300">Welcome</h1>
        <h2 className="text-lg font-medium mb-6 text-center text-gray-300">Log in to Continue</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-purple-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={busy}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-purple-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={busy}
          />
          <button
            type="submit"
            disabled={busy}
            className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 ${
              busy ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {busy ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <a href="#" className="text-sm text-purple-400 hover:underline mt-3 block text-center">Forgot Password?</a>

        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={handleFacebookLogin}
            disabled={busy}
            className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
          >
            f
          </button>

          <button
            onClick={handleGoogleLogin}
            disabled={busy}
            className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition"
          >
            G
          </button>

          <button disabled className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center opacity-50 cursor-not-allowed">
            
          </button>
        </div>

        <p className="text-sm text-gray-300 mt-6 text-center">
          Don’t have an account?{" "}
          <button onClick={() => navigate("/create-account")} className="text-purple-400 hover:underline font-medium">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
