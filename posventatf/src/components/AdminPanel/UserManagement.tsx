import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { 
  Plus, 
  Search, 
  Eye, 
  Mail, 
  Edit, 
  Trash2, 
  Copy, 
  CheckCircle2, 
  Clock, 
  Key, 
  Filter, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface UserManagementProps {
  users: User[];
  onOpenNewUserModal: () => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
  onPreviewAsOwner: (user: User) => void;
  onViewEmail: (user: User) => void;
  onResendCode: (user: User) => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({
  users,
  onOpenNewUserModal,
  onEditUser,
  onDeleteUser,
  onPreviewAsOwner,
  onViewEmail,
  onResendCode
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'propietario' | 'staff' | 'pendiente'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredUsers = users.filter((u) => {
    // Filter pill matching
    if (activeFilter === 'propietario' && u.role !== 'propietario') return false;
    if (activeFilter === 'staff' && u.role !== 'staff') return false;
    if (activeFilter === 'pendiente' && u.status !== 'pendiente') return false;

    // Search term matching
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      const matchName = u.name.toLowerCase().includes(term);
      const matchEmail = u.email.toLowerCase().includes(term);
      const matchDni = u.dni.toLowerCase().includes(term);
      const matchUnit = (u.unit || '').toLowerCase().includes(term);
      const matchComplex = (u.complex || '').toLowerCase().includes(term);
      const matchCode = u.activationCode.toLowerCase().includes(term);
      return matchName || matchEmail || matchDni || matchUnit || matchComplex || matchCode;
    }

    return true;
  });

  const countAll = users.length;
  const countOwners = users.filter((u) => u.role === 'propietario').length;
  const countStaff = users.filter((u) => u.role === 'staff').length;
  const countPending = users.filter((u) => u.status === 'pendiente').length;

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1B1C1E] tracking-tight">
            Gestión de Usuarios
          </h1>
          <p className="text-sm text-[#5B5F63] mt-0.5">
            Administra los accesos, unidades asignadas y códigos de autorización del sistema.
          </p>
        </div>
        <button
          onClick={onOpenNewUserModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#8E1E19] hover:bg-[#6D0205] text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Usuario</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white rounded-xl p-4 border border-[#E0E3E7] shadow-xs space-y-4">
        {/* Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E0E3E7] pb-3">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeFilter === 'all'
                ? 'bg-[#8E1E19] text-white shadow-xs'
                : 'text-[#5B5F63] hover:text-[#1B1C1E] hover:bg-[#F4F3F5]'
            }`}
          >
            <span>Todos</span>
            <span className={`px-1.5 py-0.2 text-[10px] rounded-full ${
              activeFilter === 'all' ? 'bg-white/20 text-white' : 'bg-[#E0E3E7] text-[#5B5F63]'
            }`}>
              {countAll}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('propietario')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeFilter === 'propietario'
                ? 'bg-[#8E1E19] text-white shadow-xs'
                : 'text-[#5B5F63] hover:text-[#1B1C1E] hover:bg-[#F4F3F5]'
            }`}
          >
            <span>Propietarios</span>
            <span className={`px-1.5 py-0.2 text-[10px] rounded-full ${
              activeFilter === 'propietario' ? 'bg-white/20 text-white' : 'bg-[#E0E3E7] text-[#5B5F63]'
            }`}>
              {countOwners}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('staff')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeFilter === 'staff'
                ? 'bg-[#8E1E19] text-white shadow-xs'
                : 'text-[#5B5F63] hover:text-[#1B1C1E] hover:bg-[#F4F3F5]'
            }`}
          >
            <span>Personal de Obra / Staff</span>
            <span className={`px-1.5 py-0.2 text-[10px] rounded-full ${
              activeFilter === 'staff' ? 'bg-white/20 text-white' : 'bg-[#E0E3E7] text-[#5B5F63]'
            }`}>
              {countStaff}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('pendiente')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeFilter === 'pendiente'
                ? 'bg-[#8E1E19] text-white shadow-xs'
                : 'text-[#5B5F63] hover:text-[#1B1C1E] hover:bg-[#F4F3F5]'
            }`}
          >
            <span>Pendientes de Activación</span>
            <span className={`px-1.5 py-0.2 text-[10px] rounded-full ${
              activeFilter === 'pendiente' ? 'bg-white/20 text-white' : 'bg-[#FFDAD5] text-[#8A1B17]'
            }`}>
              {countPending}
            </span>
          </button>
        </div>

        {/* Search Input & Quick Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5B5F63]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, email, DNI, unidad o token..."
              className="w-full pl-10 pr-4 py-2 border border-[#8C716D]/30 rounded-lg text-xs md:text-sm focus:border-[#8E1E19] focus:ring-2 focus:ring-[#8E1E19]/15 outline-none transition-all"
            />
          </div>

          <div className="text-xs text-[#5B5F63] flex items-center gap-1.5 self-end sm:self-center">
            <Filter className="w-3.5 h-3.5" />
            <span>Mostrando <strong>{filteredUsers.length}</strong> de {users.length} registros</span>
          </div>
        </div>
      </div>

      {/* Users Data Table */}
      <div className="bg-white rounded-xl border border-[#E0E3E7] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF9FB] border-b border-[#E0E3E7] text-[11px] font-bold uppercase tracking-wider text-[#5B5F63]">
                <th className="py-3.5 px-5">Usuario</th>
                <th className="py-3.5 px-4">Tipo</th>
                <th className="py-3.5 px-4">Asignación / Cargo</th>
                <th className="py-3.5 px-4">Estado / Token</th>
                <th className="py-3.5 px-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3E7] text-xs">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#5B5F63]">
                    No se encontraron usuarios coincidentes con la búsqueda o filtro.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isOwner = user.role === 'propietario';
                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-[#FAF9FB] transition-colors group"
                    >
                      {/* Column: User Name & Info */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded-full object-cover border border-[#E0BFBB]"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-[#FFDAD5] text-[#8A1B17] font-bold flex items-center justify-center text-sm border border-[#E0BFBB]">
                              {user.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-[#1B1C1E] text-sm">
                              {user.name}
                            </div>
                            <div className="text-[11px] text-[#5B5F63] flex items-center gap-2">
                              <span>{user.email}</span>
                              <span className="text-gray-300">•</span>
                              <span className="font-mono">DNI: {user.dni}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Column: Type / Role */}
                      <td className="py-4 px-4">
                        {isOwner ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#FFDAD5]/60 text-[#8A1B17] border border-[#FFDAD5]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8E1E19]" />
                            Propietario
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#E0E3E7] text-[#1B1C1E] border border-[#C3C7CB]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#5B5F63]" />
                            Personal Staff
                          </span>
                        )}
                      </td>

                      {/* Column: Unit / Assignment */}
                      <td className="py-4 px-4">
                        {isOwner ? (
                          <div>
                            <div className="font-semibold text-[#1B1C1E]">
                              {user.unit || 'Sin unidad asignada'}
                            </div>
                            <div className="text-[11px] text-[#5B5F63]">
                              {user.complex || 'Complejo Terrazas'}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="font-semibold text-[#1B1C1E]">
                              {user.staffRole || 'Director de Obra'}
                            </div>
                            <div className="text-[11px] text-[#5B5F63]">
                              {user.permissions === 'admin' ? 'Permiso Total' : 'Carga de Fotos'}
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Column: Status & Token */}
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            {user.status === 'activo' ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#005613]">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Activo
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8A1B17]">
                                <Clock className="w-3.5 h-3.5" /> Pendiente
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold bg-[#F4F3F5] text-[#1B1C1E] px-2 py-0.5 rounded border border-[#E0E3E7]">
                              <Key className="w-3 h-3 text-[#8E1E19]" />
                              {user.activationCode}
                            </span>
                            <button
                              onClick={() => copyCode(user.activationCode, user.id)}
                              className="text-gray-400 hover:text-gray-700 p-1"
                              title="Copiar token de activación"
                            >
                              {copiedId === user.id ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Column: Actions */}
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Preview as Owner Mode Button */}
                          {isOwner && (
                            <button
                              onClick={() => onPreviewAsOwner(user)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-[#8E1E19]/10 hover:bg-[#8E1E19] text-[#8E1E19] hover:text-white text-xs font-semibold transition-all"
                              title="Ver cómo ve el propietario su app (Preview Mode)"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span className="hidden md:inline">Vista Previa</span>
                            </button>
                          )}

                          {/* View Dispatched Email Template */}
                          <button
                            onClick={() => onViewEmail(user)}
                            className="p-1.5 text-gray-500 hover:text-[#8E1E19] hover:bg-[#FFDAD5]/30 rounded-md transition-colors"
                            title="Ver correo de bienvenida disparado"
                          >
                            <Mail className="w-4 h-4" />
                          </button>

                          {/* Edit User Button */}
                          <button
                            onClick={() => onEditUser(user)}
                            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            title="Editar usuario"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* Delete User Button */}
                          <button
                            onClick={() => onDeleteUser(user.id)}
                            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Eliminar usuario"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination & Status Footer */}
        <div className="px-6 py-4 bg-[#FAF9FB] border-t border-[#E0E3E7] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5B5F63]">
          <div>
            Mostrando <strong>{filteredUsers.length}</strong> de {users.length} usuarios registrados
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="p-1.5 rounded border border-[#E0E3E7] text-gray-300 cursor-not-allowed bg-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 rounded bg-[#8E1E19] text-white font-semibold text-xs">
              1
            </span>
            <button
              disabled
              className="p-1.5 rounded border border-[#E0E3E7] text-gray-300 cursor-not-allowed bg-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
