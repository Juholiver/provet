"use client"

import { useState, useEffect } from "react"
import Sidebar from "../_components/Sidebar"
import Header from "../_components/Header"
import { Calendar, Edit2, Trash2, Plus, X, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function Consultas() {
  const supabase = createClient()
  
  // Estados de Dados
  const [consultas, setConsultas] = useState([])
  const [listaPets, setListaPets] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Estados do Modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [form, setForm] = useState({
    pet_id: "",
    horario: "",
    data: new Date().toISOString().split('T')[0],
    veterinario: "",
    status: "Pendente"
  })

  // 1. CARREGAR DADOS (READ)
  async function carregarDados() {
    setLoading(true)
    
    // Busca Consultas com dados dos Pets relacionados
    const { data: dataConsultas, error: errC } = await supabase
      .from('consultas')
      .select(`*, pets ( nome, dono )`)
      .order('data', { ascending: true })
      .order('horario', { ascending: true })

    // Busca Pets para o Select do Modal
    const { data: dataPets  } = await supabase.from('pets').select('id, nome')

    if (!errC) setConsultas(dataConsultas || [])
    if (dataPets) setListaPets(dataPets)
    setLoading(false)
  }

  useEffect(() => {
    carregarDados()
  }, [])

  // 2. CRIAR OU EDITAR (CREATE / UPDATE)
  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault()
    
    const dadosConsulta = {
      pet_id: form.pet_id,
      horario: form.horario,
      data: form.data,
      veterinario: form.veterinario,
      status: form.status
    }

    if (editandoId) {
      // Lógica de Update
      const { error } = await supabase
        .from('consultas')
        .update(dadosConsulta)
        .eq('id', editandoId)
      
      if (error) alert("Erro ao atualizar: " + error.message)
    } else {
      // Lógica de Insert
      const { error } = await supabase
        .from('consultas')
        .insert([dadosConsulta])
      
      if (error) alert("Erro ao criar: " + error.message)
    }

    fecharModal()
    carregarDados()
  }

  // 3. APAGAR (DELETE)
  async function handleExcluir(id: string) {
    if (confirm("Tem certeza que deseja cancelar esta consulta?")) {
      const { error } = await supabase
        .from('consultas')
        .delete()
        .eq('id', id)

      if (error) alert("Erro ao excluir: " + error.message)
      else carregarDados()
    }
  }

  // Funções Auxiliares do Modal
  function abrirModalEdicao(consulta: any) {
    setEditandoId(consulta.id)
    setForm({
      pet_id: consulta.pet_id,
      horario: consulta.horario,
      data: consulta.data,
      veterinario: consulta.veterinario,
      status: consulta.status
    })
    setIsModalOpen(true)
  }

  function fecharModal() {
    setIsModalOpen(false)
    setEditandoId(null)
    setForm({ pet_id: "", horario: "", veterinario: "", status: "Pendente", data: new Date().toISOString().split('T')[0] })
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="w-full px-4 md:px-8 pt-6">
          <div className="max-w-7xl mx-auto"><Header /></div>
        </header>

        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">

            {/* Cabeçalho da Seção */}
            <div className="flex justify-between items-end pb-2">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <Calendar className="text-blue-600" size={24} />
                  Agenda de Consultas
                </h1>
                <p className="text-slate-500 text-sm">Organize os atendimentos da clínica.</p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-md active:scale-95 text-sm font-semibold"
              >
                <Plus size={18} /> Nova Consulta
              </button>
            </div>

            {/* Tabela de Consultas */}
            <div className="bg-white rounded-[1.5rem] border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">Data / Horário</th>
                    <th className="px-6 py-4 font-semibold">Paciente</th>
                    <th className="px-6 py-4 font-semibold">Tutor</th>
                    <th className="px-6 py-4 font-semibold">Veterinário</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Ações</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <Loader2 className="animate-spin inline text-blue-600 mb-2" />
                        <p className="text-slate-400 text-sm">Carregando agenda...</p>
                      </td>
                    </tr>
                  ) : consultas.map((c: any) => (
                    <tr key={c.id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-slate-700">{c.horario}</div>
                        <div className="text-[10px] text-slate-400 font-medium uppercase">{new Date(c.data).toLocaleDateString('pt-BR')}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-bold">{c.pets?.nome}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{c.pets?.dono}</td>
                      <td className="px-6 py-4 text-sm text-slate-500 italic">{c.veterinario}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full ${
                          c.status === "Confirmada" ? "bg-emerald-100 text-emerald-600" :
                          c.status === "Pendente" ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-500"
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => abrirModalEdicao(c)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleExcluir(c.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!loading && consultas.length === 0 && (
                <div className="p-12 text-center text-slate-400 italic">Nenhum agendamento encontrado.</div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* MODAL DE CRUD (CREATE/UPDATE) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={fecharModal} className="absolute right-6 top-6 text-slate-400 hover:text-slate-600"><X size={24}/></button>
            
            <h2 className="text-2xl font-black text-slate-800 mb-6">
              {editandoId ? "Editar Consulta" : "Nova Consulta"}
            </h2>

            <form onSubmit={handleSalvar} className="space-y-5">
              {/* Seleção de Pet */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Paciente</label>
                <select 
                  required value={form.pet_id}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                  onChange={(e) => setForm({...form, pet_id: e.target.value})}
                >
                  <option value="">Selecione um pet cadastrado...</option>
                  {listaPets.map((pet: any) => (
                    <option key={pet.id} value={pet.id}>{pet.nome}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Data</label>
                  <input 
                    type="date" required value={form.data}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={(e) => setForm({...form, data: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Horário</label>
                  <input 
                    type="time" required value={form.horario}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={(e) => setForm({...form, horario: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Veterinário Responsável</label>
                <input 
                  type="text" required value={form.veterinario} placeholder="Nome do médico veterinário"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) => setForm({...form, veterinario: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Status do Atendimento</label>
                <div className="flex gap-2">
                  {["Pendente", "Confirmada", "Finalizada"].map((status) => (
                    <button
                      key={status} type="button"
                      onClick={() => setForm({...form, status})}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        form.status === status ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="submit"
                  className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                >
                  {editandoId ? "Salvar Alterações" : "Agendar Consulta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}