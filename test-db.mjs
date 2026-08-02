import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rfrowgjjwrwdcigftcjl.supabase.co';
const supabaseKey = 'sb_publishable_UtoPkDfJl2Ee8E-TKpu-RQ_ra7FXB7x';
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
