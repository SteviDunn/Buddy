
'use client';

import LiveMatchCount from '../components/LiveMatchCount';

export default function MatchesPage() {

  return (
    <main className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-5xl font-bold mb-4 drop-shadow-lg text-shimmer-gold">
        Aubri
      </h1>

      <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-lg">Matches Made</h2>

      <LiveMatchCount />

      <p className="mt-6 text-gray-700">
        If you recently signed up, check your email — we’ve introduced you to your buddy there!
      </p>
    </main>
  );
}
