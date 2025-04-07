"use client";

import { useState } from "react";
import Image from "next/image";

export default function Galleri() {
  const [mainImage, setMainImage] = useState("/navy.png");
  const [activeColor, setActiveColor] = useState("#404354");

  const smallImages = [
    { id: 1, src: "/mint.png", alt: "Mint" },
    { id: 2, src: "/navy.png", alt: "Navy" },
    { id: 3, src: "/ocean.png", alt: "Ocean" },
  ];

  const colors = ["#58D7C4", "#404354", "#F2CEC6"];

  //Funktion til at ændre det store billede
  const changeImage = (newImage, color) => {
    setMainImage(newImage);
    setActiveColor(color);
  };

  return (
    <div className="grid grid-cols-[2fr_auto] grid-rows-[2fr_1fr] gap-2">
      {/*STORE BILLED*/}
      <div className="col-start-1 col-end-2 row-start-1 row-end-2">
        <img src={mainImage} alt="Main image" className="max-w-full h-auto" />
      </div>
      {/* Miniaturebilleder */}
      <div className="flex justify-center items-end space-x-4 row-start-2 col-start-1">
        {smallImages.map((image, index) => (
          <div
            key={index}
            onClick={() => changeImage(image.src, colors[index])}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={96}
              height={96}
              className="cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* Farve cirkler */}
      <div className="inline-flex flex-col items-center justify-center space-y-4 ">
        {colors.map((color, index) => (
          <div
            key={index}
            onClick={() => changeImage(smallImages[index].src, color)}
            className={`w-4 h-4 rounded-full ${
              activeColor === color ? "border-2 border-white" : ""
            }`}
            style={{
              backgroundColor: color,
              cursor: "pointer",
              padding: activeColor === color ? "10px" : "0",
              boxSizing: "border-box",
              boxShadow:
                activeColor === color
                  ? "0px 3px 4px 0px rgba(0, 0, 0, 0.20)"
                  : "none",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
