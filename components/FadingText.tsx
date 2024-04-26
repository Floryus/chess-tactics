import React, { useEffect, useState } from "react";

const FadingText: React.FC<{ text: string; tries: number }> = ({
  text,
  tries,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [tries]);

  return (
    <div
      className={`transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {text}
    </div>
  );
};

export default FadingText;
