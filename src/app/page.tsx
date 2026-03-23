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

import { Search, Bell, Activity } from "lucide-react";

export default function Home() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [currentEmpresaId, setCurrentEmpresaId] = useState("fortress");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Data State
  const [appData, setAppData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/data');
      if (!res.ok) throw new Error("Error cargando los datos del servidor MongoDB.");
      const json = await res.json();
      console.log("Data loaded from MongoDB:", json);
      setAppData(json);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Initialize dark mode based on user preference or previous setting
  useEffect(() => {
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

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors ${isDarkMode ? "dark bg-[#0f1115]" : "bg-gray-50"}`}>
        <div className="flex flex-col items-center">
          <Activity className="w-10 h-10 text-blue-500 animate-spin mb-4" />
          <h2 className="text-xl font-bold dark:text-white">Conectando con MongoDB...</h2>
        </div>
      </div>
    );
  }

  if (error || !appData || !appData.empresas || appData.empresas.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors ${isDarkMode ? "dark bg-[#0f1115]" : "bg-gray-50"}`}>
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-red-100 dark:border-red-900/30">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Error de Base de Datos</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">
            {error || "No se encontraron datos en la BD. Asegúrate de ejecutar el proceso Seed inicial."}
          </p>
          <button 
            onClick={async () => {
              setLoading(true);
              try {
                const res = await fetch('/api/seed', { method: 'POST' });
                if (res.ok) await loadData();
                else throw new Error("Seed falló");
              } catch (e: any) {
                setError(e.message);
                setLoading(false);
              }
            }} 
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold transition-all shadow-md shadow-blue-500/20"
          >
            Sembrar BD Test (Ejecutar Seed)
          </button>
        </div>
      </div>
    );
  }

  const currentEmpresa = appData.empresas.find((e: any) => e.id === currentEmpresaId) || appData.empresas[0];

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardView currentEmpresa={currentEmpresa} appData={appData} onNavigate={setCurrentView} />;
      case "identidad":
        return <IdentidadView currentEmpresa={currentEmpresa} appData={appData} refreshData={loadData} />;
      case "estrategia":
        return <CentralCampanasView currentEmpresa={currentEmpresa} appData={appData} refreshData={loadData} />;
      case "planner":
        return <CalendarioMixtoView currentEmpresa={currentEmpresa} appData={appData} refreshData={loadData} />;
      case "motor_ia":
        return <MotorIaView currentEmpresa={currentEmpresa} />;
      case "metricas":
        return <PanelAnaliticoView currentEmpresa={currentEmpresa} appData={appData} />;
      case "preventa":
        return <PreVentaView currentEmpresa={currentEmpresa} appData={appData} refreshData={loadData} />;
      case "ventas":
        return <VentasView currentEmpresa={currentEmpresa} appData={appData} refreshData={loadData} onConvert={() => setCurrentView('posventa')} />;
      case "calendario":
        return <CalendarioView currentEmpresa={currentEmpresa} />;
      case "posventa":
        return <PosventaView currentEmpresa={currentEmpresa} appData={appData} refreshData={loadData} />;
      case "proyectos":
        return <ProyectosView currentEmpresa={currentEmpresa} appData={appData} refreshData={loadData} onOpenComandoMarca={() => setCurrentView('comando_marca')} />;
      case "comando_marca":
        return <ComandoMarcaView />;
      default:
        return <DashboardView currentEmpresa={currentEmpresa} appData={appData} onNavigate={setCurrentView} />;
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
              {appData.empresas.map((emp: any) => (
                <button 
                  key={emp.id}
                  onClick={() => setCurrentEmpresaId(emp.id)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors ${currentEmpresaId === emp.id ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-100 dark:border-gray-600" : "text-slate-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-gray-200"}`}
                >
                  {emp.nombre}
                </button>
              ))}
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
