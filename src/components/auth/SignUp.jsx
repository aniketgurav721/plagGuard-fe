import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/client";
import { API_ENDPOINTS } from "../../config/constants";

/**
 * User registration form.
 */
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /**
   * Validates passwords and creates a new user account.
   * @param {React.FormEvent} e
   */
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await apiClient.post(API_ENDPOINTS.AUTH.SIGNUP, { email, password });
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to sign up. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-md mx-auto">
      <form
        className="bg-white p-8 shadow-lg rounded-lg w-full"
        onSubmit={handleSignUp}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <input
          type="email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Set Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Confirm Your Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Sign Up
        </button>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
