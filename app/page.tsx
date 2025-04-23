'use client';

import { useEffect, useState } from "react";
import BuddyForm from "./components/BuddyForm"; // ✅ import your form component

type Event = {
  title: string;
  link: string;
  date?: string;
  image?: string;
};

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [openFormIndex, setOpenFormIndex] = useState<number | null>(null); // ✅ track which form is open

  useEffect(() => {
    fetch("/api/sync-events")
      .then((res) => res.json())
      .then((data) => setEvents(data.events));
  }, []);

  return (
    <main className="relative z-10 p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
      <h1 className="text-4xl font-bold text-white drop-shadow-lg">
      SF Tech Events
      </h1>
      <a
      href="/matches"
      className="text-2xl font-bold text-white drop-shadow-lg"
      >
      See matches made
      </a>
      </div>



      {events.length === 0 ? (
        <p className="text-white">Loading events...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-xl"
            >
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {event.title}
                </h2>
                {event.date && (
                  <p className="text-sm text-gray-600 mb-2">Date: {event.date}</p>
                )}
                <div className="mt-2 flex gap-4 flex-wrap">
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-pink-400 underline"
                  >
                    View on Luma
                  </a>
                  <button
                  className="bg-pink-400 text-white font-semibold text-base px-4 py-2 rounded shadow-sm hover:bg-pink-300 transition duration-200"
                  onClick={() =>
                      setOpenFormIndex(index === openFormIndex ? null : index)
                    }
                  >
                    {openFormIndex === index ? "Hide Buddy Form" : "Find a Buddy"}
                  </button>

                </div>

                {/* ✅ Conditionally show the form */}
                {openFormIndex === index && (
                  <div className="mt-4">
                    <BuddyForm eventTitle={event.title} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
