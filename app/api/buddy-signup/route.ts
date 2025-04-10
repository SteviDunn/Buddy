import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, contact, matchType, eventTitle } = body;

  const {data: newUser, error: insertError } = await supabase.from('buddy_signups').insert([
    {
      name,
      contact,
      match_type: matchType,
      event_title: eventTitle,
      is_matched: false,
      paired_with: null,
    },
  ])
  .select() // to get the inserted row back

  if(insertError || !newUser || newUser.length === 0) {
    console.error('Insert error:', insertError);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }

  const currentUser = newUser[0];

  //Try to find an unmatched buddy for the same evenet
  const{data: potentialBuddies, error: matchError} = await supabase
    .from('buddy_signups')
    .select('*')
    .eq('event_title', eventTitle)
    .eq('is_matched', false)
    .neq('id', currentUser.id)
    .limit(1);

  if (matchError){
    console.error('Match error:', matchError);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }

  //if a buddy is found pair them
  if (potentialBuddies.length >0){
    const buddy = potentialBuddies[0];

    //updae both users to be marked as matched
    const {error: updateError1} = await supabase
      .from('buddy_signups')
      .update({ is_matched: true, paired_with: buddy.id })
      .eq('id', currentUser.id);

    const {error: updateError2} = await supabase
      .from('buddy_signups')
      .update({ is_matched: true, paired_with: currentUser.id })
      .eq('id', buddy.id);

    if (updateError1 || updateError2){
      console.error('MatchUpdate error:', updateError1, updateError2);
      return new Response(JSON.stringify({ success: false }), { status: 500 });
    }

    //TODO send a warm into to both users with their emails 
    console.log('Matched users:', currentUser, buddy);
    return new Response(JSON.stringify({ success: true }), { status: 200 });

    //if no buddy is found, they are waiting
    console.log('${currentUser.name} is waiting for a buddy');
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }
  }