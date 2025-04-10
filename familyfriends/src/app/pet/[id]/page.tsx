// app/pet/[id]/page.tsx
import { notFound } from "next/navigation";
import { getAccessToken } from "../../api/pets/refresh-token";
import PetTag from "@/app/components/PetTag";
import Button from "@/app/components/Button";
import BackButton from "@/app/components/BackButton";
import Link from "next/link";

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
    <div className="p-6 max-w-3xl mx-auto flex flex-col gap-4">
      <div className="relative">
        <BackButton />
        <img
          src={pet.primary_photo_cropped?.medium || "/default.jpg"}
          alt={pet.name}
          className="w-full mx-auto aspect-square object-cover rounded-xl"
        />
      </div>
      <h1 className="text-3xl font-bold text-left">{pet.name}</h1>
      <div className="flex flex-row gap-2">
        <PetTag bgColor="bg-[var(--color-blue)]">{pet.type}</PetTag>
        <PetTag bgColor="bg-[var(--color-pink)]">{pet.gender}</PetTag>
        <PetTag bgColor="bg-[var(--color-green)]">{pet.age}</PetTag>
        <PetTag bgColor="bg-[var(--color-yellow)]">{pet.breeds.primary}</PetTag>
      </div>
      <p className="text-lg text-gray-600 italic">
        {pet.description || "Ingen beskrivelse endnu"}
      </p>
      <p className="mb-4 text-[var(--color-grey)] text-xs">
        Opdateret: {new Date(pet.published_at).toLocaleDateString()}
      </p>

      <Button href={`/adopt/${pet.id}`}>
        <strong>Adopter</strong> {pet.name}
      </Button>
    </div>
  );
}
