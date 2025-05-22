// components/EventGrid.tsx
"use client";

import EventCard from "./EventCard";
import { LumaEvent } from "@/lib/luma";

export default function EventGrid({ events }: { events: LumaEvent[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.link} event={event} />
      ))}
    </div>
  );
}
