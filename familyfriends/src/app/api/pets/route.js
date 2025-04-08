export async function GET() {
  console.log("API route kaldt 🐾");

  const res = await fetch("https://api.petfinder.com/v2/animals?limit=10", {
    headers: {
      Authorization: `Bearer ${process.env.PETFINDER_ACCESS_TOKEN}`,
    },
  });

  const data = await res.json();
  return Response.json(data);
}
