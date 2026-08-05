import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables are missing.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log('Testing products...');
  const res1 = await supabase.from('products').select('*').limit(1);
  console.log('Products:', res1.error ? res1.error.message : 'OK');

  console.log('Testing orders...');
  const res2 = await supabase.from('orders').select('*').limit(1);
  console.log('Orders data:', res2.data);

  console.log('Testing support_tickets...');
  const res3 = await supabase.from('support_tickets').select('*').limit(1);
  console.log('Support tickets:', res3.error ? res3.error.message : 'OK');
}

test();
