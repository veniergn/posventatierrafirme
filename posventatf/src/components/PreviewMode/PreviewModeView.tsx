import React, { useState } from 'react';
import { User, ConstructionMilestone, Project } from '../../types';
import { OwnerApp } from '../OwnerPortal/OwnerApp';
import { 
  Eye, 
  ArrowLeft, 
  Smartphone, 
  Monitor, 
  UserCheck, 
  ShieldAlert,
  ChevronDown
} from 'lucide-react';

interface PreviewModeViewProps {
  selectedUser: User;
  allUsers: User[];
  projects?: Project[];
  milestones: ConstructionMilestone[];
  onExitPreview: () => void;
  onSelectUserToPreview: (user: User) => void;
}

export const PreviewModeView: React.FC<PreviewModeViewProps> = ({
  selectedUser,
  allUsers,
  projects,
  milestones,
  onExitPreview,
  onSelectUserToPreview
}) => {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const ownerUsers = allUsers.filter((u) => u.role === 'propietario');

  return (
    <div className="min-h-screen bg-[#2F3032] flex flex-col">
      {/* Top Fixed Staff Preview Bar (Fiel a la especificación y diseño) */}
      <header className="sticky top-0 z-50 bg-[#1B1C1E] text-white border-b border-[#4E5256] px-4 sm:px-6 py-3 flex items-center justify-between shadow-md">
        {/* Left: Back button to Admin Panel */}
        <button
          onClick={onExitPreview}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#8E1E19] hover:bg-[#6D0205] text-white font-semibold text-xs rounded-lg shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Edición (Panel Admin)</span>
        </button>

        {/* Center: Current Preview Context & User Switcher */}
        <div className="relative">
          <div
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="cursor-pointer bg-[#33363A] hover:bg-[#4E5256] px-3.5 py-1.5 rounded-lg border border-gray-600 flex items-center gap-2 text-xs transition-colors"
          >
            <Eye className="w-4 h-4 text-[#FFA095]" />
            <span>
              Estás viendo la cuenta de:{' '}
              <strong className="text-white font-bold">{selectedUser.name}</strong> •{' '}
              <span className="text-[#FFA095] font-semibold">{selectedUser.unit || 'Unidad 4° B'}</span>
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
          </div>

          {/* User selector popup */}
          {userDropdownOpen && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-72 bg-white text-[#1B1C1E] rounded-xl shadow-2xl border border-[#E0E3E7] py-2 z-50 animate-in fade-in">
              <div className="px-3 py-1.5 text-[11px] font-bold text-[#5B5F63] uppercase tracking-wider border-b border-gray-100">
                Seleccionar Propietario a Simular
              </div>
              <div className="max-h-60 overflow-y-auto">
                {ownerUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      onSelectUserToPreview(u);
                      setUserDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#FFDAD5]/30 transition-colors ${
                      u.id === selectedUser.id ? 'bg-[#FFDAD5]/50 font-bold text-[#8A1B17]' : ''
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{u.name}</div>
                      <div className="text-[10px] text-[#5B5F63]">{u.unit} • {u.complex}</div>
                    </div>
                    {u.id === selectedUser.id && (
                      <span className="w-2 h-2 rounded-full bg-[#8E1E19]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Device Frame Toggle */}
        <div className="flex items-center gap-1 bg-[#33363A] p-1 rounded-lg border border-gray-600">
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`p-1.5 rounded text-xs flex items-center gap-1.5 transition-colors ${
              deviceMode === 'mobile' ? 'bg-[#8E1E19] text-white font-bold' : 'text-gray-400 hover:text-white'
            }`}
            title="Marco Smartphone"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Móvil</span>
          </button>
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`p-1.5 rounded text-xs flex items-center gap-1.5 transition-colors ${
              deviceMode === 'desktop' ? 'bg-[#8E1E19] text-white font-bold' : 'text-gray-400 hover:text-white'
            }`}
            title="Vista Completa"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Completa</span>
          </button>
        </div>
      </header>

      {/* Simulator View Canvas */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
        {deviceMode === 'mobile' ? (
          /* Mobile Device Frame with Notch */
          <div className="device-simulator">
            <div className="notch" />
            <div className="pt-7 h-full overflow-hidden">
              <OwnerApp
                user={selectedUser}
                projects={projects}
                milestones={milestones}
                isEmbeddedInSimulator={true}
              />
            </div>
          </div>
        ) : (
          /* Desktop / Full Width Canvas */
          <div className="w-full max-w-4xl bg-[#FAF9FB] rounded-2xl shadow-2xl border border-gray-700 overflow-hidden min-h-[750px]">
            <OwnerApp
              user={selectedUser}
              projects={projects}
              milestones={milestones}
              isEmbeddedInSimulator={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};
