import { Database } from "@/schema";

export type Message =
  Database["public"]["Tables"]["messages"]["Row"];
