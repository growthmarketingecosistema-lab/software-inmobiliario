"use client";

import React, { useState } from 'react';
import { Calendar, Plus, X, FileText, Clock, CheckCircle2, AlertCircle, MapPin, User } from 'lucide-react';

export const CalendarioView = ({ currentEmpresa, appData, refreshData }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [form, setForm] = useState({ leadNombre: '', fecha: '', hora: '10:00', ubicacion: '', notas: '', tipo: 'Visita' });

  // Simulated visits from leads data
  const leads = (appData?.leads || []).filter((l: any) => l.empresaId === currentEmpresa?.id);
  const [visitas, setVisitas] = useState<any[]>([]);

  const handleCreateVisita = async () => {
    if (!form.leadNombre || !form.fecha) return;
    setIsSubmitting(true);
    try {
      // Save to local state (in a full implementation, this would be an API call)
      const newVisita = {
        id: Date.now().toString(),
        ...form,
        estado: 'Programada',
        createdAt: new Date().toISOString()
      };
      setVisitas(prev => [...prev, newVisita]);
      setIsModalOpen(false);
      setForm({ leadNombre: '', fecha: '', hora: '10:00', ubicacion: '', notas: '', tipo: 'Visita' });
      setFeedback({ type: 'success', msg: '¡Visita programada exitosamente!' });
      setTimeout(() => setFeedback(null), 3000);
    } catch (e) {
      setFeedback({ type: 'error', msg: 'Error al programar visita.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const markVisitaCompleted = (id: string) => {
    setVisitas(prev => prev.map(v => v.id === id ? { ...v, estado: 'Completada' } : v));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 overflow-y-auto h-full">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Calendar size={28} className="text-blue-600 dark:text-blue-400" />
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Calendario y Bitácora</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-0.5">
              GESTIÓN DE VISITAS Y ACTIVIDADES COMERCIALES
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors uppercase"
        >
          <Plus size={14} /> Programar Visita
        </button>
      </div>

      {feedback && (
        <div className={`px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 ${
          feedback.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
            : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
        }`}>
          {feedback.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />} {feedback.msg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visitas Programadas */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-blue-500" /> Visitas Programadas
          </h3>

          {visitas.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Calendar size={40} className="text-slate-300 dark:text-slate-600 mb-3" />
              <p className="text-sm text-slate-400">No hay visitas programadas. Programa la primera.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {visitas.map(v => (
                <div key={v.id} className={`rounded-xl p-4 border transition-colors ${
                  v.estado === 'Completada' ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800' : 'bg-slate-50 dark:bg-gray-900/50 border-slate-200 dark:border-gray-700'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                        <User size={14} className="text-blue-500" /> {v.leadNombre}
                      </h4>
                      <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Clock size={12} /> {v.fecha} {v.hora}</span>
                        {v.ubicacion && <span className="flex items-center gap-1"><MapPin size={12} /> {v.ubicacion}</span>}
                      </div>
                      {v.notas && <p className="text-xs text-slate-400 mt-2">{v.notas}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        v.estado === 'Completada' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>{v.estado}</span>
                      {v.estado !== 'Completada' && (
                        <button onClick={() => markVisitaCompleted(v.id)} className="text-emerald-500 hover:text-emerald-700 text-xs font-bold">
                          Completar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Leads Sidebar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm p-6">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-4 uppercase tracking-wider">Leads Activos</h3>
          {leads.length === 0 ? (
            <p className="text-xs text-slate-400">Sin leads activos.</p>
          ) : (
            <div className="space-y-2">
              {leads.slice(0, 10).map((lead: any) => (
                <div key={lead._id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-900/50">
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-white">{lead.nombre}</p>
                    <p className="text-[10px] text-slate-400">{lead.stage} • {lead.fuente}</p>
                  </div>
                  <button
                    onClick={() => {
                      setForm({ ...form, leadNombre: lead.nombre });
                      setIsModalOpen(true);
                    }}
                    className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Agendar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden border border-gray-200 dark:border-gray-800 animate-slide-in-up">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Programar Visita</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Nombre del Lead / Cliente</label>
                <input type="text" value={form.leadNombre} onChange={e => setForm({ ...form, leadNombre: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg p-3 text-sm outline-none text-slate-800 dark:text-white" placeholder="Nombre del contacto" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Fecha</label>
                  <input type="date" value={form.fecha} onChange={e => setForm({ ...form, fecha: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg p-3 text-sm outline-none text-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Hora</label>
                  <input type="time" value={form.hora} onChange={e => setForm({ ...form, hora: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg p-3 text-sm outline-none text-slate-800 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Ubicación</label>
                <input type="text" value={form.ubicacion} onChange={e => setForm({ ...form, ubicacion: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg p-3 text-sm outline-none text-slate-800 dark:text-white" placeholder="Dirección o nombre del sitio" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Notas</label>
                <textarea value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg p-3 text-sm outline-none text-slate-800 dark:text-white min-h-[80px] resize-none" placeholder="Notas adicionales..." />
              </div>
              <button onClick={handleCreateVisita} disabled={isSubmitting || !form.leadNombre || !form.fecha}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-lg text-sm font-bold uppercase transition-colors">
                {isSubmitting ? 'Programando...' : 'Programar Visita'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
