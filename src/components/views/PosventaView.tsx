"use client";

import React, { useState } from 'react';
import { CheckCircle, ArrowRight, Building2, Target, X, User, Phone, CheckSquare } from 'lucide-react';

interface WonLead {
  id: string;
  name: string;
  brand: 'Fortress Investment' | 'Proyectos Crescendo';
  dateStr: string;
  value: string;
}

const mockWonLeads: WonLead[] = [
  { id: '1', name: 'Constructora Alfa', brand: 'Proyectos Crescendo', dateStr: '15 Oct 2023', value: 'Proyecto Integral' },
  { id: '2', name: 'Inversiones Delta', brand: 'Fortress Investment', dateStr: '12 Oct 2023', value: '$850M COP' },
  { id: '3', name: 'María Sandoval', brand: 'Proyectos Crescendo', dateStr: '10 Oct 2023', value: 'Casa Campestre' },
];

export const PosventaView: React.FC<any> = ({ currentEmpresa }) => {
  const [selectedLead, setSelectedLead] = useState<WonLead | null>(null);

  const handleConvert = (lead: WonLead) => {
    setSelectedLead(lead);
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Posventa y Operaciones</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Transición de Negocios Ganados a Operaciones</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-4 py-2 rounded-lg flex items-center gap-2 border border-green-100 dark:border-green-800">
          <CheckSquare size={18} />
          <span className="font-semibold">{mockWonLeads.length} Negocios Cerrados</span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex-1">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-sm">Cliente / Negocio</th>
              <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-sm">Marca Comercial</th>
              <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-sm">Fecha Cierre / Valor</th>
              <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-sm text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {mockWonLeads.map(lead => (
              <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white block">{lead.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1">
                      <User size={12} /> Contacto validado
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium ${
                    lead.brand === 'Fortress Investment' 
                      ? 'bg-[#0f2027]/10 text-[#0f2027] border border-[#0f2027]/20 dark:bg-[#0f2027] dark:text-blue-300 dark:border-blue-900/50' 
                      : 'bg-[#D4AF37]/10 text-[#856c1d] border border-[#D4AF37]/30 dark:bg-[#D4AF37]/20 dark:text-[#e7c75c]'
                  }`}>
                    {lead.brand}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{lead.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{lead.dateStr}</div>
                </td>
                <td className="px-6 py-5 text-right">
                  <button 
                    onClick={() => handleConvert(lead)}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                  >
                    Convertir a Proyecto <ArrowRight size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Convert to Project Modal */}
      {selectedLead && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedLead(null)} />
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg z-10 overflow-hidden border border-gray-200 dark:border-gray-800 animate-slide-in-up">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Convertir a Entregable Operativo</h2>
              <button onClick={() => setSelectedLead(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 font-medium">
                Cliente: <span className="font-semibold text-gray-900 dark:text-white">{selectedLead.name}</span>
              </p>
              
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Selecciona la naturaleza de la entrega:</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex flex-col items-center text-center p-5 border-2 border-transparent hover:border-blue-500 bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all group">
                  <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform shadow-sm">
                    <Building2 size={24} />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2">Marca de Proyecto</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Estrategia a largo plazo. Ideal para desarrollos continuos y marcas madre.</p>
                </button>

                <button className="flex flex-col items-center text-center p-5 border-2 border-transparent hover:border-purple-500 bg-gray-50 dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all group">
                  <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mb-3 group-hover:scale-110 transition-transform shadow-sm">
                    <Target size={24} />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2">Proyecto Corto</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Entregable puntual o campaña específica con inicio y fin definidos.</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
