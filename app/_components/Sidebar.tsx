import { LayoutDashboard, PawPrint, CalendarDays, Users, LogOut, Settings } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-72 bg-[#0f172a] min-h-[calc(100vh-2rem)] m-4 rounded-[2.5rem] flex flex-col p-8 text-white shadow-2xl shadow-blue-900/40 border border-white/5">
      
      {/* Logo Section */}
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="bg-sky-500 p-2 rounded-xl shadow-lg shadow-sky-500/20">
          <PawPrint size={24} className="text-white" />
        </div>
        <h1 className="text-2xl font-black tracking-tighter">
          Pro<span className="text-sky-400">Vet</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
        <SidebarItem icon={<PawPrint size={20} />} label="Pets" />
        <SidebarItem icon={<CalendarDays size={20} />} label="Consultas" />
        <SidebarItem icon={<Users size={20} />} label="Clientes" />
      </nav>

      {/* Footer Section (Ajustes e Sair) */}
      <div className="mt-auto pt-6 border-t border-slate-700/50 space-y-2">
        <SidebarItem icon={<Settings size={20} />} label="Configurações" />
        <button className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-red-400 hover:bg-red-500/10 transition-all active:scale-95 group">
          <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
          <span className="text-sm">Sair</span>
        </button>
      </div>
    </aside>
  );
}

/**
 * Componente interno para os itens do Menu 
 * (Melhora a manutenção e organização)
 */
function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <a 
      href="#" 
      className={`flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all active:scale-95 ${
        active 
          ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30" 
          : "text-slate-400 hover:bg-slate-800 hover:text-white"
      }`}
    >
      <span className={active ? "text-white" : "text-sky-500"}>
        {icon}
      </span>
      <span className="text-sm">{label}</span>
    </a>
  );
}