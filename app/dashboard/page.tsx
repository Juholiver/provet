'use client';

import { useState } from "react";
import Sidebar from "../_components/Sidebar";
import Header from "../_components/Header";
import CadastroPets from "../_components/CadastroPets";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    // Container principal: Sidebar na esquerda, Conteúdo na direita
    <div className="flex min-h-screen bg-gradient-to-tr from-slate-50 via-blue-50 to-blue-100">
      
      {/* 1. Sidebar (Fixa ou Retrátil conforme seu componente) */}
      <Sidebar />

      {/* 2. Área de Conteúdo (Coluna) */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header no topo do conteúdo */}
        <header className="w-full px-4 md:px-8 pt-6">
          <div className="max-w-7xl mx-auto">
            <Header />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
          
        </main>

      </div>
    </div>
  );
}