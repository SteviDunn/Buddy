// components/SmallMap.tsx
"use client";

interface SmallMapProps {
  address: string;
}

export default function SmallMap({ address }: SmallMapProps) {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY;
  console.log("Gmaps key:", key);
  const params = new URLSearchParams({
    key: key || "",
    q: address,
    zoom: "14",
    maptype: "roadmap",
  }).toString();

  return (
    <iframe
      src={`https://www.google.com/maps/embed/v1/place?${params}`}
      allowFullScreen
      loading="lazy"
      className="w-full h-full border-0 rounded-md"
    />
  );
}
