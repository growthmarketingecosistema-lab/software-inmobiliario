"use client";

import React from 'react';
import { LayoutDashboard, Fingerprint, Megaphone, Inbox, Kanban, Calendar, CheckSquare, Sun, Moon, LogOut, Code, User, Settings, FolderKanban, CalendarDays, BarChart3, BrainCircuit } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isDarkMode, toggleDarkMode }) => {
  const menuItems = [
    { type: 'header', label: 'Ecosistema Principal' },
    { id: 'dashboard', label: 'Panel', icon: LayoutDashboard },
    { id: 'identidad', label: 'Identidad corporativa', icon: Fingerprint },
    { id: 'proyectos', label: 'Proyectos y Marcas', icon: FolderKanban },
    { id: 'estrategia', label: 'Estrategia de Proyectos', icon: Megaphone },
    { id: 'planner', label: 'Calendario Mixto', icon: CalendarDays },
    { id: 'motor_ia', label: 'Motor IA', icon: BrainCircuit },
    { id: 'metricas', label: 'Panel analítico', icon: BarChart3 },

    { type: 'header', label: 'Segmento Comercial' },
    { id: 'preventa', label: 'Buzón de Triaje', icon: Inbox },
    { id: 'ventas', label: 'Pipeline de Ventas', icon: Kanban },
    { id: 'calendario', label: 'Calendario y Bitácora', icon: Calendar },
    { id: 'posventa', label: 'Posventa', icon: CheckSquare },
  ];

  return (
    <div className="w-64 h-screen bg-[#0A0F1E] border-r border-[#1f2937] flex flex-col justify-between shrink-0">
      {/* Top section wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-8 flex flex-col space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full border-2 border-slate-50 flex items-center justify-center bg-[#0d1636] font-extrabold tracking-tighter shadow-[0_0_15px_rgba(255,255,255,0.4)] text-transparent bg-clip-text bg-gradient-to-tr from-white to-purple-400">
              METRO
            </div>
          </div>
          <h1 className="text-white text-base font-bold leading-tight mt-3">Sistema de<br/>crecimiento</h1>
          <p className="text-purple-400 text-[10px] font-black uppercase tracking-widest mt-1">CRESCENDO / <span className="text-white">FORTALEZA</span></p>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto pb-4">
          {menuItems.map((item, idx) => {
            if (item.type === 'header') {
              return (
                <div key={`header-${idx}`} className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 mt-6 px-4">
                  {item.label}
                </div>
              );
            }

            const Icon = item.icon as React.ElementType;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id!)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-blue-100' : ''} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="p-4 border-t border-slate-800 space-y-4">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-[#1f2945] transition-colors font-bold text-xs uppercase"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span>{isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
        </button>

        <div className="flex items-center px-4 py-3 space-x-3">
          <div className="w-10 h-10 rounded-full border border-slate-700 bg-[#151a2e] flex items-center justify-center text-slate-400">
            <User size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">Caren Vargas</p>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">Superadministrador</p>
          </div>
        </div>
      </div>
    </div>
  );
};
