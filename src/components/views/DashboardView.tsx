"use client";

import React from 'react';
import { UserCircle, Target, TrendingUp, BarChart3, Clock, Plus, ArrowRight, Calendar, Megaphone, Users } from 'lucide-react';

const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, type = 'default' }: { children: React.ReactNode, type?: 'success' | 'warning' | 'info' | 'default' }) => {
  const colors = {
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400',
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors[type] || colors.default}`}>
      {children}
    </span>
  );
};

export const DashboardView = ({ currentEmpresa, appData, onNavigate }: any) => {
  const proyectos = (appData.proyectos || []).filter((p: any) => p.empresaId === currentEmpresa?.id);
  const leads = (appData.leads || []).filter((l: any) => l.empresaId === currentEmpresa?.id);
  const campanas = (appData.estrategia || []).filter((c: any) => c.empresa_id === currentEmpresa?.id);
  const agenda = (appData.planner || []).slice(0, 5);
  const identidad = (appData.identidades || []).find((i: any) => i.empresaId === currentEmpresa?.id);

  const leadsNuevos = leads.filter((l: any) => l.stage === 'nuevo').length;
  const leadsCerrados = leads.filter((l: any) => l.stage === 'cerrado_ganado').length;

  return (
    <div className="p-8 space-y-6 h-full flex flex-col overflow-y-auto">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Panel General</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Vista consolidada de {currentEmpresa?.nombre}</p>
        </div>
        <button
          onClick={() => onNavigate?.('proyectos')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={16} /> Nuevo Proyecto
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Leads Captados', value: appData.metricasGenerales?.leads || leads.length || '0', trend: `${leadsNuevos} nuevos`, icon: UserCircle, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/30' },
          { title: 'CPL Promedio', value: appData.metricasGenerales?.cplPromedio || '$0', trend: 'Meta Ads', icon: Target, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
          { title: 'Proyectos Activos', value: proyectos.length, trend: `${campanas.length} campañas`, icon: TrendingUp, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/30' },
          { title: 'Cierres', value: leadsCerrados, trend: 'negocios ganados', icon: BarChart3, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/30' },
        ].map((kpi, i) => (
          <Card key={i} className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{kpi.title}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{kpi.value}</h3>
              </div>
              <div className={`p-2 rounded-lg ${kpi.bg} ${kpi.color}`}>
                <kpi.icon size={20} />
              </div>
            </div>
            <div className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">{kpi.trend}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Proyectos Activos */}
        <Card className="col-span-2 p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Proyectos Activos</h3>
            <button onClick={() => onNavigate?.('proyectos')} className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center gap-1">Ver todos <ArrowRight size={14} /></button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                  <th className="pb-3 font-medium">Nombre</th>
                  <th className="pb-3 font-medium">Tipo</th>
                  <th className="pb-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {proyectos.length === 0 ? (
                  <tr><td colSpan={3} className="py-8 text-center text-gray-500">No hay proyectos activos.</td></tr>
                ) : proyectos.slice(0, 6).map((p: any, i: number) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 text-sm font-medium text-gray-900 dark:text-white">{p.nombre}</td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">{p.tipo_proyecto}</td>
                    <td className="py-3"><Badge type="success">{p.estado_comercial}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-5">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Acciones Rápidas</h3>
            <div className="space-y-2">
              {[
                { label: 'Ir a Pipeline', view: 'ventas', icon: Users, color: 'text-blue-600' },
                { label: 'Ver Calendario', view: 'planner', icon: Calendar, color: 'text-purple-600' },
                { label: 'Estrategia IA', view: 'estrategia', icon: Megaphone, color: 'text-indigo-600' },
                { label: 'Nuevo Lead', view: 'preventa', icon: UserCircle, color: 'text-emerald-600' },
              ].map((action, i) => (
                <button
                  key={i}
                  onClick={() => onNavigate?.(action.view)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left"
                >
                  <action.icon size={16} className={action.color} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{action.label}</span>
                  <ArrowRight size={14} className="ml-auto text-gray-400" />
                </button>
              ))}
            </div>
          </Card>

          {/* Próximas Publicaciones */}
          <Card className="p-5">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">Próximo Contenido</h3>
            {agenda.length === 0 ? (
              <p className="text-xs text-gray-400">Sin contenido programado.</p>
            ) : (
              <div className="space-y-3">
                {agenda.map((item: any, i: number) => (
                  <div key={i} className="flex gap-3 items-start border-l-2 border-purple-500 pl-3">
                    <div>
                      <p className="text-xs font-medium text-gray-900 dark:text-white">{item.tema || item.contenido_id}</p>
                      <p className="text-[10px] text-gray-400 flex items-center gap-1"><Clock size={10} /> {item.fecha}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Brand Identity Status */}
          <Card className="p-5">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">Estado Marca</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">ADN de marca</span>
                {identidad?.esencia ? <Badge type="success">Configurado</Badge> : <Badge type="warning">Pendiente</Badge>}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Buyer Personas</span>
                <Badge type={appData.personas?.filter((p: any) => p.empresaId === currentEmpresa?.id).length > 0 ? 'success' : 'warning'}>
                  {appData.personas?.filter((p: any) => p.empresaId === currentEmpresa?.id).length || 0}/5
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
