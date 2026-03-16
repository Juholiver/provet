import { Search, Plus, Filter, MoreVertical, Heart } from 'lucide-react';

export default function ListaPets() {
  // Mock de dados para visualização
  const pets = [
    { id: 1, nome: "Thor", especie: "Cachorro", raca: "Golden Retriever", idade: "3 anos", status: "Saudável" },
    { id: 2, nome: "Luna", especie: "Gato", raca: "Siamês", idade: "1 ano", status: "Em tratamento" },
    { id: 3, nome: "Mel", especie: "Cachorro", raca: "Poodle", idade: "5 anos", status: "Vacinação" },
  ];

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-700">
      
      {/* Barra de Ações Superior */}
      <div className="flex flex-col mt-4 md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
          <input 
            type="text" 
            placeholder="Pesquisar pet ou tutor..."
            className="w-full pl-12 pr-4 py-3 bg-white/50 border border-blue-100 rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-3 bg-white border border-blue-100 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors">
            <Filter size={20} />
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95">
            <Plus size={20} />
            <span>Novo Pet</span>
          </button>
        </div>
      </div>

      {/* Grid de Cards dos Pets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div key={pet.id} className="group bg-white rounded-[2rem] p-6 shadow-sm border border-blue-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl">
                {pet.especie === "Cachorro" ? "🐶" : "🐱"}
              </div>
              <button className="text-slate-300 hover:text-blue-500 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>

            <div>
              <h3 className="text-xl font-bold text-blue-900 group-hover:text-blue-600 transition-colors">
                {pet.nome}
              </h3>
              <p className="text-blue-500/70 font-medium text-sm mb-4">
                {pet.raca} • {pet.idade}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                pet.status === 'Saudável' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
              }`}>
                {pet.status}
              </span>
              <button className="flex items-center gap-1 text-slate-400 hover:text-red-500 transition-colors text-xs font-bold">
                <Heart size={14} />
                Prontuário
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}