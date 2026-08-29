import React, { useState, useEffect } from 'react';
import { User, StaffRole, StaffPermission } from '../../types';
import { X, Save, RefreshCw, Key } from 'lucide-react';

interface EditUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedUser: User) => void;
  onResendCode: (user: User) => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  isOpen,
  onClose,
  onUpdate,
  onResendCode
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dni, setDni] = useState('');
  const [complex, setComplex] = useState('');
  const [unit, setUnit] = useState('');
  const [parking, setParking] = useState('');
  const [staffRole, setStaffRole] = useState<StaffRole>('Director de Obra');
  const [permissions, setPermissions] = useState<StaffPermission>('admin');
  const [status, setStatus] = useState<'activo' | 'pendiente'>('activo');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setDni(user.dni || '');
      setComplex(user.complex || 'Complejo Terrazas');
      setUnit(user.unit || 'Unidad 4° B');
      setParking(user.parking || 'Ninguna');
      setStaffRole(user.staffRole || 'Director de Obra');
      setPermissions(user.permissions || 'admin');
      setStatus(user.status);
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: User = {
      ...user,
      name,
      email,
      phone,
      dni,
      status,
      ...(user.role === 'propietario'
        ? { complex, unit, parking }
        : { staffRole, permissions })
    };
    onUpdate(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-[#E0BFBB]/30 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-8 py-5 border-b border-[#E0E3E7] flex justify-between items-center bg-white">
          <div>
            <h2 className="text-xl font-bold text-[#1B1C1E]">Editar Usuario</h2>
            <p className="text-xs text-[#5B5F63] mt-0.5">
              Modifica datos de contacto, unidad o estado de activación.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">
          {/* Status & Role info */}
          <div className="flex items-center justify-between bg-[#FAF9FB] p-4 rounded-lg border border-[#E0E3E7]">
            <div>
              <span className="text-xs text-[#5B5F63] uppercase tracking-wider block font-semibold">
                Perfil de Usuario
              </span>
              <span className="text-sm font-bold text-[#1B1C1E] capitalize">
                {user.role === 'propietario' ? 'Propietario / Cliente' : 'Personal de Staff'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs text-[#5B5F63] font-medium">Estado:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'activo' | 'pendiente')}
                className="text-xs font-semibold px-2.5 py-1 rounded-md border border-[#E0E3E7] bg-white outline-none"
              >
                <option value="activo">Activo</option>
                <option value="pendiente">Pendiente de Activación</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1B1C1E] mb-1">Nombre Completo</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 border border-[#8C716D]/40 rounded-lg text-sm focus:border-[#8E1E19] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1B1C1E] mb-1">DNI / Documento</label>
              <input
                type="text"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                className="w-full px-3.5 py-2 border border-[#8C716D]/40 rounded-lg text-sm focus:border-[#8E1E19] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1B1C1E] mb-1">Correo Electrónico</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 border border-[#8C716D]/40 rounded-lg text-sm focus:border-[#8E1E19] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1B1C1E] mb-1">Teléfono</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 border border-[#8C716D]/40 rounded-lg text-sm focus:border-[#8E1E19] outline-none"
              />
            </div>
          </div>

          {user.role === 'propietario' ? (
            <div className="space-y-4 pt-2 border-t border-[#E0E3E7]">
              <h4 className="text-xs font-bold text-[#5B5F63] uppercase tracking-wider">
                Propiedad Asignada
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1B1C1E] mb-1">Complejo</label>
                  <input
                    type="text"
                    value={complex}
                    onChange={(e) => setComplex(e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#8C716D]/40 rounded-lg text-sm focus:border-[#8E1E19] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#1B1C1E] mb-1">Unidad</label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#8C716D]/40 rounded-lg text-sm focus:border-[#8E1E19] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#1B1C1E] mb-1">Cochera</label>
                  <input
                    type="text"
                    value={parking}
                    onChange={(e) => setParking(e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#8C716D]/40 rounded-lg text-sm focus:border-[#8E1E19] outline-none"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 pt-2 border-t border-[#E0E3E7]">
              <h4 className="text-xs font-bold text-[#5B5F63] uppercase tracking-wider">
                Perfil de Staff
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1B1C1E] mb-1">Cargo</label>
                  <select
                    value={staffRole}
                    onChange={(e) => setStaffRole(e.target.value as StaffRole)}
                    className="w-full px-3.5 py-2 border border-[#8C716D]/40 rounded-lg text-sm focus:border-[#8E1E19] outline-none bg-white"
                  >
                    <option value="Director de Obra">Director de Obra</option>
                    <option value="Arquitecto">Arquitecto</option>
                    <option value="Administración">Administración</option>
                    <option value="Ventas">Ventas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#1B1C1E] mb-1">Permisos</label>
                  <select
                    value={permissions}
                    onChange={(e) => setPermissions(e.target.value as StaffPermission)}
                    className="w-full px-3.5 py-2 border border-[#8C716D]/40 rounded-lg text-sm focus:border-[#8E1E19] outline-none bg-white"
                  >
                    <option value="admin">Edición Total</option>
                    <option value="fotos">Solo Carga de Fotos</option>
                    <option value="edicion">Edición Estándar</option>
                    <option value="lectura">Solo Lectura</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Token & Resend Actions */}
          <div className="p-4 bg-[#FAF9FB] rounded-lg border border-[#E0BFBB]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-[#8E1E19]" />
              <span className="text-xs text-[#5B5F63]">
                Código actual: <strong className="text-[#8E1E19] font-mono">{user.activationCode}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={() => onResendCode(user)}
              className="text-xs font-semibold text-[#8E1E19] hover:text-[#6D0205] flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#E0BFBB] bg-white hover:bg-[#FFDAD5]/30 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reenviar Código por Email</span>
            </button>
          </div>

          <div className="pt-4 border-t border-[#E0E3E7] flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-semibold text-[#5B5F63] hover:text-[#1B1C1E]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#8E1E19] hover:bg-[#6D0205] text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
