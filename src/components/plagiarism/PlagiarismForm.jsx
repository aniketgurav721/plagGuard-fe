import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/client";
import {
  API_ENDPOINTS,
  ARTICLE_TOPICS,
  NEWS_SOURCES,
} from "../../config/constants";

/**
 * Initial search form to fetch reference articles by topic and news source.
 */
const PlagiarismForm = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sources, setSources] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuerySuggestions, setShowQuerySuggestions] = useState(false);
  const [showSourceSuggestions, setShowSourceSuggestions] = useState(false);

  /** Fetches articles from the API and navigates to the main check page. */
  const handleSearch = async () => {
    if (!searchQuery || !sources) {
      setError("Both Search Query and Sources are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const { data } = await apiClient.post(API_ENDPOINTS.ARTICLES.FETCH, {
        query: searchQuery,
        sources,
      });

      const articles = data.articles;
      if (articles.length > 0) {
        navigate("/main", { state: { articles, searchQuery } });
      } else {
        setError("No articles found for the given query and sources.");
      }
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("An error occurred while fetching articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Applies a suggestion value to a form field.
   * @param {Function} setFunction - State setter for the target field.
   * @param {string} value - Suggestion value to apply.
   */
  const handleSuggestionClick = (setFunction, value) => {
    setFunction(value);
    setShowQuerySuggestions(false);
    setShowSourceSuggestions(false);
  };

  return (
    <div className="layout-content-container flex flex-col w-full max-w-[512px] py-5 flex-1">
      <h1 className="text-[#141414] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">
        Find similar content
      </h1>
      <p className="text-[#141414] text-base font-normal leading-normal pb-3 pt-1 px-4">
        Uncover content similarities with AI-powered plagiarism detection for
        writers, educators, and media professionals.
      </p>

      {error && (
        <p className="text-red-600 px-4 pb-3 text-sm font-medium">{error}</p>
      )}

      <div className="relative max-w-[480px] px-4 py-3">
        <label className="flex flex-col">
          <p className="text-[#141414] text-base font-medium leading-normal pb-2">
            Article Topic
          </p>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowQuerySuggestions(true)}
            onBlur={() => setTimeout(() => setShowQuerySuggestions(false), 200)}
            placeholder="Enter the topic or keywords for the article"
            className="form-input flex w-full resize-none rounded-xl text-[#141414] focus:outline-0 focus:ring-0 border border-[#dbdbdb] bg-neutral-50 focus:border-[#dbdbdb] h-14 placeholder:text-neutral-500 p-[15px] text-base font-normal leading-normal"
          />
        </label>
        {showQuerySuggestions && (
          <ul className="absolute z-10 bg-neutral-50 border border-[#dbdbdb] rounded-xl w-full max-h-40 overflow-auto shadow-lg">
            {ARTICLE_TOPICS.filter((topic) =>
              topic.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((topic) => (
              <li
                key={topic}
                onClick={() => handleSuggestionClick(setSearchQuery, topic)}
                className="px-4 py-2 cursor-pointer hover:bg-neutral-100"
              >
                {topic}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative max-w-[480px] px-4 py-3">
        <label className="flex flex-col">
          <p className="text-[#141414] text-base font-medium leading-normal pb-2">
            News Source
          </p>
          <input
            value={sources}
            onChange={(e) => setSources(e.target.value)}
            onFocus={() => setShowSourceSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSourceSuggestions(false), 200)}
            placeholder="Enter the name of a news source"
            className="form-input flex w-full resize-none rounded-xl text-[#141414] focus:outline-0 focus:ring-0 border border-[#dbdbdb] bg-neutral-50 focus:border-[#dbdbdb] h-14 placeholder:text-neutral-500 p-[15px] text-base font-normal leading-normal"
          />
        </label>
        {showSourceSuggestions && (
          <ul className="absolute z-10 bg-neutral-50 border border-[#dbdbdb] rounded-xl w-full max-h-40 overflow-auto shadow-lg">
            {NEWS_SOURCES.filter((source) =>
              source.toLowerCase().includes(sources.toLowerCase())
            ).map((source) => (
              <li
                key={source}
                onClick={() => handleSuggestionClick(setSources, source)}
                className="px-4 py-2 cursor-pointer hover:bg-neutral-100"
              >
                {source}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-stretch px-4 py-3">
        <button
          type="button"
          className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-full h-10 px-4 bg-[#ededed] text-[#141414] text-sm font-bold"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSearch}
          className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-full h-10 px-4 bg-black text-neutral-50 text-sm font-bold ml-3"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
};

export default PlagiarismForm;
