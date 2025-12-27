import { createClient } from '@supabase/supabase-js';

let _client = null;

export function getSupabase() {
  const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    // jangan crash saat app startup; error akan muncul saat login/register dipanggil
    throw new Error('Missing Supabase env vars');
  }

  if (!_client) {
    _client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  return _client;
}