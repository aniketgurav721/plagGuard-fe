import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiClient from "../../api/client";
import { API_ENDPOINTS } from "../../config/constants";

/**
 * User sign-in form with JWT-based authentication.
 */
const SignIn = () => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /**
   * Submits credentials to the auth API and stores the session on success.
   * @param {React.FormEvent} e
   */
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await apiClient.post(API_ENDPOINTS.AUTH.SIGNIN, {
        email,
        password,
      });

      signIn({ email: data.email || email, token: data.token });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-md mx-auto">
      <form className="bg-white p-8 shadow-lg rounded-lg w-full" onSubmit={handleSignIn}>
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Sign In
        </button>
      </form>
      <p className="mt-4 text-sm">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="text-blue-500 hover:underline"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default SignIn;
