import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, contact, matchType, eventTitle } = body;

  // Step 1: Insert new signup
  const { data: newUser, error: insertError } = await supabase
    .from('buddy_signups')
    .insert([
      {
        name,
        contact,
        match_type: matchType,
        event_title: eventTitle,
        is_matched: false,
        paired_with: null,
      },
    ])
    .select(); // so we can get the inserted row back

  if (insertError || !newUser || newUser.length === 0) {
    console.error('❌ Insert error:', insertError);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }

  const currentUser = newUser[0];

  // Step 2: Check for existing unmatched buddy
  const { data: potentialBuddies, error: matchError } = await supabase
    .from('buddy_signups')
    .select('*')
    .eq('event_title', eventTitle)
    .eq('match_type', matchType)
    .eq('is_matched', false)
    .neq('id', currentUser.id)
    .limit(1);

  if (matchError) {
    console.error('❌ Match query error:', matchError);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }

  // Step 3: If match found, pair them
  if (potentialBuddies.length > 0) {
    const buddy = potentialBuddies[0];

    const { error: updateError1 } = await supabase
      .from('buddy_signups')
      .update({ is_matched: true, paired_with: buddy.id })
      .eq('id', currentUser.id);

    const { error: updateError2 } = await supabase
      .from('buddy_signups')
      .update({ is_matched: true, paired_with: currentUser.id })
      .eq('id', buddy.id);

    if (updateError1 || updateError2) {
      console.error('❌ Match update error:', updateError1, updateError2);
      return new Response(JSON.stringify({ success: false }), { status: 500 });
    }

    // ✅ Matched successfully
    console.log('🎉 Matched users:', currentUser.name, '<->', buddy.name);

    // TODO: send warm intro email to both users

    return new Response(JSON.stringify({ success: true, matched: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  }

  // Step 4: No match found — user is waiting
  console.log(`🕓 ${currentUser.name} is waiting for a buddy...`);

  return new Response(JSON.stringify({ success: true, matched: false }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
}

// Optional: Reject unsupported GET requests
export async function GET() {
  return new Response('Method Not Allowed', { status: 405 });
}
