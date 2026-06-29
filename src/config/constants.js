/** API route paths used by the frontend. */
export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: "/api/auth/signin",
    SIGNUP: "/api/auth/signup",
  },
  ARTICLES: {
    FETCH: "/api/articles/fetch-articles",
  },
  PLAGIARISM: {
    CHECK: "/api/plagiarism/check-plagiarism-all",
  },
  PARAPHRASE: {
    REWRITE: "/api/paraphrase/paraphrase-text",
  },
};

/** Suggested article topics for the search form. */
export const ARTICLE_TOPICS = [
  "Climate Change",
  "Agriculture",
  "AI Development",
  "Economic Growth",
  "Space Exploration",
];

/** Supported NewsAPI source identifiers. */
export const NEWS_SOURCES = [
  "the-times-of-india",
  "bbc-news",
  "cnn",
  "al-jazeera-english",
  "reuters",
];

/** Maximum word count allowed in plagiarism input. */
export const MAX_PLAGIARISM_WORDS = 1000;

/** Similarity threshold above which paraphrasing is offered. */
export const PARAPHRASE_THRESHOLD = 50;
