'use client'

import { useState, useEffect } from "react"
import Sidebar from "../_components/Sidebar"
import Header from "../_components/Header"
import { Users, Search, Mail, Phone, MoreHorizontal, UserPlus, ExternalLink } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Pet {
  id: string
  nome: string
  dono: string
  observacoes: string | null
}

export default function Clientes() {
  const [searchTerm, setSearchTerm] = useState("")
  const [clientes, setClientes] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPets() {
      // ERRO 1 CORRIGIDO: Removido o await de createClient()
      const supabase = createClient() 
      
      const { data, error } = await supabase
        .from('pets')
        .select('id, nome, dono, observacoes')

      if (error) {
        console.error("Erro ao buscar pets:", error)
      } else {
        setClientes(data || [])
      }
      setLoading(false)
    }

    fetchPets()
  }, [])

  const filteredClientes = clientes.filter(pet =>
    pet.dono?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.nome?.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
                <p className="text-slate-500 text-sm">Gerencie os tutores e seus pets.</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Buscar cliente..."
                    className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64 transition-all text-blue-600"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
              </div>
            </div>

            {/* Tabela de Clientes */}
            <div className="bg-white rounded-[1.5rem] border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">Cliente</th>
                    <th className="px-6 py-4 font-semibold">Pets Associados</th>
                    <th className="px-6 py-4 font-semibold">Observações</th>
                    <th className="px-6 py-4 font-semibold text-right">Ações</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr><td colSpan="4" className="text-center py-10 text-slate-400">Carregando...</td></tr>
                  ) : filteredClientes.map((pet) => (
                    <tr key={pet.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                            {pet.dono?.charAt(0) || "U"}
                          </div>
                          <span className="text-sm font-bold text-slate-700">{pet.dono}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded-md font-medium border border-blue-100">
                          {pet.nome}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {pet.observacoes || "-"}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg transition-all">
                          <ExternalLink size={16} />
                        </button>
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