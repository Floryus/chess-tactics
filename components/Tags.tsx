import React, { useState } from "react";

interface TagsProps {
  stateTag: (tag: string) => void;
}

const Tags: React.FC<TagsProps> = ({ stateTag }) => {
  const tags = [
    "Opening",
    "Endgame",
    "Checkmate",
    "Forks",
    "Zugzwang",
    "Attacks",
    "Double",
    "Underpromotion",
    "Stalemate",
    "Pawn Promotion",
  ];

  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
      stateTag("");
    } else {
      setSelectedTag(tag);
      stateTag(tag);
    }
  };

  return (
    <div className="text-sm flex flex-wrap justify-center">
      {tags.map((tag, index) => (
        <div
          key={index}
          className={`border border-gray-300 rounded-md p-1 mx-1 mb-1 cursor-pointer ${
            selectedTag === tag ? "bg-gray-300 text-black" : ""
          }`}
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

export default Tags;
