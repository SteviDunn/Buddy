// components/EventCard.tsx
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import BuddyForm from "@/app/components/BuddyForm";
import type { LumaEvent } from "@/lib/luma";

const SmallMap = dynamic(() => import("./SmallMap"), { ssr: false });

interface EventCardProps {
  event: LumaEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const { title, startsAt, image, link, location } = event;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-stretch">
      {/* ── Left panel: 16∶9 image + info ── */}
      <div className="flex-1 max-w-lg w-full bg-white/70 backdrop-blur-lg border border-white/30 rounded-lg shadow-md overflow-hidden flex flex-col">
        {/* Image container at 16∶9 */}
        <div className="w-full aspect-video bg-gray-100">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              No image
            </div>
          )}
        </div>

        {/* Details below */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-xl font-semibold">{title}</h3>
          {startsAt && (
            <p className="text-sm text-gray-600 mt-1">
              {new Date(startsAt).toLocaleString()}
            </p>
          )}

          <div className="mt-auto flex gap-4">
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="text-gold underline"
            >
              View on Luma
            </a>
            <button
              onClick={() => setIsOpen(true)}
              className="ml-auto bg-pink-500 hover:bg-pink-400 text-white px-3 py-1 rounded"
            >
              Find Buddy
            </button>
          </div>
        </div>
      </div>

      {/* ── Right panel: fixed square map ── */}
      <div className="w-full sm:w-64 aspect-square bg-white/70 backdrop-blur-lg border border-white/30 rounded-lg shadow-md overflow-hidden flex flex-col">
        {location ? (
          <SmallMap address={location} />
        ) : (
          <div className="flex-1 bg-gray-100 flex items-center justify-center text-xs text-gray-500 p-2">
            Address upon registration
          </div>
        )}
        {location && (
          <p className="p-2 text-xs text-gray-700 text-center">{location}</p>
        )}
      </div>

      {/* ── BuddyForm Modal ── */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h4 className="text-xl font-semibold mb-4">{title}</h4>
            <BuddyForm eventTitle={title} eventUrl={link} />
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
