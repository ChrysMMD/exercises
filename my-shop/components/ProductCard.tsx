"use client";
import Link from "next/link";
import { useCart } from "@/app/store/cart";
import KøbKnap from "./KøbKnap";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="border p-4 rounded transition hover:scale-105">
      {/* Link kun om det visuelle */}
      <Link href={`/products/${product.id}`}>
        <div className="cursor-pointer">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-40 object-cover mb-2 rounded"
          />
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-600">${product.price}</p>
        </div>
      </Link>

      {/* Knap indenfor samme border */}
      <KøbKnap product={product} />
    </div>
  );
}
