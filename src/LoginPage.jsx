import React, { useState } from "react";
import { useAuth } from "./Authcontext/AuthContext";
import { auth, provider } from "./firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import SignUpPage from "./SignUpPage";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const { signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
     try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError("Email or password is incorrect.");
    }
    // alert("Email login is not implemented in this example.");
  };

  if (showSignUp) {
    return <SignUpPage onSwitchToLogin={() => setShowSignUp(false)} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to TaskFlow</h2>

        {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

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

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <button onClick={() => setShowSignUp(true)} className="text-blue-600 hover:underline">
            Sign Up
          </button>
        </p>

        <div className="mt-6 text-center">
          <p className="text-gray-600">or</p>
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center gap-3 px-6 py-3 border border-gray-300 rounded-md shadow-sm hover:shadow-md bg-white text-gray-700 font-medium mt-6 ms-18"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google logo"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
