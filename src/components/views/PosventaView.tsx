"use client";

import React, { useState } from 'react';
import { CheckSquare, Sparkles, Loader2, UserCheck, Mail, Phone, Star, Clock, FileText, TrendingUp } from 'lucide-react';

export const PosventaView = ({ currentEmpresa, appData, refreshData }: any) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const leads = (appData?.leads || []).filter((l: any) => l.empresaId === currentEmpresa?.id);
  const clientesCerrados = leads.filter((l: any) => l.stage === 'cerrado_ganado');
  const clientesContacto = leads.filter((l: any) => ['contactado', 'visita', 'negociacion'].includes(l.stage));

  const handleGenerateReport = async (client: any) => {
    setSelectedClient(client);
    setIsGenerating(true);
    setAiReport(null);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          actionId: 'default',
          empresaContext: {
            nombre: currentEmpresa?.nombre,
            task: `Genera un informe ejecutivo de posventa para el cliente "${client.nombre}" que fue captado como lead por la fuente "${client.fuente}" con interés en "${client.proyectoInteres || 'productos inmobiliarios'}". Incluye:
            1. Resumen del perfil del cliente
            2. Recomendaciones de seguimiento (3 acciones concretas)
            3. Estrategia de fidelización personalizada
            4. Propuesta de cross-selling/up-selling
            Sé conciso y práctico.`
          }
        })
      });
      const data = await res.json();
      setAiReport(data.data || data.message || 'Informe generado.');
    } catch (e) {
      setAiReport('Error al generar informe. Intenta de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 overflow-y-auto h-full">
      <div className="flex items-center gap-3">
        <CheckSquare size={28} className="text-emerald-600 dark:text-emerald-400" />
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Posventa y Operaciones</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-0.5">
            FIDELIZACIÓN · SEGUIMIENTO · INFORMES AUTOMÁTICOS
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-5 border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center gap-2 mb-2">
            <UserCheck size={18} className="text-emerald-600" />
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">Clientes Cerrados</span>
          </div>
          <p className="text-3xl font-black text-emerald-700 dark:text-emerald-400">{clientesCerrados.length}</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} className="text-blue-600" />
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">En Proceso</span>
          </div>
          <p className="text-3xl font-black text-blue-700 dark:text-blue-400">{clientesContacto.length}</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-5 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-2 mb-2">
            <Star size={18} className="text-purple-600" />
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase">Total Leads</span>
          </div>
          <p className="text-3xl font-black text-purple-700 dark:text-purple-400">{leads.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clientes */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Clientes y Leads</h3>
          {leads.length === 0 ? (
            <div className="text-center py-12">
              <UserCheck size={40} className="text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-400">No hay clientes registrados.</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
              {leads.map((lead: any) => (
                <div key={lead._id} className={`rounded-xl p-4 border cursor-pointer transition-all ${
                  selectedClient?._id === lead._id ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-900/10' : 'border-slate-100 dark:border-gray-700 hover:border-slate-300'
                }`}
                  onClick={() => setSelectedClient(lead)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-white">{lead.nombre}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{lead.fuente} • {lead.proyectoInteres || 'Sin proyecto'}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        lead.stage === 'cerrado_ganado' ? 'bg-emerald-100 text-emerald-700' :
                        lead.stage === 'nuevo' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>{lead.stage}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleGenerateReport(lead); }}
                        disabled={isGenerating}
                        className="text-purple-500 hover:text-purple-700 text-[10px] font-bold flex items-center gap-1"
                      >
                        <FileText size={12} /> Informe IA
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Report Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-purple-500" /> Informe IA
          </h3>

          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 size={32} className="text-purple-500 animate-spin mb-3" />
              <p className="text-sm text-slate-400">Generando informe para {selectedClient?.nombre}...</p>
            </div>
          ) : aiReport ? (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase">Informe: {selectedClient?.nombre}</span>
              </div>
              <div className="bg-slate-50 dark:bg-gray-900/50 rounded-xl p-4 border border-slate-200 dark:border-gray-700 max-h-[400px] overflow-y-auto">
                <pre className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">{aiReport}</pre>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FileText size={40} className="text-slate-300 dark:text-slate-600 mb-3" />
              <p className="text-sm text-slate-400">Selecciona un cliente y haz clic en "Informe IA" para generar un reporte automático de seguimiento.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
