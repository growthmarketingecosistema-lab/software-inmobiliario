"use client";

import React from 'react';
import { UserCircle, Target, TrendingUp, BarChart3, Clock, Plus } from 'lucide-react';
// Removed mockData import

// Shared Components
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

export const DashboardView = ({ currentEmpresa, appData, onNavigate }: any) => (
  <div className="p-8 space-y-6 h-full flex flex-col overflow-y-auto">
    <div className="flex justify-between items-end">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard General</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Resumen de operaciones para {currentEmpresa.nombre}</p>
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
        <Plus size={16} /> Nuevo Proyecto
      </button>
    </div>

    {/* KPIs Rápidos */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { title: 'Leads Captados', value: appData.metricasGenerales?.leads || 0, trend: '+12%', icon: UserCircle, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/30' },
        { title: 'CPL Promedio', value: appData.metricasGenerales?.cplPromedio || 0, trend: '-5%', icon: Target, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
        { title: 'ROI Global', value: appData.metricasGenerales?.roi || 0, trend: '+24%', icon: TrendingUp, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/30' },
        { title: 'Inversión Activa', value: appData.metricasGenerales?.inversion || 0, trend: '+2%', icon: BarChart3, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/30' },
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
          <div className="mt-4 text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            {kpi.trend} <span className="text-gray-400 dark:text-gray-500 font-normal">vs mes anterior</span>
          </div>
        </Card>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
      {/* Proyectos Activos */}
      <Card className="col-span-2 p-5 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Proyectos Activos</h3>
          <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">Ver todos</button>
        </div>
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                <th className="pb-3 font-medium">Nombre del Proyecto</th>
                <th className="pb-3 font-medium">Estado</th>
                <th className="pb-3 font-medium">Responsable</th>
                <th className="pb-3 font-medium">Ticket</th>
              </tr>
            </thead>
            <tbody>
              {appData.proyectos?.filter((p: any) => p.empresaId === currentEmpresa.id).map((p: any, i: number) => (
                <tr key={i} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-3 text-sm font-medium text-gray-900 dark:text-white">{p.nombre}</td>
                  <td className="py-3">
                    <Badge type={p.estado === 'En curso' ? 'info' : p.estado === 'Activo' ? 'success' : 'warning'}>
                      {p.estado}
                    </Badge>
                  </td>
                  <td className="py-3 text-sm text-gray-600 dark:text-gray-400">{p.responsable}</td>
                  <td className="py-3 text-sm font-medium text-gray-900 dark:text-white">{p.ticket}</td>
                </tr>
              ))}
              {(!appData.proyectos || appData.proyectos.filter((p: any) => p.empresaId === currentEmpresa.id).length === 0) && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500 dark:text-gray-400">
                    No hay proyectos activos para esta empresa.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Planner Semanal Mini */}
      <Card className="p-5 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Planner Semanal</h3>
        </div>
        <div className="space-y-4 flex-1 overflow-y-auto pr-2">
          {appData.planner?.map((tarea: any, i: number) => (
            <div key={i} className="flex gap-3 items-start border-l-2 border-blue-500 pl-3 py-1">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{tarea.tema || tarea.contenido}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><Clock size={12}/> {tarea.fecha || tarea.publicacion}</span>
                  <span>•</span>
                  <span>{tarea.tipo_contenido || tarea.formato}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);
