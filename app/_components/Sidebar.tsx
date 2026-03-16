'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, PawPrint, CalendarDays, Users, 
  LogOut, Settings, ChevronLeft, ChevronRight 
} from 'lucide-react';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname(); // Pega a rota atual

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <aside 
      className={`relative ${isExpanded ? 'w-72' : 'w-24'} bg-[#0f172a] min-h-[calc(100vh-2rem)] m-4 rounded-[2.5rem] flex flex-col p-6 text-white shadow-2xl transition-all duration-300 ease-in-out border border-white/5`}
    >
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-10 bg-sky-500 rounded-full p-1 border-4 border-[#0f172a] hover:scale-110 transition-transform z-10"
      >
        {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      {/* Logo Section */}
      <div className={`flex items-center ${isExpanded ? 'gap-3' : 'justify-center'} mb-12 px-2 transition-all`}>
        <div className="bg-sky-500 p-2 rounded-xl shrink-0">
          <PawPrint size={24} className="text-white" />
        </div>
        {isExpanded && (
          <h1 className="text-2xl font-black tracking-tighter whitespace-nowrap">
            Pro<span className="text-sky-400">Vet</span>
          </h1>
        )}
      </div>

      {/* Navigation - Usando os HREFs reais */}
      <nav className="flex-1 space-y-2 overflow-hidden">
        <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" href="/dashboard" isExpanded={isExpanded} active={pathname === '/dashboard'} />
        <SidebarItem icon={<PawPrint size={20} />} label="Pets" href="/pets" isExpanded={isExpanded} active={pathname === '/pets'} />
        <SidebarItem icon={<CalendarDays size={20} />} label="Consultas" href="/consultas" isExpanded={isExpanded} active={pathname === '/consultas'} />
        <SidebarItem icon={<Users size={20} />} label="Clientes" href="/clientes" isExpanded={isExpanded} active={pathname === '/clientes'} />
      </nav>

      {/* Footer Section */}
      <div className="mt-auto pt-6 border-t border-slate-700/50 space-y-2">
        <SidebarItem icon={<Settings size={20} />} label="Configurações" href="/configuracoes" isExpanded={isExpanded} active={pathname === '/configuracoes'} />
        
        <button className={`w-full flex items-center ${isExpanded ? 'gap-4 px-4' : 'justify-center'} py-4 rounded-2xl font-bold text-red-400 hover:bg-red-500/10 transition-all group`}>
          <LogOut size={20} className="shrink-0 group-hover:translate-x-1 transition-transform" />
          {isExpanded && <span className="text-sm whitespace-nowrap">Sair</span>}
        </button>
      </div>
    </aside>
  );
}

/**
 * SidebarItem com Link do Next.js
 */
function SidebarItem({ 
  icon, label, href, active, isExpanded 
}: { 
  icon: React.ReactNode, label: string, href: string, active: boolean, isExpanded: boolean 
}) {
  return (
    <Link 
      href={href} 
      className={`flex items-center ${isExpanded ? 'gap-4 px-4' : 'justify-center'} py-4 rounded-2xl font-bold transition-all active:scale-95 ${
        active 
          ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30" 
          : "text-slate-400 hover:bg-slate-800 hover:text-white"
      }`}
      title={!isExpanded ? label : ""}
    >
      <span className={`${active ? "text-white" : "text-sky-400"} shrink-0`}>
        {icon}
      </span>
      {isExpanded && <span className="text-sm whitespace-nowrap">{label}</span>}
    </Link>
  );
}