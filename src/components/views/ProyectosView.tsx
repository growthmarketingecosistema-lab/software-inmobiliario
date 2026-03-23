"use client";

import React, { useState } from 'react';
import { FolderKanban, Plus, ExternalLink, X, Building2 } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  brand: 'Fortress' | 'Crescendo' | 'Sinergia';
  type: string;
  status: 'Activo' | 'Planificación' | 'Completado';
  date: string;
}

// Eliminado mockProjects en favor de appData.proyectos

const brandTypes = {
  Fortress: ['Estructuración de Capital', 'Desarrollo', 'Marca'],
  Crescendo: ['Comercialización', 'Administración', 'Marca'],
  Sinergia: ['Marca Conjunta']
};

export const ProyectosView: React.FC<any> = ({ onOpenComandoMarca, currentEmpresa, appData, refreshData }) => {
  const [activeTab, setActiveTab] = useState<'Fortress' | 'Crescendo' | 'Sinergia'>('Fortress');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Modal State
  const [newProjectBrand, setNewProjectBrand] = useState<'Fortress' | 'Crescendo' | 'Sinergia'>('Fortress');
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectType, setNewProjectType] = useState(brandTypes['Fortress'][0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const proyectosGlobales = appData?.proyectos || [];

  const filteredProjects = proyectosGlobales.filter((p: any) => {
    // Sinergia son Marca Conjunta sin importar el empresaId original
    if (activeTab === 'Sinergia') return p.tipo_proyecto === 'Marca Conjunta';
    
    // Fortress o Crescendo
    if (activeTab === 'Fortress') return p.empresaId === 'fortress' && p.tipo_proyecto !== 'Marca Conjunta';
    if (activeTab === 'Crescendo') return p.empresaId === 'crescendo' && p.tipo_proyecto !== 'Marca Conjunta';
    
    return false;
  }).map((p: any) => ({
    id: p._id,
    name: p.nombre,
    brand: p.tipo_proyecto === 'Marca Conjunta' ? 'Sinergia' : (p.empresaId === 'fortress' ? 'Fortress' : 'Crescendo'),
    type: p.tipo_proyecto,
    status: p.estado_comercial,
    date: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'N/A'
  }));

  const handleCreateProject = async () => {
    if (!newProjectName) return;
    setIsSubmitting(true);
    try {
      const payload = {
        empresaId: newProjectBrand === 'Sinergia' ? 'fortress' : newProjectBrand.toLowerCase(),
        nombre: newProjectName,
        tipo_proyecto: newProjectType,
        estado_comercial: 'Lanzamiento'
      };
      
      const res = await fetch('/api/proyectos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        setNewProjectName('');
        if (refreshData) await refreshData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getBrandStyles = (brand: string) => {
    switch(brand) {
      case 'Fortress': return 'bg-[#0f2027]/10 text-[#0f2027] border-[#0f2027]/20 dark:bg-[#0f2027] dark:text-blue-300 dark:border-blue-900/50';
      case 'Crescendo': return 'bg-[#D4AF37]/10 text-[#856c1d] border-[#D4AF37]/30 dark:bg-[#D4AF37]/20 dark:text-[#e7c75c]';
      case 'Sinergia': return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-800/50';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Activo': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400';
      case 'Planificación': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400';
      case 'Completado': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8 h-full flex flex-col relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <FolderKanban className="text-blue-600 dark:text-blue-400" />
            Centro de Proyectos
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Gestión de portafolios operacionales y marcas conjuntas.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-colors"
        >
          <Plus size={18} />
          Nuevo Proyecto
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6">
        {[
          { id: 'Fortress', label: 'Portafolio Fortress' },
          { id: 'Crescendo', label: 'Portafolio Crescendo' },
          { id: 'Sinergia', label: 'Proyectos Sinergia' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'Fortress' | 'Crescendo' | 'Sinergia')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === tab.id 
                ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Projects */}
      <div className="flex-1 overflow-y-auto pb-8">
        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
            <FolderKanban size={48} className="text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Sin proyectos activos</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Comienza creando un nuevo proyecto para este portafolio.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project: any) => {
              const isBrandProject = project.type === 'Marca' || project.type === 'Marca Conjunta';
              
              return (
                <div 
                  key={project.id} 
                  className={`bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm transition-all hover:shadow-md ${
                    isBrandProject 
                      ? 'col-span-1 md:col-span-2 lg:col-span-2 border-2 border-purple-500/50 dark:border-purple-500/40 relative overflow-hidden' 
                      : 'border border-gray-200 dark:border-gray-700 flex flex-col'
                  }`}
                >
                  {isBrandProject && (
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Building2 size={120} />
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${getBrandStyles(project.brand)}`}>
                        {project.brand}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(project.status)}`}>
                        {project.status}
                      </span>
                    </div>

                    <h3 className={`font-bold text-gray-900 dark:text-white mb-2 ${isBrandProject ? 'text-2xl' : 'text-lg'}`}>
                      {project.name}
                    </h3>
                    
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-1">
                      Tipo: <span className="font-medium text-gray-700 dark:text-gray-300">{project.type}</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4 mt-auto">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Fecha Cierre: {project.date}</span>
                      
                      {isBrandProject ? (
                        <button 
                          onClick={onOpenComandoMarca} 
                          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          <ExternalLink size={16} /> Comando de Marca
                        </button>
                      ) : (
                        <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center gap-1">
                          Gestionar <ExternalLink size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* New Project Modal */}
      {isModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden border border-gray-200 dark:border-gray-800 animate-slide-in-up">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Crear Nuevo Proyecto</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-500 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre del Proyecto</label>
                <input 
                  type="text" 
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Ej. Fondo Residencial Zeta" 
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Empresa Responsable</label>
                <select 
                  value={newProjectBrand}
                  onChange={(e) => {
                    const brand = e.target.value as 'Fortress' | 'Crescendo' | 'Sinergia';
                    setNewProjectBrand(brand);
                    setNewProjectType(brandTypes[brand][0]);
                  }}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
                >
                  <option value="Fortress">Fortress Investment</option>
                  <option value="Crescendo">Proyectos Crescendo</option>
                  <option value="Sinergia">Sinergia (Marca Conjunta)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo de Proyecto</label>
                <select 
                  value={newProjectType}
                  onChange={(e) => setNewProjectType(e.target.value)}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
                >
                  {brandTypes[newProjectBrand].map((type, idx) => (
                    <option key={idx} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleCreateProject}
                disabled={isSubmitting || !newProjectName}
                className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors shadow-sm"
              >
                {isSubmitting ? 'Creando...' : 'Crear Proyecto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
