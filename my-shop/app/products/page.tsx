"use client";

import { useEffect, useState } from "react";
import { useFilterStore } from "@/app/store/filterStore";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";

// Funktion til at hente ALLE produkter (100 stk) og gemmer dem i allProducts state
async function getAllProducts() {
  const url = `https://dummyjson.com/products?limit=100`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch all products");
  return res.json();
}

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { category, maxPrice, setCategories } = useFilterStore();
  const [page, setPage] = useState(0);
  const itemsPerPage = 10;

  // Hent alle produkter én gang og gem i state
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const data = await getAllProducts();
        setAllProducts(data.products);
      } catch (error) {
        console.error("Fejl ved hentning af ALLE produkter:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // Hent alle kategorier og opdater Zustand store
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        const data = await res.json();

        setCategories(
          data.map((category: any) => ({
            slug: category.slug,
            name: category.name,
          }))
        );
      } catch (error) {
        console.error("Fejl ved hentning af kategorier:", error);
      }
    };

    fetchCategories();
  }, []);

  // Filtrering baseret på valgt kategori og max pris fra Zustand
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = category ? product.category === category : true;
    const matchesPrice = product.price <= maxPrice;
    return matchesCategory && matchesPrice;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage); //Udregning af hvor mange sider som skall vises

  // Pagination af de filtrerede produkter
  const paginatedProducts = filteredProducts.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  // Hvis loading, vis ventebesked
  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 p-4 border-r bg-gray-100">
        <FilterSidebar />
      </aside>

      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="w-full flex justify-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Forrige
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index)}
              className={`px-3 py-1 rounded ${
                page === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={(page + 1) * itemsPerPage >= filteredProducts.length}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Næste
          </button>
        </div>

        <p className="text-center mt-4 text-sm text-gray-600">
          Side {page + 1} af {Math.ceil(filteredProducts.length / itemsPerPage)}
        </p>
      </main>
    </div>
  );
}
