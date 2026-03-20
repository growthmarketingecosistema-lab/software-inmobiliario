"use client";

import React, { useState } from 'react';
import { Megaphone, Plus, PenSquare, Sparkles, AlertCircle, Save } from 'lucide-react';

export const CentralCampanasView = () => {
  const [generando, setGenerando] = useState(false);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="text-blue-700">
            <Megaphone size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Anuncios de Central de Campañas</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-0.5">INMOBILIARIA FORTALEZA - MOTOR DE PAUTA</p>
          </div>
        </div>
        {!generando ? (
          <button 
            onClick={() => setGenerando(true)}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors uppercase"
          >
            <PenSquare size={14} /> Reestructurar Campaña
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setGenerando(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase transition-colors"
            >
              Descartar
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors uppercase shadow-md shadow-blue-500/20">
              <Save size={14} /> Aprobar Estructura
            </button>
          </div>
        )}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm relative overflow-hidden">
        {/* Left blue accent indicator */}
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-blue-500"></div>
        
        <div className="p-6 flex items-center justify-between">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 shrink-0">
              <Megaphone size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">OBJETIVO META:</span>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold">LEADS</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-800">CAMPAÑA LIDERA - BULEVAR</h2>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Presupuesto Global</p>
            <p className="text-2xl font-black text-slate-800">5.000.000 <span className="text-sm font-medium text-slate-400">COP</span></p>
          </div>
        </div>
      </div>

      {!generando ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-16 flex flex-col items-center justify-center text-center">
          <AlertCircle size={32} className="text-slate-200 mb-4" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Aún no hay conjuntos definidos</p>
        </div>
      ) : (
        <div className="flex justify-center mt-8">
          <button className="flex items-center gap-2 px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-sm font-bold shadow-lg shadow-purple-500/30 transition-all transform hover:-translate-y-0.5 uppercase tracking-wide">
            <Sparkles size={18} /> Generar Estructura Optimizada por IA
          </button>
        </div>
      )}
    </div>
  );
};
