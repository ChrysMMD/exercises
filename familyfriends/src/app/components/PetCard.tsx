//Definere pet-objektet med hvad det skal indeholde
type PetCardProps = {
  pet: {
    id: string;
    name: string;
    age: string;
    breeds: {
      primary: string;
    };
    primary_photo_cropped?: {
      small: string;
    };
  };
};

//komponent som modtager pet-objektet som prop
export default function PetCard({ pet }: PetCardProps) {
  return (
    <div className="flex flex-col p-4 border rounded-lg max-w-xs w-full sm:w-1/2 lg:w-1/3 bg-white shadow hover:shadow-md transition">
      <img
        src={pet.primary_photo_cropped?.small || "/default.jpg"}
        alt={pet.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="text-xl font-semibold mt-2">{pet.name}</h3>
      <p>{pet.breeds.primary}</p>
      <p className="text-gray-600 italic">{pet.age}</p>
    </div>
  );
}
