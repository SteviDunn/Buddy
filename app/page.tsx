// app/page.tsx

import { fetchAllEvents, LumaEvent } from "@/lib/luma";
import { groupByDate }               from "@/lib/groupByDate";
import EventTimeline                 from "./components/EventTimeline";

export default async function Home() {
  // 1) Fetch all events on the server
  const events: LumaEvent[] = await fetchAllEvents();

  // 2) Group them by the day string
  const grouped = groupByDate(events);

  return (
    <main className="relative z-10 pt-20 p-6 max-w-6xl mx-auto">
      <h1
        className="fixed left-6 top-6 z-20 text-5xl font-bold drop-shadow-lg text-shimmer-gold"
      >
        Aubri
      </h1>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            SF Tech Events
          </h1>
        </div>
        <a
          href="/matches"
          className="text-2xl font-bold text-white drop-shadow-lg"
        >
          See matches made
        </a>
      </div>

      {events.length === 0 ? (
        <p className="text-white">Loading events…</p>
      ) : (
        <EventTimeline groupedEvents={grouped} />
      )}
    </main>
  );
}
