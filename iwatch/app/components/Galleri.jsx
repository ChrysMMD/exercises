"use client";

import { useState } from "react";
import Image from "next/image";

export default function Galleri() {
  const [mainImage, setMainImage] = useState("/navy.png");

  const smallImages = [
    { id: 1, src: "/mint.png", alt: "Mint" },
    { id: 2, src: "/navy.png", alt: "Navy" },
    { id: 3, src: "/ocean.png", alt: "Ocean" },
  ];

  const colors = ["#58D7C4", "#404354", "#F2CEC6"];

  //Funktion til at ændre det store billede
  const changeImage = (newImage) => {
    setMainImage(newImage);
  };

  return (
    <div className="grid grid-cols-[2fr_auto] grid-rows-[2fr_1fr_1fr] gap-2">
      {/*STORE BILLED*/}
      <div className="col-start-1 col-end-2 rows-span-2">
        <img src={mainImage} alt="Main image" className="max-w-full h-auto" />
      </div>
      {/* Miniaturebilleder */}
      <div className="flex justify-center items-end space-x-4 row-start-2 col-start-1">
        {smallImages.map((image, index) => (
          <div key={index} onClick={() => changeImage(image.src)}>
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
      <div className="inline-flex flex-col items-center justify-center space-y-4">
        {colors.map((color, index) => (
          <div
            key={index}
            onClick={() => changeImage(smallImages[index].src)}
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color, cursor: "pointer" }}
          ></div>
        ))}
      </div>
    </div>
  );
}
