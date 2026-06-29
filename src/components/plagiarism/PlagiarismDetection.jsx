import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/client";
import { API_ENDPOINTS, MAX_PLAGIARISM_WORDS } from "../../config/constants";

/**
 * Text input area and plagiarism check trigger.
 * @param {{ articles: Array<{ title: string, content: string }> }} props
 */
const PlagiarismDetection = ({ articles }) => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const navigate = useNavigate();

  /**
   * Updates input text while enforcing the maximum word limit.
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e
   */
  const handleInputChange = (e) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/);
    const count = text.trim() === "" ? 0 : words.length;

    if (count <= MAX_PLAGIARISM_WORDS) {
      setInputText(text);
      setWordCount(count);
    }
  };

  /** Sends text and articles to the plagiarism API and navigates to results. */
  const handleCheckPlagiarism = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.post(API_ENDPOINTS.PLAGIARISM.CHECK, {
        targetContent: inputText,
        articles,
      });

      navigate("/result", {
        state: {
          similarityPercentage: data.similarityPercentage,
          matchedText: data.matched_text,
          highlightedText: data.highlightedTextFromIp,
          inputText,
        },
      });
    } catch (error) {
      if (error.response?.status === 429) {
        alert("Rate limit reached. Please try again later.");
      } else {
        console.error("Error checking plagiarism:", error);
        alert("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#141414] tracking-light text-[32px] font-bold leading-tight">
            Plagiarism Detection
          </p>
          <p className="text-neutral-500 text-sm font-normal leading-normal">
            Check your content for plagiarism against fetched reference articles.
          </p>
        </div>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <textarea
            placeholder="Paste your text here to check for similarities..."
            value={inputText}
            onChange={handleInputChange}
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#141414] focus:outline-0 focus:ring-0 border border-[#dbdbdb] bg-neutral-50 focus:border-[#dbdbdb] min-h-36 placeholder:text-neutral-500 p-[15px] text-base font-normal leading-normal"
          />
          <p className="text-neutral-500 text-sm font-normal mt-2">
            {wordCount}/{MAX_PLAGIARISM_WORDS} words
          </p>
        </label>
      </div>
      <div className="flex px-4 py-3">
        <button
          type="button"
          onClick={handleCheckPlagiarism}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 flex-1 bg-black text-neutral-50 text-base font-bold leading-normal tracking-[0.015em] disabled:opacity-50"
          disabled={loading || wordCount === 0}
        >
          {loading ? "Checking..." : "Check Plagiarism"}
        </button>
      </div>
    </div>
  );
};

export default PlagiarismDetection;
