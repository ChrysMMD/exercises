import { create } from "zustand";
import { useRouter } from "next/router";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity?: number;
};

type CartState = {
  items: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  goToPayment: () => void;
  setCart: (items: Product[]) => void;
};

export const useCart = create<CartState>((set) => ({
  items: [],
  setCart: (items) => set({ items }),
  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          ),
        };
      }
      return { items: [...state.items, { ...product, quantity: 1 }] };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  goToPayment: () => {
    // Bruger Next.js useRouter til at navigere til checkout-siden
    const router = useRouter();
    router.push("/payment"); // Naviger til checkout-siden
  },
}));
