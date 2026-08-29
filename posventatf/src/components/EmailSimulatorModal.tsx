import React from 'react';
import { User } from '../types';
import { BrandLogo } from './BrandLogo';
import { Mail, CheckCircle2, ArrowRight, Key, ShieldCheck, Copy, ExternalLink, X } from 'lucide-react';

interface EmailSimulatorModalProps {
  user: User | null;
  onClose: () => void;
  onNavigateToActivation?: (code: string) => void;
}

export const EmailSimulatorModal: React.FC<EmailSimulatorModalProps> = ({
  user,
  onClose,
  onNavigateToActivation
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!user) return null;

  const isOwner = user.role === 'propietario';
  const emailSubject = isOwner
    ? 'Bienvenido a Tierra Firme - Acceso al seguimiento de tu departamento'
    : 'Tierra Firme - Acceso autorizado al Panel de Gestión';

  const copyCode = () => {
    navigator.clipboard.writeText(user.activationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#E0BFBB]/40 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Email Client Header Bar */}
        <div className="bg-[#1B1C1E] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#8E1E19] flex items-center justify-center text-white">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-gray-400 font-mono">Disparo Automático de Email (Simulación)</div>
              <div className="text-sm font-medium text-white truncate max-w-md">
                {emailSubject}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email Metadata Details */}
        <div className="bg-[#FAF9FB] px-6 py-3 border-b border-[#E0E3E7] text-xs text-[#5B5F63] flex flex-wrap items-center justify-between gap-2">
          <div className="space-y-0.5">
            <div>
              <span className="font-semibold text-[#1B1C1E]">De:</span> Tierra Firme Notificaciones &lt;no-reply@tierrafirme.com&gt;
            </div>
            <div>
              <span className="font-semibold text-[#1B1C1E]">Para:</span> {user.name} &lt;{user.email}&gt;
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E0E3E7] text-[#1B1C1E] text-[11px] font-mono">
              <CheckCircle2 className="w-3 h-3 text-[#005613]" /> Enviado con éxito
            </span>
          </div>
        </div>

        {/* Branded Email Content Body */}
        <div className="p-8 overflow-y-auto bg-white flex-1 space-y-6">
          {/* Logo Header */}
          <div className="flex justify-center pb-4 border-b border-gray-100">
            <BrandLogo size="md" />
          </div>

          {/* Email Content for Owner vs Staff */}
          {isOwner ? (
            <div className="space-y-6">
              <div className="text-center">
                <span className="inline-block px-3 py-1 bg-[#FFDAD5] text-[#8A1B17] text-xs font-semibold rounded-full mb-3">
                  Portal Exclusivo de Propietarios
                </span>
                <h3 className="text-2xl font-bold text-[#1B1C1E]">
                  ¡Hola {user.name}, bienvenido a tu próximo hogar!
                </h3>
                <p className="text-sm text-[#5B5F63] mt-2 max-w-lg mx-auto">
                  Nos complace darte la bienvenida a <strong>Tierra Firme Desarrollos</strong>. A partir de ahora podrás realizar el seguimiento en tiempo real de tu unidad, ver planos, bitácora de obra, fotos actualizadas y estado de cuenta.
                </p>
              </div>

              {/* Property Summary Card inside Email */}
              <div className="bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl p-5 space-y-3">
                <div className="text-xs uppercase tracking-wider font-semibold text-[#8E1E19]">
                  Detalles de tu Propiedad Asignada
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-xs text-[#5B5F63] block">Complejo / Edificio</span>
                    <span className="font-semibold text-[#1B1C1E]">{user.complex || 'Complejo Terrazas'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#5B5F63] block">Unidad Asignada</span>
                    <span className="font-semibold text-[#1B1C1E]">{user.unit || 'Unidad 4° B'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#5B5F63] block">Cochera</span>
                    <span className="font-semibold text-[#1B1C1E]">{user.parking || 'Asignada'}</span>
                  </div>
                </div>
              </div>

              {/* Activation Code Box */}
              <div className="bg-gradient-to-br from-[#FAF9FB] to-[#FFDAD5]/30 border-2 border-dashed border-[#8E1E19]/40 rounded-xl p-6 text-center space-y-3">
                <div className="text-xs uppercase tracking-wider font-bold text-[#8E1E19] flex items-center justify-center gap-1.5">
                  <Key className="w-4 h-4" /> Tu Código de Activación Único
                </div>
                <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-lg border border-[#E0BFBB] shadow-sm">
                  <span className="text-3xl font-extrabold tracking-widest text-[#8E1E19] font-mono">
                    {user.activationCode}
                  </span>
                  <button
                    onClick={copyCode}
                    className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-900 transition-colors"
                    title="Copiar código"
                  >
                    {copied ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-[#5B5F63]">
                  Este código temporal verifica tu identidad y te permite definir tu contraseña privada.
                </p>
              </div>

              {/* Call to action button */}
              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToActivation?.(user.activationCode);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#8E1E19] hover:bg-[#6D0205] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
                >
                  <span>Activar Mi Cuenta y Crear Contraseña</span>
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
                <p className="text-sm text-[#5B5F63] mt-2 max-w-lg mx-auto">
                  Has sido registrado como miembro del equipo interno de <strong>Tierra Firme Desarrollos</strong> con perfil autorizado.
                </p>
              </div>

              {/* Staff Details Card */}
              <div className="bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl p-5 space-y-3">
                <div className="text-xs uppercase tracking-wider font-semibold text-[#8E1E19]">
                  Credenciales y Nivel de Autorización
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-xs text-[#5B5F63] block">Cargo Institucional</span>
                    <span className="font-semibold text-[#1B1C1E]">{user.staffRole || 'Director de Obra'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#5B5F63] block">Nivel de Permisos</span>
                    <span className="font-semibold text-[#1B1C1E]">
                      {user.permissions === 'admin' ? 'Edición Total & Control' : 'Carga de Fotos y Avances'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Staff Activation Code */}
              <div className="bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl p-6 text-center space-y-3">
                <div className="text-xs uppercase tracking-wider font-bold text-[#5B5F63] flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#8E1E19]" /> Token Único de Acceso Staff
                </div>
                <div className="inline-flex items-center gap-3 bg-white px-6 py-2.5 rounded-lg border border-[#E0E3E7] shadow-sm">
                  <span className="text-2xl font-bold tracking-widest text-[#1B1C1E] font-mono">
                    {user.activationCode}
                  </span>
                  <button
                    onClick={copyCode}
                    className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToActivation?.(user.activationCode);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#1B1C1E] hover:bg-black text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
                >
                  <span>Ingresar al Backend / Panel Admin</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Email Footer Note */}
          <div className="pt-6 border-t border-gray-100 text-center text-xs text-[#5B5F63] space-y-1">
            <p>© {new Date().getFullYear()} Tierra Firme Desarrollos Sólidos. Todos los derechos reservados.</p>
            <p>Av. del Libertador 1234, CABA • contacto@tierrafirme.com • +54 11 4000-0000</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAF9FB] px-6 py-3 border-t border-[#E0E3E7] flex justify-between items-center text-xs text-[#5B5F63]">
          <span>Plantilla responsive certificada con branding institucional</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-[#E0E3E7] hover:bg-gray-50 rounded text-[#1B1C1E] font-medium"
          >
            Cerrar Visor
          </button>
        </div>
      </div>
    </div>
  );
};
