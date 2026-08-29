import React, { useState } from 'react';
import { User, Project, ConstructionMilestone, UnitDetail } from '../../types';
import { INITIAL_UNIT_DETAILS } from '../../data/initialData';

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
  onNavigateToMyUnit,
  onSelectProjectDetail,
}) => {
  // Find current user's project
  const userProject = projects.find(
    (p) => p.name.toLowerCase().includes((user.complex || '').toLowerCase()) ||
           (user.complex || '').toLowerCase().includes(p.name.toLowerCase())
  ) || projects[0];

  return (
    <div className="flex flex-col items-center animate-in fade-in duration-300 w-full overflow-hidden pb-12">
      {/* 1. LARGE LOGO */}
      <div className="my-6 flex justify-center w-full">
        <img 
          src="/logo-tf.png" 
          alt="Tierra Firme Desarrollos Sólidos" 
          className="h-24 md:h-32 object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; 
            target.src = '/icon.svg';
          }}
        />
      </div>

      {/* 2. HERO BANNER */}
      <div className="w-full relative mt-2 group cursor-pointer" onClick={onNavigateToMyUnit}>
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={userProject.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
            alt="Tu Nuevo Hogar"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
          
          {/* Content Centered */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
            <h2 className="text-white text-2xl sm:text-3xl font-bold tracking-wide uppercase drop-shadow-md mb-6 leading-tight">
              Bienvenido a<br />tu nuevo hogar
            </h2>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigateToMyUnit();
              }}
              className="bg-[#8E1E19] hover:bg-[#6D0205] text-white px-6 py-3 rounded-md font-bold text-sm sm:text-base tracking-widest uppercase transition-all shadow-lg active:scale-95"
            >
              [ 🏗️ Seguimiento de mi unidad ]
            </button>
          </div>
        </div>
      </div>

      {/* 3. EXPLORÁ NUESTROS PROYECTOS */}
      <div className="w-full px-4 sm:px-6 mt-8">
        <h3 className="text-[11px] sm:text-xs font-bold text-[#1B1C1E] tracking-widest uppercase mb-4 pl-1">
          Explorá nuestros proyectos
        </h3>

        {/* Horizontal Scrollable Carousel */}
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {projects.map((project) => (
            <div 
              key={project.id}
              onClick={() => onSelectProjectDetail(project)}
              className="min-w-[140px] sm:min-w-[160px] max-w-[140px] sm:max-w-[160px] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-[#E0E3E7] bg-white flex-shrink-0 relative group"
            >
              <div className="h-28 sm:h-32 w-full overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-white/90 text-[9px] font-bold rounded-sm shadow-xs truncate max-w-[90%]">
                  {project.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
