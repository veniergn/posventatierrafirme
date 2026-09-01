import React, { useState } from 'react';
import { Project, ConstructionMilestone } from '../../types';
import { 
  Building2, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  CheckCircle2, 
  ArrowUpRight,
  Eye, 
  Sliders, 
  Plus, 
  Box, 
  Layers, 
  Sparkles, 
  Phone, 
  Edit, 
  Trash2,
  X, 
  Check,
  AlertTriangle,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { FileDropzone } from '../FileDropzone';

interface ProjectsDashboardProps {
  projects: Project[];
  milestones: ConstructionMilestone[];
  onSelectProjectForPreview: (projectName: string) => void;
  onUpdateProjectProgress: (projectId: string, newProgress: number) => void;
  onUpdateProjectDetails?: (updatedProject: Project) => void;
  onAddProject?: (newProject: Project) => void;
  onDeleteProject?: (projectId: string) => void;
}

export const ProjectsDashboard: React.FC<ProjectsDashboardProps> = ({
  projects,
  milestones,
  onSelectProjectForPreview,
  onUpdateProjectProgress,
  onUpdateProjectDetails,
  onAddProject,
  onDeleteProject
}) => {
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [tempProgress, setTempProgress] = useState<number>(0);
  const [editingProjectModal, setEditingProjectModal] = useState<Project | null>(null);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [globalCoverImage, setGlobalCoverImage] = useState(() => localStorage.getItem('globalCoverImage') || '');

  const handleUpdateGlobalCover = (url: string) => {
    setGlobalCoverImage(url);
    localStorage.setItem('globalCoverImage', url);
  };
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);

  // New Project Form State
  const [newProjectData, setNewProjectData] = useState<Partial<Project>>({
    name: '',
    phase: 'Fase 1 - Cimientos y Estructura',
    status: 'En Construcción',
    commercialStatus: 'En Construcción',
    unitsSold: 4,
    totalUnits: 24,
    progress: 15,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7Dg5-GoB6fJxtvSnd4FBKz6U5WEwu_1v1CWDnnwmcS4_Rww1AvyLXO5vB8z0PaSOsVUZrc5RK4pgeTQEwwOVlNm-KRso8Or1-ydLLhMSUPQmkrCF5QsAm3lGLuU8mjgE-S9TIBGYog8exCNoyW1kJqhmVYoCrIUhb9K47zAB7gnvSJ3kF2Yv1JesulYLzqF83qlBeBtbuKDqbH0Wznri32nprrfd9Sz3TCCbeErekaEkN2az8CodAyQ',
    address: 'Av. Libertador 2400, Buenos Aires',
    estimatedDelivery: 'Octubre 2025',
    description: 'Desarrollo residencial de autor con hormigón visto y terrazas verdes.',
    tagline: 'Vanguardia Arquitectónica & Sustentabilidad',
    advisorName: 'Lic. Matías Valenzuela',
    advisorPhone: '+54 9 11 4920-3344',
    advisorEmail: 'ventas@tierrafirme.com'
  });

  const totalUnits = projects.reduce((acc, p) => acc + p.totalUnits, 0);
  const totalSold = projects.reduce((acc, p) => acc + p.unitsSold, 0);
  const avgProgress = Math.round(
    projects.reduce((acc, p) => acc + p.progress, 0) / (projects.length || 1)
  );

  const handleStartEditProgress = (project: Project) => {
    setEditingProjectId(project.id);
    setTempProgress(project.progress);
  };

  const handleSaveProgress = (projectId: string) => {
    onUpdateProjectProgress(projectId, tempProgress);
    setEditingProjectId(null);
  };

  const handleSaveProjectDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProjectModal && onUpdateProjectDetails) {
      onUpdateProjectDetails(editingProjectModal);
    }
    setEditingProjectModal(null);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddProject) {
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        name: newProjectData.name || 'Nuevo Complejo',
        phase: newProjectData.phase || 'Fase 1 - Inicio de Obra',
        status: newProjectData.status || 'En Construcción',
        commercialStatus: newProjectData.commercialStatus || 'En Construcción',
        unitsSold: Number(newProjectData.unitsSold) || 0,
        totalUnits: Number(newProjectData.totalUnits) || 20,
        progress: Number(newProjectData.progress) || 10,
        image: newProjectData.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7Dg5-GoB6fJxtvSnd4FBKz6U5WEwu_1v1CWDnnwmcS4_Rww1AvyLXO5vB8z0PaSOsVUZrc5RK4pgeTQEwwOVlNm-KRso8Or1-ydLLhMSUPQmkrCF5QsAm3lGLuU8mjgE-S9TIBGYog8exCNoyW1kJqhmVYoCrIUhb9K47zAB7gnvSJ3kF2Yv1JesulYLzqF83qlBeBtbuKDqbH0Wznri32nprrfd9Sz3TCCbeErekaEkN2az8CodAyQ',
        address: newProjectData.address || 'Buenos Aires, CABA',
        estimatedDelivery: newProjectData.estimatedDelivery || 'Diciembre 2025',
        description: newProjectData.description || 'Proyecto arquitectónico desarrollado por TIERRA FIRME.',
        tagline: newProjectData.tagline || 'Arquitectura de Vanguardia',
        advisorName: newProjectData.advisorName || 'Lic. Matías Valenzuela',
        advisorPhone: newProjectData.advisorPhone || '+54 9 11 4920-3344',
        advisorEmail: newProjectData.advisorEmail || 'ventas@tierrafirme.com',
        volumetricRenders: [
          {
            id: 'r-1',
            title: 'Volumetría General',
            url: newProjectData.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7Dg5-GoB6fJxtvSnd4FBKz6U5WEwu_1v1CWDnnwmcS4_Rww1AvyLXO5vB8z0PaSOsVUZrc5RK4pgeTQEwwOVlNm-KRso8Or1-ydLLhMSUPQmkrCF5QsAm3lGLuU8mjgE-S9TIBGYog8exCNoyW1kJqhmVYoCrIUhb9K47zAB7gnvSJ3kF2Yv1JesulYLzqF83qlBeBtbuKDqbH0Wznri32nprrfd9Sz3TCCbeErekaEkN2az8CodAyQ',
            category: 'volumetria'
          }
        ]
      };
      onAddProject(newProj);
    }
    setIsAddProjectModalOpen(false);
  };

  const confirmDeleteProject = () => {
    if (deletingProject && onDeleteProject) {
      onDeleteProject(deletingProject.id);
      setDeletingProject(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner / Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1B1C1E] tracking-tight">
            Panel de Desarrollos & Control de Obra
          </h1>
          <p className="text-sm text-[#5B5F63] mt-0.5">
            Supervisión integral de proyectos inmobiliarios, avance físico, volumetrías 3D y asignación comercial.
          </p>
        </div>

        <button
          onClick={() => setIsAddProjectModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#8E1E19] hover:bg-[#6D0205] text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Obra / Complejo</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-[#E0E3E7] shadow-xs">
          <div className="flex items-center justify-between text-[#5B5F63] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Desarrollos Activos</span>
            <Building2 className="w-5 h-5 text-[#8E1E19]" />
          </div>
          <div className="text-3xl font-extrabold text-[#1B1C1E]">{projects.length}</div>
          <div className="text-xs text-[#005613] font-semibold mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% en calendario
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E0E3E7] shadow-xs">
          <div className="flex items-center justify-between text-[#5B5F63] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Avance Físico Global</span>
            <TrendingUp className="w-5 h-5 text-[#8E1E19]" />
          </div>
          <div className="text-3xl font-extrabold text-[#1B1C1E]">{avgProgress}%</div>
          <div className="text-xs text-[#5B5F63] mt-1">Promedio ponderado</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E0E3E7] shadow-xs">
          <div className="flex items-center justify-between text-[#5B5F63] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Unidades Vendidas</span>
            <span className="text-xs font-bold text-[#8E1E19]">
              {Math.round((totalSold / (totalUnits || 1)) * 100)}%
            </span>
          </div>
          <div className="text-3xl font-extrabold text-[#1B1C1E]">{totalSold} <span className="text-base font-normal text-[#5B5F63]">/ {totalUnits}</span></div>
          <div className="text-xs text-[#005613] font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +12 ventas este mes
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E0E3E7] shadow-xs">
          <div className="flex items-center justify-between text-[#5B5F63] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Próxima Entrega</span>
            <Calendar className="w-5 h-5 text-[#8E1E19]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1B1C1E]">Diciembre 2024</div>
          <div className="text-xs text-[#5B5F63] mt-1">Madero Boutique (100% Vendido)</div>
        </div>
      </div>

      {/* Projects List Grid */}
      <div className="space-y-4">
        
        {/* Global Cover Image Setting */}
        <div className="bg-[#FAF9FB] rounded-xl border border-[#E0E3E7] p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1 space-y-2">
              <h3 className="text-sm font-bold text-[#1B1C1E] flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#8E1E19]" />
                Foto de Portada Global de la App
              </h3>
              <p className="text-xs text-[#5B5F63] leading-relaxed">
                Esta es la imagen principal que ven los propietarios y usuarios al ingresar a la plataforma, justo después del logo de carga. Puedes cambiarla arrastrando una nueva imagen.
              </p>
              <div className="mt-3">
                <FileDropzone 
                  onUploadSuccess={handleUpdateGlobalCover}
                  folder="settings"
                  label="Subir nueva portada global"
                  currentImage={globalCoverImage || projects[0]?.image}
                />
              </div>
            </div>
            {globalCoverImage && (
              <div className="w-full sm:w-64 h-32 rounded-xl overflow-hidden shadow-sm border border-[#E0E3E7] shrink-0">
                <img src={globalCoverImage} alt="Portada Global" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#1B1C1E]">Desarrollos Inmobiliarios</h2>
          <span className="text-xs text-[#5B5F63]">Gestión de volumetrías 3D, tipologías y comercialización</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => {
            const isEditing = editingProjectId === project.id;
            return (
              <div
                key={project.id}
                className="bg-white rounded-xl border border-[#E0E3E7] shadow-xs overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={project.image}
                    alt={project.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/95 backdrop-blur-xs text-[#1B1C1E] text-xs font-bold rounded-full shadow-xs">
                      {project.commercialStatus || project.status}
                    </span>
                  </div>

                  {/* Project Title & Address */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    <p className="text-xs text-gray-200 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#FFA095]" />
                      {project.address}
                    </p>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-[#5B5F63] leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Badges for 3D Renders, Typologies, Amenities & Sales Contact */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-[#FAF9FB] p-2 rounded-lg border border-[#E0E3E7]">
                      <span className="text-[10px] text-[#5B5F63] block font-bold">Renders 3D</span>
                      <span className="font-extrabold text-[#8E1E19] flex items-center justify-center gap-1">
                        <Box className="w-3 h-3" /> {project.volumetricRenders?.length || 4}
                      </span>
                    </div>

                    <div className="bg-[#FAF9FB] p-2 rounded-lg border border-[#E0E3E7]">
                      <span className="text-[10px] text-[#5B5F63] block font-bold">Tipologías</span>
                      <span className="font-extrabold text-[#1B1C1E] flex items-center justify-center gap-1">
                        <Layers className="w-3 h-3" /> {project.typologies?.length || 4}
                      </span>
                    </div>

                    <div className="bg-[#FAF9FB] p-2 rounded-lg border border-[#E0E3E7]">
                      <span className="text-[10px] text-[#5B5F63] block font-bold">Amenities</span>
                      <span className="font-extrabold text-[#005613] flex items-center justify-center gap-1">
                        <Sparkles className="w-3 h-3" /> {project.amenitiesList?.length || 4}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar with quick inline edit */}
                  <div className="space-y-2 bg-[#FAF9FB] p-3 rounded-lg border border-[#E0E3E7]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#1B1C1E] flex items-center gap-1">
                        {project.phase}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#8E1E19] text-sm">
                          {project.progress}%
                        </span>
                        <button
                          onClick={() => handleStartEditProgress(project)}
                          className="p-1 text-gray-400 hover:text-[#8E1E19] transition-colors"
                          title="Ajustar porcentaje"
                        >
                          <Sliders className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {isEditing ? (
                      <div className="pt-2 flex items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={tempProgress}
                          onChange={(e) => setTempProgress(Number(e.target.value))}
                          className="w-full accent-[#8E1E19]"
                        />
                        <span className="text-xs font-mono font-bold w-10 text-right">{tempProgress}%</span>
                        <button
                          onClick={() => handleSaveProgress(project.id)}
                          className="px-2 py-1 bg-[#8E1E19] text-white text-[10px] font-bold rounded shadow-xs"
                        >
                          Guardar
                        </button>
                      </div>
                    ) : (
                      <div className="w-full bg-[#E0E3E7] rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[#8E1E19] h-full rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Commercial advisor preview */}
                  <div className="text-[11px] text-[#5B5F63] flex items-center justify-between bg-white px-2 py-1.5 rounded-md border border-dashed border-[#E0E3E7]">
                    <span>Asesor: <strong>{project.advisorName || 'Lic. Matías Valenzuela'}</strong></span>
                    <span className="font-mono text-[#8E1E19]">{project.advisorPhone || '+54 9 11 4920-3344'}</span>
                  </div>

                  {/* Footer Info & Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#E0E3E7] text-xs">
                    <div>
                      <span className="text-[#5B5F63] block text-[10px]">Entrega Estimada</span>
                      <span className="font-bold text-[#1B1C1E]">{project.estimatedDelivery}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setEditingProjectModal(project)}
                        className="p-1.5 rounded-lg border border-[#E0E3E7] text-[#5B5F63] hover:text-[#1B1C1E] hover:bg-gray-50 transition-colors"
                        title="Editar parámetros comerciales y 3D"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      {onDeleteProject && (
                        <button
                          onClick={() => setDeletingProject(project)}
                          className="p-1.5 rounded-lg border border-[#E0E3E7] text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Eliminar proyecto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => onSelectProjectForPreview(project.name)}
                        className="px-3 py-1.5 rounded-lg bg-[#FFDAD5]/60 hover:bg-[#8E1E19] text-[#8A1B17] hover:text-white font-bold flex items-center gap-1.5 transition-all shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Vista Propietario</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Latest Construction Milestones summary */}
      <div className="bg-white rounded-xl p-6 border border-[#E0E3E7] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#1B1C1E]">Últimos Reportes de Director de Obra</h3>
            <p className="text-xs text-[#5B5F63]">Bitácora fotográfica y comentarios técnicos autorizados</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {milestones.map((m) => (
            <div key={m.id} className="border border-[#E0E3E7] rounded-lg p-4 bg-[#FAF9FB] space-y-3">
              <div className="h-32 rounded-md overflow-hidden bg-gray-200">
                <img
                  src={m.photoUrl}
                  alt={m.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#1B1C1E]">{m.title}</h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 bg-[#FFDAD5] text-[#8A1B17] rounded">
                    {m.month}
                  </span>
                </div>
                <p className="text-xs text-[#5B5F63] mt-1.5 line-clamp-3 italic">
                  "{m.quote}"
                </p>
              </div>
              <div className="text-[11px] text-[#8E1E19] font-semibold border-t border-[#E0E3E7] pt-2">
                {m.authorName} • {m.authorRole}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          MODAL: NUEVA OBRA / COMPLEJO
      ======================================================== */}
      {isAddProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full my-8 overflow-hidden shadow-2xl border border-[#E0E3E7] flex flex-col">
            <div className="bg-[#1B1C1E] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#FFA095]" />
                <h3 className="font-bold text-sm">Crear Nuevo Desarrollo / Complejo</h3>
              </div>
              <button
                onClick={() => setIsAddProjectModalOpen(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#1B1C1E] block mb-1">Nombre del Desarrollo</label>
                  <input
                    type="text"
                    required
                    value={newProjectData.name || ''}
                    onChange={(e) => setNewProjectData({ ...newProjectData, name: e.target.value })}
                    placeholder="Ej: Terrazas del Lago"
                    className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs text-[#1B1C1E] focus:border-[#8E1E19] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1B1C1E] block mb-1">Ubicación / Dirección</label>
                  <input
                    type="text"
                    required
                    value={newProjectData.address || ''}
                    onChange={(e) => setNewProjectData({ ...newProjectData, address: e.target.value })}
                    placeholder="Ej: Av. Costanera 1500"
                    className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs text-[#1B1C1E] focus:border-[#8E1E19] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-[#1B1C1E] block mb-1">Estado Comercial</label>
                  <select
                    value={newProjectData.commercialStatus || 'En Construcción'}
                    onChange={(e) => setNewProjectData({ ...newProjectData, commercialStatus: e.target.value as any })}
                    className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs"
                  >
                    <option value="En Pozo / Preventa">En Pozo / Preventa</option>
                    <option value="En Construcción">En Construcción</option>
                    <option value="Próxima Entrega">Próxima Entrega</option>
                    <option value="100% Vendido">100% Vendido</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#1B1C1E] block mb-1">Total de Unidades</label>
                  <input
                    type="number"
                    value={newProjectData.totalUnits || 20}
                    onChange={(e) => setNewProjectData({ ...newProjectData, totalUnits: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1B1C1E] block mb-1">Avance Actual (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newProjectData.progress || 0}
                    onChange={(e) => setNewProjectData({ ...newProjectData, progress: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#1B1C1E] block mb-1">Fase Vigente</label>
                  <input
                    type="text"
                    value={newProjectData.phase || ''}
                    onChange={(e) => setNewProjectData({ ...newProjectData, phase: e.target.value })}
                    placeholder="Ej: Estructura & Encofrados"
                    className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1B1C1E] block mb-1">Fecha Estimada de Entrega</label>
                  <input
                    type="text"
                    value={newProjectData.estimatedDelivery || ''}
                    onChange={(e) => setNewProjectData({ ...newProjectData, estimatedDelivery: e.target.value })}
                    placeholder="Ej: Diciembre 2025"
                    className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#1B1C1E] block mb-1">Memoria Descriptiva</label>
                <textarea
                  rows={3}
                  value={newProjectData.description || ''}
                  onChange={(e) => setNewProjectData({ ...newProjectData, description: e.target.value })}
                  placeholder="Descripción arquitectónica, materialidad y amenities..."
                  className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-[#1B1C1E] block mb-1">Render Principal</label>
                <FileDropzone 
                  onUploadSuccess={(url) => setNewProjectData({ ...newProjectData, image: url })}
                  folder="projects"
                  label="Arrastra el render principal aquí o haz clic para subir"
                  currentImage={newProjectData.image}
                />
              </div>

              <div className="pt-4 border-t border-[#E0E3E7] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProjectModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#1B1C1E] font-bold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#8E1E19] hover:bg-[#6D0205] text-white font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>Publicar Desarrollo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: EDITAR PARÁMETROS COMERCIALES & ASESOR
      ======================================================== */}
      {editingProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E0E3E7] flex flex-col">
            <div className="bg-[#1B1C1E] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit className="w-4 h-4 text-[#FFA095]" />
                <h3 className="font-bold text-sm">Editar Parámetros: {editingProjectModal.name}</h3>
              </div>
              <button
                onClick={() => setEditingProjectModal(null)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProjectDetails} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#1B1C1E] block mb-1">Nombre de la Obra</label>
                  <input
                    type="text"
                    value={editingProjectModal.name}
                    onChange={(e) => setEditingProjectModal({ ...editingProjectModal, name: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1B1C1E] block mb-1">Estado Comercial</label>
                  <select
                    value={editingProjectModal.commercialStatus || 'En Construcción'}
                    onChange={(e) => setEditingProjectModal({ ...editingProjectModal, commercialStatus: e.target.value as any })}
                    className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs"
                  >
                    <option value="En Pozo / Preventa">En Pozo / Preventa</option>
                    <option value="En Construcción">En Construcción</option>
                    <option value="Próxima Entrega">Próxima Entrega</option>
                    <option value="100% Vendido">100% Vendido</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#1B1C1E] block mb-1">Ubicación / Dirección</label>
                <input
                  type="text"
                  value={editingProjectModal.address}
                  onChange={(e) => setEditingProjectModal({ ...editingProjectModal, address: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#1B1C1E] block mb-1">Nombre del Asesor</label>
                  <input
                    type="text"
                    value={editingProjectModal.advisorName || ''}
                    onChange={(e) => setEditingProjectModal({ ...editingProjectModal, advisorName: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1B1C1E] block mb-1">Teléfono WhatsApp</label>
                  <input
                    type="text"
                    value={editingProjectModal.advisorPhone || ''}
                    onChange={(e) => setEditingProjectModal({ ...editingProjectModal, advisorPhone: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#1B1C1E] block mb-1">Email de Contacto Comercial</label>
                  <input
                    type="email"
                    value={editingProjectModal.advisorEmail || ''}
                    onChange={(e) => setEditingProjectModal({ ...editingProjectModal, advisorEmail: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#1B1C1E] block mb-1">Imagen de Portada / Render</label>
                  <FileDropzone 
                    onUploadSuccess={(url) => setEditingProjectModal({ ...editingProjectModal, image: url })}
                    folder="projects"
                    label="Subir nueva portada"
                    currentImage={editingProjectModal.image}
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProjectModal(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#1B1C1E] font-bold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#8E1E19] hover:bg-[#6D0205] text-white font-bold rounded-xl flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Guardar Cambios</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: CONFIRMAR ELIMINACIÓN DE PROYECTO
      ======================================================== */}
      {deletingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E0E3E7] space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-base text-[#1B1C1E]">¿Eliminar este desarrollo?</h3>
              <p className="text-xs text-[#5B5F63] mt-1">
                Estás a punto de eliminar el proyecto <strong>{deletingProject.name}</strong>. Esta acción removerá todas las tipologías y avances vinculados.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setDeletingProject(null)}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#1B1C1E] font-bold rounded-xl text-xs"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteProject}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-sm"
              >
                Sí, Eliminar Proyecto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
