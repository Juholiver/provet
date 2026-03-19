"use client"

import { useState, useEffect } from "react"
import Sidebar from "../_components/Sidebar"
import { Calendar, Edit2, Trash2, Plus, X, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function Consultas() {
  const supabase = createClient()
  
  // Estados
  const [consultas, setConsultas] = useState<any[]>([])
  const [listaPets, setListaPets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [form, setForm] = useState({
    pet_id: "",
    horario: "",
    data: new Date().toISOString().split('T')[0],
    veterinario: "",
    status: "Pendente"
  })

  async function carregarDados() {
    setLoading(true)
    const { data: dataConsultas, error: errC } = await supabase
      .from('consultas')
      .select(`*, pets ( nome, dono )`)
      .order('data', { ascending: true })
    const { data: dataPets } = await supabase.from('pets').select('id, nome')
    if (!errC) setConsultas(dataConsultas || [])
    if (dataPets) setListaPets(dataPets)
    setLoading(false)
  }

  useEffect(() => { carregarDados() }, [])

  // Funções de Modal (Ajustadas para não quebrar)
  function fecharModal() {
    setIsModalOpen(false)
    setEditandoId(null)
    setForm({ pet_id: "", horario: "", veterinario: "", status: "Pendente", data: new Date().toISOString().split('T')[0] })
  }

  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault()
    const { error } = editandoId 
      ? await supabase.from('consultas').update(form).eq('id', editandoId)
      : await supabase.from('consultas').insert([form])
    
    if (error) alert(error.message)
    fecharModal()
    carregarDados()
  }

  return (
    // 'flex-col md:flex-row' permite que o sidebar e o conteúdo se organizem bem
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 font-sans">
      
      {/* 1. SIDEBAR */}
      <Sidebar />

      {/* 2. CONTEÚDO PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* ESPAÇO PARA O BOTÃO MOBILE (Apenas no celular) */}
        <div className="h-24 md:hidden" /> 

        <main className="p-4 md:p-10">
          <div className="max-w-7xl mx-auto space-y-6">

            {/* Cabeçalho */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <Calendar className="text-blue-600" /> Agenda de Consultas
                </h1>
                <p className="text-slate-500 text-sm">Gerencie os horários da clínica.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={20} /> Nova Consulta
              </button>
            </div>

            {/* Tabela Responsiva */}
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto"> {/* Isso permite o scroll lateral no celular */}
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs uppercase font-bold">
                      <th className="px-6 py-5">Data / Hora</th>
                      <th className="px-6 py-5">Paciente</th>
                      <th className="px-6 py-5">Status</th>
                      <th className="px-6 py-5 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      <tr><td colSpan={4} className="p-10 text-center text-slate-400">Carregando...</td></tr>
                    ) : (
                      consultas.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-700">{c.horario}</div>
                            <div className="text-xs text-slate-400">{new Date(c.data).toLocaleDateString()}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-blue-600">{c.pets?.nome}</div>
                            <div className="text-xs text-slate-500">{c.pets?.dono}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-amber-100 text-amber-600">
                              {c.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => { setEditandoId(c.id); setForm(c); setIsModalOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600"><Edit2 size={16}/></button>
                            <button onClick={async () => { if(confirm("Excluir?")) await supabase.from('consultas').delete().eq('id', c.id); carregarDados(); }} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={16}/></button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[999]">
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={fecharModal} className="absolute right-6 top-6 text-slate-400"><X /></button>
            <h2 className="text-2xl font-black mb-6 text-slate-800">Agendamento</h2>
            <form onSubmit={handleSalvar} className="space-y-4">
              {/* Seus campos de input aqui... */}
              <select 
                value={form.pet_id} 
                onChange={e => setForm({...form, pet_id: e.target.value})}
                className="w-full p-4 bg-slate-50 rounded-2xl border outline-none focus:border-blue-500 text-blue-600"
              >
                <option value="">Escolha o Pet</option>
                {listaPets.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
              </select>
              <input type="date" value={form.data} onChange={e => setForm({...form, data: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl border text-blue-600" />
              <input type="time" value={form.horario} onChange={e => setForm({...form, horario: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl border text-blue-600" />
              <input type="text" placeholder="Veterinário" value={form.veterinario} onChange={e => setForm({...form, veterinario: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl border text-blue-600" />
              
              <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold shadow-lg">Confirmar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}