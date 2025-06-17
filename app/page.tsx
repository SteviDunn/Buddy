'use client';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 space-y-8 text-center">
      <h1 className="text-5xl font-bold drop-shadow-lg text-shimmer-gold">Aubri</h1>
      <div className="space-y-4">
        <a href="/events" className="text-2xl font-bold text-white underline drop-shadow-lg">
          SF Tech Events
        </a>
        <a href="/gals" className="text-2xl font-bold text-white underline drop-shadow-lg">
          SF Gals Get Together
        </a>
      </div>
    </main>
  );
}
