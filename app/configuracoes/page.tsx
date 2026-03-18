'use client'

import { useState, useEffect } from "react"
import Sidebar from "../_components/Sidebar"
import Header from "../_components/Header"
import { Camera, Save, User, Mail, ShieldCheck, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function Configuracoes() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const supabase = createClient()

  // 1. Carregar dados do usuário logado
  useEffect(() => {
    async function getUserData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setNome(user.user_metadata?.full_name || "")
        setEmail(user.email || "")
      }
      setLoading(false)
    }
    getUserData()
  }, [])

  // 2. Função para salvar alterações
  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const { error } = await supabase.auth.updateUser({
      data: { full_name: nome }
      // Nota: Para mudar e-mail, o Supabase exige confirmação por link, 
      // por segurança, focamos aqui no nome (metadata).
    })

    if (error) {
      alert("Erro ao atualizar: " + error.message)
    } else {
      alert("Perfil atualizado com sucesso!")
    }
    setSaving(false)
  }

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="w-full px-4 md:px-8 pt-6">
          <div className="max-w-7xl mx-auto">
            <Header />
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Configurações do Perfil</h1>
              <p className="text-slate-500 text-sm">Gerencie suas informações pessoais e credenciais de acesso.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Foto de Perfil */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col items-center text-center h-fit">
                <div className="relative group cursor-pointer">
                  <div className="w-32 h-32 rounded-full bg-blue-50 border-4 border-white shadow-md overflow-hidden flex items-center justify-center text-blue-200 font-bold text-4xl uppercase">
                    {nome ? nome.charAt(0) : <User size={48} />}
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-bold text-slate-800">{nome || "Usuário"}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Acesso Profissional</p>
                </div>
              </div>

              {/* Formulário de Edição */}
              <div className="md:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-400 uppercase ml-1">Nome Completo</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input 
                          type="text" 
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-700 font-medium"
                          placeholder="Seu nome"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 opacity-60">
                      <label className="text-xs font-bold text-slate-400 uppercase ml-1">E-mail (Apenas leitura)</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input 
                          type="email" 
                          value={email}
                          disabled
                          className="w-full pl-12 pr-4 py-3 bg-slate-200 border border-slate-100 rounded-2xl cursor-not-allowed text-slate-600 font-medium"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-50 flex flex-col sm:flex-row gap-3">
                      <button 
                        type="submit"
                        disabled={saving}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-50"
                      >
                        {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        {saving ? "Salvando..." : "Salvar Alterações"}
                      </button>
                    </div>

                  </div>
                </form>
              </div>
            </div>

            {/* Segurança */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Segurança da Conta</h3>
                  <p className="text-xs text-slate-400">Gerencie sua senha e acessos.</p>
                </div>
              </div>
              <button className="text-xs font-bold text-slate-600 bg-slate-50 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all">
                Alterar Senha
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}