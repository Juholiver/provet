'use client';

import { useState } from "react";
import Sidebar from "../_components/Sidebar";
import Header from "../_components/Header";
import { 
  TrendingUp, Users, PawPrint, CalendarCheck, 
  ArrowUpRight, ArrowDownRight, Activity 
} from "lucide-react";

export default function DashboardSimples() {
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
            
            {/* Boas-vindas resumido */}
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold text-slate-800">Painel de Controle</h1>
              <p className="text-slate-500 text-sm font-medium">Resumo do desempenho da clínica hoje.</p>
            </div>

            {/* Cards de Métricas Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MiniCard 
                title="Atendimentos" 
                value="24" 
                trend="+12%" 
                isUp={true} 
                icon={<CalendarCheck className="text-blue-600" size={20} />} 
              />
              <MiniCard 
                title="Novos Clientes" 
                value="08" 
                trend="+5%" 
                isUp={true} 
                icon={<Users className="text-emerald-600" size={20} />} 
              />
              <MiniCard 
                title="Internações" 
                value="03" 
                trend="-2%" 
                isUp={false} 
                icon={<Activity className="text-rose-600" size={20} />} 
              />
              <MiniCard 
                title="Total Pets" 
                value="1.240" 
                trend="+18%" 
                isUp={true} 
                icon={<PawPrint className="text-amber-600" size={20} />} 
              />
            </div>

            {/* Seção Central: Gráfico Simples e Atividade */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* "Gráfico" de Movimentação Semanal */}
              <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-slate-800">Fluxo Semanal</h3>
                  <select className="text-xs font-bold text-slate-400 bg-slate-50 p-2 rounded-lg outline-none">
                    <option>Últimos 7 dias</option>
                  </select>
                </div>
                
                <div className="flex items-end justify-between h-48 gap-2">
                  <Bar height="60%" label="Seg" />
                  <Bar height="80%" label="Ter" active />
                  <Bar height="45%" label="Qua" />
                  <Bar height="90%" label="Qui" />
                  <Bar height="70%" label="Sex" />
                  <Bar height="30%" label="Sab" />
                  <Bar height="15%" label="Dom" />
                </div>
              </div>

              {/* Feed de Atividades Recentes */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col">
                <h3 className="font-bold text-slate-800 mb-6">Atividade Recente</h3>
                <div className="space-y-6 flex-1">
                  <ActivityItem text="Vacina aplicada em" boldText="Thor" time="15 min atrás" />
                  <ActivityItem text="Novo tutor cadastrado:" boldText="Alice M." time="1h atrás" />
                  <ActivityItem text="Consulta finalizada por" boldText="Dra. Ana" time="2h atrás" />
                  <ActivityItem text="Check-in realizado para" boldText="Mel" time="3h atrás" />
                </div>
                <button className="mt-6 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                  Ver log completo
                </button>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

// Sub-componentes para manter o código limpo

interface MiniCardProps {
  title: string;
  value: string;
  trend: string;
  isUp: boolean;
  icon: React.ReactNode;
}

function MiniCard({ title, value, trend, isUp, icon }: MiniCardProps) {
  return (
    <div className="bg-white p-6 rounded-[1.5rem] border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
        <div className={`flex items-center text-[10px] font-bold ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
          {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trend}
        </div>
      </div>
      <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{title}</p>
      <h2 className="text-2xl font-black text-slate-800">{value}</h2>
    </div>
  );
}

interface BarProps {
  height: string;
  label: string;
  active?: boolean;
}

function Bar({ height, label, active = false }: BarProps) {
  return (
    <div className="flex-1 flex flex-col items-center gap-3 h-full">
      <div className="w-full bg-slate-100 rounded-t-lg relative h-full flex items-end overflow-hidden">
        <div 
          className={`w-full transition-all duration-1000 ${active ? 'bg-blue-600' : 'bg-blue-400/40'}`} 
          style={{ height: height }}
        />
      </div>
      <span className="text-[10px] font-bold text-slate-400 uppercase">{label}</span>
    </div>
  );
}

interface ActivityItemProps {
  text: string;
  boldText: string;
  time: string;
}

function ActivityItem({ text, boldText, time }: ActivityItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
      <div>
        <p className="text-sm text-slate-600">
          {text} <span className="font-bold text-slate-800">{boldText}</span>
        </p>
        <span className="text-[10px] text-slate-400 font-medium">{time}</span>
      </div>
    </div>
  );
}