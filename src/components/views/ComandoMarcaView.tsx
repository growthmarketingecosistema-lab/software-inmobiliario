"use client";

import React, { useState } from 'react';
import { Upload, Users, TrendingUp, Palette, Target, Share2, Instagram, Facebook, MonitorSmartphone, CheckCircle2, Circle, Clock, MoreHorizontal, MessageSquare } from 'lucide-react';

const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
    {children}
  </div>
);

const ToggleButton = ({ label, icon: Icon, connected, onToggle }: { label: string, icon: any, connected: boolean, onToggle: () => void }) => (
  <button 
    onClick={onToggle}
    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all w-full ${
      connected 
        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' 
        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-800'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${connected ? 'bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}>
        <Icon size={20} />
      </div>
      <span className={`font-medium ${connected ? 'text-blue-900 dark:text-blue-100' : 'text-gray-700 dark:text-gray-300'}`}>
        {label}
      </span>
    </div>
    <div className={`w-10 h-6 rounded-full transition-colors relative ${connected ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${connected ? 'left-5' : 'left-1'}`} />
    </div>
  </button>
);

export const ComandoMarcaView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Identidad' | 'Ecosistema' | 'Tareas'>('Identidad');
  
  // Ecosistema states
  const [connections, setConnections] = useState({
    instagram: false,
    meta: true,
    ghl: false
  });

  return (
    <div className="p-8 h-full flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
        <div className="flex items-center gap-5">
          <button className="w-20 h-20 rounded-xl bg-purple-50 dark:bg-purple-900/30 border-2 border-dashed border-purple-200 dark:border-purple-800 flex flex-col items-center justify-center text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
            <Upload size={24} className="mb-1" />
            <span className="text-[10px] font-medium uppercase tracking-wider">Logo</span>
          </button>
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300 rounded-md">
                Marca Conjunta
              </span>
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 rounded-md">
                Activa
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Boulevard El Parque</h1>
            <p className="text-gray-500 dark:text-gray-400">Sinergia Comercial Multi-desarrollo</p>
          </div>
        </div>

        {/* KPIs */}
        <div className="flex gap-4">
          <Card className="p-4 min-w-[160px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Leads (Mes)</span>
              <Users size={16} className="text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">284</div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <TrendingUp size={12} /> +12% vs Ant.
            </div>
          </Card>

          <Card className="p-4 min-w-[160px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Ppto. Ads</span>
              <Target size={16} className="text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">$4,250</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Consumido (68%)</div>
          </Card>
        </div>
      </div>

      {/* Internal Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6 shrink-0 overflow-x-auto">
        {[
          { id: 'Identidad', label: 'Identidad & Buyer Persona', icon: Palette },
          { id: 'Ecosistema', label: 'Ecosistema Digital', icon: Share2 },
          { id: 'Tareas', label: 'Tareas & Entregables', icon: CheckCircle2 }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-purple-600 text-purple-600 dark:text-purple-400' 
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto pb-8">
        {activeTab === 'Identidad' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Users size={20} className="text-purple-500" /> Perfil del Cliente Ideal
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Perfil Demográfico</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Familias en crecimiento o parejas jóvenes, 28-45 años, ingresos medios-altos (Nivel C+ / B). Residentes en zonas aledañas al norte de la ciudad.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Puntos de Dolor (Pain Points)</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Falta de áreas verdes seguras para los niños.</li>
                    <li>Preocupación por la plusvalía de su primera gran inversión.</li>
                    <li>Tráfico excesivo hacia zonas de trabajo.</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Intereses & Comportamiento</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Actividades al aire libre, mascotas, diseño contemporáneo, buscan amenidades integradas (All-in-one living).</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Palette size={20} className="text-purple-500" /> Guía de Estilo Visual
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Paleta de Colores</h3>
                  <div className="flex gap-3">
                    {[
                      { hex: '#2A4D3E', name: 'Bosque', bg: 'bg-[#2A4D3E]', text: 'text-white' },
                      { hex: '#D4AF37', name: 'Dorado', bg: 'bg-[#D4AF37]', text: 'text-gray-900' },
                      { hex: '#F9F8F6', name: 'Crema', bg: 'bg-[#F9F8F6]', text: 'text-gray-900' },
                      { hex: '#1C1C1C', name: 'Carbón', bg: 'bg-[#1C1C1C]', text: 'text-white' }
                    ].map(color => (
                      <div key={color.hex} className="text-center group">
                        <div className={`w-14 h-14 rounded-lg shadow-inner mb-2 border border-black/5 dark:border-white/10 ${color.bg} flex items-center justify-center`}>
                          <span className={`text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity ${color.text}`}>{color.hex}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 block">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tipografías</h3>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="block text-xl font-serif text-gray-900 dark:text-white mb-1">Playfair Display</span>
                      <span className="text-xs font-mono text-gray-500 dark:text-gray-400">Títulos y Encabezados (Serif)</span>
                    </div>
                    <div className="w-px h-10 bg-gray-200 dark:bg-gray-700 mx-4"></div>
                    <div>
                      <span className="block text-lg font-sans font-light text-gray-900 dark:text-white mb-1">Montserrat</span>
                      <span className="text-xs font-mono text-gray-500 dark:text-gray-400">Cuerpos y Botones (Sans-serif)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Assets</h3>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-300 hover:bg-purple-50 dark:hover:border-purple-700 dark:hover:bg-purple-900/30 p-3 rounded-lg text-sm font-medium text-purple-700 dark:text-purple-400 transition-colors">
                      Descargar Logo Pack (ZIP)
                    </button>
                    <button className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-300 hover:bg-purple-50 dark:hover:border-purple-700 dark:hover:bg-purple-900/30 p-3 rounded-lg text-sm font-medium text-purple-700 dark:text-purple-400 transition-colors">
                      Ver Carpeta de Renders (Drive)
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'Ecosistema' && (
          <div className="max-w-3xl">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Conexiones de la Marca</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Gestiona los integraciones activas para centralizar el flujo de datos de esta marca en particular.</p>
            
            <div className="space-y-4">
              <ToggleButton 
                label="Cuenta de Instagram (Propietario)" 
                icon={Instagram} 
                connected={connections.instagram} 
                onToggle={() => setConnections(prev => ({...prev, instagram: !prev.instagram}))} 
              />
              <ToggleButton 
                label="Meta Ads Business Account" 
                icon={Facebook} 
                connected={connections.meta} 
                onToggle={() => setConnections(prev => ({...prev, meta: !prev.meta}))} 
              />
              <ToggleButton 
                label="GoHighLevel Sub-account (CRM)" 
                icon={MonitorSmartphone} 
                connected={connections.ghl} 
                onToggle={() => setConnections(prev => ({...prev, ghl: !prev.ghl}))} 
              />
            </div>
            
            <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/50 flex gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full h-fit text-blue-600 dark:text-blue-400">
                <MessageSquare size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Webhook de Triaje Habilitado</h4>
                <p className="text-sm text-blue-800/80 dark:text-blue-200/80 leading-relaxed">
                  Los leads capturados a través de las cuentas conectadas serán dirigidos automáticamente al <strong className="font-semibold">Buzón de Triaje</strong> comercial con la etiqueta pre-asignada de "Boulevard El Parque".
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Tareas' && (
          <Card className="flex flex-col h-[500px]">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50 rounded-t-xl">
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white">Planner de Tareas</h2>
                <p className="text-xs text-gray-500 mt-0.5">Sincronizado con Microsoft Planner</p>
              </div>
              <button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                + Nueva Tarea
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm z-10 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Estado</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Nombre de Tarea</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Asignado a</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Fecha Límite</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {[
                    { status: 'pending', name: 'Aprobar copy de campaña de expectativa', assignee: 'Mkt. Team', date: 'Hoy' },
                    { status: 'progress', name: 'Renderización de Casa Club interior', assignee: 'Arq. Design', date: '12 Nov' },
                    { status: 'completed', name: 'Configuración de dominio y DNS para Landing', assignee: 'IT Support', date: '05 Nov' },
                    { status: 'pending', name: 'Revisión presupuestal Ads Diciembre', assignee: 'Finance', date: '15 Nov' },
                  ].map((task, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                      <td className="px-5 py-4">
                        {task.status === 'completed' ? <CheckCircle2 size={18} className="text-emerald-500" /> :
                         task.status === 'progress' ? <Clock size={18} className="text-amber-500" /> :
                         <Circle size={18} className="text-gray-300 dark:text-gray-600" />}
                      </td>
                      <td className="px-5 py-4 font-medium text-sm text-gray-900 dark:text-white">
                        <span className={task.status === 'completed' ? 'line-through text-gray-400 dark:text-gray-500' : ''}>
                          {task.name}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-300">
                            {task.assignee.charAt(0)}
                          </div>
                          {task.assignee}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          task.date === 'Hoy' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                        }`}>
                          {task.date}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><MoreHorizontal size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
