import { createClient } from "@supabase/supabase-js";
import { Database } from "@/schemas/db-schema";
import { env } from "@/env.mjs";

export const supabase = createClient<Database>(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    /* Optional Config */
  }
);
