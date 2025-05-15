// components/EventCard.tsx
"use client";

import BuddyForm from "@/app/components/BuddyForm"; // adjust path if needed
import { LumaEvent } from "@/lib/luma";

interface EventCardProps {
  event:   LumaEvent;
  isOpen:  boolean;
  onToggle: () => void;
}

export default function EventCard({
  event,
  isOpen,
  onToggle,
}: EventCardProps) {
  return (
    <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-xl">
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900">{event.title}</h2>
        {event.startsAt && (
          <p className="text-sm text-gray-600 mb-2">
            {new Date(event.startsAt).toLocaleString()}
          </p>
        )}
        <div className="mt-2 flex gap-4 flex-wrap">
          <a
            href={event.link}
            target="_blank"
            rel="noreferrer"
            className="text-gold underline"
          >
            View on Luma
          </a>
          <button
            className="bg-gold text-white font-semibold text-base px-4 py-2 rounded shadow-sm hover:bg-gold/90 transition duration-200"
            onClick={onToggle}
          >
            {isOpen ? "Hide Buddy Form" : "Find a Buddy"}
          </button>
        </div>

        {isOpen && (
          <div className="mt-4">
            <BuddyForm eventTitle={event.title} eventUrl={event.link} />
          </div>
        )}
      </div>
    </div>
  );
}
