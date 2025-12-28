import { getSupabase } from './supabase';

/* ================= LOGIN ================= */
export async function login(nim, password) {
  const supabase = getSupabase();

  if (!nim || !password) {
    throw new Error('NIM dan password wajib diisi');
  }

  const { data, error } = await supabase
    .from('users')
    .select('id, full_name, nim, faculty, level, xp, streak')
    .eq('nim', nim)
    .eq('password', password)
    .single();

  if (error || !data) {
    throw new Error('NIM atau password salah');
  }

  return data;
}

/* ================= REGISTER ================= */
export async function register({ fullName, nim, faculty, password }) {
  const supabase = getSupabase();

  if (!fullName || !nim || !faculty || !password) {
    throw new Error('Semua field wajib diisi');
  }

  /* Cek NIM sudah terdaftar */
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('nim', nim)
    .single();

  if (existingUser) {
    throw new Error('NIM sudah terdaftar');
  }

  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        full_name: fullName,
        nim: nim,
        faculty: faculty,
        password: password, // ⚠️ plaintext (technical debt)
        level: 1,
        xp: 0,
        streak: 0,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error('Gagal melakukan registrasi');
  }

  return data;
}
