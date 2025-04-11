"use client";

import { useFavoritesStore } from "../store/favorites";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Pet } from "../types/types";

export default function Favorites() {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();
  const [loading, setLoading] = useState(true); // Loader-tilstand for at vente med at vise UI

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);
        // Log for at sikre, at favoritterne er som forventet
        console.log("Parsed favorites:", parsedFavorites);

        // Tilføj de lagrede favoritter til Zustand store
        parsedFavorites.forEach((pet: Pet) => {
          console.log("Adding pet:", pet);
          addFavorite(pet);
        });
      }
      setLoading(false); // Når data er hentet, sæt loading til false
    }
  }, [addFavorite]);

  if (loading) {
    return <div>Loading...</div>; // Vent med at vise indholdet, indtil dataene er hentet
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Favoritter</h1>
      {favorites.length === 0 ? (
        <p>Du har ingen favoritter endnu.</p>
      ) : (
        <ul>
          {favorites.map((pet: Pet) => {
            // Log for at kontrollere pet.id
            console.log("Rendering pet:", pet);
            if (!pet.id) {
              console.error("Pet has no id:", pet);
              return null; // Spring over pets uden id
            }

            return (
              <li
                key={pet.id} // Sørg for at pet.id er unik
                className="border-b p-2 flex items-center space-x-4"
              >
                <img
                  src={
                    pet.primary_photo_cropped?.small || "/default-pet-image.jpg"
                  }
                  alt={pet.name}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <div>
                  <h3 className="font-semibold">
                    <Link href={`/pet/${pet.id}`}>{pet.name} </Link>
                  </h3>
                  <p>{pet.breeds?.primary}</p>
                  <button
                    className="hover:cursor-pointer"
                    onClick={() => removeFavorite(pet.id)}
                  >
                    Fjern favorit
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
