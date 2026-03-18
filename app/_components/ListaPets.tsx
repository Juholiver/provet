"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Search, Plus, Filter, MoreVertical, Heart, PawPrint, Trash2, Scale } from 'lucide-react';

export default function ListaPets() {
  const [pets, setPets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [termoBusca, setTermoBusca] = useState("");
  const [filtroEspecie, setFiltroEspecie] = useState("Todos");

  const supabase = createClient()

  useEffect(() => {
    async function carregarPets() {
      setLoading(true)
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .order('nome', { ascending: true })

      if (!error) {
        setPets(data)
      }
      setLoading(false)
    }

    carregarPets()
  }, [])

  async function excluirPet(id: string) {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este pet?");
    
    if (confirmacao) {
      const { error } = await supabase
        .from('pets')
        .delete()
        .eq('id', id);

      if (error) {
        alert("Erro ao excluir pet: " + error.message);
      } else {
        setPets(pets.filter(pet => pet.id !== id));
      }
    }
  }

  const petsFiltrados = pets.filter((pet) => {
    const coincideNome = pet.nome?.toLowerCase().includes(termoBusca.toLowerCase());
    const coincideEspecie = filtroEspecie === "Todos" || pet.tipo === filtroEspecie;
    return coincideNome && coincideEspecie;
  });

  if (loading) return <div className="p-10 text-center text-blue-600 font-bold">Carregando pets...</div>

  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-4 md:p-10">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Barra de Ações Superior */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-[2rem] shadow-sm border border-blue-50 text-blue-600">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
            <input 
              type="text" 
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              placeholder="Pesquisar pet ou tutor..."
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-blue-100 rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none transition-all placeholder:text-slate-400 text-slate-700"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <select 
              value={filtroEspecie}
              onChange={(e) => setFiltroEspecie(e.target.value)}
              className="p-3.5 bg-white border border-blue-100 rounded-2xl text-blue-600 hover:bg-blue-50 transition-colors shadow-sm outline-none cursor-pointer"
            >
              <option value="Todos">Todas as Espécies</option>
              <option value="Cachorro">Cachorro</option>
              <option value="Gato">Gato</option>
              <option value="Coelho">Coelho</option>
            </select>
            
            <button className="p-3.5 bg-white border border-blue-100 rounded-2xl text-blue-600 hover:bg-blue-50 transition-colors shadow-sm">
              <Filter size={22} />
            </button>
          </div>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {petsFiltrados.map((pet) => (
            <div 
              key={pet.id} 
              className="group bg-white rounded-[2.5rem] p-8 shadow-sm border border-blue-50/50 hover:shadow-2xl hover:shadow-blue-100/50 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                    {pet.tipo === "Cachorro" ? "🐶" : pet.tipo === "Gato" ? "🐱" : "🐰"}
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => excluirPet(pet.id)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                      title="Excluir Pet"
                    >
                      <Trash2 size={20} />
                    </button>
                    <button className="p-2 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-800 group-hover:text-blue-600 transition-colors tracking-tight">
                    {pet.nome}
                  </h3>
                  <div className="flex items-center gap-2 text-blue-500/70 font-semibold text-sm pb-4">
                    <PawPrint size={14} />
                    <span>{pet.raca || pet.tipo} • {pet.idade} anos</span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-slate-600 text-sm">
                      <span className="font-semibold text-blue-500">Tutor:</span> {pet.dono || "Não registrado"}
                    </p>
                    {/* Exibição do Peso corrigida */}
                    <p className="text-slate-600 text-sm flex items-center gap-1">
                      <span className="font-semibold text-blue-500">Peso:</span> {pet.peso ? `${pet.peso} kg` : "Não informado"}
                    </p>
                    <p className="text-slate-600 text-sm">
                      <span className="font-semibold text-blue-500">Contato:</span> {pet.telefone || "Não registrado"}
                    </p>
                    <p className="text-slate-600 text-sm italic">
                      <span className="font-semibold text-blue-500 not-italic">Obs:</span> {pet.observacoes || "Nenhuma"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className={`text-xs font-bold px-4 py-1.5 rounded-full tracking-wide uppercase ${
                  pet.status === 'Saudável' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                }`}>
                  {pet.status || 'Ativo'}
                </span>
                <Heart size={18} className="text-pink-200 group-hover:text-pink-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {petsFiltrados.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-[3rem] border-2 border-dashed border-blue-100">
             <div className="text-6xl mb-4">🏠</div>
             <p className="text-slate-400 font-medium text-lg">Nenhum pet encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}