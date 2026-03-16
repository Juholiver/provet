'use client'

import { useState } from "react"
import Sidebar from "../_components/Sidebar"
import Header from "../_components/Header"
import { Users, Search, Mail, Phone, MoreHorizontal, UserPlus, ExternalLink } from "lucide-react"

export default function Clientes() {
  const [searchTerm, setSearchTerm] = useState("")

  const clientes = [
    { id: 1, nome: "João Silva", email: "joao.silva@email.com", telefone: "(15) 99123-4567", pets: ["Rex", "Mimi"], ultimaVisita: "12 Mar 2024" },
    { id: 2, nome: "Maria Oliveira", email: "maria.o@provider.com", telefone: "(15) 99876-5432", pets: ["Luna"], ultimaVisita: "10 Mar 2024" },
    { id: 3, nome: "Pedro Lima", email: "plima.vet@email.com", telefone: "(11) 98822-1100", pets: ["Thor", "Bibi", "Juca"], ultimaVisita: "05 Mar 2024" },
  ]

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
          <div className="max-w-7xl mx-auto space-y-6">

            {/* Cabeçalho da Página */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <Users className="text-blue-600" size={24} />
                  Clientes
                </h1>
                <p className="text-slate-500 text-sm">Gerencie os tutores e suas informações de contato.</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text"
                    placeholder="Buscar cliente..."
                    className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64 transition-all"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-sm active:scale-95 text-sm font-semibold">
                  <UserPlus size={18} />
                  Novo Cliente
                </button>
              </div>
            </div>

            {/* Tabela de Clientes */}
            <div className="bg-white rounded-[1.5rem] border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">Cliente</th>
                    <th className="px-6 py-4 font-semibold">Contato</th>
                    <th className="px-6 py-4 font-semibold">Pets Associados</th>
                    <th className="px-6 py-4 font-semibold">Última Visita</th>
                    <th className="px-6 py-4 font-semibold text-right">Ações</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {clientes.map((cliente) => (
                    <tr key={cliente.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                            {cliente.nome.charAt(0)}
                          </div>
                          <span className="text-sm font-bold text-slate-700">{cliente.nome}</span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 space-y-1">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Mail size={12} className="text-blue-400" />
                          {cliente.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Phone size={12} className="text-blue-400" />
                          {cliente.telefone}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {cliente.pets.map((pet, idx) => (
                            <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-md font-medium border border-slate-200">
                              {pet}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {cliente.ultimaVisita}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                            <ExternalLink size={16} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}