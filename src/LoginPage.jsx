// src/LoginPage.jsx
import React, { useState } from "react";
import {useAuth} from "./Authcontext/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    // Optional: handle email login logic here
    alert("Email login is not implemented in this example.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to TaskFlow</h2>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">or</p>
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center gap-3 px-6 py-3 border border-gray-300 rounded-md shadow-sm hover:shadow-md bg-white text-gray-700 font-medium mt-6 ms-18"
            >
             <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                className="w-5 h-5 "
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;