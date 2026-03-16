import Sidebar from "../_components/Sidebar";

export default function Dashboard() {
    return (
    // Adicionamos "flex-row" para garantir que fiquem lado a lado
    <main className="flex min-h-screen bg-gradient-to-tr from-white via-blue-100 to-blue-300">
      
      {/* 1. Sidebar primeiro para ficar na esquerda */}
      <Sidebar />

      {/* 2. Área de Conteúdo (ocupa o resto do espaço com flex-1) */}
      <div className="flex-1 flex items-center justify-center p-4">
        
        {/* O seu Card de boas-vindas */}
        <div className="w-full max-w-md rounded-[2.5rem] bg-white/90 p-8 shadow-[0_20px_50px_rgba(30,58,138,0.2)] backdrop-blur-md border border-white/50 md:p-12">
          <h1 className="text-3xl font-bold text-blue-900">Dashboard</h1>
          <p className="text-blue-600">Bem-vindo à sua dashboard!</p>
        </div>

      </div>
    </main>
  );
}
