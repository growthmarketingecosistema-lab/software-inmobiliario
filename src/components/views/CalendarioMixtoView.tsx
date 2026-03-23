"use client";

import React, { useState } from 'react';
import { Calendar, Plus, X, Sparkles, Loader2, Eye, EyeOff } from 'lucide-react';

const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const TIPOS = ['Contenido de marca', 'Educativo', 'Prueba social', 'Fecha especial', 'Lifestyle', 'Comunidad', 'Expectativa', 'Proyecto'];
const TIPO_COLORS: Record<string, string> = {
  'Contenido de marca': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Educativo': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'Prueba social': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'Fecha especial': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  'Lifestyle': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'Comunidad': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  'Expectativa': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'Proyecto': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
};

export const CalendarioMixtoView = ({ currentEmpresa, appData, refreshData }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [filter, setFilter] = useState('Todo');
  const [form, setForm] = useState({ tema: '', fecha: '', tipo_contenido: 'Contenido de marca', formato: 'Reel' });

  const agenda = appData?.planner || [];
  const identidad = (appData?.identidades || []).find((i: any) => i.empresaId === currentEmpresa?.id);
  const personas = (appData?.personas || []).filter((p: any) => p.empresaId === currentEmpresa?.id);

  const filteredAgenda = filter === 'Todo' ? agenda : agenda.filter((item: any) => item.tipo_contenido === filter);

  const handleCreateContent = async () => {
    if (!form.tema || !form.fecha) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contenido_id: 'manual-' + Date.now(),
          dia: new Date(form.fecha).toLocaleDateString('es-ES', { weekday: 'long' }),
          hora: '10:00',
          estado: 'Idea',
          ...form
        })
      });
      if (res.ok) {
        setIsModalOpen(false);
        setForm({ tema: '', fecha: '', tipo_contenido: 'Contenido de marca', formato: 'Reel' });
        if (refreshData) await refreshData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateIdeas = async () => {
    setIsGenerating(true);
    try {
      const now = new Date();
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          actionId: 'calendar_ideas',
          empresaContext: {
            empresa: currentEmpresa,
            identidad,
            personas,
            mes: MESES[now.getMonth()],
            cantidad: 15
          }
        })
      });
      const data = await res.json();

      // Parse AI response or use fallback
      let ideas: any[] = [];
      try {
        const parsed = typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
        ideas = parsed?.ideas || [];
      } catch {
        // Fallback ideas
        ideas = TIPOS.slice(0, 5).map((tipo, i) => ({
          tema: `${tipo} - ${currentEmpresa?.nombre}`,
          tipo_contenido: tipo,
          formato: ['Reel', 'Carrusel', 'Imagen', 'Story'][i % 4],
          dia_sugerido: (i + 1) * 5,
          objetivo: 'Engagement y posicionamiento'
        }));
      }

      // Save each idea to planner
      for (const idea of ideas.slice(0, 15)) {
        const fecha = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(idea.dia_sugerido || 1).padStart(2, '0')}`;
        await fetch('/api/planner', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contenido_id: 'ai-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
            tema: idea.tema,
            tipo_contenido: idea.tipo_contenido || 'Contenido de marca',
            fecha,
            dia: new Date(fecha).toLocaleDateString('es-ES', { weekday: 'long' }),
            hora: '10:00',
            estado: 'Idea',
            formato: idea.formato || 'Reel'
          })
        });
      }
      if (refreshData) await refreshData();
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fade-in overflow-y-auto h-full">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="text-purple-600 dark:text-purple-400"><Calendar size={28} /></div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Calendario Mixto Editorial</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-0.5">ORGÁNICO · CAMPAÑAS · FECHAS ESPECIALES</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleGenerateIdeas}
            disabled={isGenerating}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-purple-500/20 uppercase"
          >
            {isGenerating ? <><Loader2 size={14} className="animate-spin" /> Generando...</> : <><Sparkles size={14} /> Generar Ideas con IA</>}
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors uppercase"
          >
            <Plus size={14} /> Manual
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {['Todo', ...TIPOS].map(tipo => (
          <button
            key={tipo}
            onClick={() => setFilter(tipo)}
            className={`px-3 py-1.5 text-xs font-bold rounded-full transition-colors ${
              filter === tipo
                ? 'bg-purple-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {tipo}
          </button>
        ))}
      </div>

      {/* Content Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="bg-[#1a1f2e] text-white flex px-6 py-4 text-xs font-bold uppercase tracking-wider">
          <div className="w-[15%]">Tipo</div>
          <div className="flex-1">Tema / Contenido</div>
          <div className="w-[15%] text-center">Formato</div>
          <div className="w-[15%] text-center">Fecha</div>
          <div className="w-[12%] text-center">Estado</div>
        </div>

        {filteredAgenda.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <Calendar size={40} className="text-slate-300 dark:text-slate-600 mb-3" />
            <p className="text-sm text-slate-400">No hay contenido programado. Genera ideas con IA o agrega manualmente.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredAgenda.map((item: any) => (
              <div key={item._id} className="flex px-6 py-3.5 items-center hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                <div className="w-[15%]">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${TIPO_COLORS[item.tipo_contenido] || 'bg-gray-100 text-gray-600'}`}>
                    {item.tipo_contenido || 'Marca'}
                  </span>
                </div>
                <div className="flex-1 text-sm text-slate-800 dark:text-slate-200 font-medium">{item.tema || item.contenido_id}</div>
                <div className="w-[15%] text-center text-xs text-slate-500">{item.formato || 'Post'}</div>
                <div className="w-[15%] text-center text-sm font-medium text-slate-600 dark:text-slate-400">{item.fecha}</div>
                <div className="w-[12%] text-center">
                  <span className="text-xs font-medium text-amber-600 bg-amber-50 dark:bg-amber-900/20 rounded-full px-2.5 py-1">{item.estado}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Manual Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden border border-gray-200 dark:border-gray-800 animate-slide-in-up">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Nueva Publicación</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Tema</label>
                <input
                  type="text" value={form.tema}
                  onChange={e => setForm({ ...form, tema: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none text-slate-800 dark:text-white"
                  placeholder="Ej. Beneficios de inversión 2026"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Tipo</label>
                  <select value={form.tipo_contenido} onChange={e => setForm({ ...form, tipo_contenido: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg p-3 text-sm outline-none text-slate-800 dark:text-white">
                    {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Formato</label>
                  <select value={form.formato} onChange={e => setForm({ ...form, formato: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg p-3 text-sm outline-none text-slate-800 dark:text-white">
                    {['Reel', 'Carrusel', 'Imagen', 'Story', 'Video'].map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Fecha</label>
                <input type="date" value={form.fecha} onChange={e => setForm({ ...form, fecha: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg p-3 text-sm outline-none text-slate-800 dark:text-white" />
              </div>

              <button
                onClick={handleCreateContent}
                disabled={isSubmitting || !form.tema || !form.fecha}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-3 rounded-lg text-sm font-bold uppercase transition-colors"
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
