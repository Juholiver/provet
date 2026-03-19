'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, PawPrint, CalendarDays, Users, 
  LogOut, Settings, ChevronLeft, ChevronRight, Menu, X 
} from 'lucide-react';
import { handleLogout } from './handleLogout';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const toggleMobile = () => setIsOpenMobile(!isOpenMobile);

  // Fecha o menu mobile ao mudar de rota
  useEffect(() => {
    setIsOpenMobile(false);
  }, [pathname]);

  return (
    <>
      {/* 1. BOTÃO MOBILE - Agora usando 'absolute' para NÃO acompanhar a tela */}
      <button 
        onClick={toggleMobile}
        className="md:hidden absolute top-8 left-8 z-[60] bg-sky-500 text-white p-3 rounded-2xl shadow-lg active:scale-95 transition-transform"
      >
        {isOpenMobile ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 2. OVERLAY - Mantido fixed para cobrir a tela toda quando aberto */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] md:hidden" 
          onClick={toggleMobile}
        />
      )}

      {/* 3. ASIDE (SIDEBAR) */}
      <aside 
        className={`
          /* No mobile ele flutua, mas o botão que o chama fica parado no topo */
          fixed md:relative z-[50]
          ${isOpenMobile ? 'translate-x-0' : '-translate-x-[110%] md:translate-x-0'}
          
          /* Largura */
          ${isExpanded ? 'w-72' : 'md:w-24 w-72'} 
          
          bg-[#0f172a] min-h-[calc(100vh-2rem)] m-4 rounded-[2.5rem] 
          flex flex-col p-6 text-white shadow-2xl transition-all duration-300 ease-in-out 
          border border-white/5
        `}
      >
        {/* Botão da Setinha (Apenas Desktop) */}
        <button 
          onClick={toggleSidebar}
          className="hidden md:flex absolute -right-3 top-10 bg-sky-500 rounded-full p-1 border-4 border-[#0f172a] hover:scale-110 transition-transform z-10"
        >
          {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>

        {/* Logo Section */}
        <div className={`flex items-center ${isExpanded ? 'gap-3' : 'md:justify-center gap-3'} mb-12 px-2`}>
          <div className="bg-sky-500 p-2 rounded-xl shrink-0">
            <PawPrint size={24} className="text-white" />
          </div>
          {(isExpanded || isOpenMobile) && (
            <h1 className="text-2xl font-black tracking-tighter whitespace-nowrap">
              Pro<span className="text-sky-400">Vet</span>
            </h1>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" href="/dashboard" isExpanded={isExpanded} isOpenMobile={isOpenMobile} active={pathname === '/dashboard'} />
          <SidebarItem icon={<PawPrint size={20} />} label="Pets" href="/pets" isExpanded={isExpanded} isOpenMobile={isOpenMobile} active={pathname === '/pets'} />
          <SidebarItem icon={<CalendarDays size={20} />} label="Consultas" href="/consultas" isExpanded={isExpanded} isOpenMobile={isOpenMobile} active={pathname === '/consultas'} />
          <SidebarItem icon={<Users size={20} />} label="Clientes" href="/clientes" isExpanded={isExpanded} isOpenMobile={isOpenMobile} active={pathname === '/clientes'} />
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-slate-700/50 space-y-2">
          <SidebarItem icon={<Settings size={20} />} label="Configurações" href="/configuracoes" isExpanded={isExpanded} isOpenMobile={isOpenMobile} active={pathname === '/configuracoes'} />
          
          <button 
            onClick={() => handleLogout?.()} 
            className={`w-full flex items-center ${(isExpanded || isOpenMobile) ? 'gap-4 px-4' : 'justify-center'} py-4 rounded-2xl font-bold text-red-400 hover:bg-red-500/10 transition-all group`}
          >
            <LogOut size={20} className="shrink-0 group-hover:translate-x-1 transition-transform"  />
            {(isExpanded || isOpenMobile) && <span className="text-sm font-bold">Sair</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

function SidebarItem({ icon, label, href, active, isExpanded, isOpenMobile }: any) {
  const showText = isExpanded || isOpenMobile;
  return (
    <Link 
      href={href} 
      className={`flex items-center ${showText ? 'gap-4 px-4' : 'md:justify-center'} py-4 rounded-2xl font-bold transition-all active:scale-95 ${
        active 
          ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30" 
          : "text-slate-400 hover:bg-slate-800 hover:text-white"
      }`}
    >
      <span className={`${active ? "text-white" : "text-sky-400"} shrink-0`}>
        {icon}
      </span>
      {showText && <span className="text-sm whitespace-nowrap">{label}</span>}
    </Link>
  );
}