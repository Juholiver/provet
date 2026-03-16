'use client'

import { useState } from "react"
import Sidebar from "../_components/Sidebar"
import Header from "../_components/Header"
import { Calendar, Edit2, Trash2, Plus } from "lucide-react"

export default function Consultas() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const consultas = [
    { id: 1, horario: "09:00", pet: "Rex", tutor: "João Silva", veterinario: "Dra. Ana", status: "Confirmada" },
    { id: 2, horario: "10:30", pet: "Luna", tutor: "Maria Oliveira", veterinario: "Dr. Marcos", status: "Pendente" },
    { id: 3, horario: "14:00", pet: "Thor", tutor: "Pedro Lima", veterinario: "Dra. Ana", status: "Finalizada" }
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

            {/* Topo: Título e Botão */}
            <div className="flex justify-between items-end pb-2">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <Calendar className="text-blue-600" size={24} />
                  Consultas
                </h1>
                <p className="text-slate-500 text-sm">Gerencie os horários e atendimentos de hoje.</p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-sm active:scale-95 text-sm font-semibold"
              >
                <Plus size={18} />
                Nova Consulta
              </button>
            </div>

            {/* Tabela Clean */}
            <div className="bg-white rounded-[1.5rem] border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">Horário</th>
                    <th className="px-6 py-4 font-semibold">Paciente</th>
                    <th className="px-6 py-4 font-semibold">Tutor</th>
                    <th className="px-6 py-4 font-semibold">Veterinário</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Ações</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {consultas.map((consulta) => (
                    <tr key={consulta.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4 text-sm font-bold text-slate-700">{consulta.horario}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-medium">{consulta.pet}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{consulta.tutor}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{consulta.veterinario}</td>

                      <td className="px-6 py-4">
                        <span className={`
                          px-3 py-1 text-[10px] font-bold uppercase rounded-full
                          ${consulta.status === "Confirmada" && "bg-emerald-100 text-emerald-600"}
                          ${consulta.status === "Pendente" && "bg-amber-100 text-amber-600"}
                          ${consulta.status === "Finalizada" && "bg-slate-100 text-slate-500"}
                        `}>
                          {consulta.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Editar">
                            <Edit2 size={16} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Cancelar">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {consultas.length === 0 && (
                <div className="p-12 text-center text-slate-400">
                  Nenhuma consulta encontrada para hoje.
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}