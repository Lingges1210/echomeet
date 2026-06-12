import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Returns null if Supabase is not configured — app works without it
export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseKey) return null;
  return createClient(supabaseUrl, supabaseKey);
}

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// ─── Supabase SQL schema (run in your Supabase SQL editor) ───────────────────
//
// create table if not exists meetings (
//   id uuid default gen_random_uuid() primary key,
//   created_at timestamptz default now(),
//   title text not null,
//   summary text,
//   raw_notes text not null,
//   analysis jsonb not null,
//   action_items_count int,
//   decisions_count int
// );
//
// alter table meetings enable row level security;
//
// -- Allow anonymous reads and inserts (for demo)
// create policy "Allow anon insert" on meetings for insert with check (true);
// create policy "Allow anon select" on meetings for select using (true);
// ─────────────────────────────────────────────────────────────────────────────
