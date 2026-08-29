import React, { useState } from 'react';
import { User } from '../types';
import { BrandLogo } from './BrandLogo';
import { Mail, CheckCircle2, Key, ArrowRight, ExternalLink, ShieldCheck, Copy, Clock, Search } from 'lucide-react';

interface EmailInboxViewProps {
  users: User[];
  onSelectUserToActivate: (code: string) => void;
}

export const EmailInboxView: React.FC<EmailInboxViewProps> = ({
  users,
  onSelectUserToActivate
}) => {
  const [selectedUserId, setSelectedUserId] = useState<string>(users[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredUsers = users.filter((u) => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.activationCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedUser = users.find((u) => u.id === selectedUserId) || users[0];

  const copyToken = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1B1C1E]">
          Bandeja de Disparo de Correos Electrónicos
        </h1>
        <p className="text-xs text-[#5B5F63] mt-0.5">
          Simulación de los correos automáticos enviados con plantillas oficiales y códigos de acceso.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column: List of dispatched emails */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E0E3E7] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#E0E3E7] space-y-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar destinatario..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF9FB] border border-[#E0E3E7] rounded-lg outline-none focus:border-[#8E1E19]"
              />
            </div>
            <div className="text-[11px] font-bold text-[#5B5F63] uppercase tracking-wider">
              Bandeja de Salida ({filteredUsers.length})
            </div>
          </div>

          <div className="divide-y divide-[#E0E3E7] max-h-[600px] overflow-y-auto">
            {filteredUsers.map((u) => {
              const isSelected = u.id === selectedUserId;
              const isOwner = u.role === 'propietario';
              return (
                <div
                  key={u.id}
                  onClick={() => setSelectedUserId(u.id)}
                  className={`p-4 cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#FFDAD5]/30 border-l-4 border-l-[#8E1E19]' : 'hover:bg-[#FAF9FB]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#1B1C1E] truncate">{u.name}</span>
                    <span className="text-[10px] text-[#5B5F63]">{u.createdAt}</span>
                  </div>
                  <div className="text-[11px] text-[#8E1E19] font-medium mt-0.5 truncate">
                    {isOwner
                      ? 'Bienvenido a Tierra Firme - Acceso a tu dpto'
                      : 'Tierra Firme - Acceso al Panel de Gestión'}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    <span className={`px-2 py-0.5 rounded font-mono font-bold ${
                      isOwner ? 'bg-[#FFDAD5] text-[#8A1B17]' : 'bg-[#E0E3E7] text-[#1B1C1E]'
                    }`}>
                      {u.activationCode}
                    </span>
                    <span className="text-[#005613] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Enviado
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: Interactive email preview */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E0E3E7] shadow-md overflow-hidden flex flex-col">
          {/* Email meta header */}
          <div className="bg-[#FAF9FB] p-6 border-b border-[#E0E3E7] space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#1B1C1E]">
                {selectedUser?.role === 'propietario'
                  ? 'Bienvenido a Tierra Firme - Acceso al seguimiento de tu departamento'
                  : 'Tierra Firme - Acceso autorizado al Panel de Gestión'}
              </span>
              <span className="text-[11px] text-[#5B5F63] flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3" /> {selectedUser?.createdAt}
              </span>
            </div>
            <div className="text-[#5B5F63] space-y-1">
              <div>
                <strong className="text-[#1B1C1E]">De:</strong> notificaciones@tierrafirme.com &lt;Tierra Firme Desarrollos&gt;
              </div>
              <div>
                <strong className="text-[#1B1C1E]">Para:</strong> {selectedUser?.name} &lt;{selectedUser?.email}&gt;
              </div>
            </div>
          </div>

          {/* Email body preview */}
          {selectedUser && (
            <div className="p-8 space-y-6">
              <div className="flex justify-center pb-4 border-b border-gray-100">
                <BrandLogo size="md" />
              </div>

              {selectedUser.role === 'propietario' ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 bg-[#FFDAD5] text-[#8A1B17] text-xs font-semibold rounded-full mb-3">
                      Portal Exclusivo de Propietarios
                    </span>
                    <h3 className="text-2xl font-bold text-[#1B1C1E]">
                      ¡Hola {selectedUser.name}, bienvenido a tu próximo hogar!
                    </h3>
                    <p className="text-xs text-[#5B5F63] mt-2 max-w-lg mx-auto leading-relaxed">
                      Nos complace darte la bienvenida a <strong>Tierra Firme Desarrollos</strong>. A partir de ahora podrás realizar el seguimiento en tiempo real de tu unidad, planos, bitácora de obra y cuotas.
                    </p>
                  </div>

                  <div className="bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl p-5 space-y-3">
                    <div className="text-xs uppercase tracking-wider font-semibold text-[#8E1E19]">
                      Detalles de tu Propiedad Asignada
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-[#5B5F63] block">Complejo</span>
                        <span className="font-bold text-[#1B1C1E]">{selectedUser.complex || 'Complejo Terrazas'}</span>
                      </div>
                      <div>
                        <span className="text-[#5B5F63] block">Unidad</span>
                        <span className="font-bold text-[#1B1C1E]">{selectedUser.unit || 'Unidad 4° B'}</span>
                      </div>
                      <div>
                        <span className="text-[#5B5F63] block">Cochera</span>
                        <span className="font-bold text-[#1B1C1E]">{selectedUser.parking || 'Asignada'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Token Box */}
                  <div className="bg-gradient-to-br from-[#FAF9FB] to-[#FFDAD5]/30 border-2 border-dashed border-[#8E1E19]/40 rounded-xl p-6 text-center space-y-3">
                    <div className="text-xs uppercase tracking-wider font-bold text-[#8E1E19] flex items-center justify-center gap-1.5">
                      <Key className="w-4 h-4" /> Tu Código de Activación Único
                    </div>
                    <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-lg border border-[#E0BFBB] shadow-sm">
                      <span className="text-3xl font-extrabold tracking-widest text-[#8E1E19] font-mono">
                        {selectedUser.activationCode}
                      </span>
                      <button
                        onClick={() => copyToken(selectedUser.activationCode)}
                        className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-900"
                        title="Copiar código"
                      >
                        {copiedCode === selectedUser.activationCode ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-[#5B5F63]">
                      Código válido por 72 horas para definir tu contraseña personal.
                    </p>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      onClick={() => onSelectUserToActivate(selectedUser.activationCode)}
                      className="px-8 py-3.5 bg-[#8E1E19] hover:bg-[#6D0205] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2 text-sm"
                    >
                      <span>Activar Mi Cuenta con este Código</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 bg-[#E0E3E7] text-[#1B1C1E] text-xs font-semibold rounded-full mb-3">
                      Acceso Staff & Gestión
                    </span>
                    <h3 className="text-2xl font-bold text-[#1B1C1E]">
                      Acceso Autorizado al Panel de Gestión
                    </h3>
                    <p className="text-xs text-[#5B5F63] mt-2 max-w-lg mx-auto">
                      Has sido registrado como miembro del equipo interno de <strong>Tierra Firme Desarrollos</strong> con perfil autorizado.
                    </p>
                  </div>

                  <div className="bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl p-5 space-y-3 text-xs">
                    <div className="text-xs uppercase tracking-wider font-semibold text-[#8E1E19]">
                      Cargo y Nivel de Autorización
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[#5B5F63] block">Cargo</span>
                        <span className="font-bold text-[#1B1C1E]">{selectedUser.staffRole || 'Director de Obra'}</span>
                      </div>
                      <div>
                        <span className="text-[#5B5F63] block">Permisos</span>
                        <span className="font-bold text-[#1B1C1E]">
                          {selectedUser.permissions === 'admin' ? 'Edición Total' : 'Carga de Fotos y Avances'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl p-6 text-center space-y-3">
                    <div className="text-xs uppercase tracking-wider font-bold text-[#5B5F63] flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#8E1E19]" /> Token de Acceso Staff
                    </div>
                    <div className="inline-flex items-center gap-3 bg-white px-6 py-2.5 rounded-lg border border-[#E0E3E7]">
                      <span className="text-2xl font-bold tracking-widest text-[#1B1C1E] font-mono">
                        {selectedUser.activationCode}
                      </span>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      onClick={() => onSelectUserToActivate(selectedUser.activationCode)}
                      className="px-8 py-3.5 bg-[#1B1C1E] hover:bg-black text-white font-semibold rounded-lg shadow-md inline-flex items-center justify-center gap-2 text-sm"
                    >
                      <span>Ingresar al Backend</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-gray-100 text-center text-[11px] text-[#5B5F63]">
                © {new Date().getFullYear()} Tierra Firme Desarrollos Sólidos • Correo generado por el motor de notificaciones
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
