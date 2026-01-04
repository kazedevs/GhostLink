import { createClient } from "@supabase/supabase-js";

// Use this ONLY on the server side (API routes). 
// This client bypasses RLS permissions.
export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY!
);
