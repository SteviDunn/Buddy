export const LUMA_PLACE_ID = 'discplace-BDj7GNbGlsF7Cka';

export type LumaEvent = {
  title:       string;
  link:        string;
  image?:      string;
  startsAt?:   string;
  location?:   string;
  description?:string;
  calendar?:   string;
  hostNames?:  string[];
};

export async function fetchFirstNEvents(n = 20): Promise<LumaEvent[]> {
  console.log('🟢 fetchFirstNEvents start, n =', n);
  const allEvents: LumaEvent[] = [];
  let cursor: string | null = null;
  const limit = 25;
  let fetched = 0;

  do {
    console.log('🔗 Fetching page; cursor =', cursor);
    const url = new URL('https://api.lu.ma/discover/get-paginated-events');
    url.searchParams.set('discover_place_api_id', LUMA_PLACE_ID);
    url.searchParams.set('pagination_limit', String(limit));
    if (cursor) {
      url.searchParams.set('pagination_cursor', cursor);
    }

    const res = await fetch(url.toString());
    console.log('⏳ HTTP status:', res.status);
    const json = await res.json();
    console.log('🔍 Full JSON payload keys:', Object.keys(json));

    const batch: any[] = json.entries ?? json.events ?? [];
    const nextCursor: string | null = json.next_cursor ?? null;
    console.log(`→ Got batch of ${batch.length} items; nextCursor =`, nextCursor);

    // If no new items or cursor didn’t change, stop paging
    if (batch.length === 0 || nextCursor === cursor) {
      console.log('⚠️ Empty batch or unchanged cursor—stopping loop.');
      break;
    }

    // Map and collect up to n events
    for (const e of batch) {
      const evt = e.event ?? {};
      allEvents.push({
        title:       evt.name || 'Untitled',
        link:        evt.url ? `https://lu.ma/${evt.url}` : '',
        image:       evt.cover_url,
        startsAt:    evt.start_at,
        location:    evt.geo_address_info?.full_address,
        description: evt.description,
        calendar:    e.calendar?.name,
        hostNames:   e.hosts?.map((h: any) => h.name),
      });
      fetched++;
      if (fetched >= n) {
        console.log('✅ Reached target of', n, 'events—stopping loop.');
        break;
      }
    }

    cursor = nextCursor;
    if (fetched >= n) break;
  } while (cursor);

  console.log('🟢 fetchFirstNEvents returning', allEvents.length, 'events');
  return allEvents;
}

export async function fetchAllEvents(): Promise<LumaEvent[]> {
    console.log('🟢 fetchAllEvents start');
    const allEvents: LumaEvent[] = [];
    let cursor: string | null = null;
    const limit = 25;
  
    do {
      const url = new URL('https://api.lu.ma/discover/get-paginated-events');
      url.searchParams.set('discover_place_api_id', LUMA_PLACE_ID);
      url.searchParams.set('pagination_limit', String(limit));
      if (cursor) {
        url.searchParams.set('pagination_cursor', cursor);
      }
  
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`Luma fetch failed: ${res.status}`);
      const json = await res.json() as any;
  
      const batch: any[] = json.entries ?? [];
      cursor = json.next_cursor ?? null;
      console.log(`→ fetched ${batch.length} items; nextCursor=${cursor}`);
  
      for (const e of batch) {
        const evt = e.event ?? {};
        allEvents.push({
          title:       evt.name,
          link:        evt.url      ? `https://lu.ma/${evt.url}` : '',
          image:       evt.cover_url,
          startsAt:    evt.start_at,
          location:    evt.geo_address_info?.full_address,
          description: evt.description,
          calendar:    e.calendar?.name,
          hostNames:   e.hosts?.map((h: any) => h.name),
        });
      }
    } while (cursor);
  
    console.log('🟢 fetchAllEvents returning', allEvents.length, 'events');
    return allEvents;
  }
  