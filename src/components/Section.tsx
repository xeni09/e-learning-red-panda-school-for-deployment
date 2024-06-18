import React from "react";
import "./Section.css";
import { SectionProps } from "./types";

const Section: React.FC<SectionProps> = ({
  color,
  title,
  image,
  imagePosition,
  imageSize,
  text,
}) => {
  const imageClass =
    imagePosition === "left" ? "section-image-left" : "section-image-right";
  const textColor = color === "#fff" ? "black" : "white";

  return (
    <div className="section" style={{ backgroundColor: color }}>
      <div className="section-content">
        {imagePosition === "left" && (
          <img
            src={image}
            alt="section"
            className={`section-image ${imageClass}`}
            style={{ width: imageSize, height: imageSize }}
          />
        )}
        <div className="section-text-content">
          <h2 className="section-title" style={{ color: textColor }}>
            {title}
          </h2>
          <p className="section-text" style={{ color: textColor }}>
            {text}
          </p>
        </div>
        {imagePosition === "right" && (
          <img
            src={image}
            alt="section"
            className={`section-image ${imageClass}`}
            style={{ width: imageSize, height: imageSize }}
          />
        )}
      </div>
    </div>
  );
};

export default Section;
