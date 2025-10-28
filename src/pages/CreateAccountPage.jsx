import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import reactLogo from "../assets/react.svg"; // temporary logo

function CreateAccountPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: fullName });
      console.log("Account created:", userCredential.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const handleFacebookSignUp = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-black flex flex-col items-center justify-center p-4 text-white">
      <div className="flex items-center space-x-3 mb-8">
        <img src={reactLogo} alt="FitFlow logo" className="w-10 h-10" />
        <h1 className="text-3xl font-bold">FitFlow</h1>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Create Account</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs space-y-5 bg-black/50 p-6 rounded-2xl shadow-lg"
      >
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className="w-full px-4 py-3 bg-gray-900 text-white border border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="fittxyz@gmail.com"
          className="w-full px-4 py-3 bg-gray-900 text-white border border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+254 712 345 678"
          className="w-full px-4 py-3 bg-gray-900 text-white border border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-3 bg-gray-900 text-white border border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="w-full px-4 py-3 bg-gray-900 text-white border border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition duration-200"
        >
          Sign Up
        </button>
      </form>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleFacebookSignUp}
          className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition duration-200"
        >
          <span className="text-blue-500 text-lg font-bold">f</span>
        </button>
        <button
          onClick={handleGoogleSignUp}
          className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition duration-200"
        >
          <span className="text-red-500 text-lg font-bold">G</span>
        </button>
      </div>

      <p className="text-sm text-gray-300 mt-6">
        Already have an account?{" "}
        <a href="/login" className="text-purple-400 hover:underline">
          Sign In
        </a>
      </p>
    </div>
  );
}

export default CreateAccountPage;
