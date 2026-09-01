import React, { useState } from 'react';
import { User, Project, ConstructionMilestone, ContactItem, UnitDetail, UnidadMapeada, ObraVolumetria } from '../../types';
import { OwnerHome } from './OwnerHome';
import { OwnerMyUnit } from './OwnerMyUnit';
import { OwnerProjectsCatalog } from './OwnerProjectsCatalog';
import { OwnerContact } from './OwnerContact';
import { ProjectCommercialDetail } from './ProjectCommercialDetail';
import { OwnerPublicLogin } from './OwnerPublicLogin';
import { AdminLoginModal } from '../AdminPanel/AdminLoginModal';
import { 
  Home, 
  Building2, 
  Phone, 
  X, 
  Globe
} from 'lucide-react';

interface OwnerAppProps {
  user: User | null;
  projects?: Project[];
  milestones: ConstructionMilestone[];
  contacts?: ContactItem[];
  units?: UnitDetail[];
  mappedUnits?: UnidadMapeada[];
  volumetria?: ObraVolumetria;
  isEmbeddedInSimulator?: boolean;
  globalCoverImage?: string;
  onAdminAccess?: (user?: User) => void;
  onLoginSuccess?: (user: User) => void;
  onNavigateToActivation?: () => void;
}

export const OwnerApp: React.FC<OwnerAppProps> = ({
  user,
  projects = [],
  milestones,
  contacts,
  units = [],
  mappedUnits = [],
  volumetria,
  isEmbeddedInSimulator = false,
  globalCoverImage,
  onAdminAccess,
  onLoginSuccess,
  onNavigateToActivation
}) => {
  const [activeTab, setActiveTab] = useState<'inicio' | 'unidad' | 'desarrollos' | 'contacto'>('inicio');
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<Project | null>(null);
  const [fullscreenPhoto, setFullscreenPhoto] = useState<string | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

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

  const handleAdminAccessClick = () => {
    setShowAdminLogin(true);
  };

  return (
    <div className={`flex flex-col bg-[#FAF9FB] text-[#1B1C1E] min-h-full ${isEmbeddedInSimulator ? 'h-[750px] overflow-y-auto' : 'min-h-screen'}`}>
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white px-4 sm:px-6 py-4 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <div className="flex items-center">
          <img src="/logo-tf.png" alt="Tierra Firme" className="h-8 object-contain" />
        </div>
        
        <div className="flex items-center">
          <button 
            onClick={handleAdminAccessClick}
            className="w-8 h-8 rounded-full border-2 border-[#8E1E19] text-[#8E1E19] flex items-center justify-center hover:bg-[#8E1E19]/10 transition-colors"
            title="Acceso Administración"
          >
            <Globe className="w-5 h-5" />
          </button>
        </div>
      </header>

      {showAdminLogin && (
        <AdminLoginModal
          onClose={() => setShowAdminLogin(false)}
          onSuccess={(u) => {
            setShowAdminLogin(false);
            if (onAdminAccess) onAdminAccess(u);
          }}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-0 w-full pb-28">
        {selectedProjectForDetail ? (
          <ProjectCommercialDetail
            project={selectedProjectForDetail}
            user={user || ({} as User)}
            units={units}
            mappedUnits={mappedUnits}
            volumetria={{
              id: `vol-${selectedProjectForDetail.id}`,
              nombre: 'Volumetría ' + selectedProjectForDetail.name,
              imagen_url: selectedProjectForDetail.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000',
              width_original: 1920,
              height_original: 1080,
              estado: 'Activo'
            }}
            onBack={handleBackFromDetail}
            onExpandImage={(url) => setFullscreenPhoto(url)}
          />
        ) : (
          <>
            {activeTab === 'inicio' && (
              <OwnerHome
                user={user}
                projects={projects}
                milestones={milestones}
                onNavigateToMyUnit={() => handleTabChange('unidad')}
                onSelectProjectDetail={handleSelectProjectDetail}
                onExpandImage={(url) => setFullscreenPhoto(url)}
                globalCoverImage={globalCoverImage}
              />
            )}

            {activeTab === 'unidad' && (
              !user ? (
                <OwnerPublicLogin 
                  globalCoverImage={globalCoverImage}
                  onLoginSuccess={(u) => {
                    if (onLoginSuccess) onLoginSuccess(u);
                  }}
                  onNavigateToActivation={onNavigateToActivation}
                  onQuickLoginAsAdmin={() => setShowAdminLogin(true)}
                />
              ) : (
                <OwnerMyUnit
                  user={user}
                  milestones={milestones}
                  onExpandImage={(url) => setFullscreenPhoto(url)}
                />
              )
            )}

            {activeTab === 'desarrollos' && (
              <OwnerProjectsCatalog
                projects={projects}
                onSelectProject={handleSelectProjectDetail}
              />
            )}

            {activeTab === 'contacto' && (
              <OwnerContact
                user={user}
                projects={projects}
                contacts={contacts || []}
              />
            )}
          </>
        )}
      </main>

      {/* Fixed Bottom Navigation Bar (Fiel a la especificación solicitada) */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#E0E3E7] px-3 py-2 flex items-center justify-around shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        {/* [🏠 Inicio] */}
        <button
          onClick={() => handleTabChange('inicio')}
          className={`flex flex-col items-center gap-1 py-1 px-3 text-[10px] uppercase font-bold transition-all ${
            activeTab === 'inicio' && !selectedProjectForDetail
              ? 'text-[#8E1E19]'
              : 'text-[#5B5F63] hover:text-[#1B1C1E]'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Inicio</span>
        </button>

        {/* [📐 Mi Dpto] */}
        <button
          onClick={() => handleTabChange('unidad')}
          className={`flex flex-col items-center gap-1 py-1 px-3 text-[10px] uppercase font-bold transition-all ${
            activeTab === 'unidad' && !selectedProjectForDetail
              ? 'text-[#8E1E19]'
              : 'text-[#5B5F63] hover:text-[#1B1C1E]'
          }`}
        >
          {/* Using a custom SVG for the set square/ruler shown in mockup to be precise, or just lucide PenTool */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-0.5">
            <path d="M21 21H3V3l18 18z"/>
            <path d="M15 15v2"/>
            <path d="M11 11v2"/>
            <path d="M7 7v2"/>
          </svg>
          <span>Mi Dpto</span>
        </button>

        {/* [🏢 Proyectos] */}
        <button
          onClick={() => handleTabChange('desarrollos')}
          className={`flex flex-col items-center gap-1 py-1 px-3 text-[10px] uppercase font-bold transition-all ${
            activeTab === 'desarrollos' || selectedProjectForDetail
              ? 'text-[#8E1E19]'
              : 'text-[#5B5F63] hover:text-[#1B1C1E]'
          }`}
        >
          <Building2 className="w-5 h-5 mb-0.5" />
          <span>Proyectos</span>
        </button>

        {/* [👤 Contacto] */}
        <button
          onClick={() => handleTabChange('contacto')}
          className={`flex flex-col items-center gap-1 py-1 px-3 text-[10px] uppercase font-bold transition-all ${
            activeTab === 'contacto' && !selectedProjectForDetail
              ? 'text-[#8E1E19]'
              : 'text-[#5B5F63] hover:text-[#1B1C1E]'
          }`}
        >
          <Phone className="w-5 h-5 mb-0.5" />
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
