import { scrapeLumaEvents } from '@/lib/scrapeLuma';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  const events = await scrapeLumaEvents();

  const filePath = path.join(process.cwd(), 'public', 'events.json');
  await writeFile(filePath, JSON.stringify(events, null, 2), 'utf-8');

  return new Response(JSON.stringify({ success: true, count: events.length }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
