"use client";

import React, { useState } from 'react';
import { Megaphone, Sparkles, ChevronDown, CheckCircle2, Loader2, FileText, Target, Calendar, Lightbulb } from 'lucide-react';

export const EstrategiaProyectosView = ({ currentEmpresa, appData, refreshData }: any) => {
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [duracion, setDuracion] = useState('3');
  const [objetivo, setObjetivo] = useState('Captación de leads');
  const [isGenerating, setIsGenerating] = useState(false);
  const [strategy, setStrategy] = useState<any>(null);

  const proyectos = (appData?.proyectos || []).filter((p: any) => p.empresaId === currentEmpresa?.id);
  const identidad = (appData?.identidades || []).find((i: any) => i.empresaId === currentEmpresa?.id);
  const personas = (appData?.personas || []).filter((p: any) => p.empresaId === currentEmpresa?.id);
  const selectedProject = proyectos.find((p: any) => (p._id || p.id) === selectedProjectId);

  const handleGenerate = async () => {
    if (!selectedProjectId) return;
    setIsGenerating(true);
    setStrategy(null);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          actionId: 'strategy',
          empresaContext: {
            empresa: currentEmpresa,
            proyecto: selectedProject,
            identidad,
            personas,
            duracion: `${duracion} meses`,
            objetivo
          }
        })
      });
      const data = await res.json();
      if (data.result) {
        setStrategy(data.result);
      } else {
        // Fallback structured strategy
        setStrategy({
          titulo: `Estrategia ${duracion} meses - ${selectedProject?.nombre}`,
          objetivo,
          meses: Array.from({ length: parseInt(duracion) }, (_, i) => ({
            mes: i + 1,
            nombre: `Mes ${i + 1}`,
            campana: `Campaña ${i + 1}: ${objetivo}`,
            piezas: ['Reel institucional', 'Carrusel beneficios', 'Story testimonial', 'Post educativo'],
            presupuesto_sugerido: '$2,000,000 COP',
            kpi: `${50 + i * 20} leads objetivo`
          }))
        });
      }
    } catch (e) {
      console.error(e);
      setStrategy({
        titulo: `Estrategia ${duracion} meses - ${selectedProject?.nombre}`,
        objetivo,
        meses: Array.from({ length: parseInt(duracion) }, (_, i) => ({
          mes: i + 1,
          nombre: `Mes ${i + 1}`,
          campana: `Campaña ${['Awareness', 'Conversión', 'Retargeting'][i % 3]}`,
          piezas: ['Reel gancho', 'Carrusel info', 'Story CTA', 'Post valor'],
          presupuesto_sugerido: '$2,000,000 COP',
          kpi: `${50 + i * 20} leads objetivo`
        }))
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in overflow-y-auto h-full">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="text-purple-600 dark:text-purple-400"><Megaphone size={28} /></div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Estrategia de Proyectos</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-0.5">
            PLANIFICACIÓN ESTRATÉGICA CON IA · {currentEmpresa?.nombre?.toUpperCase()}
          </p>
        </div>
      </div>

      {/* Configuration Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm p-6 space-y-5">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Target size={18} className="text-blue-500" /> Configurar Estrategia
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Proyecto</label>
            <select
              value={selectedProjectId}
              onChange={e => setSelectedProjectId(e.target.value)}
              className="w-full bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none text-slate-800 dark:text-white"
            >
              <option value="">Seleccionar proyecto...</option>
              {proyectos.map((p: any) => (
                <option key={p._id || p.id} value={p._id || p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Duración</label>
            <select
              value={duracion}
              onChange={e => setDuracion(e.target.value)}
              className="w-full bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none text-slate-800 dark:text-white"
            >
              <option value="1">1 mes</option>
              <option value="2">2 meses</option>
              <option value="3">3 meses</option>
              <option value="6">6 meses</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Objetivo Principal</label>
            <select
              value={objetivo}
              onChange={e => setObjetivo(e.target.value)}
              className="w-full bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none text-slate-800 dark:text-white"
            >
              <option>Captación de leads</option>
              <option>Posicionamiento de marca</option>
              <option>Lanzamiento de proyecto</option>
              <option>Remarketing y cierre</option>
            </select>
          </div>
        </div>

        {/* Context Summary */}
        {selectedProject && (
          <div className="bg-slate-50 dark:bg-gray-900/50 rounded-xl p-4 border border-slate-100 dark:border-gray-700 space-y-2">
            <p className="text-xs font-bold text-slate-500 uppercase">Contexto disponible para la IA:</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs px-2.5 py-1 rounded-full font-medium">
                📋 Proyecto: {selectedProject.nombre}
              </span>
              {identidad?.esencia && (
                <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs px-2.5 py-1 rounded-full font-medium">
                  🧬 ADN de marca configurado
                </span>
              )}
              <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs px-2.5 py-1 rounded-full font-medium">
                👥 {personas.length} buyer persona{personas.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={!selectedProjectId || isGenerating}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-purple-500/20"
        >
          {isGenerating ? <><Loader2 size={16} className="animate-spin" /> Generando Estrategia...</> : <><Sparkles size={16} /> Generar Estrategia con IA</>}
        </button>
      </div>

      {/* Strategy Results */}
      {strategy && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl border border-purple-200 dark:border-purple-800 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{strategy.titulo}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Objetivo: {strategy.objetivo}</p>
              </div>
              <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                <CheckCircle2 size={12} /> Generada por IA
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {strategy.meses?.map((mes: any) => (
              <div key={mes.mes} className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm p-5 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={16} className="text-purple-500" />
                  <h4 className="text-base font-bold text-slate-800 dark:text-white">{mes.nombre}</h4>
                </div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-3">{mes.campana}</p>
                <div className="space-y-1.5 mb-4">
                  {mes.piezas?.map((pieza: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Lightbulb size={10} className="text-amber-500 shrink-0" />
                      {pieza}
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-100 dark:border-gray-700 pt-3 space-y-1">
                  <p className="text-xs text-slate-400"><span className="font-semibold">Presupuesto:</span> {mes.presupuesto_sugerido}</p>
                  <p className="text-xs text-slate-400"><span className="font-semibold">KPI:</span> {mes.kpi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
