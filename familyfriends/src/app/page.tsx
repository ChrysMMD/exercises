// app/page.tsx
"use client";
import { useEffect, useState } from "react";
import React from "react";
import PetCard from "./components/PetCard";

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
        <div className="flex flex-row flex-wrap gap-4">
          {pets.map((pet: any) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    </div>
  );
}
