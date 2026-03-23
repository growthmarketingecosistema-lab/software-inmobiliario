"use client";

import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Zap, LineChart } from 'lucide-react';

export const PanelAnaliticoView = ({ currentEmpresa, appData }: any) => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in overflow-y-auto h-full">
      <div className="flex items-center gap-3">
        <div className="text-blue-700 dark:text-blue-400">
          <BarChart3 size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Rendimiento de Campaña</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-0.5">ANÁLISIS DE ROI Y OPTIMIZACIÓN</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border-b-4 border-b-emerald-400 border border-slate-200 dark:border-gray-700 shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Clientes Registrados</span>
            <TrendingUp size={16} className="text-emerald-500" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-4">1.240</h2>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded">+18.4%</span>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Últimos 30 días</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border-b-4 border-b-emerald-400 border border-slate-200 dark:border-gray-700 shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">CTR (Interés)</span>
            <TrendingUp size={16} className="text-emerald-500" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-4">4,82%</h2>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded">+0.5%</span>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Promedio Global</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border-b-4 border-b-amber-400 border border-slate-200 dark:border-gray-700 shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Costo por Lead</span>
            <TrendingUp size={16} className="text-emerald-500" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-4">$2.4</h2>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded">-12.1%</span>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Mejor Rendimiento</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border-b-4 border-b-rose-400 border border-slate-200 dark:border-gray-700 shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Inversión</span>
            <TrendingDown size={16} className="text-rose-500" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-4">$3.000</h2>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 text-[10px] font-bold rounded">+5.0%</span>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Ejecutado</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-[#10141d] rounded-3xl p-8 relative overflow-hidden min-h-[400px] flex flex-col">
          <div className="absolute right-[-40px] top-[10%] opacity-10 text-slate-700">
             <LineChart size={300} strokeWidth={1} />
          </div>
          
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-12 relative z-10">
            Fluctuación de Conversión (Leads/Día)
          </h3>
          
          <div className="flex-1"></div>
          
          <div className="flex justify-between items-end border-t border-slate-800 pt-4 z-10">
            {['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'].map(m => (
              <span key={m} className="text-[9px] font-bold text-slate-500 uppercase">{m}</span>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-slate-200 dark:border-gray-700 p-8 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-8">
            <Zap size={18} className="text-amber-500" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-white tracking-wide">Fuentes de Escala</h3>
          </div>

          <div className="space-y-6 flex-1">
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">Reels de Instagram</span>
                <span className="text-slate-800 dark:text-white">45%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-pink-500 h-full w-[45%] rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">Feed de Facebook</span>
                <span className="text-slate-800 dark:text-white">30%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[30%] rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">WhatsApp Direct</span>
                <span className="text-slate-800 dark:text-white">15%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[15%] rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">Referidos / Otros</span>
                <span className="text-slate-800 dark:text-white">10%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-400 h-full w-[10%] rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 p-5 rounded-2xl border border-blue-100 dark:border-blue-900/50 relative">
            <span className="absolute -top-3 left-4 bg-white dark:bg-gray-800 border border-blue-100 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
              Perspectiva de Multivela
            </span>
            <p className="text-xs font-medium italic mt-2 leading-relaxed">
              "El tráfico proveniente de Reels tiene un 40% más de retención. Recomendamos escalar presupuesto en el Conjunto A."
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
