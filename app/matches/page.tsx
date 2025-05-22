
'use client';

import Image from 'next/image';
import LiveMatchCount from '../components/LiveMatchCount';

export default function MatchesPage() {

  return (
    <main className="p-6 max-w-xl mx-auto text-center">
      <Image
        src="/images/aubri_logo_transparent.svg"
        alt="Aubri logo"
        width={120}
        height={120}
        className="mx-auto mb-4"
      />

      <h1 className="text-2xl font-bold mb-4 text-white drop-shadow-lg">Matches Made</h1>

      <LiveMatchCount />

      <p className="mt-6 text-gray-700">
        If you recently signed up, check your email — we’ve introduced you to your buddy there!
      </p>
    </main>
  );
}
