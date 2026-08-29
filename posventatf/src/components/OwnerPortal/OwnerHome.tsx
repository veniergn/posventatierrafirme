import React, { useState } from 'react';
import { User, Project, ConstructionMilestone, UnitDetail } from '../../types';
import { INITIAL_UNIT_DETAILS } from '../../data/initialData';
import { 
  Building2, 
  Layers, 
  Clock, 
  MapPin, 
  DollarSign, 
  ArrowRight, 
  Sparkles, 
  Box, 
  CheckCircle2, 
  Calendar, 
  Eye,
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

interface OwnerHomeProps {
  user: User;
  projects: Project[];
  milestones: ConstructionMilestone[];
  onNavigateToMyUnit: () => void;
  onSelectProjectDetail: (project: Project) => void;
  onExpandImage?: (url: string) => void;
}

export const OwnerHome: React.FC<OwnerHomeProps> = ({
  user,
  projects,
  milestones,
  onNavigateToMyUnit,
  onSelectProjectDetail,
  onExpandImage
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pozo' | 'construccion' | 'entrega'>('all');

  const assignedUnitKey = user.unit || 'Unidad 4° B';
  const unitDetail: UnitDetail = INITIAL_UNIT_DETAILS[assignedUnitKey] || INITIAL_UNIT_DETAILS['Unidad 4° B'];

  // Find current user's project or default to the first
  const userProject = projects.find(
    (p) => p.name.toLowerCase().includes((user.complex || '').toLowerCase()) ||
           (user.complex || '').toLowerCase().includes(p.name.toLowerCase())
  ) || projects[0];

  // Filter projects for the portfolio section
  const filteredProjects = projects.filter((p) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'pozo') return p.commercialStatus?.toLowerCase().includes('pozo') || p.status?.toLowerCase().includes('pre-sale');
    if (selectedFilter === 'construccion') return p.commercialStatus?.toLowerCase().includes('construcción') || p.status?.toLowerCase().includes('active');
    if (selectedFilter === 'entrega') return p.commercialStatus?.toLowerCase().includes('entrega') || p.status?.toLowerCase().includes('sold');
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ========================================================
          1. WELCOME & USER GREETING
      ======================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFDAD5] text-[#8A1B17] text-xs font-bold mb-1.5 border border-[#E0BFBB]">
            <Sparkles className="w-3.5 h-3.5" /> Portal Oficial del Propietario
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B1C1E] tracking-tight">
            Bienvenido, {user.name}
          </h1>
          <p className="text-xs text-[#5B5F63] mt-0.5">
            Acceso exclusivo al seguimiento técnico de tu propiedad y al portfolio de desarrollos.
          </p>
        </div>

        {/* Quick Account Financial Status Pill */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E0E3E7] shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#FAF9FB] border border-[#E0E3E7] flex items-center justify-center text-[#8E1E19]">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B5F63] block">
              Estado de Cuenta
            </span>
            <span className="text-xs font-extrabold text-[#1B1C1E] block">
              {user.balance || '$ 450,000.00'}
            </span>
            <span className="text-[10px] text-[#8E1E19] font-semibold">
              Vto: {user.nextPaymentDate || '15 Nov 2023'}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. BANNER SUPERIOR DESTACADO: "MI PROPIEDAD / MI OBRA ACTIVA"
      ======================================================== */}
      <div className="bg-white rounded-2xl border-2 border-[#8E1E19]/30 shadow-md overflow-hidden relative">
        {/* Top Tag Header */}
        <div className="bg-gradient-to-r from-[#6D0205] to-[#8E1E19] text-white px-5 py-2.5 flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#FFA095]" />
            Mi Propiedad / Mi Obra Activa
          </span>
          <span className="text-[11px] font-semibold bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
            Unidad Asignada
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left Render Preview */}
          <div className="md:col-span-5 relative h-56 md:h-auto bg-gray-100 group overflow-hidden">
            <img
              src={unitDetail.mainRender}
              alt={user.unit || 'Mi Unidad'}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/20" />
            <div className="absolute bottom-3 left-4 text-white">
              <span className="px-2.5 py-0.5 bg-[#8E1E19] text-[10px] font-bold rounded-md uppercase">
                {unitDetail.status}
              </span>
              <div className="font-bold text-sm mt-1">{unitDetail.surfaceM2} m² • {unitDetail.rooms} Ambientes</div>
            </div>
          </div>

          {/* Right Property Details & CTA */}
          <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#1B1C1E]">
                    {user.complex || 'Complejo Terrazas Park'}
                  </h3>
                  <p className="text-sm font-bold text-[#8E1E19] mt-0.5">
                    {user.unit || 'Unidad 4° B - 2 Dormitorios en Suite'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#5B5F63] block">Cochera & Baulera</span>
                  <span className="text-xs font-bold text-[#1B1C1E]">
                    {user.parking || 'N° 12 (Nivel 1)'} • {user.storage || 'B-04'}
                  </span>
                </div>
              </div>

              {/* Progress & Current Phase Indicators */}
              <div className="mt-4 p-4 rounded-xl bg-[#FAF9FB] border border-[#E0E3E7] space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1B1C1E] flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-[#8E1E19]" />
                    Etapa Vigente: <strong className="text-[#8E1E19]">{userProject.phase || 'Instalaciones y Yesería'}</strong>
                  </span>
                  <span className="text-sm font-black text-[#8E1E19]">
                    {userProject.progress}% Completado
                  </span>
                </div>

                <div className="w-full bg-[#E0E3E7] rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-[#8E1E19] h-full rounded-full transition-all duration-700 shadow-xs"
                    style={{ width: `${userProject.progress}%` }}
                  />
                </div>

                <div className="text-[11px] text-[#5B5F63] flex justify-between items-center pt-0.5">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#005613]" /> Ritmo de obra certificado en cronograma
                  </span>
                  <span>Entrega Estimada: <strong>{userProject.estimatedDelivery}</strong></span>
                </div>
              </div>
            </div>

            {/* Principal CTA Button */}
            <div className="pt-2">
              <button
                onClick={onNavigateToMyUnit}
                className="w-full py-3.5 px-5 bg-[#8E1E19] hover:bg-[#6D0205] text-white font-extrabold text-sm rounded-xl flex items-center justify-center gap-2.5 shadow-md transition-all active:scale-[0.99] group"
              >
                <Box className="w-5 h-5 text-[#FFA095] group-hover:rotate-12 transition-transform" />
                <span>Ingresar al Seguimiento de Mi Unidad</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          3. SECCIÓN INFERIOR: PORTFOLIO Y NUEVOS DESARROLLOS TIERRA FIRME
      ======================================================== */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#1B1C1E] tracking-tight">
              Portfolio & Nuevos Desarrollos Tierra Firme®
            </h2>
            <p className="text-xs text-[#5B5F63] mt-0.5">
              Explora la volumetría 3D, tipologías y amenities de nuestros proyectos en construcción y preventa.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                selectedFilter === 'all'
                  ? 'bg-[#8E1E19] text-white'
                  : 'bg-white text-[#5B5F63] hover:bg-gray-100 border border-[#E0E3E7]'
              }`}
            >
              Todos ({projects.length})
            </button>
            <button
              onClick={() => setSelectedFilter('pozo')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                selectedFilter === 'pozo'
                  ? 'bg-[#8E1E19] text-white'
                  : 'bg-white text-[#5B5F63] hover:bg-gray-100 border border-[#E0E3E7]'
              }`}
            >
              En Pozo / Preventa
            </button>
            <button
              onClick={() => setSelectedFilter('construccion')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                selectedFilter === 'construccion'
                  ? 'bg-[#8E1E19] text-white'
                  : 'bg-white text-[#5B5F63] hover:bg-gray-100 border border-[#E0E3E7]'
              }`}
            >
              En Construcción
            </button>
            <button
              onClick={() => setSelectedFilter('entrega')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                selectedFilter === 'entrega'
                  ? 'bg-[#8E1E19] text-white'
                  : 'bg-white text-[#5B5F63] hover:bg-gray-100 border border-[#E0E3E7]'
              }`}
            >
              Próxima Entrega
            </button>
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-[#E0E3E7] shadow-xs overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Facade Image & Badges */}
              <div className="relative h-52 bg-gray-100 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Commercial Status Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-white/95 text-[#1B1C1E] backdrop-blur-xs text-xs font-bold rounded-full shadow-xs">
                    {project.commercialStatus || project.status}
                  </span>
                </div>

                {/* Progress Pill on Top Right */}
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 bg-[#8E1E19] text-white text-xs font-extrabold rounded-lg shadow-xs">
                    {project.progress}% Obra
                  </span>
                </div>

                {/* Project Title and Location */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="text-lg font-bold group-hover:text-[#FFA095] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-gray-200 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FFA095]" />
                    {project.address}
                  </p>
                </div>
              </div>

              {/* Body Info & CTA */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-[#5B5F63] line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Specs Pill Row */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-[#FAF9FB] p-2.5 rounded-xl border border-[#E0E3E7]">
                  <div>
                    <span className="text-[10px] text-[#5B5F63] block">Entrega Estimada</span>
                    <span className="font-bold text-[#1B1C1E]">{project.estimatedDelivery}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5B5F63] block">Disponibilidad</span>
                    <span className="font-bold text-[#005613]">{project.totalUnits - project.unitsSold} Unidades</span>
                  </div>
                </div>

                {/* CTA Button: Ver Proyecto y Volumetría */}
                <div className="pt-1">
                  <button
                    onClick={() => onSelectProjectDetail(project)}
                    className="w-full py-2.5 px-4 bg-[#FFDAD5]/60 hover:bg-[#8E1E19] text-[#8A1B17] hover:text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all group/btn shadow-xs"
                  >
                    <Box className="w-4 h-4" />
                    <span>Ver Proyecto y Volumetría</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
