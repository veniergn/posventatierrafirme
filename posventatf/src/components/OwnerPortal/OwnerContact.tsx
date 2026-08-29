import React, { useState } from 'react';
import { User, Project, ContactItem } from '../../types';
import { 
  UserCheck, 
  Phone, 
  Mail, 
  MessageSquare, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  PhoneCall
} from 'lucide-react';
import { BrandLogo } from '../BrandLogo';

interface OwnerContactProps {
  user: User | null;
  projects: Project[];
  contacts: ContactItem[];
}

export const OwnerContact: React.FC<OwnerContactProps> = ({ user, projects, contacts = [] }) => {
  const [ticketSubject, setTicketSubject] = useState('Consulta Técnica de Obra');
  const [ticketMessage, setTicketMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketMessage.trim()) return;
    setIsSent(true);
  };

  const tfContacts = contacts.filter(c => c.category === 'Tierra Firme');
  const fownContacts = contacts.filter(c => c.category === 'FOWN Propiedades');

  const getActionHref = (contact: ContactItem) => {
    const cleanPhone = contact.phone.replace(/[^0-9]/g, '');
    switch (contact.preferredChannel) {
      case 'whatsapp': return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=Hola,%20me%20comunico%20desde%20el%20portal%20Tierra%20Firme.`;
      case 'email': return `mailto:${contact.email}`;
      case 'call': return `tel:+${cleanPhone}`;
      default: return `tel:+${cleanPhone}`;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'whatsapp': return <MessageSquare className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'call': return <PhoneCall className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getChannelLabel = (channel: string) => {
    switch (channel) {
      case 'whatsapp': return 'Enviar Mensaje';
      case 'email': return 'Enviar Correo';
      case 'call': return 'Llamar Ahora';
      default: return 'Contactar';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#E0E3E7] shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-[#8E1E19] flex items-center gap-1.5">
          <UserCheck className="w-4 h-4" /> Centro de Atención
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B1C1E] tracking-tight mt-0.5">
          Canales de Contacto
        </h1>
        <p className="text-xs text-[#5B5F63] mt-1">
          Estamos a tu disposición para consultas técnicas, administrativas y asesoramiento comercial.
        </p>
      </div>

      {/* Two Column Layout for Contacts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Column 1: Tierra Firme */}
        <div className="bg-white rounded-2xl border border-[#E0E3E7] shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-[#E0E3E7] flex justify-center bg-gray-50/50">
            <BrandLogo variant="horizontal" size="md" />
          </div>
          <div className="p-6 space-y-4 flex-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1B1C1E] mb-4">Post-Venta & Administración</h2>
            <div className="space-y-4">
              {tfContacts.map((contact) => (
                <div key={contact.id} className="p-4 rounded-xl border border-[#E0E3E7] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-sm text-[#1B1C1E]">{contact.name}</h3>
                    <p className="text-xs text-[#5B5F63] font-medium">{contact.role}</p>
                    <div className="mt-2 text-xs text-[#1B1C1E] font-semibold">{contact.phone}</div>
                    {contact.email && <div className="text-xs text-[#5B5F63]">{contact.email}</div>}
                  </div>
                  <a
                    href={getActionHref(contact)}
                    target={contact.preferredChannel === 'whatsapp' ? '_blank' : '_self'}
                    rel="noreferrer"
                    className="shrink-0 py-2 px-4 bg-[#8E1E19] text-white hover:bg-[#6D0205] font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    {getChannelIcon(contact.preferredChannel)}
                    <span>{getChannelLabel(contact.preferredChannel)}</span>
                  </a>
                </div>
              ))}
              {tfContacts.length === 0 && (
                <p className="text-xs text-gray-500 text-center py-4">No hay contactos configurados.</p>
              )}
            </div>
          </div>
        </div>

        {/* Column 2: FOWN Propiedades */}
        <div className="bg-[#094262] rounded-2xl border border-[#094262] shadow-sm overflow-hidden flex flex-col relative">
          {/* Subtle background glow/pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FC94C1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          
          <div className="p-6 border-b border-white/10 flex justify-center relative z-10">
            <img src="/fown-logo.jpg" alt="FOWN Propiedades" className="h-12 object-contain rounded-md" />
          </div>
          <div className="p-6 space-y-4 flex-1 relative z-10">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#FC94C1] mb-4">Asesoría Comercial & Ventas</h2>
            <div className="space-y-4">
              {fownContacts.map((contact) => (
                <div key={contact.id} className="p-4 rounded-xl border border-white/10 bg-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-sm">
                  <div>
                    <h3 className="font-bold text-sm text-white">{contact.name}</h3>
                    <p className="text-xs text-[#FC94C1]/80 font-medium">{contact.role}</p>
                    <div className="mt-2 text-xs text-white font-semibold">{contact.phone}</div>
                    {contact.email && <div className="text-xs text-gray-300">{contact.email}</div>}
                  </div>
                  <a
                    href={getActionHref(contact)}
                    target={contact.preferredChannel === 'whatsapp' ? '_blank' : '_self'}
                    rel="noreferrer"
                    className="shrink-0 py-2 px-4 bg-[#FC94C1] text-[#094262] hover:bg-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    {getChannelIcon(contact.preferredChannel)}
                    <span>{getChannelLabel(contact.preferredChannel)}</span>
                  </a>
                </div>
              ))}
              {fownContacts.length === 0 && (
                <p className="text-xs text-white/50 text-center py-4">No hay contactos comerciales configurados.</p>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Support Ticket Submission Form - Only for logged in owners */}
      {user && (
        <div className="bg-white rounded-2xl p-6 border border-[#E0E3E7] shadow-xs space-y-4 mt-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#1B1C1E]">
            Enviar Consulta Formal al Equipo
          </h3>

          {isSent ? (
            <div className="text-center py-6 space-y-2 animate-in fade-in zoom-in">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-[#1B1C1E]">¡Consulta Registrada!</h4>
              <p className="text-xs text-[#5B5F63] max-w-sm mx-auto">
                Tu ticket ha sido derivado al área correspondiente. Recibirás respuesta en <strong>{user.email}</strong> en un plazo máximo de 24 horas hábiles.
              </p>
              <button
                onClick={() => {
                  setIsSent(false);
                  setTicketMessage('');
                }}
                className="mt-2 text-xs font-bold text-[#8E1E19] underline"
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#1B1C1E] block mb-1">
                    Motivo de la Consulta
                  </label>
                  <select
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs text-[#1B1C1E] focus:outline-none focus:ring-2 focus:ring-[#8E1E19]"
                  >
                    <option value="Consulta Técnica de Obra">Consulta Técnica de Obra</option>
                    <option value="Solicitud de Visita Presencial">Solicitud de Visita Presencial a Obra</option>
                    <option value="Estado de Cuenta / Cuotas">Estado de Cuenta / Comprobante de Cuota</option>
                    <option value="Consulta Comercial Nuevos Proyectos">Consulta Comercial sobre Nuevos Proyectos</option>
                    <option value="Otro Asunto">Otro Asunto</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1B1C1E] block mb-1">
                    Propietario Identificado
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={`${user.name} (${user.unit || 'Unidad'})`}
                    className="w-full p-2.5 bg-gray-100 border border-[#E0E3E7] rounded-xl text-xs text-gray-600 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#1B1C1E] block mb-1">
                  Detalle del Mensaje
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Escribe aquí tu consulta en detalle..."
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  className="w-full p-3 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs text-[#1B1C1E] focus:outline-none focus:ring-2 focus:ring-[#8E1E19] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="py-3 px-6 bg-[#8E1E19] hover:bg-[#6D0205] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Consulta al Equipo Técnico</span>
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
