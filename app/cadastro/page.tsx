"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
 

export default function Cadastro() {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const supabase = createClient()

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault()

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })

    if (error) {
      alert("Erro: " + error.message)
    } else {
      alert("Usuário criado com sucesso!")
    }
  }


  return (
    /* Fundo com o mesmo Gradiente: Branco para Azul Médio */
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-white via-blue-100 to-blue-300 p-4">
      
      {/* Card Principal com o mesmo estilo de sombra e bordas */}
      <div className="w-full max-w-md rounded-[2.5rem] bg-white/90 p-8 shadow-[0_20px_50px_rgba(30,58,138,0.2)] backdrop-blur-md border border-white/50 md:p-12">
        
        {/* Header/Logo Section */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black tracking-tighter text-blue-900">
              Pro<span className="text-blue-600">Vet</span>
            </h1>
            <img 
              src="/DogECat.png" 
              alt="ProVet Logo" 
              className="h-14 w-auto drop-shadow-md" 
            />
          </div>
          <p className="mt-2 text-[10px] font-black text-blue-800/60 uppercase tracking-[0.3em]">
            Crie sua conta gratuita
          </p>
        </div>

        {/* Formulário */}
        <form className="mt-10 flex flex-col gap-4">
          <div className="group">
            <label className="text-xs font-bold text-blue-900/70 ml-2 mb-1 block">Nome</label>
            <input
              type="text"
              placeholder="Nome"
              className="w-full rounded-2xl border-2 border-transparent bg-blue-50/50 px-5 py-4 text-blue-900 transition-all placeholder:text-blue-300 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>

          <div className="group">
            <label className="text-xs font-bold text-blue-900/70 ml-2 mb-1 block">Email</label>
            <input
              type="email"
              placeholder="seu@email.com"
              className="w-full rounded-2xl border-2 border-transparent bg-blue-50/50 px-5 py-4 text-blue-900 transition-all placeholder:text-blue-300 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>

          <div className="group">
            <label className="text-xs font-bold text-blue-900/70 ml-2 mb-1 block">Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-2xl border-2 border-transparent bg-blue-50/50 px-5 py-4 text-blue-900 transition-all placeholder:text-blue-300 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>

          <div className="mt-2 flex flex-col gap-3">
            <button
              type="submit"
              className="w-full rounded-2xl bg-blue-600 py-4 text-sm font-black text-white shadow-xl shadow-blue-200 transition-all hover:bg-blue-700 hover:-translate-y-1 active:scale-95 active:translate-y-0"
              onClick={handleCadastro}
            >
              CRIAR MINHA CONTA
            </button>
            
            <a 
              href="/" 
              className="w-full rounded-2xl bg-white border-2 border-blue-100 py-4 text-center text-sm font-bold text-blue-600 transition-all hover:bg-blue-50 active:scale-95"
            >
              Voltar para Login
            </a>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-[11px] text-blue-900/40 px-4">
          Ao se cadastrar, você concorda com nossos <br/>
          <span className="font-bold underline cursor-pointer">Termos de Uso</span> e <span className="font-bold underline cursor-pointer">Privacidade</span>.
        </p>
      </div>
    </main>
  );
}