// app/pet/[id]/page.tsx
import { notFound } from "next/navigation";
import { getAccessToken } from "../../api/pets/refresh-token";

export default async function PetDetail({
  params,
}: {
  params: { id: string };
}) {
  const accessToken = await getAccessToken();
  const res = await fetch(`https://api.petfinder.com/v2/animals/${params.id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store", //For at få nyeste data
  });

  if (!res.ok) return notFound();

  const data = await res.json();
  const pet = data.animal;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={pet.primary_photo_cropped?.medium || "/default.jpg"}
        alt={pet.name}
        className="w-full h-64 object-cover rounded-xl mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{pet.name}</h1>
      <p className="text-lg text-gray-600 italic mb-4">
        {pet.description || "Ingen beskrivelse endnu 🐾"}
      </p>

      <div className="mb-4">
        <p>
          <strong>Race:</strong> {pet.breeds.primary}
        </p>
        <p>
          <strong>Køn:</strong> {pet.gender}
        </p>
        <p>
          <strong>Alder:</strong> {pet.age}
        </p>
        <p>
          <strong>Opdateret:</strong>{" "}
          {new Date(pet.updated_at).toLocaleDateString()}
        </p>
      </div>

      <button className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition">
        Adopter {pet.name}
      </button>
    </div>
  );
}
