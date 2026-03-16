'use client'

import { useState } from "react"
import Sidebar from "../_components/Sidebar"
import Header from "../_components/Header"
import { Camera, Save, User, Mail, ShieldCheck, Bell } from "lucide-react"

export default function Configuracoes() {
  const [nome, setNome] = useState("Dra. Ana Silva")
  const [email, setEmail] = useState("ana.silva@provet.com.br")

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
            
            {/* Título da Página */}
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Configurações do Perfil</h1>
              <p className="text-slate-500 text-sm">Gerencie suas informações pessoais e credenciais de acesso.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Coluna da Esquerda: Foto e Troca */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col items-center text-center">
                <div className="relative group cursor-pointer">
                  <div className="w-32 h-32 rounded-full bg-blue-50 border-4 border-white shadow-md overflow-hidden flex items-center justify-center">
                    {/* Placeholder para a foto. Quando houver uma imagem, use a tag <img> */}
                    <User size={48} className="text-blue-200" />
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="text-white" size={24} />
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-bold text-slate-800">{nome}</h3>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-tighter">Médica Veterinária</p>
                </div>

                <button className="mt-6 text-xs font-bold text-blue-600 border border-blue-100 px-4 py-2 rounded-xl hover:bg-blue-50 transition-all">
                  Alterar Foto
                </button>
              </div>

              {/* Coluna da Direita: Formulário (Ocupa 2 colunas no desktop) */}
              <div className="md:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    
                    {/* Campo Nome */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-400 uppercase ml-1">Nome Completo</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input 
                          type="text" 
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-700 font-medium"
                        />
                      </div>
                    </div>

                    {/* Campo Email */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-400 uppercase ml-1">E-mail Profissional</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-700 font-medium"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-50 flex flex-col sm:flex-row gap-3">
                      <button 
                        type="button"
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                      >
                        <Save size={18} />
                        Salvar Alterações
                      </button>
                      <button 
                        type="button"
                        className="flex items-center justify-center gap-2 bg-slate-100 text-slate-500 px-6 py-3 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                      >
                        Cancelar
                      </button>
                    </div>

                  </div>
                </form>
              </div>

            </div>

            {/* Seção Extra: Segurança (Exemplo de simplicidade) */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Segurança da Conta</h3>
                  <p className="text-xs text-slate-400">Altere sua senha ou ative a autenticação em duas etapas.</p>
                </div>
              </div>
              <button className="text-xs font-bold text-slate-600 bg-slate-50 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all">
                Configurar
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}