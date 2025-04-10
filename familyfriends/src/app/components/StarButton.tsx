"use client";

import { useState } from "react";
import StarIcon from "./icons/StarIcon";

export default function StarButton() {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setIsFavorited(!isFavorited);
  };

  return (
    <button
      onClick={toggleFavorite}
      className="absolute top-2 right-2 z-10 p-1 rounded-full hover:bg-white/50 transition"
      aria-label="Gem som favorit"
    >
      <StarIcon isFilled={isFavorited} />
    </button>
  );
}
