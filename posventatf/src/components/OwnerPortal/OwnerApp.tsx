import React, { useState } from 'react';
import { User, Project, ConstructionMilestone } from '../../types';
import { INITIAL_PROJECTS } from '../../data/initialData';
import { BrandLogo } from '../BrandLogo';
import { OwnerHome } from './OwnerHome';
import { OwnerMyUnit } from './OwnerMyUnit';
import { OwnerProjectsCatalog } from './OwnerProjectsCatalog';
import { OwnerContact } from './OwnerContact';
import { ProjectCommercialDetail } from './ProjectCommercialDetail';
import { 
  Home, 
  Building, 
  Building2, 
  Phone, 
  X, 
  Compass,
  Sparkles
} from 'lucide-react';

interface OwnerAppProps {
  user: User;
  projects?: Project[];
  milestones: ConstructionMilestone[];
  isEmbeddedInSimulator?: boolean;
}

export const OwnerApp: React.FC<OwnerAppProps> = ({
  user,
  projects = INITIAL_PROJECTS,
  milestones,
  isEmbeddedInSimulator = false
}) => {
  const [activeTab, setActiveTab] = useState<'inicio' | 'unidad' | 'desarrollos' | 'contacto'>('inicio');
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<Project | null>(null);
  const [fullscreenPhoto, setFullscreenPhoto] = useState<string | null>(null);

  const handleSelectProjectDetail = (project: Project) => {
    setSelectedProjectForDetail(project);
  };

  const handleBackFromDetail = () => {
    setSelectedProjectForDetail(null);
  };

  const handleTabChange = (tab: 'inicio' | 'unidad' | 'desarrollos' | 'contacto') => {
    setActiveTab(tab);
    setSelectedProjectForDetail(null); // Reset detail view when changing tabs
  };

  return (
    <div className={`flex flex-col bg-[#FAF9FB] text-[#1B1C1E] min-h-full ${isEmbeddedInSimulator ? 'h-[750px] overflow-y-auto' : 'min-h-screen'}`}>
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E0E3E7] px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
        <BrandLogo variant="horizontal" size="sm" />
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-[#1B1C1E]">{user.name}</div>
            <div className="text-[10px] text-[#8E1E19] font-semibold flex items-center justify-end gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {user.unit || 'Unidad 4° B'} • {user.complex || 'Terrazas Park'}
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#FFDAD5] text-[#8A1B17] font-extrabold flex items-center justify-center text-xs border border-[#E0BFBB] shadow-xs">
            {user.name.charAt(0)}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 max-w-4xl mx-auto w-full pb-28">
        {/* If a project detail is open, show the 3D Commercial Detail View */}
        {selectedProjectForDetail ? (
          <ProjectCommercialDetail
            project={selectedProjectForDetail}
            user={user}
            onBack={handleBackFromDetail}
            onExpandImage={(url) => setFullscreenPhoto(url)}
          />
        ) : (
          <>
            {/* 1. INICIO */}
            {activeTab === 'inicio' && (
              <OwnerHome
                user={user}
                projects={projects}
                milestones={milestones}
                onNavigateToMyUnit={() => handleTabChange('unidad')}
                onSelectProjectDetail={handleSelectProjectDetail}
                onExpandImage={(url) => setFullscreenPhoto(url)}
              />
            )}

            {/* 2. MI UNIDAD */}
            {activeTab === 'unidad' && (
              <OwnerMyUnit
                user={user}
                milestones={milestones}
                onExpandImage={(url) => setFullscreenPhoto(url)}
              />
            )}

            {/* 3. DESARROLLOS (Catálogo) */}
            {activeTab === 'desarrollos' && (
              <OwnerProjectsCatalog
                projects={projects}
                onSelectProject={handleSelectProjectDetail}
              />
            )}

            {/* 4. CONTACTO */}
            {activeTab === 'contacto' && (
              <OwnerContact
                user={user}
                projects={projects}
              />
            )}
          </>
        )}
      </main>

      {/* Fixed Bottom Navigation Bar (Fiel a la especificación solicitada) */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E0E3E7] px-3 py-2 flex items-center justify-around shadow-lg">
        {/* [🏠 Inicio] */}
        <button
          onClick={() => handleTabChange('inicio')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[11px] font-bold transition-all ${
            activeTab === 'inicio' && !selectedProjectForDetail
              ? 'text-[#8E1E19] scale-105'
              : 'text-[#5B5F63] hover:text-[#1B1C1E]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Inicio</span>
        </button>

        {/* [📐 Mi Unidad] */}
        <button
          onClick={() => handleTabChange('unidad')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[11px] font-bold transition-all ${
            activeTab === 'unidad' && !selectedProjectForDetail
              ? 'text-[#8E1E19] scale-105'
              : 'text-[#5B5F63] hover:text-[#1B1C1E]'
          }`}
        >
          <Building className="w-5 h-5" />
          <span>Mi Unidad</span>
        </button>

        {/* [🏢 Desarrollos] */}
        <button
          onClick={() => handleTabChange('desarrollos')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[11px] font-bold transition-all ${
            activeTab === 'desarrollos' || selectedProjectForDetail
              ? 'text-[#8E1E19] scale-105'
              : 'text-[#5B5F63] hover:text-[#1B1C1E]'
          }`}
        >
          <Building2 className="w-5 h-5" />
          <span>Desarrollos</span>
        </button>

        {/* [👤 Contacto] */}
        <button
          onClick={() => handleTabChange('contacto')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[11px] font-bold transition-all ${
            activeTab === 'contacto' && !selectedProjectForDetail
              ? 'text-[#8E1E19] scale-105'
              : 'text-[#5B5F63] hover:text-[#1B1C1E]'
          }`}
        >
          <Phone className="w-5 h-5" />
          <span>Contacto</span>
        </button>
      </nav>

      {/* Fullscreen Photo Modal */}
      {fullscreenPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-in fade-in">
          <button
            onClick={() => setFullscreenPhoto(null)}
            className="absolute top-4 right-4 text-white p-2.5 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={fullscreenPhoto}
            alt="Ampliación"
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
