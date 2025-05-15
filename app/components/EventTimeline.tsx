// components/EventTimeline.tsx
"use client";

import { useState } from "react";
import EventCard from "./EventCard";
import { LumaEvent } from "@/lib/luma";

interface Props {
  groupedEvents: Record<string, LumaEvent[]>;
}

export default function EventTimeline({ groupedEvents }: Props) {
  // keep track of which card is open
  const [openFormId, setOpenFormId] = useState<string | null>(null);

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-12">
      {Object.entries(groupedEvents).map(([day, dayEvents]) => (
        <section key={day} className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">{day}</h2>
          <div className="relative pl-8 before:absolute before:top-2 before:left-3 before:h-full before:border-l-2 before:border-gray-300">
            {dayEvents.map((ev) => {
              const isOpen = openFormId === ev.link;
              return (
                <div key={ev.link} className="relative mb-8">
                  {/* timeline dot */}
                  <span className="absolute left-0 top-2 w-3 h-3 bg-gold rounded-full ring-4 ring-white" />

                  {/* pass toggle & open state */}
                  <EventCard
                    event={ev}
                    isOpen={isOpen}
                    onToggle={() =>
                      setOpenFormId(isOpen ? null : ev.link)
                    }
                  />
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
