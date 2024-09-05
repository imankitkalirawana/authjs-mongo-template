// lib/supabaseClient.ts
//@ts-ignore
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6bWhiYmN0a2VzeXR5ZnpqbXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzMzUwNzgsImV4cCI6MjA0MDkxMTA3OH0.Sj3T5_1SVudi8dva393pl2cRB4rEVdMfNHaNsaWSMnY';

if (!supabaseUrl || !supabaseKey) {
  console.log('Missing Supabase URL or Key in environment variables');
  throw new Error('Missing Supabase URL or Key in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
