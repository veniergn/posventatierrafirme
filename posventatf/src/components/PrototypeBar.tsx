import React from 'react';
import { ActiveAppView } from '../types';
import { 
  Users, 
  LayoutDashboard, 
  UploadCloud, 
  Eye, 
  Smartphone, 
  Key, 
  LogIn, 
  Mail,
  Building2
} from 'lucide-react';

interface PrototypeBarProps {
  currentView: ActiveAppView;
  onNavigate: (view: ActiveAppView) => void;
  pendingUsersCount: number;
}

export const PrototypeBar: React.FC<PrototypeBarProps> = ({
  currentView,
  onNavigate,
  pendingUsersCount
}) => {
  const navButtons: { view: ActiveAppView; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      view: 'splash_screen',
      label: 'Acceso / Splash',
      icon: <Building2 className="w-3.5 h-3.5" />
    },
    {
      view: 'admin_users',
      label: 'Admin: Usuarios',
      icon: <Users className="w-3.5 h-3.5" />,
      badge: pendingUsersCount > 0 ? pendingUsersCount : undefined
    },
    {
      view: 'admin_units',
      label: 'Admin: Unidades',
      icon: <Building2 className="w-3.5 h-3.5" />
    },
    {
      view: 'admin_dashboard',
      label: 'Admin: Proyectos',
      icon: <LayoutDashboard className="w-3.5 h-3.5" />
    },
    {
      view: 'admin_multimedia',
      label: 'Admin: Multimedia',
      icon: <UploadCloud className="w-3.5 h-3.5" />
    },
    {
      view: 'preview_mode',
      label: '👁️ Vista Previa',
      icon: <Eye className="w-3.5 h-3.5 text-[#FFA095]" />
    },
    {
      view: 'owner_portal',
      label: 'Portal Propietario',
      icon: <Smartphone className="w-3.5 h-3.5" />
    },
    {
      view: 'activation_screen',
      label: 'Activación Token',
      icon: <Key className="w-3.5 h-3.5" />
    },
    {
      view: 'email_inbox',
      label: 'Bandeja Correos',
      icon: <Mail className="w-3.5 h-3.5" />
    }
  ];

  return (
    <div className="bg-[#1B1C1E] text-white border-b border-[#33363A] px-4 py-2 flex items-center justify-between overflow-x-auto gap-2 select-none shadow-md z-40">
      <div className="flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#FFA095] bg-[#8E1E19]/40 px-2.5 py-1 rounded-md border border-[#8E1E19]/60">
          <Building2 className="w-3.5 h-3.5" />
          <span>TIERRA FIRME DEMO</span>
        </div>
        <span className="text-[11px] text-gray-400 hidden xl:inline">
          Navegador Rápido de Pantallas:
        </span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
        {navButtons.map((btn) => (
          <button
            key={btn.view}
            onClick={() => onNavigate(btn.view)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 whitespace-nowrap transition-all ${
              currentView === btn.view
                ? 'bg-[#8E1E19] text-white font-bold shadow-xs'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {btn.icon}
            <span>{btn.label}</span>
            {btn.badge !== undefined && (
              <span className="px-1.5 py-0.2 bg-[#FFA095] text-[#410002] rounded-full text-[10px] font-bold">
                {btn.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
