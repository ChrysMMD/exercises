import Link from "next/link";
import { useState, useEffect } from "react";
import StarButton from "./StarButton";

//Definere pet-objektet med hvad det skal indeholde
type PetCardProps = {
  pet: {
    id: string;
    name: string;
    age: string;
    breeds: {
      primary: string;
    };
    primary_photo_cropped?: {
      small: string;
    };
  };
};

//komponent som modtager pet-objektet som prop
export default function PetCard({ pet }: PetCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Tjek om dyret er gemt i localStorage ved første render
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    const found = storedFavorites.find((fav: any) => fav.id === pet.id);
    if (found) setIsFavorite(true);
  }, [pet.id]);

  const toggleFavorite = () => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    let updatedFavorites;
    if (isFavorite) {
      // Fjern fra favorites
      updatedFavorites = storedFavorites.filter(
        (fav: any) => fav.id !== pet.id
      );
    } else {
      // Tilføj til favorites
      updatedFavorites = [...storedFavorites, pet];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <Link
        href={`/pet/${pet.id}`}
        className="flex flex-col pb-4 rounded-2xl max-w-xs w-full sm:w-1/2 lg:w-1/3 bg-white shadow-[0_4px_16px_rgba(19,21,68,0.06)] hover:shadow-md transition"
      >
        <div className="relative">
          <StarButton />

          <img
            src={pet.primary_photo_cropped?.small || "/default.jpg"}
            alt={pet.name}
            className="w-full h-48 object-cover rounded-md"
          />
        </div>
        <div className="flex flex-row justify-between p-4">
          <div>
            <h3 className="text-xl font-semibold mt-2">{pet.name}</h3>
            <p className="text-[var(--color-grey)]">{pet.breeds.primary}</p>
          </div>
          <div>
            <p className="text-[var(--color-grey)]">{pet.age}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
