// app/page.tsx
"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("/api/pets");
        const data = await response.json();
        console.log("DATA FRA /api/pets:", data);

        if (!data || !data.animals) {
          setError("Data mangler eller er i forkert format 🥺");
          return;
        }

        setPets(data.animals);
      } catch (err) {
        setError("Noget gik galt under hentningen 🐾");
        console.error(err);
      }
    };

    fetchPets();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Mine søde dyr 🐾</h1>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-2">
        {pets.map((pet: any) => (
          <li key={pet.id} className="p-4 bg-gray-100 rounded-lg shadow">
            <strong>{pet.name}</strong> – {pet.breeds.primary}
          </li>
        ))}
      </ul>
    </div>
  );
}
