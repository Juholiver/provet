'use client';

import { useEffect, useState } from "react";
import Sidebar from "../_components/Sidebar";
import Header from "../_components/Header";
import { 
  Users, PawPrint, CalendarCheck, 
  ArrowUpRight, ArrowDownRight, Activity 
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function DashboardUI() {
  const [stats, setStats] = useState({
    totalPets: 0,
    totalTutores: 0,
    loading: true
  });

  const [consulta, setConsulta] = useState({
    totalConsultas: 0,
    loading: true
  });


  const supabase = createClient();

useEffect(() => {
  async function getData() {
    const supabase = createClient();

    // 1. Busca Pets e Tutores (Tabela 'pets')
    const { data: petsData, error: petsError } = await supabase
      .from('pets')
      .select('dono, nome');

    if (petsError) console.error("Erro Pets:", petsError.message);

    // 2. Busca Consultas (Tabela 'consultas')
    const { data: consultasData, error: consultasError } = await supabase
      .from('consultas')
      .select('id');

    if (consultasError) console.error("Erro Consultas:", consultasError.message);

    // Processamento dos dados
    if (petsData) {
      setStats({
        totalPets: new Set(petsData.map(item => item.nome)).size,
        totalTutores: new Set(petsData.map(item => item.dono)).size,
        loading: false
      });
    }

    if (consultasData) {
      setConsulta({
        totalConsultas: consultasData.length, // Se o ID é único, o length já resolve
        loading: false
      });
    }
  }

  getData();
}, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="w-full px-4 md:px-8 pt-6">
          <div className="max-w-7xl mx-auto">
            <Header />
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Painel de Controle</h1>
              <p className="text-slate-500 text-sm">Resumo do desempenho da clínica em tempo real.</p>
            </div>

            {/* Cards Dinâmicos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MiniCard 
                title="Consultas" 
                value={consulta.loading ? "..." : consulta.totalConsultas} // Se tiver tabela de consultas, use a mesma lógica de count
                trend="Estático" 
                isUp 
                icon={<CalendarCheck size={20} />} 
              />
              <MiniCard 
                title="Total de Tutores" 
                value={stats.loading ? "..." : stats.totalTutores} 
                trend="+5%" 
                isUp 
                icon={<Users size={20} />} 
              />
              <MiniCard 
                title="Total Pets" 
                value={stats.loading ? "..." : stats.totalPets} 
                trend="Total" 
                isUp 
                icon={<PawPrint size={20} />} 
              />
            </div>

            {/* O restante do seu gráfico e atividades... */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Mantenha o código original do gráfico e atividades aqui */}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

function MiniCard({ title, value, trend, isUp, icon }: { 
  title: string, 
  value: string | number, 
  trend: string, 
  isUp: boolean, 
  icon: React.ReactNode 
}) {
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
          {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-black text-slate-800 mt-1">
          {value}
        </h3>
      </div>
    </div>
  );
}