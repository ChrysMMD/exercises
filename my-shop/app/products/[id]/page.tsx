"use client";

import { useState, useEffect } from "react"; // Brug React's hooks i stedet for 'use' fra React
import { useCart } from "../../store/cart";
import KøbKnap from "@/components/KøbKnap";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
};

async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Produktet blev ikke fundet.");
  return res.json();
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null); // For at gemme produktdata
  const [loading, setLoading] = useState(true); // Loader state
  const [error, setError] = useState<string | null>(null); // Fejlmeddelelse

  useEffect(() => {
    const getProduct = async () => {
      try {
        const fetchedProduct = await fetchProduct(params.id);
        setProduct(fetchedProduct); // Sæt produktdata i state
      } catch (err: any) {
        setError(err.message); // Hvis der opstår fejl, sættes fejlmeddelelsen
      } finally {
        setLoading(false); // Når vi er færdige med at hente data
      }
    };

    getProduct(); // Hent produktdata
  }, [params.id]); // Kør kun, når id ændres

  if (loading) return <p>Loading...</p>; // Hvis vi er i loading state, vis tekst
  if (error) return <p>Error: {error}</p>; // Hvis der er fejl, vis fejlmeddelelse

  if (!product) return <p>Produktet blev ikke fundet.</p>; // Hvis produktet ikke blev hentet

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full max-w-md h-60 object-cover mb-4 rounded"
      />
      <p className="text-gray-600 text-lg">${product.price}</p>
      <p className="mt-2">{product.description}</p>

      <KøbKnap product={product} />
    </main>
  );
}
