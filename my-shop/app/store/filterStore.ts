import { create } from "zustand";

interface Category {
  slug: string;
  name: string;
}

interface FilterStore {
  category: string; // den valgte kategori
  setCategory: (category: string) => void;

  maxPrice: number;
  setMaxPrice: (price: number) => void;

  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  category: "",
  setCategory: (category) => set({ category }),

  maxPrice: 1000,
  setMaxPrice: (price) => set({ maxPrice: price }),

  categories: [], // starter tom
  setCategories: (categories) => set({ categories }),
}));
