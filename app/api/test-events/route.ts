// app/api/test-events/route.ts
import { fetchFirstNEvents } from '@/lib/luma';

console.log('🔔 /api/test-events called');

export async function GET() {
  console.log('🧪 Calling fetchFirstNEvents(20)...');
  try {
    const events = await fetchFirstNEvents(20);
    console.log('✅ fetchFirstNEvents output (first 20):', events);
  } catch (err) {
    console.error('❌ fetchFirstNEvents error:', err);
  }
  return new Response('Check terminal for the first 20 events', { status: 200 });
}
