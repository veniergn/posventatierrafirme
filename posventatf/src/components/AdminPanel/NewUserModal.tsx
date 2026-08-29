import React, { useState } from 'react';
import { User, UserRole, StaffRole, StaffPermission } from '../../types';
import { Key, BadgeCheck, X, Sparkles, Send } from 'lucide-react';

interface NewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
}

export const NewUserModal: React.FC<NewUserModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [role, setRole] = useState<UserRole>('propietario');
  const [name, setName] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Propietario conditional fields
  const [complex, setComplex] = useState('Complejo Terrazas');
  const [unit, setUnit] = useState('Unidad 4° B');
  const [parking, setParking] = useState('Cochera N° 12');
  const [storage, setStorage] = useState('Baulera B-04');

  // Staff conditional fields
  const [staffRole, setStaffRole] = useState<StaffRole>('Director de Obra');
  const [permissions, setPermissions] = useState<StaffPermission>('admin');

  if (!isOpen) return null;

  const generateToken = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `TF-${randomNum}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const activationCode = generateToken();
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      dni: dni.trim() || '30.000.000',
      email: email.trim(),
      phone: phone.trim() || '+54 9 11 0000-0000',
      role,
      activationCode,
      status: 'pendiente',
      createdAt: new Date().toISOString().split('T')[0],
      ...(role === 'propietario'
        ? {
            complex,
            unit,
            parking: parking || 'Ninguna',
            storage: storage || 'Ninguna',
            balance: '$ 450,000.00',
            nextPaymentDate: '15 Nov'
          }
        : {
            staffRole,
            permissions
          })
    };

    onSave(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1B1C1E]/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="bg-[#FFFFFF] w-full max-w-3xl rounded-xl shadow-[0px_4px_25px_rgba(30,31,33,0.12)] overflow-hidden flex flex-col max-h-[92vh] border border-[#E0BFBB]/30">
        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-[#E0E3E7] flex justify-between items-center bg-white">
          <div>
            <h2 className="text-2xl font-bold text-[#1B1C1E] tracking-tight">Nuevo Usuario</h2>
            <p className="text-sm text-[#5B5F63] mt-1">
              Ingresa los datos para registrar y generar acceso.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#5B5F63] hover:text-[#1B1C1E] transition-colors p-2 rounded-full hover:bg-[#F4F3F5]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 overflow-y-auto bg-white">
          <form id="newUserForm" onSubmit={handleSubmit} className="space-y-6">
            {/* Section: Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-[#1B1C1E] mb-2">
                Tipo de Perfil
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Propietario Option */}
                <div
                  onClick={() => setRole('propietario')}
                  className={`cursor-pointer w-full border rounded-lg p-4 transition-all flex items-center justify-between ${
                    role === 'propietario'
                      ? 'border-[#8E1E19] bg-[#FFDAD5]/30 text-[#8A1B17]'
                      : 'border-[#E0BFBB] hover:bg-[#F4F3F5] text-[#1B1C1E]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Key className={`w-5 h-5 ${role === 'propietario' ? 'text-[#8E1E19]' : 'text-[#5B5F63]'}`} />
                    <div>
                      <span className="block text-sm font-bold">Propietario / Cliente</span>
                      <span className="block text-xs text-[#5B5F63] font-normal mt-0.5">
                        Asignación de unidades (Hermético)
                      </span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    role === 'propietario' ? 'border-[#8E1E19] bg-[#8E1E19] text-white' : 'border-gray-300'
                  }`}>
                    {role === 'propietario' && <span className="text-xs">✓</span>}
                  </div>
                </div>

                {/* Staff Option */}
                <div
                  onClick={() => setRole('staff')}
                  className={`cursor-pointer w-full border rounded-lg p-4 transition-all flex items-center justify-between ${
                    role === 'staff'
                      ? 'border-[#8E1E19] bg-[#FFDAD5]/30 text-[#8A1B17]'
                      : 'border-[#E0BFBB] hover:bg-[#F4F3F5] text-[#1B1C1E]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <BadgeCheck className={`w-5 h-5 ${role === 'staff' ? 'text-[#8E1E19]' : 'text-[#5B5F63]'}`} />
                    <div>
                      <span className="block text-sm font-bold">Personal de Empresa / Staff</span>
                      <span className="block text-xs text-[#5B5F63] font-normal mt-0.5">
                        Gestión y administración backend
                      </span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    role === 'staff' ? 'border-[#8E1E19] bg-[#8E1E19] text-white' : 'border-gray-300'
                  }`}>
                    {role === 'staff' && <span className="text-xs">✓</span>}
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-[#E0E3E7]" />

            {/* Section: Basic Information */}
            <div>
              <h3 className="text-xs font-bold text-[#5B5F63] mb-4 uppercase tracking-wider">
                Información Básica
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1B1C1E] mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    className="w-full px-4 py-2.5 border border-[#8C716D]/40 rounded-lg text-sm focus:border-[#8E1E19] focus:ring-2 focus:ring-[#8E1E19]/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1B1C1E] mb-1">
                    DNI / CUIT / Documento
                  </label>
                  <input
                    type="text"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    placeholder="Ej. 34.892.104"
                    className="w-full px-4 py-2.5 border border-[#8C716D]/40 rounded-lg text-sm focus:border-[#8E1E19] focus:ring-2 focus:ring-[#8E1E19]/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1B1C1E] mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                    className="w-full px-4 py-2.5 border border-[#8C716D]/40 rounded-lg text-sm focus:border-[#8E1E19] focus:ring-2 focus:ring-[#8E1E19]/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1B1C1E] mb-1">
                    Teléfono de Contacto
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+54 9 11 0000-0000"
                    className="w-full px-4 py-2.5 border border-[#8C716D]/40 rounded-lg text-sm focus:border-[#8E1E19] focus:ring-2 focus:ring-[#8E1E19]/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <hr className="border-[#E0E3E7]" />

            {/* CONDITIONAL SECTION: Propietario */}
            {role === 'propietario' ? (
              <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                <h3 className="text-xs font-bold text-[#5B5F63] mb-4 uppercase tracking-wider flex items-center gap-1.5">
                  <span>Asignación de Propiedad</span>
                  <span className="text-[10px] lowercase text-[#8E1E19] bg-[#FFDAD5] px-2 py-0.5 rounded-full font-normal">
                    acceso exclusivo a esta unidad
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1B1C1E] mb-1">
                      Complejo / Edificio
                    </label>
                    <select
                      value={complex}
                      onChange={(e) => setComplex(e.target.value)}
                      className="w-full px-4 py-2.5 border border-[#8C716D]/40 rounded-lg text-sm focus:border-[#8E1E19] focus:ring-2 focus:ring-[#8E1E19]/20 outline-none bg-white"
                    >
                      <option value="Complejo Terrazas">Complejo Terrazas</option>
                      <option value="Torre A - Norte">Torre A - Norte</option>
                      <option value="Proyecto Vista Real">Proyecto Vista Real</option>
                      <option value="Altura Residences">Altura Residences</option>
                      <option value="Madero Boutique">Madero Boutique</option>
                      <option value="Distrito Palermo">Distrito Palermo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1B1C1E] mb-1">
                      Unidad / Dpto Asignado
                    </label>
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-full px-4 py-2.5 border border-[#8C716D]/40 rounded-lg text-sm focus:border-[#8E1E19] focus:ring-2 focus:ring-[#8E1E19]/20 outline-none bg-white"
                    >
                      <option value="Unidad 4° B">Unidad 4° B</option>
                      <option value="Torre A - 401">Torre A - 401</option>
                      <option value="Unidad 402 - Torre B">Unidad 402 - Torre B</option>
                      <option value="Villa 12">Villa 12</option>
                      <option value="Piso 8 A (Penthouse)">Piso 8 A (Penthouse)</option>
                      <option value="Depto 204">Depto 204</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1B1C1E] mb-1">
                      Cochera / Baulera (Opcional)
                    </label>
                    <select
                      value={parking}
                      onChange={(e) => setParking(e.target.value)}
                      className="w-full px-4 py-2.5 border border-[#8C716D]/40 rounded-lg text-sm focus:border-[#8E1E19] focus:ring-2 focus:ring-[#8E1E19]/20 outline-none bg-white"
                    >
                      <option value="Ninguna">Ninguna</option>
                      <option value="Cochera N° 12 (Nivel 1)">Cochera N° 12 (Nivel 1)</option>
                      <option value="Nivel 1 - C12">Nivel 1 - C12</option>
                      <option value="Nivel 2 - C45">Nivel 2 - C45</option>
                      <option value="Cochera Doble N° 08">Cochera Doble N° 08</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              /* CONDITIONAL SECTION: Staff */
              <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                <h3 className="text-xs font-bold text-[#5B5F63] mb-4 uppercase tracking-wider flex items-center gap-1.5">
                  <span>Perfil Interno & Permisos</span>
                  <span className="text-[10px] lowercase text-[#1B1C1E] bg-[#E0E3E7] px-2 py-0.5 rounded-full font-normal">
                    personal de empresa
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1B1C1E] mb-1">
                      Selector de Cargo
                    </label>
                    <select
                      value={staffRole}
                      onChange={(e) => setStaffRole(e.target.value as StaffRole)}
                      className="w-full px-4 py-2.5 border border-[#8C716D]/40 rounded-lg text-sm focus:border-[#8E1E19] focus:ring-2 focus:ring-[#8E1E19]/20 outline-none bg-white"
                    >
                      <option value="Director de Obra">Director de Obra</option>
                      <option value="Arquitecto">Arquitecto / Arquitectura & Obra</option>
                      <option value="Administración">Administración General</option>
                      <option value="Ventas">Ventas & Comercial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1B1C1E] mb-1">
                      Nivel de Permisos
                    </label>
                    <select
                      value={permissions}
                      onChange={(e) => setPermissions(e.target.value as StaffPermission)}
                      className="w-full px-4 py-2.5 border border-[#8C716D]/40 rounded-lg text-sm focus:border-[#8E1E19] focus:ring-2 focus:ring-[#8E1E19]/20 outline-none bg-white"
                    >
                      <option value="admin">Edición Total (Control Completo de Usuarios, Textos y Obras)</option>
                      <option value="fotos">Solo Carga de Fotos y Avances de Obra</option>
                      <option value="edicion">Edición Estándar</option>
                      <option value="lectura">Solo Lectura</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Token Generation Banner Notice */}
            <div className="bg-[#FAF9FB] border border-[#E0BFBB]/50 rounded-lg p-4 flex items-center justify-between gap-3 text-xs text-[#5B5F63]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8E1E19] shrink-0" />
                <span>
                  Al guardar, se generará automáticamente un <strong>Token / Código de Activación temporal (ej. TF-XXXX)</strong> y se disparará el correo de bienvenida.
                </span>
              </div>
            </div>

            {/* Modal Footer Buttons */}
            <div className="pt-4 border-t border-[#E0E3E7] flex justify-end items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-semibold text-[#5B5F63] hover:text-[#1B1C1E] transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#8E1E19] hover:bg-[#6D0205] text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Guardar y Generar Código</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
