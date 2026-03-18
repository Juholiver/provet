import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Recupera o cookie
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        // Define o cookie (Necessário para OAuth/Login)
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // O Next.js pode lançar erro se tentarmos setar cookies em Server Components
            // Isso é normal, o Middleware ou Route Handlers cuidarão disso.
          }
        },
        // Remove o cookie (Necessário para Logout)
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Tratamento silencioso similar ao set
          }
        },
      },
    }
  )
}