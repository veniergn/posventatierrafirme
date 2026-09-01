import React from 'react';
import { ActiveAppView, User } from '../../types';
import { BrandLogo } from '../BrandLogo';
import { 
  Users, 
  LayoutDashboard, 
  UploadCloud, 
  Eye, 
  ShieldAlert, 
  LogOut, 
  Building2, 
  Bell, 
  Search,
  ExternalLink,
  Phone,
  BoxSelect
} from 'lucide-react';

interface AdminLayoutProps {
  currentView: ActiveAppView;
  onNavigate: (view: ActiveAppView) => void;
  currentUser: User;
  onOpenAuditLogs: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentView,
  onNavigate,
  currentUser,
  onOpenAuditLogs,
  children
}) => {
  return (
    <div className="min-h-screen bg-[#FAF9FB] flex flex-col md:flex-row text-[#1B1C1E]">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-[#E0E3E7] flex flex-col justify-between shrink-0 shadow-xs">
        <div>
          {/* Brand Logo Header */}
          <div className="p-6 border-b border-[#E0E3E7] flex items-center justify-between">
            <BrandLogo variant="horizontal" size="sm" />
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 py-1.5 text-[10px] font-bold text-[#5B5F63] uppercase tracking-wider">
              Módulos de Gestión
            </div>

            <button
              onClick={() => onNavigate('admin_users')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'admin_users'
                  ? 'bg-[#8E1E19] text-white shadow-xs'
                  : 'text-[#5B5F63] hover:text-[#1B1C1E] hover:bg-[#FAF9FB]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Gestión de Usuarios</span>
            </button>

            <button
              onClick={() => onNavigate('admin_units')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'admin_units'
                  ? 'bg-[#8E1E19] text-white shadow-xs'
                  : 'text-[#5B5F63] hover:text-[#1B1C1E] hover:bg-[#FAF9FB]'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Inventario de Unidades</span>
            </button>

            <button
              onClick={() => onNavigate('admin_dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'admin_dashboard'
                  ? 'bg-[#8E1E19] text-white shadow-xs'
                  : 'text-[#5B5F63] hover:text-[#1B1C1E] hover:bg-[#FAF9FB]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Desarrollos & Obras</span>
            </button>

            <button
              onClick={() => onNavigate('admin_multimedia')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'admin_multimedia'
                  ? 'bg-[#8E1E19] text-white shadow-xs'
                  : 'text-[#5B5F63] hover:text-[#1B1C1E] hover:bg-[#FAF9FB]'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>Multimedia & Avances</span>
            </button>

            <button
              onClick={() => onNavigate('admin_contacts')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'admin_contacts'
                  ? 'bg-[#8E1E19] text-white shadow-xs'
                  : 'text-[#5B5F63] hover:text-[#1B1C1E] hover:bg-[#FAF9FB]'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>Gestión de Contactos</span>
            </button>

            <button
              onClick={() => onNavigate('admin_commercial')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'admin_commercial'
                  ? 'bg-[#8E1E19] text-white shadow-xs'
                  : 'text-[#5B5F63] hover:text-[#1B1C1E] hover:bg-[#FAF9FB]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Atención Comercial</span>
            </button>

            <button
              onClick={() => onNavigate('admin_mapper')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'admin_mapper'
                  ? 'bg-[#8E1E19] text-white shadow-xs'
                  : 'text-[#5B5F63] hover:text-[#1B1C1E] hover:bg-[#FAF9FB]'
              }`}
            >
              <BoxSelect className="w-4 h-4" />
              <span>Mapeo Interactivo 2D</span>
            </button>

            <div className="pt-4 px-3 py-1.5 text-[10px] font-bold text-[#5B5F63] uppercase tracking-wider">
              Simulación & Auditoría
            </div>

            <button
              onClick={() => onNavigate('preview_mode')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#8E1E19] hover:bg-[#FFDAD5]/40 transition-colors border border-[#E0BFBB]/60"
            >
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>Modo Vista Previa</span>
              </div>
              <span className="text-[10px] bg-[#8E1E19] text-white px-1.5 py-0.2 rounded font-bold">
                Live
              </span>
            </button>

            <button
              onClick={onOpenAuditLogs}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#5B5F63] hover:text-[#1B1C1E] hover:bg-[#FAF9FB] transition-colors"
            >
              <ShieldAlert className="w-4 h-4 text-[#8E1E19]" />
              <span>Historial de Auditoría</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer User Profile */}
        <div className="p-4 border-t border-[#E0E3E7] bg-[#FAF9FB]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#8E1E19] text-white font-bold flex items-center justify-center text-xs">
              {currentUser.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-[#1B1C1E] truncate">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-[#5B5F63] truncate">
                {currentUser.staffRole || 'Administración'} • {currentUser.permissions === 'admin' ? 'Total' : 'Fotos'}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-[#E0E3E7] px-6 py-3.5 flex items-center justify-between shadow-xs sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#5B5F63]">
              <span className="font-semibold text-[#1B1C1E]">Panel de Control</span>
              <span>/</span>
              <span className="capitalize">{currentView.replace('admin_', '')}</span>
              <span className="ml-4 text-gray-300">|</span>
              <span className="ml-4 font-medium text-[#8E1E19]">{new Date().toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('preview_mode')}
              className="px-3.5 py-1.5 bg-[#FFDAD5]/60 hover:bg-[#8E1E19] text-[#8A1B17] hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Simular como Propietario</span>
            </button>

            <button
              onClick={() => onNavigate('owner_login')}
              className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100"
              title="Cerrar sesión / Ir al login"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
