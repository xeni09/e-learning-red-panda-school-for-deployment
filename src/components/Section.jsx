import React from "react";

const Section = ({
  color,
  title,
  image,
  imagePosition,
  imageSize,
  text,
  text2,
}) => {
  const imageClass = imagePosition === "left" ? "order-first" : "order-last";
  const textColorClass = color === "#fff" ? "text-black" : "text-white";

  return (
    <div className={`py-12 px-6`} style={{ backgroundColor: color }}>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-6xl mx-auto">
        {imagePosition === "left" && (
          <img
            src={image}
            alt="section"
            className={`rounded-full ${imageClass}`}
            style={{ width: imageSize, height: imageSize }}
          />
        )}
        <div className="flex-1 text-center md:text-left">
          <h1 className={`text-3xl font-bold tracking-tight ${textColorClass}`}>
            {title}
          </h1>
          <h2 className={`text-2xl ${textColorClass}`}>
            {text}
          </h2>
          <p className={`max-w-lg ${textColorClass}`}>
            {text2}
          </p>
        </div>
        {imagePosition === "right" && (
          <img
            src={image}
            alt="section"
            className={`rounded-full ${imageClass}`}
            style={{ width: imageSize, height: imageSize }}
          />
        )}
      </div>
    </div>
  );
};

export default Section;