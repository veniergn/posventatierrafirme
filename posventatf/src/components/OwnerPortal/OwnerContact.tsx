import React, { useState } from 'react';
import { User, Project } from '../../types';
import { 
  UserCheck, 
  Phone, 
  Mail, 
  MessageSquare, 
  Building2, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#E0E3E7] shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-[#8E1E19] flex items-center gap-1.5">
          <UserCheck className="w-4 h-4" /> Centro de Atención
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B1C1E] tracking-tight mt-0.5">
          Canales de Contacto Directo
        </h1>
        <p className="text-xs text-[#5B5F63] mt-1">
          Estamos a tu disposición para consultas de avance de obra, administración de cuotas y asesoramiento comercial.
        </p>
      </div>

      {/* Directory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Post-Venta / Obra */}
        <div className="bg-white rounded-2xl p-5 border border-[#E0E3E7] shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#8E1E19] text-white flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#1B1C1E]">
              Dirección de Obra & Postventa
            </h3>
            <p className="text-xs text-[#5B5F63]">
              Consultas sobre especificaciones, visitas presenciales y avances constructivos.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#E0E3E7]">
            <a
              href="https://api.whatsapp.com/send?phone=5491149203344&text=Hola,%20quisiera%20coordinar%20una%20visita%20de%20obra."
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-3 bg-[#25D366]/10 text-[#075E54] hover:bg-[#25D366] hover:text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Obra</span>
            </a>
            <a
              href="mailto:obra@tierrafirme.com"
              className="w-full py-2 px-3 bg-[#FAF9FB] text-[#5B5F63] hover:bg-gray-100 font-bold text-xs rounded-xl flex items-center justify-center gap-2 border border-[#E0E3E7] transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>obra@tierrafirme.com</span>
            </a>
          </div>
        </div>

        {/* Administración & Cobranzas */}
        <div className="bg-white rounded-2xl p-5 border border-[#E0E3E7] shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#1B1C1E] text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#1B1C1E]">
              Administración & Finanzas
            </h3>
            <p className="text-xs text-[#5B5F63]">
              Estado de cuenta, comprobantes de pago de cuotas y facturación.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#E0E3E7]">
            <a
              href="https://api.whatsapp.com/send?phone=5491149203344&text=Hola,%20consulto%20por%20mi%20estado%20de%20cuenta."
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-3 bg-[#25D366]/10 text-[#075E54] hover:bg-[#25D366] hover:text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Pagos</span>
            </a>
            <a
              href="mailto:administracion@tierrafirme.com"
              className="w-full py-2 px-3 bg-[#FAF9FB] text-[#5B5F63] hover:bg-gray-100 font-bold text-xs rounded-xl flex items-center justify-center gap-2 border border-[#E0E3E7] transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>admin@tierrafirme.com</span>
            </a>
          </div>
        </div>

        {/* Asesoría Comercial / Nuevas Unidades */}
        <div className="bg-white rounded-2xl p-5 border border-[#E0E3E7] shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#FFDAD5] text-[#8A1B17] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#1B1C1E]">
              Asesoría Comercial VIP
            </h3>
            <p className="text-xs text-[#5B5F63]">
              Oportunidades de reinversión, preventa exclusiva y programa de referidos.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#E0E3E7]">
            <a
              href="https://api.whatsapp.com/send?phone=5491149203344&text=Hola,%20soy%20propietario%20y%20quiero%20conocer%20nuevos%20proyectos."
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-3 bg-[#25D366]/10 text-[#075E54] hover:bg-[#25D366] hover:text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Ventas</span>
            </a>
            <a
              href="tel:+5491149203344"
              className="w-full py-2 px-3 bg-[#FAF9FB] text-[#5B5F63] hover:bg-gray-100 font-bold text-xs rounded-xl flex items-center justify-center gap-2 border border-[#E0E3E7] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+54 9 11 4920-3344</span>
            </a>
          </div>
        </div>
      </div>

      {/* Showroom & Corporate Office */}
      <div className="bg-white rounded-2xl p-6 border border-[#E0E3E7] shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#1B1C1E]">
          Sede Central & Showroom
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2 p-4 bg-[#FAF9FB] rounded-xl border border-[#E0E3E7]">
            <div className="flex items-center gap-2 text-[#8E1E19] font-bold">
              <MapPin className="w-4 h-4" />
              <span>Oficinas Centrales & Showroom Experiencia</span>
            </div>
            <p className="text-[#1B1C1E] font-semibold">
              Av. del Libertador 4800, Piso 14, Buenos Aires
            </p>
            <p className="text-[#5B5F63] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Lunes a Viernes de 09:00 a 19:00 hs | Sábados de 10:00 a 14:00 hs
            </p>
          </div>

          <div className="space-y-2 p-4 bg-[#FAF9FB] rounded-xl border border-[#E0E3E7]">
            <div className="flex items-center gap-2 text-[#8E1E19] font-bold">
              <Phone className="w-4 h-4" />
              <span>Línea Telefónica Rotativa</span>
            </div>
            <p className="text-[#1B1C1E] font-semibold">
              +54 11 5263-8800 (Conmutador Central)
            </p>
            <p className="text-[#5B5F63]">
              Atención personalizada con tu número de DNI o código de propietario.
            </p>
          </div>
        </div>
      </div>

      {/* Support Ticket Submission Form - Only for logged in owners */}
      {user && (
        <div className="bg-white rounded-2xl p-6 border border-[#E0E3E7] shadow-xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#1B1C1E]">
            Enviar Consulta Formal al Equipo
          </h3>

          {isSent ? (
            <div className="text-center py-6 space-y-2">
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
