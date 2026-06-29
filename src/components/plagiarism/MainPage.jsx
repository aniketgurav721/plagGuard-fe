import React from "react";
import { useLocation } from "react-router-dom";
import PlagiarismDetection from "./PlagiarismDetection";
import Articles from "./Articles";

/**
 * Main plagiarism check page displaying fetched articles and the text input form.
 */
const MainPage = () => {
  const location = useLocation();
  const articles = location.state?.articles || [];

  return (
    <div className="flex flex-col w-full max-w-[960px] flex-1">
      <PlagiarismDetection articles={articles} />
      <Articles articles={articles} />
    </div>
  );
};

export default MainPage;
