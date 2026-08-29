import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { 
  Building2, 
  ShieldCheck, 
  Key, 
  ArrowRight, 
  Layers, 
  Compass, 
  Sparkles,
  ChevronDown,
  Lock,
  ExternalLink
} from 'lucide-react';
import { ActiveAppView } from '../types';

interface SplashScreenProps {
  onSelectView: (view: ActiveAppView) => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onSelectView }) => {
  const [showAccessOptions, setShowAccessOptions] = useState(false);

  return (
    <div className="min-h-screen bg-[#121314] text-[#F9F9F8] relative overflow-hidden flex flex-col justify-between select-none">
      {/* Background Architectural Grid Pattern & Register Marks */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Technical Corner & Registration Coordinates */}
      <div className="absolute top-6 left-6 text-[10px] font-mono tracking-widest text-[#8C857B] uppercase pointer-events-none flex items-center gap-2">
        <span className="w-2 h-2 border-l border-t border-[#8E1E19]" />
        <span>ESTUDIO // REF: TF-ARQ-2024</span>
      </div>
      <div className="absolute top-6 right-6 text-[10px] font-mono tracking-widest text-[#8C857B] uppercase pointer-events-none flex items-center gap-2">
        <span>NORTE ↑ [ LAT -34.588 ]</span>
        <span className="w-2 h-2 border-r border-t border-[#8E1E19]" />
      </div>
      <div className="absolute bottom-6 left-6 text-[10px] font-mono tracking-widest text-[#8C857B] uppercase pointer-events-none flex items-center gap-2">
        <span className="w-2 h-2 border-l border-bottom border-[#8E1E19]" />
        <span>SISTEMA DE GESTIÓN CENTRALIZADA V4.5</span>
      </div>
      <div className="absolute bottom-6 right-6 text-[10px] font-mono tracking-widest text-[#8C857B] uppercase pointer-events-none flex items-center gap-2">
        <span>HERMETIC AUTH // SHA-256</span>
        <span className="w-2 h-2 border-r border-bottom border-[#8E1E19]" />
      </div>

      {/* Top Header Strip */}
      <header className="p-8 sm:p-12 relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-[#8E1E19] animate-ping rounded-full" />
          <span className="text-xs font-mono tracking-widest text-[#8C857B] uppercase">
            ESTUDIO ACTIVO • SERVIDOR CONECTADO
          </span>
        </div>
        
        <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-[#8C857B]">
          <span>BUENOS AIRES</span>
          <span>•</span>
          <span>MONTEVIDEO</span>
          <span>•</span>
          <span>CABA</span>
        </div>
      </header>

      {/* Center Hero: Editorial Architecture Logo & Title */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 text-center my-auto py-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18191A] border border-[#4E5256]/40 text-[#8C857B] text-xs font-mono mb-8 tracking-wider">
          <Compass className="w-3.5 h-3.5 text-[#8E1E19]" />
          <span>DESARROLLOS SÓLIDOS & DIRECCIÓN TÉCNICA DE OBRAS</span>
        </div>

        {/* Big Brutalist Brand Symbol */}
        <div className="flex justify-center mb-8">
          <div className="relative group cursor-pointer" onClick={() => setShowAccessOptions(true)}>
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#8E1E19] flex items-center justify-center text-white shadow-2xl border border-[#4E5256]/30 transform group-hover:scale-105 transition-all duration-300">
              <span className="text-6xl sm:text-7xl font-black font-serif tracking-tighter">T</span>
              {/* Brutalist geometric cutouts */}
              <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-[#4E5256] border border-[#121314]" />
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#8C857B] border border-[#121314]" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#F9F9F8] uppercase font-sans mb-3">
          TIERRA FIRME<span className="text-[#8E1E19]">®</span>
        </h1>
        <p className="text-sm sm:text-base font-mono tracking-[0.3em] text-[#8C857B] uppercase mb-8">
          DESARROLLOS SÓLIDOS • ARQUITECTURA DE AUTOR
        </p>

        {/* Description */}
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#8C857B] leading-relaxed mb-10 font-sans">
          Plataforma integral de seguimiento constructivo en tiempo real, planos técnicos de precisión y gestión inmobiliaria integral.
        </p>

        {/* Action Controls */}
        {!showAccessOptions ? (
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => setShowAccessOptions(true)}
              className="px-8 py-4 bg-[#8E1E19] hover:bg-[#A3231D] text-white font-bold text-sm tracking-wider uppercase transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-3 border border-white/10"
            >
              <span>Tocar para Ingresar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono text-[#8C857B] tracking-widest uppercase">
              [ PULSAR CUALQUIER SECTOR PARA DESPLEGAR ACCESOS ]
            </span>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in zoom-in-95 duration-300">
            {/* Option 1: Owner Login */}
            <button
              onClick={() => onSelectView('owner_login')}
              className="p-5 bg-[#18191A] hover:bg-[#1E2022] border border-[#4E5256]/40 hover:border-[#8E1E19] transition-all text-left group flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 bg-[#8E1E19]/20 text-[#FFA095] flex items-center justify-center mb-3 group-hover:bg-[#8E1E19] group-hover:text-white transition-colors">
                  <Building2 className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-sm text-[#F9F9F8] uppercase tracking-wide mb-1">
                  Portal Propietario
                </h3>
                <p className="text-[11px] text-[#8C857B] leading-snug">
                  Seguimiento de obra en vivo, planos, bitácora y renders.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-bold text-[#8E1E19] group-hover:text-[#FFA095]">
                <span>Ingresar</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Option 2: Admin Panel */}
            <button
              onClick={() => onSelectView('admin_dashboard')}
              className="p-5 bg-[#18191A] hover:bg-[#1E2022] border border-[#4E5256]/40 hover:border-[#8E1E19] transition-all text-left group flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 bg-[#4E5256]/30 text-[#8C857B] flex items-center justify-center mb-3 group-hover:bg-[#4E5256] group-hover:text-white transition-colors">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-sm text-[#F9F9F8] uppercase tracking-wide mb-1">
                  Panel de Control
                </h3>
                <p className="text-[11px] text-[#8C857B] leading-snug">
                  CRUD de proyectos, unidades, avances de obra y usuarios.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-bold text-[#8C857B] group-hover:text-white">
                <span>Gestión</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Option 3: Activate Temporary Code */}
            <button
              onClick={() => onSelectView('activation_screen')}
              className="p-5 bg-[#18191A] hover:bg-[#1E2022] border border-[#4E5256]/40 hover:border-[#8E1E19] transition-all text-left group flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 bg-[#8C857B]/20 text-[#8C857B] flex items-center justify-center mb-3 group-hover:bg-[#8C857B] group-hover:text-[#121314] transition-colors">
                  <Key className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-sm text-[#F9F9F8] uppercase tracking-wide mb-1">
                  Activar Clave
                </h3>
                <p className="text-[11px] text-[#8C857B] leading-snug">
                  Alta de nuevo propietario con código provisorio.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-bold text-[#8C857B] group-hover:text-white">
                <span>Validar</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        )}
      </main>

      {/* Footer Strip */}
      <footer className="p-6 sm:p-8 relative z-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8C857B]">
        <div>
          © {new Date().getFullYear()} TIERRA FIRME® DESARROLLOS SÓLIDOS. TODOS LOS DERECHOS RESERVADOS.
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onSelectView('email_inbox')}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8E1E19]" />
            <span>Simulador de Correo Saliente</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
