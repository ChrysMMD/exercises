"use client";

import { useEffect } from "react";
import { useCart } from "@/app/store/cart"; // Ret path til din cart-store

export default function CartSyncWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = useCart((state) => state.items);
  const setCart = useCart((state) => state.setCart);

  // 🚀 Load cart from localStorage once on load
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch (e) {
        console.error("Fejl ved parsing af kurv:", e);
      }
    }
  }, [setCart]);

  // 💾 Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  return <>{children}</>;
}
