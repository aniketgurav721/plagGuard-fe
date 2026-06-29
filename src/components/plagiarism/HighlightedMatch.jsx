import React from "react";

/**
 * Renders highlighted matched sections from the plagiarism report.
 * @param {{ highlightedText: string, matchedText: string }} props
 */
const HighlightedMatch = ({ highlightedText, matchedText }) => {
  /**
   * Wraps the matched substring in highlight markup.
   * @param {string} text - Full highlighted text.
   * @param {string} match - Matched substring to emphasize.
   * @returns {React.ReactNode}
   */
  const highlightMatchedText = (text, match) => {
    if (!text || !match) return text;

    const index = text.indexOf(match);
    if (index === -1) return text;

    const beforeMatch = text.slice(0, index);
    const matched = text.slice(index, index + match.length);
    const afterMatch = text.slice(index + match.length);

    return (
      <>
        {beforeMatch}
        <mark className="bg-red-300">{matched}</mark>
        {afterMatch}
      </>
    );
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-[#141414] text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Plagiarism Report
        </p>
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div className="rounded bg-[#dbdbdb] p-4">
          <p className="text-neutral-500 text-lg font-normal leading-normal">
            {highlightMatchedText(highlightedText, matchedText)}
          </p>
          {matchedText && (
            <div className="mt-4">
              <h3 className="font-bold text-[#141414]">Matched Text</h3>
              <p className="text-neutral-500 text-sm font-normal leading-normal">
                {matchedText}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HighlightedMatch;
