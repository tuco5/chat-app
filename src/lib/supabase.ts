import { createClient } from "@supabase/supabase-js";
import { Database } from "@/schema";
import { env } from "@/env";

export const supabase = createClient<Database>(
  env.SUPABASE_URL,
  env.SUPABASE_KEY,
  {
    /* Optional Config */
  }
);
