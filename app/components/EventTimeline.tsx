// components/EventTimeline.tsx
"use client";
import EventCard from "./EventCard";
import { LumaEvent } from "@/lib/luma";

interface Props {
  groupedEvents: Record<string, LumaEvent[]>;
}

export default function EventTimeline({ groupedEvents }: Props) {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-12">
      {Object.entries(groupedEvents).map(([day, dayEvents]) => (
        <section key={day} className="space-y-6">
          <div className="flex gap-4 items-start">
            <div className="w-36 sticky top-20 z-10 py-2">
              <h2 className="text-4xl font-bold text-white drop-shadow-lg">
                {day}
              </h2>
            </div>

            <div className="flex-1 relative pl-8 before:absolute before:top-2 before:left-3 before:h-full before:border-l-2 before:border-gray-300">
              {dayEvents.map((ev) => (
                <div key={ev.link} className="relative mb-8">
                  <span className="absolute left-0 top-2 w-3 h-3 bg-gold rounded-full ring-4 ring-white" />
                  <EventCard event={ev} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
