'use client'

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function Header() {
  const [userName, setUserName] = useState("") // Nome padrão enquanto carrega
  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      // Busca o usuário logado na sessão atual
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        // O Supabase guarda o nome geralmente em user_metadata.full_name
        // ou você pode pegar a primeira parte do email se o nome não estiver definido
        const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0]
        
        if (name) {
          setUserName(name)
        }
      }
    }

    getUser()
  }, [])

  return (
    <header className="
      w-full 
      sticky top-4 z-50 
      flex flex-col md:flex-row 
      items-center justify-between 
      p-4 md:px-8 
      bg-white/80 backdrop-blur-md 
      rounded-2xl md:rounded-[2.5rem] 
      shadow-sm border border-white/50 
      mb-8
    ">
      <div className="text-center md:text-left">
        <h1 className="text-xl md:text-2xl font-bold text-blue-900 transition-all">
          Bem-vindo, Doutor(a) <span className="text-blue-600"> {userName}!</span>
        </h1>
        <p className="text-sm md:text-base text-blue-500/80 font-medium">
          Aqui estão as atualizações da sua clínica.
        </p>
      </div>
    </header>
  );
}