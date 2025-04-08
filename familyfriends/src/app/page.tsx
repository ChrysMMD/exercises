// app/page.tsx
"use client";
import { useEffect, useState } from "react";
import React from "react";

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
      <h1 className="text-3xl font-bold mb-4">Familyfriends</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-row flex-wrap gap-4">
        {pets.map((pet: any) => (
          <div
            key={pet.id}
            className="flex flex-col p-4 border rounded-lg max-w-xs w-full sm:w-1/2 lg:w-1/3"
          >
            <img
              src={pet.primary_photo_cropped?.small || "/default.jpg"}
              alt={pet.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-2">{pet.name}</h3>
            <p>{pet.breeds.primary}</p>
            <p>{pet.age}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
