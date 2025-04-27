"use client";

import { useState } from "react";

export default function FilterSidebar({
  onFilterChange,
}: {
  onFilterChange: (filters: any) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);

  function handleFilterChange() {
    onFilterChange({
      category,
      maxPrice,
    });
  }

  return (
    <div className="relative">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-blue-500 text-white rounded"
      >
        {isOpen ? "Luk filtre" : "Åbn filtre"}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-lg font-bold mb-4">Filtrér produkter</h2>

        {/* Kategori filter */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Kategori</label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              handleFilterChange();
            }}
            className="w-full border p-2 rounded"
          >
            <option value="">Alle</option>
            <option value="electronics">Elektronik</option>
            <option value="jewelery">Smykker</option>
            <option value="men's clothing">Herretøj</option>
            <option value="women's clothing">Dametøj</option>
          </select>
        </div>

        {/* Pris filter */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Max pris: ${maxPrice}
          </label>
          <input
            type="range"
            min="0"
            max="1000"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(Number(e.target.value));
              handleFilterChange();
            }}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
