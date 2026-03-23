"use client";

import React, { useState } from 'react';
import { Video, MapPin, X, Phone, Mail, FileText, CheckSquare, MessageCircle, Clock, User } from 'lucide-react';

type BrandType = 'fortress' | 'crescendo';

const FORTRESS_STAGES = ['Prospecto Inversor', 'Reunión de Estructuración', 'Análisis de Ticket', 'Envío de Documentación', 'Cierre'];
const CRESCENDO_STAGES = ['Nuevo Lead', 'Agendamiento de Visita', 'Visita/Recorrido Realizado', 'Oferta/Negociación', 'Ganado'];

export const VentasView: React.FC<any> = ({ currentEmpresa, appData, refreshData, onConvert }) => {
  const [activeBrand, setActiveBrand] = useState<BrandType>('fortress');
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState('contacto'); // for the slide-over
  const [isUpdating, setIsUpdating] = useState(false);

  const stages = activeBrand === 'fortress' ? FORTRESS_STAGES : CRESCENDO_STAGES;
  const filteredLeads = (appData?.leads || []).filter((l: any) => l.empresaId === activeBrand);

  const handleDropLead = async (leadId: string, newStage: string) => {
    // Optimistic UI could go here, but since refreshData is fast we await it.
    setIsUpdating(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, stage: newStage })
      });
      if (res.ok && refreshData) await refreshData();
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  const brandStyles = {
    fortress: {
      activeTab: 'bg-[#0f2027] text-white dark:bg-[#1f3a47]',
      inactiveTab: 'bg-white text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400',
      columnHeader: 'text-[#0f2027] dark:text-[#aabdc7] border-[#0f2027]/20 border-b-2',
      cardHover: 'hover:border-[#0f2027]/40 dark:hover:border-[#386275]',
      badge: 'bg-[#0f2027]/10 text-[#0f2027] dark:bg-[#0f2027] dark:text-blue-300'
    },
    crescendo: {
      activeTab: 'bg-[#D4AF37] text-white dark:bg-[#c29d28]',
      inactiveTab: 'bg-white text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400',
      columnHeader: 'text-[#856c1d] dark:text-[#D4AF37] border-[#D4AF37]/40 border-b-2',
      cardHover: 'hover:border-[#D4AF37]/50',
      badge: 'bg-[#D4AF37]/20 text-[#856c1d] dark:bg-[#D4AF37]/20 dark:text-[#e7c75c]'
    }
  };

  const currentStyle = brandStyles[activeBrand];

  return (
    <div className="p-8 h-full flex flex-col relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pipeline de Ventas</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Gestión de Leads y Seguimiento</p>
        </div>
        
        {/* Brand visual toggle */}
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl shadow-inner border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveBrand('fortress')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              activeBrand === 'fortress' ? currentStyle.activeTab + ' shadow-md' : brandStyles.fortress.inactiveTab
            }`}
          >
            Fortress Investment
          </button>
          <button
            onClick={() => setActiveBrand('crescendo')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              activeBrand === 'crescendo' ? currentStyle.activeTab + ' shadow-md' : brandStyles.crescendo.inactiveTab
            }`}
          >
            Proyectos Crescendo
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 h-full min-w-max">
          {stages.map(stage => {
            const stageLeads = filteredLeads.filter((l: any) => l.stage === stage);
            return (
              <div 
                key={stage} 
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const leadId = e.dataTransfer.getData('leadId');
                  if (leadId) handleDropLead(leadId, stage);
                }}
                className={`w-80 flex flex-col h-full bg-gray-50/50 dark:bg-gray-900/30 rounded-xl p-3 border border-gray-100 dark:border-gray-800 transition-all ${isUpdating ? 'opacity-60 pointer-events-none' : ''}`}
              >
                <div className={`flex justify-between items-center pb-3 mb-3 ${currentStyle.columnHeader}`}>
                  <h3 className="font-semibold text-sm">{stage}</h3>
                  <span className="text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
                    {stageLeads.length}
                  </span>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {stageLeads.map((lead: any) => (
                    <div 
                      key={lead._id} 
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('leadId', lead._id);
                        e.dataTransfer.effectAllowed = 'move';
                      }}
                      onClick={() => setSelectedLead(lead)}
                      className={`bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 cursor-grab active:cursor-grabbing transition-all ${currentStyle.cardHover}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-gray-900 dark:text-white text-sm">{lead.nombre}</span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className={`text-xs px-2 py-1 rounded font-medium ${currentStyle.badge}`}>
                          {lead.value || 'Sin ticket'}
                        </span>
                        
                        {lead.meeting && (
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400" title={lead.meeting.date}>
                            {lead.meeting.type === 'virtual' ? 
                              <Video size={14} className="text-blue-500 mr-1" /> : 
                              <MapPin size={14} className="text-red-500 mr-1" />
                            }
                            <span className="truncate max-w-[90px]">{lead.meeting.date.split(',')[0]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {stageLeads.length === 0 && (
                    <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-xl h-24 flex items-center justify-center text-gray-400 text-sm">
                      Mover aquí
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide-Over Ficha del Cliente */}
      {selectedLead && (
        <div className="absolute inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm" onClick={() => setSelectedLead(null)} />
          <div className="w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl relative flex flex-col border-l border-gray-200 dark:border-gray-800 transform transition-transform animate-slide-in">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedLead.nombre}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-1 rounded font-medium ${currentStyle.badge}`}>
                     {activeBrand === 'fortress' ? 'Fortress Investment' : 'Proyectos Crescendo'}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{selectedLead.stage}</span>
                </div>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-500 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex border-b border-gray-200 dark:border-gray-800 px-4 mt-2">
              {[
                { id: 'contacto', label: 'Contacto', icon: User },
                { id: 'historial', label: 'Historial', icon: Clock },
                { id: 'notas', label: 'Notas', icon: FileText },
                { id: 'tareas', label: 'Tareas', icon: CheckSquare }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id 
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'contacto' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Información de Contacto</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <Phone size={16} className="text-gray-400" /> +57 300 123 4567
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <Mail size={16} className="text-gray-400" /> contacto@ejemplo.com
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Detalles Comerciales</h3>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl space-y-3 border border-gray-100 dark:border-gray-700">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Presupuesto/Ticket</span>
                        <span className="text-sm font-medium dark:text-gray-200">{selectedLead.value || 'No definido'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Probabilidad</span>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">60%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'historial' && (
                <div className="text-center text-gray-500 text-sm mt-10">
                  <MessageCircle className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                  No hay interacciones recientes.
                </div>
              )}
              {activeTab === 'notas' && (
                <div className="space-y-4">
                  <textarea 
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white min-h-[120px]"
                    placeholder="Agregar nota interna..."
                  ></textarea>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Guardar Nota
                  </button>
                </div>
              )}
              {activeTab === 'tareas' && (
                <div className="text-center text-gray-500 text-sm mt-10">
                  <CheckSquare className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                  No hay tareas pendientes.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
