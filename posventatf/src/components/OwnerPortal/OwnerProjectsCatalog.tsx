import React, { useState } from 'react';
import { Project } from '../../types';
import { 
  Building2, 
  Search, 
  MapPin, 
  Calendar, 
  Box, 
  ChevronRight, 
  SlidersHorizontal,
  Sparkles,
  TrendingUp
} from 'lucide-react';

interface OwnerProjectsCatalogProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const OwnerProjectsCatalog: React.FC<OwnerProjectsCatalogProps> = ({
  projects,
  onSelectProject
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pozo' | 'construccion' | 'entrega' | 'entregadas'>('all');

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'pozo') return p.commercialStatus?.toLowerCase().includes('pozo') || p.status?.toLowerCase().includes('pre-sale');
    if (selectedFilter === 'construccion') return p.commercialStatus?.toLowerCase().includes('construcción') || p.status?.toLowerCase().includes('active');
    if (selectedFilter === 'entrega') return p.commercialStatus?.toLowerCase().includes('entrega') || p.status?.toLowerCase().includes('sold');
    if (selectedFilter === 'entregadas') return p.commercialStatus?.toLowerCase().includes('entregada') || p.status?.toLowerCase().includes('completed');
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#E0E3E7] shadow-xs space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8E1E19] flex items-center gap-1.5">
            <Building2 className="w-4 h-4" /> Catálogo de Desarrollos Inmobiliarios
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B1C1E] tracking-tight mt-0.5">
            Desarrollos Tierra Firme®
          </h1>
          <p className="text-xs text-[#5B5F63] mt-1">
            Explora las características constructivas, volumetrías 3D y tipologías de nuestros complejos residenciales.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre de desarrollo o ubicación (ej: Palermo, Belgrano)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs text-[#1B1C1E] focus:outline-none focus:ring-2 focus:ring-[#8E1E19] focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-[#8E1E19] text-white'
                  : 'bg-[#FAF9FB] text-[#5B5F63] hover:bg-gray-100 border border-[#E0E3E7]'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedFilter('pozo')}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedFilter === 'pozo'
                  ? 'bg-[#8E1E19] text-white'
                  : 'bg-[#FAF9FB] text-[#5B5F63] hover:bg-gray-100 border border-[#E0E3E7]'
              }`}
            >
              En Pozo
            </button>
            <button
              onClick={() => setSelectedFilter('construccion')}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedFilter === 'construccion'
                  ? 'bg-[#8E1E19] text-white'
                  : 'bg-[#FAF9FB] text-[#5B5F63] hover:bg-gray-100 border border-[#E0E3E7]'
              }`}
            >
              En Construcción
            </button>
            <button
              onClick={() => setSelectedFilter('entrega')}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedFilter === 'entrega'
                  ? 'bg-[#8E1E19] text-white'
                  : 'bg-[#FAF9FB] text-[#5B5F63] hover:bg-gray-100 border border-[#E0E3E7]'
              }`}
            >
              Próxima Entrega
            </button>
            <button
              onClick={() => setSelectedFilter('entregadas')}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedFilter === 'entregadas'
                  ? 'bg-[#8E1E19] text-white'
                  : 'bg-[#FAF9FB] text-[#5B5F63] hover:bg-gray-100 border border-[#E0E3E7]'
              }`}
            >
              Entregadas
            </button>
          </div>
        </div>
      </div>

      {/* Catalog Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-2xl border border-[#E0E3E7] shadow-xs overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group"
          >
            <div className="relative h-56 bg-gray-100 overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              
              {/* Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-white/95 text-[#1B1C1E] backdrop-blur-xs text-xs font-bold rounded-full shadow-xs">
                  {project.commercialStatus || project.status}
                </span>
              </div>

              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 bg-[#8E1E19] text-white text-xs font-extrabold rounded-lg shadow-xs">
                  {project.progress}% Obra
                </span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h3 className="text-xl font-bold group-hover:text-[#FFA095] transition-colors">
                  {project.name}
                </h3>
                <p className="text-xs text-gray-200 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FFA095]" />
                  {project.address}
                </p>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs text-[#5B5F63] line-clamp-2 leading-relaxed">
                {project.description}
              </p>

              {/* Progress & Delivery Metrics */}
              <div className="bg-[#FAF9FB] p-3 rounded-xl border border-[#E0E3E7] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1B1C1E]">{project.phase}</span>
                  <span className="font-bold text-[#8E1E19]">{project.progress}%</span>
                </div>
                <div className="w-full bg-[#E0E3E7] rounded-full h-2 overflow-hidden">
                  <div className="bg-[#8E1E19] h-full rounded-full" style={{ width: `${project.progress}%` }} />
                </div>
                <div className="flex justify-between items-center text-[11px] text-[#5B5F63] pt-0.5">
                  <span>Entrega: <strong>{project.estimatedDelivery}</strong></span>
                  <span>Disponibilidad: <strong>{project.totalUnits - project.unitsSold} u.</strong></span>
                </div>
              </div>

              {/* Action CTA */}
              <button
                onClick={() => onSelectProject(project)}
                className="w-full py-3 bg-[#FFDAD5]/60 hover:bg-[#8E1E19] text-[#8A1B17] hover:text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs group/btn"
              >
                <Box className="w-4 h-4" />
                <span>Explorar Proyecto & Volumetría 3D</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
