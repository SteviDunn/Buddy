'use client';

import { useState } from 'react';

type Props = {
  eventTitle: string;
};

export default function BuddyForm({ eventTitle }: Props) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [matchType, setMatchType] = useState('1-on-1');
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/buddy-signup', {
      method: 'POST',
      body: JSON.stringify({ name, contact, matchType, eventTitle }),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      alert('Error submitting form');
    }
  }

  if (submitted) {
    return <p className="text-green-600">🎉 You’re signed up for {eventTitle}!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white/80 p-4 rounded shadow backdrop-blur">
      <h3 className="font-semibold">Find a Buddy for: {eventTitle}</h3>
      <input
        required
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        required
        placeholder="Email or Discord"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <select
        value={matchType}
        onChange={(e) => setMatchType(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="1-on-1">1-on-1</option>
        <option value="group">Group</option>
      </select>
      <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
        Submit
      </button>
    </form>
  );
}
