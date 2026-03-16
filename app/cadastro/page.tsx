import Image from 'next/image';

export default function Cadastro() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0f172a] p-4">
      {/* Card Principal */}
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl md:p-12">
        
        {/* Header/Logo Section */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#0f172a]">
              Pro<span className="text-sky-600">Vet</span>
            </h1>
            <img 
              src="/DogECat.png" 
              alt="ProVet Logo" 
              className="h-12 w-auto object-contain" 
            />
          </div>
          <p className="mt-2 text-sm font-medium text-slate-500 uppercase tracking-widest">
            Clínica Veterinária Virtual
          </p>
        </div>

        {/* Formulário */}
        <form className="mt-10 flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 ml-1 mb-1">Nome</label>
              <input
                type="text"
                placeholder="Digite seu nome"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 ml-1 mb-1">Email</label>
              <input
                type="email"
                placeholder="Digite seu email"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 ml-1 mb-1">Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100"
              />
            </div>
          </form>
         <div> 
          <button className="mt-2 w-full rounded-xl bg-sky-600 py-3 text-sm font-bold text-white shadow-lg shadow-sky-200 transition-all hover:bg-sky-700 hover:shadow-none active:scale-[0.98]">
            Criar Conta
          </button>
          <button className="mt-2 w-full rounded-xl bg-gray-600 py-3 text-sm font-bold text-white shadow-lg shadow-gray-200 transition-all hover:bg-gray-700 hover:shadow-none active:scale-[0.98]">
            <a href="/" className="font-bold text-white hover:text-gray-200 hover:underline">
              Voltar para Login
            </a>
          </button>
        </div>
      </div>
    </main>
  
     
  );
}