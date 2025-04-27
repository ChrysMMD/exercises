"use client";

import Link from "next/link";
import { useCart } from "@/app/store/cart";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Nav() {
  const { items } = useCart();
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  // Beregn den samlede pris af alle varer i kurven
  const totalPrice = items
    .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    .toFixed(2); // Formatér til 2 decimaler

  // Udregn samlet antal produkter i kurven
  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-200 text-blue-950 relative">
      <div className="flex gap-6 items-center">
        <Link href="/" className="font-bold text-lg hover:underline">
          Hjem
        </Link>
        <Link href="/products" className="hover:underline">
          Produkter
        </Link>
      </div>

      <div className="relative group">
        {/* Kurveknap */}
        <div className="cursor-pointer">Kurv ({totalItems})</div>

        {/* Dropdown-menu */}
        <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded shadow-lg z-10 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">Kurven er tom</p>
          ) : (
            <>
              <ul className="space-y-2 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-2 border-b pb-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                    onClick={() => router.push(`/products/${item.id}`)}
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-gray-600">
                        {item.quantity} x ${item.price}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-bold text-gray-800">
                I alt: ${totalPrice}
              </p>
              <Link href="/checkout">
                <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                  Checkout
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
