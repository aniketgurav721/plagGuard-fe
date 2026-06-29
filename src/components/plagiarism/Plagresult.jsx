import React from "react";

/**
 * Displays the overall plagiarism similarity score and progress bar.
 * @param {{ similarityPercentage: number }} props
 */
const Plagresult = ({ similarityPercentage = 0 }) => {
  const similarityLevel =
    similarityPercentage > 50 ? "High Similarity" : "Low Similarity";
  const bgColor = similarityPercentage > 50 ? "bg-red-500" : "bg-green-500";

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-[#141414] text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Your Plagiarism Results
        </p>
      </div>

      {similarityPercentage === 0 ? (
        <h2 className="text-[#141414] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Congratulations! No Plagiarism Found.
        </h2>
      ) : (
        <>
          <h2 className="text-[#141414] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Similarity: {similarityPercentage}%
          </h2>
          <div className="flex flex-col gap-3 p-4">
            <p className="text-[#141414] text-base font-medium leading-normal">
              {similarityLevel}
            </p>
            <div className="rounded bg-[#dbdbdb]">
              <div
                className={`h-2 rounded ${bgColor}`}
                style={{ width: `${Math.min(similarityPercentage, 100)}%` }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Plagresult;
