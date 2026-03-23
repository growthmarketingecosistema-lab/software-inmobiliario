"use client";

import React from 'react';
import { Calendar, Plus } from 'lucide-react';

export const CalendarioMixtoView = ({ currentEmpresa, appData, refreshData }: any) => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in overflow-y-auto h-full">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="text-purple-600 dark:text-purple-400">
            <Calendar size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Calendario Mixto Editorial</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-0.5">CONTROL CENTRALIZADO: ORGÁNICO, COMERCIAL Y CAMPAÑAS</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-xs font-bold transition-colors uppercase shadow-md shadow-purple-500/20">
          <Plus size={14} /> Agendar Publicación
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden">
        {/* Dark Header Row */}
        <div className="bg-[#1a1f2e] text-white flex px-6 py-4 text-xs font-bold uppercase tracking-wider">
          <div className="w-[15%]">Contexto</div>
          <div className="flex-1">Tema / Contenido</div>
          <div className="w-[20%] text-center">Fecha Programada</div>
          <div className="w-[15%] text-center">Tipo y Formato</div>
          <div className="w-[15%] text-center">Estado Prod.</div>
          <div className="w-[10%] text-right">Acción</div>
        </div>
        
        {/* Empty State Body */}
        <div className="p-20 flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800">
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 font-mono tracking-wider">El calendario mixto está vacío. Agenda el primer contenido.</p>
        </div>
      </div>
    </div>
  );
};
