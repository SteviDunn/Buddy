// lib/groupByDate.ts
import { LumaEvent } from "./luma";

export function groupByDate(events: LumaEvent[]) {
  return events.reduce((acc, ev) => {
    const day = ev.startsAt
      ? new Date(ev.startsAt).toLocaleDateString("en-US", {
          weekday: "long",
          month:   "long",
          day:     "numeric",
        })
      : "Unknown date";

    if (!acc[day]) acc[day] = [];
    acc[day].push(ev);
    return acc;
  }, {} as Record<string, LumaEvent[]>);
}
