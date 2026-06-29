import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/client";
import { API_ENDPOINTS } from "../../config/constants";

/**
 * AI paraphrasing tool for rewriting flagged content. Requires authentication.
 * @param {{ inputText: string, isLoggedIn: boolean }} props
 */
const ParaphrasingTool = ({ inputText, isLoggedIn }) => {
  const [paraphrasedText, setParaphrasedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  const navigate = useNavigate();

  /** Sends input text to the paraphrase API using the stored JWT. */
  const handleParaphrase = async () => {
    if (!isLoggedIn) {
      setShowSignInPrompt(true);
      return;
    }

    if (!inputText) {
      setError("No text available to paraphrase.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const { data } = await apiClient.post(
        API_ENDPOINTS.PARAPHRASE.REWRITE,
        { inputText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setParaphrasedText(data.paraphrasedText);
    } catch (err) {
      console.error("Error paraphrasing text:", err);
      setError("An error occurred while paraphrasing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /** Copies paraphrased text to the clipboard. */
  const handleCopy = () => {
    if (paraphrasedText) {
      navigator.clipboard
        .writeText(paraphrasedText)
        .then(() => setCopySuccess(true))
        .catch(() => setCopySuccess(false));
    }
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <h2 className="text-[#141414] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        AI Paraphrasing Tool
      </h2>

      <div className="rounded bg-[#f5f5f5] p-4 border border-[#dbdbdb] mx-4">
        <h3 className="text-[#141414] text-base font-bold pb-2">Your Input Text</h3>
        <p className="text-neutral-500 text-sm font-normal leading-normal">{inputText}</p>
      </div>

      {error && (
        <p className="text-red-600 text-sm font-medium px-4">{error}</p>
      )}

      {!paraphrasedText && !showSignInPrompt && (
        <button
          type="button"
          onClick={handleParaphrase}
          className="w-40 h-10 mx-4 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Rewriting..." : "Rewrite"}
        </button>
      )}

      {showSignInPrompt && (
        <div className="text-center p-4 bg-yellow-100 border border-yellow-400 rounded-lg mx-4">
          <p className="text-red-500">You must be signed in to use this tool.</p>
          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="mt-2 bg-black text-white py-2 px-4 rounded-full hover:bg-gray-800"
          >
            Sign In
          </button>
        </div>
      )}

      {paraphrasedText && (
        <div className="rounded bg-[#dbdbdb] p-4 border border-[#c4c4c4] mx-4">
          <h3 className="text-[#141414] text-base font-bold pb-2">Paraphrased Text</h3>
          <p className="text-neutral-500 text-sm font-normal leading-normal">
            {paraphrasedText}
          </p>
          <button
            type="button"
            onClick={handleCopy}
            className="w-36 h-10 mt-3 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800"
          >
            {copySuccess ? "Copied!" : "Copy Text"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ParaphrasingTool;
