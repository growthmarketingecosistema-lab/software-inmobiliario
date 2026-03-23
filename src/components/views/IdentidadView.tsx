"use client";

import React, { useState, useEffect } from 'react';
import { Fingerprint, Plus, X, Trash2, Edit3, User, CheckCircle2, AlertCircle } from 'lucide-react';

const PERSONA_FIELDS = [
  { key: 'nombre', label: 'Nombre del Perfil', placeholder: 'Ej: María, Inversionista Premium', required: true },
  { key: 'edad', label: 'Rango de Edad', placeholder: 'Ej: 35-50 años' },
  { key: 'ocupacion', label: 'Ocupación', placeholder: 'Ej: Ejecutivo corporativo' },
  { key: 'ingresos', label: 'Rango de Ingresos', placeholder: 'Ej: $10M - $20M COP/mes' },
  { key: 'problema', label: 'Problema Principal', placeholder: '¿Qué dolor resuelve tu producto?' },
  { key: 'deseo', label: 'Deseo / Aspiración', placeholder: '¿Qué quiere lograr?' },
  { key: 'objecion', label: 'Objeción Frecuente', placeholder: '¿Qué le impide comprar?' },
  { key: 'motivacion', label: 'Motivación de Compra', placeholder: '¿Qué lo impulsa a decidir?' },
  { key: 'necesidades', label: 'Necesidades Clave', placeholder: 'Lo que necesita del producto/servicio' },
  { key: 'comportamiento_compra', label: 'Comportamiento de Compra', placeholder: '¿Cómo investiga, compara, decide?' },
  { key: 'caracteristicas', label: 'Características del Cliente Ideal', placeholder: 'Perfil demográfico y psicográfico' },
];

const emptyPersona: Record<string, string> = {
  nombre: '', edad: '', ocupacion: '', ingresos: '', problema: '', deseo: '',
  objecion: '', motivacion: '', necesidades: '', comportamiento_compra: '', caracteristicas: ''
};

