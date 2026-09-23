import { supabase } from "@/lib/supabase";

export async function getBumilDataset() {
  const { data, error } = await supabase
    .from("bumil_dataset")
    .select("*");

  if (error) {
    throw error;
  }

  return data;
}