import { useFavoritesStore } from "../store/favorites";
import StarIcon from "./icons/StarIcon";
import { Pet } from "../types/types";

type Props = {
  pet: Pet;
  className?: string;
};

export const StarButton = ({ pet, className }: Props) => {
  const isFavorite = useFavoritesStore((state) => state.isFavorite(pet.id)); // Tjekker om pet er en favorit
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stopper eventen fra at nå Linket
    e.preventDefault();

    if (isFavorite) {
      removeFavorite(pet.id);
    } else {
      addFavorite(pet);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`${className} cursor-pointer hover:scale-120`}
      aria-label="Toggle favorite"
    >
      <StarIcon isFilled={isFavorite} />
    </button>
  );
};
