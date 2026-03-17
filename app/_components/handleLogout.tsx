import { createClient } from "@/lib/supabase/client"

export async function handleLogout() {
  const supabase = createClient()
  await supabase.auth.signOut()
  window.location.href = "/"
}