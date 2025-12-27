import { getSupabase } from './supabase';

export async function login(nim, password) {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('nim', nim)
    .eq('password', password)
    .single();

  if (error || !data) {
    throw new Error('NIM atau password salah');
  }

  return data;
}

export async function register({ fullName, nim, password }) {
  const supabase = getSupabase();

  const { data, error } = await supabase.from('users').insert([
    {
      full_name: fullName,
      nim: nim,
      password: password,
      level: 1,
      xp: 0,
      streak: 0,
    },
  ]);

  if (error) throw error;
  return data;
}