export const IdentidadView = ({ currentEmpresa, appData, refreshData }: any) => {
  // ADN State
  const [adn, setAdn] = useState({ esencia: '', nicho: '', propuesta: '', tono: '' });
  const [adnLoaded, setAdnLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  // Persona State
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false);
  const [editingPersona, setEditingPersona] = useState<any>(null);
  const [personaForm, setPersonaForm] = useState<Record<string, string>>({ ...emptyPersona });
  const [isPersonaSubmitting, setIsPersonaSubmitting] = useState(false);

  // Load existing identity from appData
  useEffect(() => {
    if (appData?.identidades && currentEmpresa) {
      const existing = appData.identidades.find((i: any) => i.empresaId === currentEmpresa.id);
      if (existing) {
        setAdn({ esencia: existing.esencia || '', nicho: existing.nicho || '', propuesta: existing.propuesta || '', tono: existing.tono || '' });
        setAdnLoaded(true);
      }
    }
  }, [appData, currentEmpresa]);

  const personas = (appData?.personas || []).filter((p: any) => p.empresaId === currentEmpresa?.id);

  // Save ADN
  const handleSaveAdn = async () => {
    setIsSubmitting(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/identidad', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ empresaId: currentEmpresa.id, ...adn })
      });
      if (res.ok) {
        setFeedback({ type: 'success', msg: '¡ADN de marca guardado exitosamente!' });
        setAdnLoaded(true);
        if (refreshData) await refreshData();
        setTimeout(() => setFeedback(null), 4000);
      } else {
        setFeedback({ type: 'error', msg: 'Error al guardar.' });
      }
    } catch (e) {
      setFeedback({ type: 'error', msg: 'Error de conexión.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Create/Edit Persona
  const handleSavePersona = async () => {
    if (!personaForm.nombre) return;
    setIsPersonaSubmitting(true);
    try {
      const url = editingPersona ? '/api/personas' : '/api/personas';
      const method = editingPersona ? 'PUT' : 'POST';
      const body = editingPersona
        ? { _id: editingPersona._id, ...personaForm }
        : { empresaId: currentEmpresa.id, ...personaForm };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        setIsPersonaModalOpen(false);
        setEditingPersona(null);
        setPersonaForm({ ...emptyPersona });
        setFeedback({ type: 'success', msg: editingPersona ? 'Perfil actualizado.' : '¡Perfil creado!' });
        setTimeout(() => setFeedback(null), 3000);
        if (refreshData) await refreshData();
      } else {
        const err = await res.json().catch(() => ({}));
        setFeedback({ type: 'error', msg: err.error || 'Error al guardar perfil.' });
      }
    } catch (e) {
      setFeedback({ type: 'error', msg: 'Error de conexión.' });
    } finally {
      setIsPersonaSubmitting(false);
    }
  };

  // Delete Persona
  const handleDeletePersona = async (id: string) => {
    if (!confirm('¿Eliminar este buyer persona?')) return;
    try {
      const res = await fetch(`/api/personas?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFeedback({ type: 'success', msg: 'Perfil eliminado.' });
        setTimeout(() => setFeedback(null), 3000);
        if (refreshData) await refreshData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const openEditPersona = (persona: any) => {
    setEditingPersona(persona);
    const form: Record<string, string> = {};
    PERSONA_FIELDS.forEach(f => { form[f.key] = persona[f.key] || ''; });
    setPersonaForm(form);
    setIsPersonaModalOpen(true);
  };

  const openNewPersona = () => {
    setEditingPersona(null);
    setPersonaForm({ ...emptyPersona });
    setIsPersonaModalOpen(true);
  };

  return (
    <div className="p-8 space-y-6 h-full flex flex-col overflow-y-auto bg-slate-50 dark:bg-[#0f1115]">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
            <Fingerprint className="text-blue-600 dark:text-blue-500" size={28} />
            Identidad de Marca
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 uppercase tracking-widest font-bold">
            ADN ESTRATÉGICO DE {currentEmpresa?.nombre?.toUpperCase()}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleSaveAdn}
            disabled={isSubmitting}
            className="bg-[#4F46E5] hover:bg-indigo-600 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors uppercase tracking-wider shadow-sm"
          >
            {isSubmitting ? 'Guardando...' : 'Guardar ADN'}
          </button>
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 animate-slide-in-up ${
          feedback.type === 'success'
            ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
            : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
        }`}>
          {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {feedback.msg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Núcleo estratégico */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/50 shadow-sm overflow-hidden relative p-8">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
          {adnLoaded && (
            <span className="absolute top-4 right-4 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase px-2 py-1 rounded-full">
              ✓ Configurado
            </span>
          )}

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            Núcleo estratégico
          </h3>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">¿Qué es la marca? (Esencia)</label>
              <textarea
                value={adn.esencia}
                onChange={(e) => setAdn({ ...adn, esencia: e.target.value })}
                className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-100 dark:border-gray-700 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 dark:text-white min-h-[80px] resize-none"
                placeholder="Definir la esencia de la empresa..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Nicho / Mercado Objetivo</label>
              <input
                type="text" value={adn.nicho}
                onChange={(e) => setAdn({ ...adn, nicho: e.target.value })}
                className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-100 dark:border-gray-700 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 dark:text-white"
                placeholder="Ej: Inmobiliarias de lujo"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Propuesta única de valor</label>
              <textarea
                value={adn.propuesta}
                onChange={(e) => setAdn({ ...adn, propuesta: e.target.value })}
                className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-100 dark:border-gray-700 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 dark:text-white min-h-[80px] resize-none"
                placeholder="¿Por qué elegirte a ti?"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Tono de Comunicación</label>
              <input
                type="text" value={adn.tono}
                onChange={(e) => setAdn({ ...adn, tono: e.target.value })}
                className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-100 dark:border-gray-700 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 dark:text-white"
                placeholder="Ej: Profesional, cercano, disruptivo"
              />
            </div>
          </div>
        </div>

        {/* Personas compradoras */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900/50 shadow-sm overflow-hidden relative p-8">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400"></div>

          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                Buyer Personas
              </h3>
              <p className="text-xs text-slate-400 mt-1">{personas.length}/5 perfiles creados</p>
            </div>

            <button
              onClick={openNewPersona}
              disabled={personas.length >= 5}
              className="text-emerald-500 hover:text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus size={14} /> Nuevo Perfil
            </button>
          </div>

          {personas.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <User size={48} className="text-slate-300 dark:text-slate-600 mb-3" />
              <p className="text-sm text-slate-400 dark:text-slate-500">No hay buyer personas. Crea el primero.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {personas.map((p: any) => (
                <div key={p._id} className="bg-slate-50 dark:bg-gray-900/50 rounded-xl p-4 border border-slate-100 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 dark:text-white text-sm">{p.nombre}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{p.edad} • {p.ocupacion}</p>
                      {p.problema && <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2"><span className="font-semibold text-slate-600 dark:text-slate-300">Problema:</span> {p.problema}</p>}
                      {p.deseo && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2"><span className="font-semibold text-slate-600 dark:text-slate-300">Deseo:</span> {p.deseo}</p>}
                    </div>
                    <div className="flex items-center gap-1 ml-2 shrink-0">
                      <button onClick={() => openEditPersona(p)} className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-400 hover:text-blue-600 transition-colors">
                        <Edit3 size={14} />
                      </button>
                      <button onClick={() => handleDeletePersona(p._id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Persona Modal */}
      {isPersonaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsPersonaModalOpen(false)} />
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg z-10 overflow-hidden border border-gray-200 dark:border-gray-800 animate-slide-in-up max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center shrink-0">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingPersona ? 'Editar Buyer Persona' : 'Nuevo Buyer Persona'}
              </h2>
              <button onClick={() => setIsPersonaModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              {PERSONA_FIELDS.map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">
                    {field.label} {field.required && <span className="text-red-400">*</span>}
                  </label>
                  <input
                    type="text"
                    value={personaForm[field.key] || ''}
                    onChange={e => setPersonaForm({ ...personaForm, [field.key]: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800 dark:text-white"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-end gap-3 shrink-0">
              <button
                onClick={() => setIsPersonaModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSavePersona}
                disabled={isPersonaSubmitting || !personaForm.nombre}
                className="px-5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-lg transition-colors shadow-sm"
              >
                {isPersonaSubmitting ? 'Guardando...' : (editingPersona ? 'Actualizar' : 'Crear Perfil')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
