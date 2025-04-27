"use client";

import { useCart } from "../store/cart";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, removeFromCart, goToPayment } = useCart();

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Din kurv 🛒</h1>
      {items.length === 0 ? (
        <p>Kurven er tom 😢</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="border p-4 flex justify-between items-center"
              >
                <div>
                  <Link
                    href={`/products/${item.id}`}
                    className="hover:underline"
                  >
                    <h2 className="font-semibold">{item.title}</h2>
                    <p>Antal: {item.quantity}</p>
                    <p>Pris: ${item.price}</p>
                  </Link>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 cursor-pointer"
                >
                  Fjern
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={goToPayment}
            className="mt-6 px-4 py-2 bg-green-500 cursor-pointer text-white rounded"
          >
            Til betaling
          </button>
        </>
      )}

      <Link href="/products" className="block mt-6 text-blue-500 underline">
        ← Tilbage til produkterne
      </Link>
    </main>
  );
}
