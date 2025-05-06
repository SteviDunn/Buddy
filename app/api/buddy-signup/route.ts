import { supabase } from '@/lib/supabaseClient';
import { Resend } from 'resend';

export async function POST(req: Request) {
  const body = await req.json();
  console.log('🧪 Incoming signup:', body);

  const { name, contact, matchType, eventTitle } = body;
  if (!name || !contact || !matchType || !eventTitle) {
    console.error('❌ Validation error: Missing fields', body);
    return new Response(JSON.stringify({
      success: false,
      error: 'Missing required fields'
    }), { status: 400 });
  }

  // Step 0: Prevent duplicates
  const { data: existingUser, error: existErr } = await supabase
    .from('buddy_signups')
    .select('id')
    .eq('contact', contact)
    .eq('event_title', eventTitle)
    .maybeSingle();
  if (existErr) console.error('❌ Supabase lookup error:', existErr);
  if (existingUser) {
    console.log('⚠️ Duplicate signup blocked:', contact, eventTitle);
    return new Response(JSON.stringify({
      success: false,
      error: 'You have already signed up for this event'
    }), { status: 400 });
  }

  // Step 1: Insert
  const { data: newUser, error: insertError } = await supabase
    .from('buddy_signups')
    .insert([{ name, contact, match_type: matchType, event_title: eventTitle }])
    .select();
  if (insertError || !newUser?.length) {
    console.error('❌ Insert error:', insertError);
    return new Response(JSON.stringify({ success: false, error: 'Insert failed' }), { status: 500 });
  }
  const currentUser = newUser[0];
  console.log('✅ New signup inserted:', currentUser.id);

  // small delay to ensure visibility
  await new Promise(r => setTimeout(r, 200));

  // Step 2: Find match
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
    return new Response(JSON.stringify({ success: false, error: 'Match lookup failed' }), { status: 500 });
  }

  if (potentialBuddies.length === 0) {
    console.log(`🕓 ${currentUser.contact} is waiting for a buddy...`);
    return new Response(JSON.stringify({ success: true, matched: false }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  }

  // Step 3: Pair them
  const buddy = potentialBuddies[0];
  console.log('🎉 Matched users:', currentUser.contact, '<->', buddy.contact);

  try {
    // Mark both matched + record contacts
    const { error: u1 } = await supabase
      .from('buddy_signups')
      .update({
        is_matched: true,
        paired_with: buddy.id,
        paired_with_contact: buddy.contact,
      })
      .eq('id', currentUser.id);
    const { error: u2 } = await supabase
      .from('buddy_signups')
      .update({
        is_matched: true,
        paired_with: currentUser.id,
        paired_with_contact: currentUser.contact,
      })
      .eq('id', buddy.id);
    if (u1 || u2) {
      console.error('❌ Supabase update error:', u1, u2);
      throw new Error('Database update failed');
    }
    console.log('✅ Supabase match update succeeded.');

    // Send intro email
    console.log('📬 Attempting to send email...');
    const resend = new Resend(process.env.RESEND_API_KEY);
    const emailResponse = await resend.emails.send({
      from: 'Aubri <hello@aubri.site>',
      to: [currentUser.contact, buddy.contact],
      replyTo: `${currentUser.contact}, ${buddy.contact}`,
      subject: `You're matched for ${eventTitle}!`,
      html: `
        <p>Hi ${currentUser.name} and ${buddy.name}!</p>
        <p>You’ve been matched for <strong>${eventTitle}</strong> 🎉</p>
        <p>Feel free to reply to this thread to introduce yourselves and coordinate.</p>
        <br>
        <p style="font-style: italic; color: #B8860B;">
          — Aubri<br>
          <span style="font-size: 0.95em;">Connections worth more than gold ✨</span>
        </p>
      `,
    });
    console.log('📬 Resend response:', emailResponse);

    // Stamp intro_sent_at
    const now = new Date().toISOString();
    const { error: i1 } = await supabase
      .from('buddy_signups')
      .update({ intro_sent_at: now })
      .eq('id', currentUser.id);
    const { error: i2 } = await supabase
      .from('buddy_signups')
      .update({ intro_sent_at: now })
      .eq('id', buddy.id);
    if (i1 || i2) console.error('❌ intro_sent_at update error:', i1, i2);
    else console.log('✅ intro_sent_at updated in Supabase');

  } catch (error: any) {
    console.error('🔥 Error in pairing/email flow:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true, matched: true }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
}

export async function GET() {
  return new Response('Method Not Allowed', { status: 405 });
}
