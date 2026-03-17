'use client';

import Sidebar from "../_components/Sidebar";
import Header from "../_components/Header";
import { 
  Users, PawPrint, CalendarCheck, 
  ArrowUpRight, ArrowDownRight, Activity 
} from "lucide-react";

export default function DashboardUI() {

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
            
            {/* Boas-vindas */}
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Painel de Controle
              </h1>
              <p className="text-slate-500 text-sm">
                Resumo do desempenho da clínica hoje.
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MiniCard title="Atendimentos" value="24" trend="+12%" isUp icon={<CalendarCheck size={20} />} />
              <MiniCard title="Novos Clientes" value="08" trend="+5%" isUp icon={<Users size={20} />} />
              <MiniCard title="Internações" value="03" trend="-2%" isUp={false} icon={<Activity size={20} />} />
              <MiniCard title="Total Pets" value="1.240" trend="+18%" isUp icon={<PawPrint size={20} />} />
            </div>

            {/* Gráfico + Atividades */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-2 bg-white p-8 rounded-2xl border">
                <h3 className="font-bold mb-6">Fluxo Semanal</h3>

                <div className="flex items-end h-40 gap-2">
                  <Bar height="60%" label="Seg" />
                  <Bar height="80%" label="Ter" active />
                  <Bar height="45%" label="Qua" />
                  <Bar height="90%" label="Qui" />
                  <Bar height="70%" label="Sex" />
                  <Bar height="30%" label="Sab" />
                  <Bar height="15%" label="Dom" />
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border">
                <h3 className="font-bold mb-6">Atividade Recente</h3>

                <ActivityItem text="Vacina aplicada em" boldText="Thor" />
                <ActivityItem text="Novo tutor:" boldText="Alice" />
                <ActivityItem text="Consulta finalizada por" boldText="Dra. Ana" />
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

function MiniCard({ title, value, trend, isUp, icon }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border">
      <div className="flex justify-between mb-2">
        {icon}
        <span className={isUp ? "text-green-500" : "text-red-500"}>
          {isUp ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
          {trend}
        </span>
      </div>
      <p className="text-sm">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}

function Bar({ height, label, active = false }: any) {
  return (
    <div className="flex-1 flex flex-col items-center">
      <div className="w-full bg-gray-200 h-full flex items-end">
        <div 
          className={active ? "bg-blue-600 w-full" : "bg-blue-300 w-full"}
          style={{ height }}
        />
      </div>
      <span className="text-xs">{label}</span>
    </div>
  );
}

function ActivityItem({ text, boldText }: any) {
  return (
    <p className="text-sm">
      {text} <b>{boldText}</b>
    </p>
  );
}