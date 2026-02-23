import { supabase } from "@/utils/supabase/client";

export type UserRow = {
  id?: string;
  username: string;
  email?: string;
  recommendation_json: any;
  created_at?: string;
  updated_at?: string;
};

export async function createOrUpdateUser(params: {
  username: string;
  email?: string;
  recommendation_json: any;
}) {
  const { data, error } = await supabase
    .from("User")
    .upsert(
      {
        username: params.username,
        email: params.email ?? null,
        recommendation_json: params.recommendation_json,
      },
      { onConflict: 'username' }
    )
    .select()
    .single();

  if (error) throw error;
  return data as UserRow;
}

export async function fetchUserByUsername(username: string) {
  const { data, error } = await supabase
    .from("User")
    .select("*")
    .eq("username", username)
    .single();

  if (error) throw error;
  return data as UserRow;
}

export async function fetchUserByEmail(email: string) {
  const { data, error } = await supabase
    .from("User")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) throw error;
  return data as UserRow | null;
}
