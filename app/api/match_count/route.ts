import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  const { data, error } = await supabase
    .from('buddy_signups')
    .select('*')
    .eq('is_matched', true);

  if (error) {
    return new Response(JSON.stringify({ count: 0 }), { status: 500 });
  }

  const uniquePairs = new Set();

  data.forEach((row) => {
    const pairKey = [row.id, row.paired_with].sort().join('-');
    uniquePairs.add(pairKey);
  });

  return new Response(JSON.stringify({ count: uniquePairs.size }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
