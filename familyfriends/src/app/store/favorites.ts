import { create } from "zustand";
import { Pet } from "../types/types";

// Funktion til at hente favoritter fra localStorage
const loadFavoritesFromLocalStorage = (): Pet[] => {
  if (typeof window !== "undefined") {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
  }
  return [];
};

// Funktion til at gemme favoritter i localStorage
const saveFavoritesToLocalStorage = (favorites: Pet[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

interface FavoritesStore {
  favorites: Pet[];
  addFavorite: (pet: Pet) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  loadFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: loadFavoritesFromLocalStorage(), // Initialiser favoritter fra localStorage
  addFavorite: (pet: Pet) => {
    set((state) => {
      const updatedFavorites = [...state.favorites];
      // Kontroller for duplikater, så vi ikke tilføjer samme pet flere gange
      if (!updatedFavorites.some((favorite) => favorite.id === pet.id)) {
        updatedFavorites.push(pet);
        saveFavoritesToLocalStorage(updatedFavorites); // Gemmer favoritter i localStorage
      }
      return { favorites: updatedFavorites };
    });
  },
  removeFavorite: (id: string) => {
    set((state) => {
      const updatedFavorites = state.favorites.filter((pet) => pet.id !== id);
      saveFavoritesToLocalStorage(updatedFavorites); // Gemmer favoritter i localStorage
      return { favorites: updatedFavorites };
    });
  },
  isFavorite: (id: string) => {
    const state = get(); // Hent den aktuelle tilstand fra Zustand
    return state.favorites.some((pet) => pet.id === id); // Returner en boolean
  },
  loadFavorites: () => {
    set({ favorites: loadFavoritesFromLocalStorage() }); // Loader favoritter ved opstart
  },
}));
