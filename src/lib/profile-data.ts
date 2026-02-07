import type { OnboardingEventRow } from "@/lib/onboardingEvents";
import { supabase } from "@/utils/supabase/client";

export async function fetchCompletionPayload(sessionId: string) {
  const { data, error } = await supabase
    .from("onboarding_events")
    .select("*")
    .eq("session_id", sessionId)
    .eq("type", "complete")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) throw error;
  return data as OnboardingEventRow;
}
