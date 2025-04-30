import { useFilterStore } from "@/app/store/filterStore";

export default function FilterSidebar() {
  const { category, setCategory, maxPrice, setMaxPrice, categories } =
    useFilterStore();

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Filtrér produkter</h2>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Kategori</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Alle</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">
          Max pris: ${maxPrice}
        </label>
        <input
          type="range"
          min="0"
          max="1000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}
