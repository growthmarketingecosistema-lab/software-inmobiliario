"use client";

import React from 'react';
import { User, MessageCircle, Calendar as CalendarIcon, Phone, Mail, Clock, AlertCircle, Inbox } from 'lucide-react';

export const PreVentaView: React.FC = () => {
  // Simulando leads en tiempo real
  const [leads, setLeads] = React.useState([
    { id: 1, name: "Carlos Ramírez", source: "Meta Ads", date: "Hace 10 min", message: "Interesado en proyecto Crescendo para compra de vivienda familiar.", score: "Alto" },
    { id: 2, name: "Ana Torres", source: "Website", date: "Hace 45 min", message: "Quiero invertir más de 300M, busco opciones de rentabilidad.", score: "Alto" },
    { id: 3, name: "Luis Gómez", source: "Facebook", date: "Hace 2 horas", message: "Solo información de precios.", score: "Bajo" },
    { id: 4, name: "María Peña", source: "WhatsApp", date: "Hace 4 horas", message: "Busco apartamento de 2 habitaciones en el norte.", score: "Medio" },
  ]);

  const removeLead = (id: number) => {
    setLeads(leads.filter(lead => lead.id !== id));
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Buzón de Triaje</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Gestión de Leads Entrantes (Pre-venta)</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg flex items-center gap-2 border border-blue-100 dark:border-blue-800">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="font-semibold">{leads.length} Leads Nuevos</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-sm">Lead</th>
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-sm">Origen / Fecha</th>
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-sm">Interés / Mensaje</th>
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-sm text-right">Acción Rápida</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                        <User size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{lead.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                          <Phone size={12} /> +57 300 000 0000
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 w-max">
                         {lead.source}
                      </span>
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                        <Clock size={12} /> {lead.date}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs md:max-w-sm">
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{lead.message}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col sm:flex-row gap-2 justify-end">
                      <button 
                        onClick={() => removeLead(lead.id)}
                        className="px-3 py-1.5 bg-[#0f2027]/10 dark:bg-[#0f2027] hover:bg-[#0f2027]/20 dark:hover:bg-[#203a43] text-[#0f2027] dark:text-white text-xs font-medium rounded border border-[#0f2027]/20 dark:border-[#2c5364] transition-colors"
                      >
                        Fortress Inv.
                      </button>
                      <button 
                        onClick={() => removeLead(lead.id)}
                        className="px-3 py-1.5 bg-[#D4AF37]/10 dark:bg-[#D4AF37]/20 hover:bg-[#D4AF37]/20 dark:hover:bg-[#D4AF37]/30 text-[#856c1d] dark:text-[#D4AF37] text-xs font-medium rounded border border-[#D4AF37]/30 dark:border-[#D4AF37]/50 transition-colors"
                      >
                        Crescendo
                      </button>
                      <button 
                        onClick={() => removeLead(lead.id)}
                        className="px-3 py-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-xs font-medium rounded border border-transparent hover:border-red-200 dark:hover:border-red-800 transition-colors"
                      >
                        Descartar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    <Inbox className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
                    <p>No hay leads entrantes pendientes de triaje.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
