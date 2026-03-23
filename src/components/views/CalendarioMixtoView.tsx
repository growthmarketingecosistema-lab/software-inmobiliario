"use client";

import React, { useState } from 'react';
import { Calendar, Plus, X } from 'lucide-react';

export const CalendarioMixtoView = ({ currentEmpresa, appData, refreshData }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ tema: '', fecha: '', tipo_contenido: 'Contenido de marca' });

  const agenda = appData?.planner || [];

  const handleCreateContent = async () => {
    if (!form.tema || !form.fecha) return;
    setIsSubmitting(true);
    try {
      // 1. Crear contenido editorial
      const res = await fetch('/api/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contenido_id: 'auto-gen-' + Date.now(),
          dia: new Date(form.fecha).toLocaleDateString('es-ES', { weekday: 'long' }),
          hora: '10:00',
          estado: 'Idea',
          ...form
        })
      });
      if (res.ok) {
        setIsModalOpen(false);
        setForm({ tema: '', fecha: '', tipo_contenido: 'Contenido de marca' });
        if (refreshData) await refreshData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };
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
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-xs font-bold transition-colors uppercase shadow-md shadow-purple-500/20"
        >
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
        
        {agenda.length === 0 ? (
          <div className="p-20 flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800">
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500 font-mono tracking-wider">El calendario mixto está vacío. Agenda el primer contenido.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {agenda.map((item: any) => (
              <div key={item._id} className="flex px-6 py-4 items-center bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                <div className="w-[15%] text-sm font-bold text-emerald-600 dark:text-emerald-400">{item.tipo_contenido || 'Marca'}</div>
                <div className="flex-1 text-sm text-slate-800 dark:text-slate-200">{item.tema || item.contenido_id}</div>
                <div className="w-[20%] text-center text-sm font-medium text-slate-600 dark:text-slate-400">{item.fecha}</div>
                <div className="w-[15%] text-center text-xs text-slate-500">Post / Reel</div>
                <div className="w-[15%] text-center text-xs font-medium text-amber-600 bg-amber-50 dark:bg-amber-900/20 rounded py-1">{item.estado}</div>
                <div className="w-[10%] text-right text-blue-600 dark:text-blue-400 cursor-pointer text-xs font-bold uppercase hover:underline">Ver</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden border border-gray-200 dark:border-gray-800 animate-slide-in-up">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Nueva Publicación</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Tema a comunicar</label>
                <input 
                  type="text" 
                  value={form.tema}
                  onChange={e => setForm({...form, tema: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none text-slate-800 dark:text-white"
                  placeholder="Ej. Beneficios de Inversión 2026"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Tipo</label>
                  <select 
                    value={form.tipo_contenido}
                    onChange={e => setForm({...form, tipo_contenido: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none text-slate-800 dark:text-white"
                  >
                    <option value="Contenido de marca">Contenido de Marca</option>
                    <option value="Formativo">Formativo</option>
                    <option value="Prueba Social">Prueba Social</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Fecha public.</label>
                  <input 
                    type="date"
                    value={form.fecha}
                    onChange={e => setForm({...form, fecha: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none text-slate-800 dark:text-white"
                  />
                </div>
              </div>
              
              <button 
                onClick={handleCreateContent}
                disabled={isSubmitting || !form.tema || !form.fecha}
                className="w-full mt-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-3 rounded-lg text-sm font-bold uppercase transition-colors"
              >
                {isSubmitting ? 'Agendando...' : 'Agendar Contenido'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
