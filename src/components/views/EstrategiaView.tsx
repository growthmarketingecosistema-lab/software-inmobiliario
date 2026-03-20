"use client";

import React from 'react';
import { Megaphone, Plus } from 'lucide-react';
import { mockData } from '@/lib/mockData';

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

export const EstrategiaView = ({ currentEmpresa }: { currentEmpresa: { id: string, nombre: string } }) => {
  // Para este mockup, mostramos la campaña si pertenece a los proyectos de la empresa
  const proyectosEmpresa = mockData.proyectos.filter(p => p.empresaId === currentEmpresa.id).map(p => p.id);
  const campanas = mockData.estrategia.filter(c => proyectosEmpresa.includes(c.proyectoId));

  return (
    <div className="p-8 space-y-6 h-full flex flex-col overflow-y-auto">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Estrategia Meta Ads</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Estructura publicitaria para {currentEmpresa.nombre}</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
          <Plus size={16} /> Nueva Campaña
        </button>
      </div>

      {campanas.length === 0 ? (
        <Card className="p-12 text-center text-gray-500 dark:text-gray-400">
          <Megaphone className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
          <p>No hay campañas de Meta Ads activas para esta empresa.</p>
        </Card>
      ) : (
        campanas.map((campaña, idxCampana) => (
          <Card key={idxCampana} className="p-0 overflow-hidden mb-6">
            {/* Nivel 1: Campaña */}
            <div className="bg-gray-50 dark:bg-gray-800/80 p-5 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                  <Megaphone size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Campaña</span>
                    <Badge type="success">{campaña.objetivo}</Badge>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{campaña.nombre}</h3>
                </div>
              </div>
            </div>

            {/* Nivel 2: Conjuntos */}
            <div className="p-5 pl-12 bg-white dark:bg-gray-900/30">
              {campaña.conjuntos.map((conjunto, idx) => (
                <div key={idx} className="relative mb-8 last:mb-0">
                  {/* Línea conectora visual */}
                  <div className="absolute -left-6 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>
                  
                  <div className="relative">
                    <div className="absolute -left-6 top-4 w-4 h-px bg-gray-200 dark:bg-gray-700"></div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Conjunto de Anuncios</span>
                      <h4 className="text-md font-bold text-gray-700 dark:text-gray-200">{conjunto.nombre}</h4>
                    </div>

                    {/* Nivel 3: Anuncios */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4">
                      {conjunto.anuncios.map((ad, i) => (
                        <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-700 transition-colors bg-gray-50/50 dark:bg-gray-800/50">
                          <div className="flex justify-between items-start mb-3">
                            <h5 className="font-bold text-sm text-gray-800 dark:text-gray-200">{ad.nombre}</h5>
                            <Badge type="default">{ad.formato}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-2 rounded">
                              <span className="block text-gray-400 dark:text-gray-500 mb-1">Metodología</span>
                              <span className="font-medium text-gray-700 dark:text-gray-300">{ad.metodologia}</span>
                            </div>
                            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-2 rounded">
                              <span className="block text-gray-400 dark:text-gray-500 mb-1">Contenido</span>
                              <span className="font-medium text-gray-700 dark:text-gray-300">{ad.contenido}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-3 mt-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">CPL Actual: <strong className="text-gray-800 dark:text-gray-200">{ad.cpl}</strong></span>
                            <button className="text-blue-600 dark:text-blue-400 text-xs font-medium hover:underline">Ver Guion</button>
                          </div>
                        </div>
                      ))}
                      
                      {/* Botón agregar anuncio */}
                      <button className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition-colors min-h-[140px]">
                        <Plus size={24} className="mb-2" />
                        <span className="text-sm font-medium">Agregar Anuncio</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))
      )}
    </div>
  );
};
