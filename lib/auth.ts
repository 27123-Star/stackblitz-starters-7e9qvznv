import { supabase } from "@/lib/supabase";

export type TeacherRecord = {
  id: string;
  name: string;
  role: string;
};

export async function checkTeacherCredentials(name: string, password: string) {
  const { data, error } = await supabase
    .from("teachers")
    .select("id, name, role")
    .eq("name", name)
    .eq("password", password)
    .single();

  if (error || !data) {
    return null;
  }

  return data as TeacherRecord;
}
