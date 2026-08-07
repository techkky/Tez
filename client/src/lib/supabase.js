import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase env vars. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (client/.env locally, or the Vercel project\'s Environment Variables in production) and redeploy.',
  )
}

// Fall back to placeholder values so a missing/misconfigured env var only
// breaks auth calls, instead of throwing at import time and blanking the
// entire site (Navbar loads this on every page, not just /login).
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
)
