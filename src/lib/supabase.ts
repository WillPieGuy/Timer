import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Timer = {
  id: string;
  title: string;
  description: string | null;
  end_time: string;
  created_by: string;
  views: number;
  created_at: string;
};

export type Profile = {
  id: string;
  username: string;
  created_at: string;
};