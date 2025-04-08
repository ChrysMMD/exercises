import { getAccessToken } from './refresh-token.js';

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    const res = await fetch('https://api.petfinder.com/v2/animals?limit=10', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      console.error(`API fejlkode: ${res.status} - ${res.statusText}`);
      throw new Error(`API error: ${res.statusText}`);
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Fejl ved API-hentning:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
