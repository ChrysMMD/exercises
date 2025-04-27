"use client";
import Link from "next/link";
import { useCart } from "@/app/store/cart";

type KøbKnapProps = {
  product: {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
  };
};

export default function KøbKnap({ product }: KøbKnapProps) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() =>
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
          thumbnail: product.thumbnail,
        })
      }
      className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer"
    >
      Tilføj til kurv
    </button>
  );
}
