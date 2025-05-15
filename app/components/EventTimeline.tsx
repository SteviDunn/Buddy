// components/EventTimeline.tsx
"use client";
import { useState } from "react";
import EventCard from "./EventCard";
import { LumaEvent } from "@/lib/luma";

interface Props {
  groupedEvents: Record<string, LumaEvent[]>;
}

export default function EventTimeline({ groupedEvents }: Props) {
  const [openFormId, setOpenFormId] = useState<string | null>(null);

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-12">
      {Object.entries(groupedEvents).map(([day, dayEvents]) => (
        <section key={day} className="space-y-6">
          <div
            className="
              sticky top-0        /* stick at the top */
              z-10               /* above all other content */
              from-white/80 via-white/60 to-white/80
              py-2
            "
          >
            <h2 className="text-4xl font-bold text-white drop-shadow-lg">
              {day}
            </h2>
          </div>

          <div className="relative pl-8 before:absolute before:top-2 before:left-3 before:h-full before:border-l-2 before:border-gray-300">
            {dayEvents.map((ev) => {
              const isOpen = openFormId === ev.link;
              return (
                <div key={ev.link} className="relative mb-8">
                  <span className="absolute left-0 top-2 w-3 h-3 bg-gold rounded-full ring-4 ring-white" />
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
