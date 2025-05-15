// components/EventGrid.tsx
"use client";

import { useState } from "react";
import EventCard from "./EventCard";
import { LumaEvent } from "@/lib/luma";

export default function EventGrid({ events }: { events: LumaEvent[] }) {
  const [openFormIndex, setOpenFormIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => (
        <EventCard
          key={event.link}
          event={event}
          isOpen={openFormIndex === index}
          onToggle={() =>
            setOpenFormIndex(openFormIndex === index ? null : index)
          }
        />
      ))}
    </div>
  );
}
