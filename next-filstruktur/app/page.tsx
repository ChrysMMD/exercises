import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <h1 className="text-2xl font-bold mt-6">
        Velkommen til mit Next.js-projekt!
      </h1>
      <p className="text-center text-gray-600 mt-2">
        Dette er en ren start med Next.js App Router.
      </p>
    </main>
  );
}
