// app/page.tsx  (or app/events/page.tsx)

import EventGrid from "./components/EventGrid";
import { fetchAllEvents, fetchFirstNEvents, LumaEvent } from "@/lib/luma";

export default async function Home() {
  const events: LumaEvent[] = await fetchAllEvents();

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
        // Pass the array to a Client Component
        <EventGrid events={events} />
      )}
    </main>
  );
}
