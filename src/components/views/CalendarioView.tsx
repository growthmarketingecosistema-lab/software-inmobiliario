"use client";

import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Video, MapPin, X, RefreshCw, Star, Clock } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'fortress' | 'crescendo';
  location: 'virtual' | 'presencial';
  status: 'Programada' | 'Completada' | 'Cancelada' | 'Reprogramada';
}

const mockEvents: Event[] = [
  { id: '1', title: 'Visita Apartamento Norte - Luis Gómez', date: '2023-10-25', time: '15:00', type: 'crescendo', location: 'presencial', status: 'Programada' },
  { id: '2', title: 'Estructuración Inv. - Carlos Ramírez', date: '2023-10-26', time: '10:00', type: 'fortress', location: 'virtual', status: 'Programada' },
];

export const CalendarioView: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Simplified calendar grid logic for demonstration
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const dates = Array.from({ length: 35 }, (_, i) => i - 2); // mockup dates
  
  return (
    <div className="p-8 h-full flex flex-col relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calendario y Bitácora</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Sincronizado con Outlook Exchange</p>
        </div>
        
        <button className="flex items-center gap-2 bg-[#0078D4] hover:bg-[#106EBE] text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-colors">
          <RefreshCw size={18} />
          Sincronizar Outlook
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex-1 flex flex-col overflow-hidden">
        {/* Calendar Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Octubre 2023</h2>
            <div className="flex gap-1">
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-400"><ChevronLeft size={20} /></button>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-400"><ChevronRight size={20} /></button>
            </div>
          </div>
          <div className="flex gap-2 bg-gray-100 dark:bg-gray-900/50 p-1 rounded-lg">
            <button className="px-3 py-1 bg-white dark:bg-gray-800 rounded shadow-sm text-sm font-medium dark:text-white">Mes</button>
            <button className="px-3 py-1 text-gray-600 dark:text-gray-400 text-sm font-medium">Semana</button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 sticky top-0 z-10">
            {days.map(day => (
              <div key={day} className="py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700 last:border-0">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 grid-rows-5 h-full">
            {dates.map((date, idx) => {
              const hasCrescendoEvent = date === 25;
              const hasFortressEvent = date === 26;
              const isCurrentMonth = date > 0 && date <= 31;
              return (
                <div key={idx} className={`border-r border-b border-gray-200 dark:border-gray-700 p-2 min-h-[100px] ${!isCurrentMonth ? 'bg-gray-50/50 dark:bg-gray-900/20' : ''}`}>
                  <span className={`text-sm font-medium ${date === 25 ? 'bg-blue-600 text-white w-7 h-7 flex items-center justify-center rounded-full' : 'text-gray-700 dark:text-gray-300'}`}>
                    {date > 0 && date <= 31 ? date : (date <= 0 ? 30 + date : date - 31)}
                  </span>
                  
                  <div className="mt-2 space-y-1">
                    {hasCrescendoEvent && (
                      <div 
                        onClick={() => setSelectedEvent(mockEvents[0])}
                        className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#856c1d] dark:bg-[#D4AF37]/20 dark:text-[#e7c75c] text-xs px-2 py-1 rounded cursor-pointer hover:bg-[#D4AF37]/20 truncate"
                      >
                        15:00 Visita ...
                      </div>
                    )}
                    {hasFortressEvent && (
                      <div 
                        onClick={() => setSelectedEvent(mockEvents[1])}
                        className="bg-[#0f2027]/10 border border-[#0f2027]/20 text-[#0f2027] dark:bg-[#0f2027] dark:text-blue-300 dark:border-blue-900/50 text-xs px-2 py-1 rounded cursor-pointer hover:opacity-80 truncate"
                      >
                        10:00 Estruct...
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Event/Bitacora Modal */}
      {selectedEvent && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedEvent(null)} />
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg z-10 overflow-hidden border border-gray-200 dark:border-gray-800 animate-slide-in-up">
            <div className={`h-2 ${selectedEvent.type === 'fortress' ? 'bg-[#0f2027]' : 'bg-[#D4AF37]'}`}></div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{selectedEvent.title}</h2>
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1"><CalendarIcon size={14} /> {selectedEvent.date}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {selectedEvent.time}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-5">
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wider">Estado</label>
                    <select className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-sm dark:text-white outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Programada</option>
                      <option>Completada</option>
                      <option>Cancelada</option>
                      <option>Reprogramada</option>
                    </select>
                  </div>
                  {selectedEvent.location === 'virtual' && (
                    <div className="flex-1 flex items-end">
                      <button className="w-full flex items-center justify-center gap-2 bg-[#464EB8] hover:bg-[#3B42A0] text-white p-2.5 rounded-lg text-sm font-medium transition-colors h-[42px]">
                        <Video size={16} /> Teams
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">Calificación de Interés</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} className="text-gray-300 dark:text-gray-600 hover:text-yellow-400 dark:hover:text-yellow-500 transition-colors">
                        <Star size={24} fill={star <= 3 ? 'currentColor' : 'none'} className={star <= 3 ? 'text-yellow-400' : ''} />
                      </button>
                    ))}
                  </div>
                </div>

                {selectedEvent.type === 'fortress' ? (
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wider">Capacidad de Inversión</label>
                    <input type="text" placeholder="Ej. > 200M COP" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-sm dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wider">Inmuebles Mostrados</label>
                    <input type="text" placeholder="Ej. Apto 302, Apto 405" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-sm dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wider">Notas y Objeciones</label>
                  <textarea 
                    rows={4}
                    placeholder="Escriba los resultados de la reunión..."
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm dark:text-white outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm">
                Guardar Resultados
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
