import React from "react";
import { useLocation } from "react-router-dom";
import HighlightedMatch from "./HighlightedMatch";
import Plagresult from "./Plagresult";
import ParaphrasingTool from "./ParaphrasingTool";
import { PARAPHRASE_THRESHOLD } from "../../config/constants";

/**
 * Displays plagiarism check results and optional paraphrasing tool.
 * @param {{ isLoggedIn: boolean }} props
 */
const Result = ({ isLoggedIn }) => {
  const location = useLocation();
  const {
    similarityPercentage = 0,
    matchedText,
    highlightedText,
    inputText,
  } = location.state || {};

  return (
    <div className="flex flex-col w-full max-w-[960px] flex-1 gap-6">
      <Plagresult similarityPercentage={similarityPercentage} />

      {similarityPercentage > 0 && (
        <HighlightedMatch
          highlightedText={highlightedText}
          matchedText={matchedText}
        />
      )}

      {similarityPercentage > PARAPHRASE_THRESHOLD && (
        <ParaphrasingTool inputText={inputText} isLoggedIn={isLoggedIn} />
      )}
    </div>
  );
};

export default Result;
