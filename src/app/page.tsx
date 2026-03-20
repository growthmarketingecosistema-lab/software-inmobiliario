"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { PreVentaView } from "@/components/views/PreVentaView";
import { VentasView } from "@/components/views/VentasView";
import { CalendarioView } from "@/components/views/CalendarioView";
import { PosventaView } from "@/components/views/PosventaView";
import { DashboardView } from "@/components/views/DashboardView";
import { IdentidadView } from "@/components/views/IdentidadView";
import { ProyectosView } from "@/components/views/ProyectosView";
import { ComandoMarcaView } from "@/components/views/ComandoMarcaView";
import { CentralCampanasView } from "@/components/views/CentralCampanasView";
import { CalendarioMixtoView } from "@/components/views/CalendarioMixtoView";
import { MotorIaView } from "@/components/views/MotorIaView";
import { PanelAnaliticoView } from "@/components/views/PanelAnaliticoView";

import { Search, Bell, FolderKanban, CalendarDays, BarChart3, ChevronDown, Check, Building, Globe } from "lucide-react";
import { mockData } from "@/lib/mockData";

export default function Home() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [currentEmpresaId, setCurrentEmpresaId] = useState("1");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mapeamos el ID 'global' o marcas individuales si es necesario
  const currentEmpresa = mockData.empresas.find(e => e.id === currentEmpresaId) || mockData.empresas[0];

  // Initialize dark mode based on user preference or previous setting
  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardView currentEmpresa={currentEmpresa!} />;
      case "identidad":
        return <IdentidadView currentEmpresa={currentEmpresa!} />;
      case "estrategia":
        return <CentralCampanasView />;
      case "planner":
        return <CalendarioMixtoView />;
      case "motor_ia":
        return <MotorIaView />;
      case "metricas":
        return <PanelAnaliticoView />;
      case "preventa":
        return <PreVentaView />;
      case "ventas":
        return <VentasView />;
      case "calendario":
        return <CalendarioView />;
      case "posventa":
        return <PosventaView />;
      case "proyectos":
        return <ProyectosView onOpenComandoMarca={() => setCurrentView('comando_marca')} />;
      case "comando_marca":
        return <ComandoMarcaView />;
      default:
        return <DashboardView currentEmpresa={currentEmpresa!} />;
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? "dark" : ""}`}>
      {/* Sidebar Navigation */}
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-gray-50/50 dark:bg-[#0f1115] overflow-hidden transition-colors duration-200">
        
        {/* TOP NAVBAR */}
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8 shrink-0 transition-colors z-20">
          <div className="flex items-center gap-4 relative">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:inline-block mt-0.5">Empresa en gestión</span>
            
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-gray-800 rounded-full p-1 border border-slate-200 dark:border-gray-700">
              <button 
                onClick={() => setCurrentEmpresaId("1")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors ${currentEmpresaId === "1" ? "bg-white dark:bg-gray-700 text-blue-600 shadow-sm border border-slate-100" : "text-slate-500 hover:text-slate-700"}`}
              >
                Bienes Raíces Fortress
              </button>
              <button 
                onClick={() => setCurrentEmpresaId("2")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors ${currentEmpresaId === "2" ? "bg-white dark:bg-gray-700 text-purple-600 shadow-sm border border-slate-100" : "text-slate-500 hover:text-slate-700"}`}
              >
                Agencia Crescendo
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
            <button className="hover:text-gray-800 dark:hover:text-white transition-colors"><Search size={20} /></button>
            <button className="hover:text-gray-800 dark:hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-900 transition-colors"></span>
            </button>
          </div>
        </header>

        {/* Dynamic View rendering */}
        <div className="flex-1 overflow-hidden relative">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
