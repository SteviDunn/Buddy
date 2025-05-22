'use client';

import { useEffect, useState } from 'react';

export default function LiveMatchCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch('/api/match_count');
        if (res.ok) {
          const data = await res.json();
          setCount(data.count);
        }
      } catch (err) {
        console.error('Failed to load match count', err);
      }
    }

    fetchCount();
    const id = setInterval(fetchCount, 10000);
    return () => clearInterval(id);
  }, []);

  if (count === null) {
    return <p className="text-white">Loading match count...</p>;
  }

  return (
    <div className="my-8 flex justify-center">
      <div className="relative w-32 h-32 rounded-full border-8 border-yellow-500 bg-white/80 backdrop-blur-md flex items-center justify-center shadow-lg">
        <span className="text-4xl font-bold text-shimmer-gold">{count}</span>
      </div>
    </div>
  );
}
