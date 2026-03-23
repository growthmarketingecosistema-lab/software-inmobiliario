"use client";

import React from 'react';
import { Fingerprint, Plus } from 'lucide-react';

export const IdentidadView = ({ currentEmpresa, appData, refreshData }: any) => {
  return (
    <div className="p-8 space-y-6 h-full flex flex-col overflow-y-auto bg-slate-50 dark:bg-[#0f1115]">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
            <Fingerprint className="text-blue-600 dark:text-blue-500" size={28} />
            Identidad de Marca
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 uppercase tracking-widest font-bold">
            ADN ESTRATÉGICO DE {currentEmpresa.nombre.toUpperCase()}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors uppercase tracking-wider">
            Cancelar
          </button>
          <button className="bg-[#4F46E5] hover:bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors uppercase tracking-wider shadow-sm">
            Guardar ADN
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Núcleo estratégico */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/50 shadow-sm overflow-hidden relative p-8">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
          
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            Núcleo estratégico
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">¿Qué es la marca?</label>
              <textarea 
                className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-100 dark:border-gray-700 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 dark:text-white min-h-[100px] resize-none"
                placeholder="Definir la esencia de la empresa..."
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Nicho / Mercado Objetivo</label>
              <input 
                type="text"
                className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-100 dark:border-gray-700 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 dark:text-white"
                placeholder="Ej: Inmobiliarias de lujo"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Propuesta única de valor</label>
              <textarea 
                className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-100 dark:border-gray-700 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 dark:text-white min-h-[100px] resize-none"
                placeholder="¿Por qué elegirte a ti?"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Tono de Comunicación</label>
              <input 
                type="text"
                className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-100 dark:border-gray-700 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 dark:text-white"
                placeholder="Ej: Profesional, cercano, disruptivo"
              />
            </div>
          </div>
        </div>

        {/* Personas compradoras */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900/50 shadow-sm overflow-hidden relative p-8 h-full min-h-[500px]">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400"></div>
          
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              Personas compradoras
            </h3>
            
            <button className="text-emerald-500 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 px-3 py-1.5 rounded textxs font-bold uppercase tracking-wider transition-colors flex items-center gap-1">
              <Plus size={14} /> Nuevo Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
