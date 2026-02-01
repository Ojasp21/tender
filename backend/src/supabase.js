import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config(); // 🔥 REQUIRED here

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error("❌ Supabase environment variables are missing");
}

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);