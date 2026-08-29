import React, { useState } from 'react';
import { User, Project } from '../../types';
import { 
  X, 
  MessageSquare, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  Building2, 
  UserCheck,
  Sparkles
} from 'lucide-react';

interface AdvisorContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  user: User;
}

export const AdvisorContactModal: React.FC<AdvisorContactModalProps> = ({
  isOpen,
  onClose,
  project,
  user
}) => {
  const advisorName = project.advisorName || 'Lic. Matías Valenzuela';
  const advisorPhone = project.advisorPhone || '+54 9 11 4920-3344';
  const advisorEmail = project.advisorEmail || 'asesores@tierrafirme.com';

  const defaultMessage = `Hola ${advisorName.split(' ')[0]}, soy ${user.name} (propietario en ${user.complex || 'Complejo Terrazas'}, ${user.unit || 'Unidad 4° B'}). Me interesa recibir asesoramiento comercial y la lista de precios / disponibilidad actualizada para el proyecto "${project.name}".`;

  const [customMessage, setCustomMessage] = useState(defaultMessage);
  const [selectedChannel, setSelectedChannel] = useState<'whatsapp' | 'call' | 'email'>('whatsapp');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSendWhatsApp = () => {
    const cleanPhone = advisorPhone.replace(/[^0-9]/g, '');
    const encodedText = encodeURIComponent(customMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
    
    // In iframe safe mode, open or simulate
    window.open(whatsappUrl, '_blank');
    setIsSent(true);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  const handleReset = () => {
    setIsSent(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E0E3E7] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#1B1C1E] text-white p-5 flex items-center justify-between border-b border-[#33363A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8E1E19] flex items-center justify-center text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#FFA095] uppercase tracking-wider block">
                Atención Comercial Personalizada
              </span>
              <h3 className="text-base font-bold text-white leading-tight">
                Consulta sobre {project.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {isSent ? (
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-[#1B1C1E]">
                  ¡Solicitud Enviada con Éxito!
                </h4>
                <p className="text-xs text-[#5B5F63] max-w-xs mx-auto">
                  Tu asesor asignado <strong>{advisorName}</strong> se contactará a la brevedad con información exclusiva para propietarios.
                </p>
              </div>
              <div className="bg-[#FAF9FB] p-3.5 rounded-xl border border-[#E0E3E7] text-left text-xs space-y-1 max-w-sm mx-auto">
                <div className="text-[10px] font-bold uppercase text-[#5B5F63]">Datos de tu consulta:</div>
                <div className="text-[#1B1C1E] font-semibold">Proyecto: {project.name}</div>
                <div className="text-[#5B5F63]">Contacto: {user.phone || '+54 9 11 4455-8899'} ({user.email})</div>
              </div>
              <button
                onClick={handleReset}
                className="w-full py-2.5 bg-[#8E1E19] hover:bg-[#6D0205] text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
              >
                Cerrar Ventana
              </button>
            </div>
          ) : (
            <>
              {/* Advisor Card */}
              <div className="bg-[#FAF9FB] rounded-xl p-4 border border-[#E0E3E7] flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#FFDAD5] text-[#8A1B17] font-extrabold flex items-center justify-center text-sm border-2 border-white shadow-xs">
                  {advisorName.split(' ')[0][0]}{advisorName.split(' ')[1]?.[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-sm text-[#1B1C1E] truncate">{advisorName}</h4>
                    <span className="px-2 py-0.5 bg-[#FFDAD5] text-[#8A1B17] text-[10px] font-bold rounded-full">
                      Asesor Asignado
                    </span>
                  </div>
                  <p className="text-xs text-[#5B5F63]">
                    Especialista en Desarrollos Tierra Firme®
                  </p>
                  <p className="text-[11px] font-mono text-[#8E1E19] mt-0.5">
                    {advisorPhone} • {advisorEmail}
                  </p>
                </div>
              </div>

              {/* VIP Owner Benefit notice */}
              <div className="bg-[#FFF4F2] border border-[#FFDAD5] rounded-xl p-3 flex items-center gap-2.5 text-xs text-[#8A1B17]">
                <Sparkles className="w-4 h-4 shrink-0 text-[#8E1E19]" />
                <span>
                  <strong>Beneficio Propietario:</strong> Acceso a lista de precios "Friends & Family" y condiciones preferenciales de preventa.
                </span>
              </div>

              {/* Channel Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1B1C1E] uppercase tracking-wider block">
                  Canal de Contacto Preferido
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedChannel('whatsapp')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      selectedChannel === 'whatsapp'
                        ? 'bg-[#25D366]/10 border-[#25D366] text-[#075E54] ring-2 ring-[#25D366]/20'
                        : 'bg-white border-[#E0E3E7] text-[#5B5F63] hover:bg-gray-50'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedChannel('call')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      selectedChannel === 'call'
                        ? 'bg-[#8E1E19]/10 border-[#8E1E19] text-[#8E1E19] ring-2 ring-[#8E1E19]/20'
                        : 'bg-white border-[#E0E3E7] text-[#5B5F63] hover:bg-gray-50'
                    }`}
                  >
                    <Phone className="w-4 h-4 text-[#8E1E19]" />
                    <span>Llamada</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedChannel('email')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      selectedChannel === 'email'
                        ? 'bg-[#1B1C1E]/10 border-[#1B1C1E] text-[#1B1C1E] ring-2 ring-black/10'
                        : 'bg-white border-[#E0E3E7] text-[#5B5F63] hover:bg-gray-50'
                    }`}
                  >
                    <Mail className="w-4 h-4 text-[#1B1C1E]" />
                    <span>Email</span>
                  </button>
                </div>
              </div>

              {/* Dynamic message editor */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-[#1B1C1E] uppercase tracking-wider">
                    Mensaje Personalizado
                  </label>
                  <span className="text-[10px] text-[#5B5F63]">Identificado como Propietario</span>
                </div>
                <textarea
                  rows={4}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#E0E3E7] bg-white text-[#1B1C1E] focus:outline-none focus:ring-2 focus:ring-[#8E1E19] focus:border-transparent leading-relaxed"
                />
              </div>

              {/* Action Button based on Channel */}
              <div className="pt-2">
                {selectedChannel === 'whatsapp' && (
                  <button
                    onClick={handleSendWhatsApp}
                    className="w-full py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Iniciar Chat de WhatsApp con {advisorName.split(' ')[0]}</span>
                  </button>
                )}

                {selectedChannel === 'call' && (
                  <a
                    href={`tel:${advisorPhone.replace(/[^0-9+]/g, '')}`}
                    onClick={() => setIsSent(true)}
                    className="w-full py-3 bg-[#8E1E19] hover:bg-[#6D0205] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] block text-center"
                  >
                    <Phone className="w-4 h-4 inline" />
                    <span>Llamar al {advisorPhone}</span>
                  </a>
                )}

                {selectedChannel === 'email' && (
                  <button
                    onClick={handleSendEmail}
                    className="w-full py-3 bg-[#1B1C1E] hover:bg-black text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Correo a {advisorEmail}</span>
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
