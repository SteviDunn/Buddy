'use client';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 space-y-8 text-center">
      <h1 className="text-5xl font-bold drop-shadow-lg text-shimmer-gold">Aubri</h1>
      <div className="flex flex-row gap-6">
        <a
          href="/events"
          className="text-2xl font-bold text-white underline drop-shadow-lg"
        >
          SF Gals Tech Events Matching
        </a>
        <a
          href="/gals"
          className="text-2xl font-bold text-white underline drop-shadow-lg"
        >
          SF Gals Activity Pairing (coming soon...)
        </a>
      </div>
    </main>
  );
}
