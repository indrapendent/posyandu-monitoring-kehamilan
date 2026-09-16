import { supabase } from "./supabase";

export async function getMothers() {
  const { data, error } = await supabase
    .from("mothers")
    .select("*")
    .order("nama");

  if (error) {
    throw error;
  }

  return data;
}