import { createClient } from "@supabase/supabase-js";

// Browser-safe client
export const supabaseClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Server-side client (for App Router route handlers)
export const supabaseServer = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // use env with full privileges
);
