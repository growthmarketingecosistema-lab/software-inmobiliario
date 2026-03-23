"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FolderKanban, Plus, ExternalLink, X, Building2, Trash2, Edit3, Search, CheckCircle2, AlertCircle, ArrowLeft, Calendar, Target, TrendingUp, Users, FileText, Paperclip, BarChart3, Upload, Download, Loader2 } from 'lucide-react';

const brandTypes: Record<string, string[]> = {
  Fortress: ['Estructuración de Capital', 'Desarrollo', 'Comercialización', 'Administración', 'Marca'],
  Crescendo: ['Comercialización', 'Administración', 'Branding', 'Marca'],
  Sinergia: ['Marca Conjunta']
};

const estadoOptions = ['Lanzamiento', 'Activo', 'Pre-venta', 'En curso', 'Completado', 'Pausado'];
const fileTypeOptions = ['documento', 'ficha_tecnica', 'brochure', 'comercial', 'apoyo'];
const fileTypeLabels: Record<string, string> = {
  documento: 'Documento',
  ficha_tecnica: 'Ficha Técnica',
  brochure: 'Brochure',
  comercial: 'Doc. Comercial',
  apoyo: 'Material de Apoyo'
};

/* ─── Gestionar View (inner panel) ─── */
const ProyectoDetalleView = ({ project, raw, appData, onBack, refreshData }: any) => {
  const [files, setFiles] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [fileType, setFileType] = useState('documento');
  const [fileFeedback, setFileFeedback] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const leads = (appData?.leads || []).filter((l: any) => l.proyectoInteres === raw.nombre || l.empresaId === raw.empresaId);
  const campanas = (appData?.estrategia || []).filter((c: any) => c.proyecto_id === raw._id);
  const planner = (appData?.planner || []).slice(0, 5);
  const identidad = (appData?.identidades || []).find((i: any) => i.empresaId === raw.empresaId);
  const personas = (appData?.personas || []).filter((p: any) => p.empresaId === raw.empresaId);

  const leadsNuevos = leads.filter((l: any) => l.stage === 'nuevo').length;
  const leadsContactados = leads.filter((l: any) => ['contactado', 'visita'].includes(l.stage)).length;
  const leadsCerrados = leads.filter((l: any) => l.stage === 'cerrado_ganado').length;

  // Load files from MongoDB on mount
  useEffect(() => {
    const loadFiles = async () => {
      try {
        const res = await fetch(`/api/files?projectId=${raw._id}`);
        if (res.ok) {
          const data = await res.json();
          setFiles(data);
        }
      } catch (e) { console.error(e); }
    };
    if (raw._id) loadFiles();
  }, [raw._id]);

  const [newFileUrl, setNewFileUrl] = useState('');
  const [newFileName, setNewFileName] = useState('');

  // Upload file to MongoDB
  const handleFileUpload = async () => {
    if (!newFileName.trim() || !newFileUrl.trim()) {
      setFileFeedback('⚠️ Ingresa un nombre y el link de Google Drive.');
      setTimeout(() => setFileFeedback(null), 3000);
      return;
    }
    setIsUploading(true);
    try {
        const res = await fetch('/api/files', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectId: raw._id,
            empresaId: raw.empresaId,
            nombre: newFileName.trim(),
            tipo: fileType,
            url: newFileUrl.trim()
          })
        });
        if (res.ok) {
          const saved = await res.json();
          setFiles(prev => [saved, ...prev]);
          setFileFeedback('✅ Enlace guardado en MongoDB.');
          setNewFileName('');
          setNewFileUrl('');
        } else {
          const err = await res.json();
          setFileFeedback(`⚠️ ${err.error}`);
        }
        setTimeout(() => setFileFeedback(null), 3000);
        setIsUploading(false);
    } catch (err) {
      setFileFeedback('⚠️ Error al guardar el enlace.');
      setTimeout(() => setFileFeedback(null), 3000);
      setIsUploading(false);
    }
  };

  // Delete file from MongoDB
  const handleDeleteFile = async (fileId: string) => {
    if (!confirm('¿Eliminar este archivo?')) return;
    try {
      const res = await fetch(`/api/files?id=${fileId}`, { method: 'DELETE' });
      if (res.ok) {
        setFiles(prev => prev.filter(f => f._id !== fileId));
        setFileFeedback('Archivo eliminado.');
        setTimeout(() => setFileFeedback(null), 2000);
      }
    } catch (e) { console.error(e); }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 overflow-y-auto h-full animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{raw.nombre}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold mt-0.5">
            {raw.tipo_proyecto} · {raw.empresaId?.toUpperCase()} · {raw.estado_comercial}
          </p>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
          raw.estado_comercial === 'Activo' || raw.estado_comercial === 'En curso' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
          raw.estado_comercial === 'Completado' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
          'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
        }`}>{raw.estado_comercial}</span>
      </div>

      {/* Two Column Layout: Comercial & Marketing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ─── COMERCIAL ─── */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-gray-700 pb-2">
            <TrendingUp size={18} className="text-blue-500" /> Área Comercial
          </h2>

          {/* Leads / Pipeline Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-5">
            <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-3 uppercase tracking-wider">Estado Pipeline</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
                <p className="text-2xl font-black text-blue-600 dark:text-blue-400">{leadsNuevos}</p>
                <p className="text-[10px] font-bold text-blue-500 uppercase">Nuevos</p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 text-center">
                <p className="text-2xl font-black text-amber-600 dark:text-amber-400">{leadsContactados}</p>
                <p className="text-[10px] font-bold text-amber-500 uppercase">En Proceso</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 text-center">
                <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{leadsCerrados}</p>
                <p className="text-[10px] font-bold text-emerald-500 uppercase">Cerrados</p>
              </div>
            </div>
          </div>

          {/* Recent Leads */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-5">
            <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-3 uppercase tracking-wider">Leads Asociados ({leads.length})</h3>
            {leads.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">Sin leads asociados a este proyecto.</p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {leads.slice(0, 8).map((l: any) => (
                  <div key={l._id} className="flex justify-between items-center p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-900/50">
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-white">{l.nombre}</p>
                      <p className="text-[10px] text-slate-400">{l.fuente}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      l.stage === 'cerrado_ganado' ? 'bg-emerald-100 text-emerald-700' :
                      l.stage === 'nuevo' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>{l.stage}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Evolución */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-5">
            <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-3 uppercase tracking-wider">Evolución del Proyecto</h3>
            <div className="space-y-3">
              {['Lanzamiento', 'Pre-venta', 'Activo', 'En curso', 'Completado'].map((step, i) => {
                const idx = ['Lanzamiento', 'Pre-venta', 'Activo', 'En curso', 'Completado'].indexOf(raw.estado_comercial);
                const isCompleted = i <= idx;
                return (
                  <div key={step} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-gray-700 text-slate-400'
                    }`}>{isCompleted ? '✓' : i + 1}</div>
                    <span className={`text-sm ${isCompleted ? 'text-slate-800 dark:text-white font-medium' : 'text-slate-400'}`}>{step}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── MARKETING ─── */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-gray-700 pb-2">
            <Target size={18} className="text-purple-500" /> Área Marketing
          </h2>

          {/* Identidad + Personas */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-5">
            <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-3 uppercase tracking-wider">Base Estratégica</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">ADN de Marca</span>
                {identidad?.esencia ? (
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full">✓ Configurado</span>
                ) : (
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full">Pendiente</span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Buyer Personas</span>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">{personas.length}/5</span>
              </div>
            </div>
          </div>

          {/* Campañas */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-5">
            <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-3 uppercase tracking-wider">Campañas ({campanas.length})</h3>
            {campanas.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 text-center">Sin campañas asociadas. Ve a Estrategia de Proyectos para crear una.</p>
            ) : (
              <div className="space-y-2">
                {campanas.slice(0, 5).map((c: any) => (
                  <div key={c._id} className="p-2 bg-slate-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-sm font-medium text-slate-800 dark:text-white">{c.nombre}</p>
                    <p className="text-[10px] text-slate-400">{c.objetivo} · ${c.presupuesto?.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Calendario */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-5">
            <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-3 uppercase tracking-wider flex items-center gap-2">
              <Calendar size={14} /> Próximo Contenido
            </h3>
            {planner.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 text-center">Sin contenido programado.</p>
            ) : (
              <div className="space-y-2">
                {planner.map((item: any, i: number) => (
                  <div key={i} className="flex items-center gap-2 border-l-2 border-purple-500 pl-3 py-1">
                    <div>
                      <p className="text-xs font-medium text-slate-800 dark:text-white">{item.tema || item.contenido_id}</p>
                      <p className="text-[10px] text-slate-400">{item.fecha} · {item.tipo_contenido}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Archivos Adjuntos */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-5">
            <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-3 uppercase tracking-wider flex items-center gap-2">
              <Paperclip size={14} /> Archivos del Proyecto ({files.length})
            </h3>

            {fileFeedback && (
              <div className="mb-3 px-3 py-2 bg-slate-50 dark:bg-gray-900/50 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300">
                {fileFeedback}
              </div>
            )}

            <div className="space-y-2">
              {files.map((f: any) => (
                <div key={f._id} className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-gray-900/50 rounded-lg group">
                  <a href={f.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 flex-1 min-w-0 hover:opacity-80">
                    <ExternalLink size={14} className="text-blue-500 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-blue-600 dark:text-blue-400 truncate hover:underline">{f.nombre}</p>
                      <p className="text-[10px] text-slate-400">
                        {fileTypeLabels[f.tipo] || f.tipo} · {new Date(f.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </a>
                  <button onClick={() => handleDeleteFile(f._id)}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all p-1" title="Eliminar">
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}

              {/* Link Controls */}
              <div className="border-t border-slate-100 dark:border-gray-700 pt-3 mt-2 space-y-2">
                <div className="flex gap-2 flex-wrap">
                  <select value={fileType} onChange={e => setFileType(e.target.value)}
                    className="bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg px-2 py-1.5 text-xs outline-none text-slate-700 dark:text-slate-300">
                    {fileTypeOptions.map(opt => <option key={opt} value={opt}>{fileTypeLabels[opt]}</option>)}
                  </select>
                  <input type="text" value={newFileName} onChange={e => setNewFileName(e.target.value)}
                    className="flex-1 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg px-2 py-1.5 text-xs outline-none text-slate-700 dark:text-slate-300 min-w-[120px]"
                    placeholder="Nombre del Doc" />
                  <input type="url" value={newFileUrl} onChange={e => setNewFileUrl(e.target.value)}
                    className="flex-[2] bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg px-2 py-1.5 text-xs outline-none text-slate-700 dark:text-slate-300 min-w-[200px]"
                    placeholder="Link púb. de Google Drive"
                    onKeyDown={e => e.key === 'Enter' && handleFileUpload()} />
                  <button
                    onClick={handleFileUpload}
                    disabled={isUploading}
                    className="flex items-center justify-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-colors"
                  >
                    {isUploading ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />}
                    Guardar
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 text-center">Pega un enlace público de Google Drive ("Cualquier persona con el enlace").</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main ProyectosView ─── */
export const ProyectosView: React.FC<any> = ({ onOpenComandoMarca, currentEmpresa, appData, refreshData }) => {
  const [activeTab, setActiveTab] = useState<'Fortress' | 'Crescendo' | 'Sinergia'>('Fortress');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [managingProject, setManagingProject] = useState<any>(null);

  // Create Modal
  const [newProjectBrand, setNewProjectBrand] = useState<'Fortress' | 'Crescendo' | 'Sinergia'>('Fortress');
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectType, setNewProjectType] = useState(brandTypes['Fortress'][0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  // Edit Modal
  const [editForm, setEditForm] = useState<any>({});

  const proyectosGlobales = appData?.proyectos || [];

  const filteredProjects = proyectosGlobales.filter((p: any) => {
    if (activeTab === 'Sinergia') return p.tipo_proyecto === 'Marca Conjunta';
    if (activeTab === 'Fortress') return p.empresaId === 'fortress' && p.tipo_proyecto !== 'Marca Conjunta';
    if (activeTab === 'Crescendo') return p.empresaId === 'crescendo' && p.tipo_proyecto !== 'Marca Conjunta';
    return false;
  }).filter((p: any) => {
    if (!searchQuery) return true;
    return p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
           p.tipo_proyecto.toLowerCase().includes(searchQuery.toLowerCase()) ||
           p.estado_comercial?.toLowerCase().includes(searchQuery.toLowerCase());
  }).map((p: any) => ({
    id: p._id,
    name: p.nombre,
    brand: p.tipo_proyecto === 'Marca Conjunta' ? 'Sinergia' : (p.empresaId === 'fortress' ? 'Fortress' : 'Crescendo'),
    type: p.tipo_proyecto,
    status: p.estado_comercial,
    date: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'N/A',
    raw: p
  }));

  const handleCreateProject = async () => {
    if (!newProjectName) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/proyectos', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          empresaId: newProjectBrand === 'Sinergia' ? 'fortress' : newProjectBrand.toLowerCase(),
          nombre: newProjectName, tipo_proyecto: newProjectType, estado_comercial: 'Lanzamiento'
        })
      });
      if (res.ok) {
        setIsModalOpen(false); setNewProjectName('');
        setFeedback({ type: 'success', msg: '¡Proyecto creado exitosamente!' });
        setTimeout(() => setFeedback(null), 4000);
        if (refreshData) await refreshData();
      } else {
        const err = await res.json().catch(() => ({}));
        setFeedback({ type: 'error', msg: err.error || 'Error al crear.' });
      }
    } catch (e) {
      setFeedback({ type: 'error', msg: 'Error de conexión.' });
    } finally { setIsSubmitting(false); }
  };

  const handleEditProject = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/proyectos', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        setIsEditModalOpen(false);
        setFeedback({ type: 'success', msg: '¡Proyecto actualizado!' });
        setTimeout(() => setFeedback(null), 3000);
        if (refreshData) await refreshData();
      } else {
        setFeedback({ type: 'error', msg: 'Error al actualizar.' });
      }
    } catch (e) {
      setFeedback({ type: 'error', msg: 'Error de conexión.' });
    } finally { setIsSubmitting(false); }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('¿Seguro que quieres eliminar este proyecto? Esta acción no se puede deshacer.')) return;
    try {
      const res = await fetch(`/api/proyectos?id=${projectId}`, { method: 'DELETE' });
      if (res.ok) {
        setFeedback({ type: 'success', msg: 'Proyecto eliminado.' });
        setTimeout(() => setFeedback(null), 3000);
        if (refreshData) await refreshData();
      }
    } catch (e) { console.error(e); }
  };

  const openEdit = (project: any) => {
    setEditForm({
      _id: project.raw._id,
      nombre: project.raw.nombre,
      tipo_proyecto: project.raw.tipo_proyecto,
      estado_comercial: project.raw.estado_comercial,
      descripcion: project.raw.descripcion || ''
    });
    setIsEditModalOpen(true);
  };

  const getBrandStyles = (brand: string) => {
    switch(brand) {
      case 'Fortress': return 'bg-[#0f2027]/10 text-[#0f2027] border-[#0f2027]/20 dark:bg-[#0f2027] dark:text-blue-300 dark:border-blue-900/50';
      case 'Crescendo': return 'bg-[#D4AF37]/10 text-[#856c1d] border-[#D4AF37]/30 dark:bg-[#D4AF37]/20 dark:text-[#e7c75c]';
      case 'Sinergia': return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/40 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Activo': case 'En curso': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400';
      case 'Completado': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400';
      default: return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400';
    }
  };

  /* ─── Gestionar mode ─── */
  if (managingProject) {
    return <ProyectoDetalleView project={managingProject} raw={managingProject.raw} appData={appData} onBack={() => setManagingProject(null)} refreshData={refreshData} />;
  }

  return (
    <div className="p-8 h-full flex flex-col relative overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <FolderKanban className="text-blue-600 dark:text-blue-400" /> Centro de Proyectos
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Gestión de portafolios operacionales y marcas conjuntas.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-colors">
          <Plus size={18} /> Nuevo Proyecto
        </button>
      </div>

      {feedback && (
        <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 animate-slide-in-up ${
          feedback.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
            : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
        }`}>
          {feedback.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />} {feedback.msg}
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-4 relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-white"
          placeholder="Buscar proyectos por nombre, tipo o estado..."
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6">
        {[
          { id: 'Fortress', label: 'Portafolio Fortress' },
          { id: 'Crescendo', label: 'Portafolio Crescendo' },
          { id: 'Sinergia', label: 'Proyectos Sinergia' }
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === tab.id ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="flex-1 overflow-y-auto pb-8">
        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
            <FolderKanban size={48} className="text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{searchQuery ? 'Sin resultados' : 'Sin proyectos activos'}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{searchQuery ? `No se encontraron proyectos con "${searchQuery}".` : 'Comienza creando un nuevo proyecto.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project: any) => {
              const isBrandProject = project.type === 'Marca' || project.type === 'Marca Conjunta';
              return (
                <div key={project.id}
                  className={`bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm transition-all hover:shadow-md ${
                    isBrandProject ? 'col-span-1 md:col-span-2 border-2 border-purple-500/50 relative overflow-hidden' : 'border border-gray-200 dark:border-gray-700 flex flex-col'
                  }`}>
                  {isBrandProject && <div className="absolute top-0 right-0 p-4 opacity-10"><Building2 size={120} /></div>}

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${getBrandStyles(project.brand)}`}>{project.brand}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(project.status)}`}>{project.status}</span>
                    </div>

                    <h3 className={`font-bold text-gray-900 dark:text-white mb-2 ${isBrandProject ? 'text-2xl' : 'text-lg'}`}>{project.name}</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-1">Tipo: <span className="font-medium text-gray-700 dark:text-gray-300">{project.type}</span></div>

                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4 mt-auto">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Fecha: {project.date}</span>

                      {isBrandProject ? (
                        <button onClick={onOpenComandoMarca} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          <ExternalLink size={16} /> Comando de Marca
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button onClick={() => setManagingProject(project)}
                            className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center gap-1">
                            Gestionar <ExternalLink size={14} />
                          </button>
                          <button onClick={() => openEdit(project)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700 text-slate-400 hover:text-blue-600 transition-colors" title="Editar">
                            <Edit3 size={14} />
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); handleDeleteProject(project.id); }}
                            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-colors" title="Eliminar">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden border border-gray-200 dark:border-gray-800 animate-slide-in-up">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Crear Nuevo Proyecto</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-500"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre del Proyecto</label>
                <input type="text" value={newProjectName} onChange={e => setNewProjectName(e.target.value)} placeholder="Ej. Fondo Residencial Zeta"
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Empresa</label>
                <select value={newProjectBrand} onChange={e => { const b = e.target.value as any; setNewProjectBrand(b); setNewProjectType(brandTypes[b][0]); }}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-sm outline-none text-gray-900 dark:text-white">
                  <option value="Fortress">Fortress Investment</option>
                  <option value="Crescendo">Proyectos Crescendo</option>
                  <option value="Sinergia">Sinergia (Marca Conjunta)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo de Proyecto</label>
                <select value={newProjectType} onChange={e => setNewProjectType(e.target.value)}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-sm outline-none text-gray-900 dark:text-white">
                  {brandTypes[newProjectBrand].map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">Cancelar</button>
              <button onClick={handleCreateProject} disabled={isSubmitting || !newProjectName}
                className="px-5 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm">
                {isSubmitting ? 'Creando...' : 'Crear Proyecto'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)} />
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden border border-gray-200 dark:border-gray-800 animate-slide-in-up">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Editar Proyecto</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-500"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
                <input type="text" value={editForm.nombre || ''} onChange={e => setEditForm({ ...editForm, nombre: e.target.value })}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo de Proyecto</label>
                <input type="text" value={editForm.tipo_proyecto || ''} onChange={e => setEditForm({ ...editForm, tipo_proyecto: e.target.value })}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-sm outline-none text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estado Comercial</label>
                <select value={editForm.estado_comercial || ''} onChange={e => setEditForm({ ...editForm, estado_comercial: e.target.value })}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-sm outline-none text-gray-900 dark:text-white">
                  {estadoOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
                <textarea value={editForm.descripcion || ''} onChange={e => setEditForm({ ...editForm, descripcion: e.target.value })}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-sm outline-none text-gray-900 dark:text-white min-h-[80px] resize-none"
                  placeholder="Descripción del proyecto..." />
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-end gap-3">
              <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">Cancelar</button>
              <button onClick={handleEditProject} disabled={isSubmitting}
                className="px-5 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm">
                {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
