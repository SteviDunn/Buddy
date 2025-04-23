'use client';

import { useEffect, useState } from 'react';

export default function MatchesPage() {
  const [matchCount, setMatchCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/match-count')
      .then((res) => res.json())
      .then((data) => setMatchCount(data.count));
  }, []);

  return (
    <main className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4 text-white drop-shadow-lg"> Matches Made</h1>
      {matchCount === null ? (
        <p>Loading match count...</p>
      ) : (
        <p className="text-xl font-medium">
          <span className="text-pink-500 font-bold">{matchCount}</span> matches have been made so far!
        </p>
      )}
      <p className="mt-6 text-gray-700">
        If you recently signed up, check your email — we’ve introduced you to your buddy there!
      </p>
    </main>
  );
}
