export default function Home() {
  return (
    /* Fundo com Gradiente mais presente: Branco para um Azul Médio Suave */
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-white via-blue-100 to-blue-300 p-4">
      
      {/* Card com Sombra Azul mais Profunda e Bordas Suaves */}
      <div className="w-full max-w-md rounded-[2.5rem] bg-white/90 p-8 shadow-[0_20px_50px_rgba(30,58,138,0.2)] backdrop-blur-md border border-white/50 md:p-12">
        
        {/* Header/Logo Section */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black tracking-tighter text-blue-900">
              Pro<span className="text-blue-600">Vet</span>
            </h1>
            <img 
              src="/DogECat.png" 
              alt="ProVet Logo" 
              className="h-14 w-auto drop-shadow-md" 
            />
          </div>
          <p className="mt-2 text-[10px] font-black text-blue-800/60 uppercase tracking-[0.3em]">
            Sua Clínica Veterinária Virtual
          </p>
        </div>

        {/* Formulário */}
        <form className="mt-10 flex flex-col gap-4">
          <div className="group">
            <label className="text-xs font-bold text-blue-900/70 ml-2 mb-1 block">Usuário</label>
            <input
              type="text"
              placeholder="exemplo@provet.com"
              className="w-full rounded-2xl border-2 border-transparent bg-blue-50/50 px-5 py-4 text-blue-900 transition-all placeholder:text-blue-300 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="group">
            <div className="flex justify-between items-center px-2 mb-1">
                <label className="text-xs font-bold text-blue-900/70">Senha</label>
                <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">Esqueceu?</a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-2xl border-2 border-transparent bg-blue-50/50 px-5 py-4 text-blue-900 transition-all placeholder:text-blue-300 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-2xl bg-blue-600 py-4 text-sm font-black text-white shadow-xl shadow-blue-200 transition-all hover:bg-blue-700 hover:-translate-y-1 active:scale-95 active:translate-y-0"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="mt-10 text-center text-sm font-bold text-blue-900/50">
          Não tem uma conta?{' '}
          <a href="/cadastro" className="text-blue-600 hover:underline decoration-2 underline-offset-4">
            Cadastre-se agora
          </a>
        </div>
      </div>
    </main>
  );
}