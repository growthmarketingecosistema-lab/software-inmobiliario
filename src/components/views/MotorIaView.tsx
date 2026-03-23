"use client";

import React, { useState } from 'react';
import { BrainCircuit, Zap, Sparkles, Wand2, Video, CheckCircle2, X, ChevronDown, ChevronUp, Check, Edit3, Trash2 } from 'lucide-react';

export const MotorIaView = ({ currentEmpresa, appData, refreshData }: any) => {
  const [runningModel, setRunningModel] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, { text: string; accepted: boolean }>>({});

  const handleRunModel = async (actionId: string, title: string) => {
    setRunningModel(actionId);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          actionId,
          empresaContext: {
            nombre: currentEmpresa?.nombre,
            empresa: currentEmpresa,
            identidad: (appData?.identidades || []).find((i: any) => i.empresaId === currentEmpresa?.id),
            personas: (appData?.personas || []).filter((p: any) => p.empresaId === currentEmpresa?.id),
            proyectos: (appData?.proyectos || []).filter((p: any) => p.empresaId === currentEmpresa?.id)
          }
        })
      });
      const data = await res.json();
      const text = data.data || data.message || 'Resultado generado exitosamente.';
      setResults(prev => ({ ...prev, [actionId]: { text, accepted: false } }));
    } catch (e) {
      console.error(e);
      setResults(prev => ({ ...prev, [actionId]: { text: 'Error al ejecutar el modelo. Intenta de nuevo.', accepted: false } }));
    } finally {
      setRunningModel(null);
    }
  };

  const handleAccept = (actionId: string) => {
    setResults(prev => ({ ...prev, [actionId]: { ...prev[actionId], accepted: true } }));
  };

  const handleDiscard = (actionId: string) => {
    setResults(prev => {
      const copy = { ...prev };
      delete copy[actionId];
      return copy;
    });
  };

  const cards = [
    {
      actionId: "campaign",
      title: "Auto-Estructurar Campaña",
      desc: "Analiza el contexto de marca y crea una estructura de campaña con 3 conjuntos de anuncios optimizados para Meta Ads.",
      icon: <Zap size={24} className="text-amber-500" />,
      iconBg: "bg-amber-50 dark:bg-amber-900/20"
    },
    {
      actionId: "hooks",
      title: "Generador de Hooks",
      desc: "Crea 5 ganchos disruptivos de 3 segundos para videos/reels, usando tu identidad de marca y buyer personas.",
      icon: <Sparkles size={24} className="text-purple-500" />,
      iconBg: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      actionId: "content",
      title: "Planificador 30 Días",
      desc: "Genera un calendario editorial orgánico completo del mes alineado con los pilares de marca y fechas especiales.",
      icon: <Wand2 size={24} className="text-emerald-500" />,
      iconBg: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      actionId: "scripts",
      title: "Guiones de Reels",
      desc: "Estructura gancho, desarrollo y CTA para formato corto, con sugerencias de elementos visuales.",
      icon: <Video size={24} className="text-blue-500" />,
      iconBg: "bg-blue-50 dark:bg-blue-900/20"
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-fade-in overflow-y-auto h-full">
      <div className="flex items-center gap-3">
        <div className="text-purple-600 dark:text-purple-400"><BrainCircuit size={28} /></div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Motor de Inteligencia Artificial</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-0.5">
            HERRAMIENTAS DE IA · {currentEmpresa?.nombre?.toUpperCase()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => {
          const result = results[card.actionId];
          return (
            <div key={card.actionId} className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden hover:border-purple-200 dark:hover:border-purple-800 transition-colors">
              <div className="p-6 flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${card.iconBg}`}>
                  {card.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{card.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{card.desc}</p>
                  <button
                    onClick={() => handleRunModel(card.actionId, card.title)}
                    disabled={runningModel !== null}
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
                  >
                    {runningModel === card.actionId ? (
                      <><span className="animate-spin inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full"></span> Procesando...</>
                    ) : (
                      <><Zap size={12} /> Ejecutar Modelo</>
                    )}
                  </button>
                </div>
              </div>

              {/* Result Panel */}
              {result && (
                <div className={`border-t ${result.accepted ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10' : 'border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900/50'}`}>
                  <div className="p-4">
                    {result.accepted && (
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">Resultado Aceptado</span>
                      </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-slate-200 dark:border-gray-700 max-h-64 overflow-y-auto">
                      <pre className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">{result.text}</pre>
                    </div>
                    {!result.accepted && (
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => handleAccept(card.actionId)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
                        >
                          <Check size={12} /> Aceptar
                        </button>
                        <button
                          onClick={() => handleDiscard(card.actionId)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg text-xs font-bold transition-colors"
                        >
                          <Trash2 size={12} /> Descartar
                        </button>
                        <button
                          onClick={() => handleRunModel(card.actionId, card.title)}
                          disabled={runningModel !== null}
                          className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold transition-colors"
                        >
                          <Sparkles size={12} /> Regenerar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Status Bar */}
      <div className="bg-[#1a1f2e] text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between shadow-xl">
        <div>
          <span className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded text-[10px] font-bold uppercase tracking-wider mb-3 inline-block border border-purple-500/20">Motor IA Activo</span>
          <h2 className="text-xl font-bold mb-1">Google Gemini 2.5 Flash</h2>
          <p className="text-sm text-slate-400">Conectado con identidad de marca, buyer personas y contexto de proyectos.</p>
        </div>
        <div className="flex gap-4 mt-6 md:mt-0">
          <div className="bg-slate-800/50 rounded-xl p-4 min-w-[120px] text-center border border-slate-700">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Resultados</p>
            <p className="text-2xl font-black text-purple-400">{Object.keys(results).length}</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 min-w-[120px] text-center border border-slate-700">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Aceptados</p>
            <p className="text-2xl font-black text-emerald-400">{Object.values(results).filter(r => r.accepted).length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
