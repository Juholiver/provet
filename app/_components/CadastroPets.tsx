"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function CadastroPets() {
  const supabase = createClient()

  const [nome, setNome] = useState("")
  const [tipo, setTipo] = useState("Cachorro")
  const [idade, setIdade] = useState("")
  const [peso, setPeso] = useState("")
  const [observacoes, setObservacoes] = useState("")

  async function handleCadastro(e: React.FormEvent) {
  e.preventDefault()

  // pegar usuário logado
  const { data: userData } = await supabase.auth.getUser()
  const user = userData.user

  if (!user) {
    alert("Você precisa estar logado para cadastrar um pet!")
    return
  }

  // inserir no Supabase
  const { error } = await supabase.from("pets").insert([
    {
      nome,
      tipo,
      idade: idade ? parseInt(idade) : null,
      peso,
      observacoes,
      user_id: user.id
    }
  ])

  if (error) {
    alert("Erro ao cadastrar pet: " + error.message)
  } else {
    alert("Pet cadastrado com sucesso! 🐾")
    // limpar formulário
    setNome("")
    setTipo("")
    setIdade("")
    setPeso("")
    setObservacoes("")
  }
}

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-white via-blue-50 to-blue-200 p-4 md:p-8">
      
      {/* Card Principal */}
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg rounded-[2rem] shadow-xl border border-white p-6 md:p-10 transition-all">
        
        {/* Cabeçalho do Card */}
        <div className="text-center mb-8">
          <span className="text-4xl">🐾</span>
          <h1 className="text-3xl font-extrabold text-blue-900 mt-2">Cadastro de Pets</h1>
          <p className="text-blue-600/70">Registre as informações do novo amiguinho.</p>
        </div>

        {/* Formulário Grid */}
        <form onSubmit={handleCadastro} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Nome do Pet */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-blue-900 ml-1">Nome do Pet</label>
            <input 
              type="text" 
              placeholder="Ex: Totó"
              onChange={e => setNome(e.target.value)}
              value={nome}
              className="w-full px-4 py-3 rounded-2xl border border-blue-100 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/50 transition-all text-blue-800"
            />
          </div>

          {/* Espécie */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-blue-900 ml-1">Espécie</label>
            <select className="w-full px-4 py-3 rounded-2xl border border-blue-100 focus:ring-2 focus:ring-blue-400 bg-white/50 outline-none text-blue-800" onChange={e => setTipo(e.target.value)} value={tipo}>
              <option>Cachorro</option>
              <option>Gato</option>
              <option>Coelho</option>
              <option>Hamster</option>
              <option>Outro</option>
            </select>
          </div>

          {/* Idade */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-blue-900 ml-1">Idade (anos)</label>
            <input
              value={idade}
              onChange={e => setIdade(e.target.value)} 
              type="number" 
              className="w-full px-4 py-3 rounded-2xl border border-blue-100 focus:ring-2 focus:ring-blue-400 bg-white/50 text-blue-800"
            />
          </div>

          {/* Peso */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-blue-900 ml-1">Peso (kg)</label>
            <input
              value={peso}
              onChange={e => setPeso(e.target.value)} 
              type="text" 
              placeholder="0.0"
              className="w-full px-4 py-3 rounded-2xl border border-blue-100 focus:ring-2 focus:ring-blue-400 bg-white/50 text-blue-800"
            />
          </div>

          {/* Observações - Ocupa as duas colunas no desktop */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-semibold text-blue-900 ml-1">Observações Médicas</label>
            <textarea 
              rows={3}
              value={observacoes}
              onChange={e => setObservacoes(e.target.value)}
              placeholder="Alergias, vacinas pendentes..."
              className="w-full px-4 py-3 rounded-2xl border border-blue-100 focus:ring-2 focus:ring-blue-400 bg-white/50 text-blue-800"
            ></textarea>
          </div>

          {/* Botão de Ação */}
          <button type="submit" className="md:col-span-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95">
            Finalizar Cadastro
          </button>
        </form>

      </div>
    </div>
  );
}