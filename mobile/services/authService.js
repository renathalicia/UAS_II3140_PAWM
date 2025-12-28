// ...existing code...
import { getSupabase } from './supabase';

/* ================= LOGIN ================= */
export async function login(nim, password) {
  const supabase = getSupabase();

  if (!nim || !password) {
    throw new Error('NIM dan password wajib diisi');
  }

  const { data, error } = await supabase
    .from('users')
    .select('id, full_name, nim, level, xp, streak')
    .eq('nim', nim)
    .eq('password', password)
    .maybeSingle();

  if (error) {
    console.error('Supabase login error:', error);
    throw new Error(error.message || 'Login gagal');
  }

  if (!data) {
    throw new Error('NIM atau password salah');
  }

  return data;
}

/* ================= REGISTER ================= */
export async function register({ fullName, nim, password }) {
  const supabase = getSupabase();

  if (!fullName || !nim || !password) {
    throw new Error('Semua field wajib diisi');
  }

  // cek NIM sudah terdaftar
  const { data: existingUser, error: checkErr } = await supabase
    .from('users')
    .select('id')
    .eq('nim', nim)
    .maybeSingle();

  if (checkErr) {
    console.error('Supabase check existing error:', checkErr);
    throw new Error(checkErr.message || 'Cek registrasi gagal');
  }

  if (existingUser) {
    throw new Error('NIM sudah terdaftar');
  }

  // insert hanya kolom yang ada di schema
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        full_name: fullName,
        nim,
        password, // peringatan: plaintext, pertimbangkan hashing atau supabase auth
        level: 1,
        xp: 0,
        streak: 0,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Supabase insert error:', error);
    throw new Error(error.message || 'Gagal melakukan registrasi');
  }

  return data;
}
// ...existing code...