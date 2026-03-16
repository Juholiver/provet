'use client';

import { useState } from "react";

import Modal from "../_components/Modal";
import Sidebar from "../_components/Sidebar";
import Header from "../_components/Header";

export default function Dashboard() {
  // 1. Estado que controla se o modal aparece
  const [isModalOpen, setIsModalOpen] = useState(false);


    return (
    // Adicionamos "flex-row" para garantir que fiquem lado a lado
    <main className="flex min-h-screen bg-gradient-to-tr from-white via-blue-100 to-blue-300">
      
      {/* 1. Sidebar primeiro para ficar na esquerda */}
      <Sidebar />
      <header className="w-full px-4 md:px-8 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto">
          <Header />
        </div>
    </header>
      
    </main>
  );
}
