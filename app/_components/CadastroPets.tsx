export default function CadastroPets() {
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
        <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Nome do Pet */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-blue-900 ml-1">Nome do Pet</label>
            <input 
              type="text" 
              placeholder="Ex: Totó"
              className="w-full px-4 py-3 rounded-2xl border border-blue-100 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/50 transition-all"
            />
          </div>

          {/* Espécie */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-blue-900 ml-1">Espécie</label>
            <select className="w-full px-4 py-3 rounded-2xl border border-blue-100 focus:ring-2 focus:ring-blue-400 bg-white/50 outline-none">
              <option>Cachorro</option>
              <option>Gato</option>
              <option>Outro</option>
            </select>
          </div>

          {/* Idade */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-blue-900 ml-1">Idade (anos)</label>
            <input 
              type="number" 
              className="w-full px-4 py-3 rounded-2xl border border-blue-100 focus:ring-2 focus:ring-blue-400 bg-white/50"
            />
          </div>

          {/* Peso */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-blue-900 ml-1">Peso (kg)</label>
            <input 
              type="text" 
              placeholder="0.0"
              className="w-full px-4 py-3 rounded-2xl border border-blue-100 focus:ring-2 focus:ring-blue-400 bg-white/50"
            />
          </div>

          {/* Observações - Ocupa as duas colunas no desktop */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-semibold text-blue-900 ml-1">Observações Médicas</label>
            <textarea 
              rows={3}
              placeholder="Alergias, vacinas pendentes..."
              className="w-full px-4 py-3 rounded-2xl border border-blue-100 focus:ring-2 focus:ring-blue-400 bg-white/50"
            ></textarea>
          </div>

          {/* Botão de Ação */}
          <button className="md:col-span-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95">
            Finalizar Cadastro
          </button>
        </form>

      </div>
    </div>
  );
}