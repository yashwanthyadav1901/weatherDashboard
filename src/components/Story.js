import React from "react";

const Story = ({ imageSrc, altText }) => {
  return (
    <div className="story">
      <img src={imageSrc} alt={altText} className="story-image" />
    </div>
  );
};

export default Story;
