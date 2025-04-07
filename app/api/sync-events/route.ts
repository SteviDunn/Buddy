import { scrapeLumaEvents } from '@/lib/scrapeLuma';

export async function GET() {
  const events = await scrapeLumaEvents();

  return new Response(JSON.stringify({ success: true, count: events.length, events }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
