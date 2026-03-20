"use client";

import React from 'react';
import { BrainCircuit, Zap, Sparkles, Wand2, Video } from 'lucide-react';

export const MotorIaView = () => {
  const cards = [
    {
      title: "Auto-Estructurar Campaña",
      desc: "Analiza el histórico y crea los 3 conjuntos de anuncios optimizados.",
      icon: <Zap size={24} className="text-amber-500" />,
      action: "Ejecutar Modelo",
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50"
    },
    {
      title: "Generador de ganchos (anuncios)",
      desc: "Crea 10 ángulos visuales disruptivos para los creativos Base.",
      icon: <Sparkles size={24} className="text-purple-500" />,
      action: "Ejecutar Modelo",
      iconColor: "text-purple-500",
      iconBg: "bg-purple-50"
    },
    {
      title: "Planificador de Contenido 30D",
      desc: "Genera todo el calendario editorial orgánico del mes en base a los pilares.",
      icon: <Wand2 size={24} className="text-emerald-500" />,
      action: "Ejecutar Modelo",
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-50"
    },
    {
      title: "Guiones de Reels",
      desc: "Estructura gancho, cuerpo y llamado a la acción para formato corto.",
      icon: <Video size={24} className="text-blue-500" />,
      action: "Ejecutar Modelo",
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50"
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="text-purple-600">
          <BrainCircuit size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Consola Motor IA</h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-0.5">FORTALEZA INMOBILIARIA - INTELIGENCIA ARTIFICIAL</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-start gap-4 hover:border-purple-200 transition-colors">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${card.iconBg}`}>
              {card.icon}
            </div>
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">{card.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-sm">{card.desc}</p>
              </div>
              <button className={`mt-4 text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${card.iconColor} hover:opacity-80 transition-opacity`}>
                {card.action} <Zap size={10} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#1a1f2e] text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between shadow-xl mt-8">
        <div>
          <span className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded text-[10px] font-bold uppercase tracking-wider mb-3 inline-block border border-purple-500/20">Estado del Motor</span>
          <h2 className="text-xl font-bold mb-1">Modelos GPT-4o / Claude 3 Opus</h2>
          <p className="text-sm text-slate-400">El ecosistema de IA está conectado y listo para procesar Prompts del sistema corporativo.</p>
        </div>
        <div className="flex gap-4 mt-6 md:mt-0">
          <div className="bg-slate-800/50 rounded-xl p-4 min-w-[120px] text-center border border-slate-700">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tokens Hoy</p>
            <p className="text-2xl font-black text-purple-400">12.5K</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 min-w-[120px] text-center border border-slate-700">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Generaciones</p>
            <p className="text-2xl font-black text-emerald-400">42</p>
          </div>
        </div>
      </div>
    </div>
  );
};
