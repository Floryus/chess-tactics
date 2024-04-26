import React, { useState } from "react";

interface TagsProps {
  stateTag: (tag: string) => void;
}

const Difficulties: React.FC<TagsProps> = ({ stateTag }) => {
  const tags = ["Easy", "Intermediate", "Hard"];

  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );

  const handleDifficultyClick = (tag: string) => {
    if (selectedDifficulty === tag) {
      setSelectedDifficulty(null);
      stateTag("");
    } else {
      setSelectedDifficulty(tag);
      stateTag(tag);
    }
  };

  return (
    <div className="text-sm flex flex-wrap justify-center">
      {tags.map((tag, index) => (
        <div
          key={index}
          className={`border border-gray-300 rounded-md p-1 mx-1 mb-1 cursor-pointer ${
            selectedDifficulty === tag ? "bg-gray-300 text-black" : ""
          }`}
          onClick={() => handleDifficultyClick(tag)}
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

export default Difficulties;
