"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";

// Hent produkter asynkront
async function getProducts() {
  const url = "https://dummyjson.com/products"; // URL til Dummy API'en
  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json(); // Returnerer JSON-dataen fra API'en
}

export default function ProductsPage() {
  // State for produkter og loading status
  const [products, setProducts] = useState<any[]>([]); // Tom array for produkter
  const [loading, setLoading] = useState<boolean>(true); // Loader-status
  const [filters, setFilters] = useState({ category: "", maxPrice: 1000 });

  // useEffect til at hente produkter
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Sæt loading til true mens vi henter data
      try {
        const data = await getProducts(); // Hent data fra API'en
        setProducts(data.products); // Opdater state med produkterne
      } catch (error) {
        console.error("Error fetching products:", error); // Håndter fejl
      } finally {
        setLoading(false); // Sæt loading til false når data er hentet
      }
    };

    fetchProducts(); // Kald funktionen for at hente produkterne
  }, []); // Tomt array betyder, at den kun køres én gang ved komponentens første render

  //Filter
  const filteredProducts = products.filter((product) => {
    const matchesCategory = filters.category
      ? product.category === filters.category
      : true;
    const matchesPrice = product.price <= filters.maxPrice;

    return matchesCategory && matchesPrice;
  });

  if (loading) return <p>Loading...</p>; // Hvis vi er i loading state, vis tekst

  return (
    <div className="flex">
      {/* Sidebar */}
      <FilterSidebar onFilterChange={setFilters} />

      {/* Produkter */}
      <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
