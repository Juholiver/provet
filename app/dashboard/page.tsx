import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import DashboardUI from "./DashboardUI"

export default async function Dashboard() {

  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/")
  }

  return <DashboardUI />
}