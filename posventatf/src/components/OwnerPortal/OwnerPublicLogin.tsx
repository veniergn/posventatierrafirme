import React, { useState } from 'react';
import { BrandLogo } from '../BrandLogo';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Key, Building2, Shield } from 'lucide-react';
import { User } from '../../types';
import { api } from '../../lib/api';

import { sounds } from '../../lib/sounds';

interface OwnerPublicLoginProps {
  onLoginSuccess: (user: User) => void;
  onNavigateToActivation?: () => void;
  onQuickLoginAsAdmin?: () => void;
}

export const OwnerPublicLogin: React.FC<OwnerPublicLoginProps> = ({ 
  onLoginSuccess,
  onNavigateToActivation,
  onQuickLoginAsAdmin
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playLoginClick();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const user = await api.loginOwner(email, password);
      
      if (user) {
        onLoginSuccess(user as User);
      } else {
        setErrorMsg('Credenciales incorrectas o usuario no encontrado.');
      }
    } catch (error) {
      setErrorMsg('Error de conexión. Intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[80vh] bg-[#FAF9FB] flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300 rounded-3xl overflow-hidden shadow-sm border border-[#E0E3E7]">
      {/* Left Column: Login Form */}
      <div className="w-full md:w-1/2 lg:w-5/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-white shadow-xl z-10 overflow-y-auto">
        <div>
          <BrandLogo variant="horizontal" size="md" />
        </div>

        <div className="my-8 space-y-6 max-w-md w-full mx-auto">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFDAD5] text-[#8A1B17] text-xs font-semibold rounded-full mb-3">
              <Building2 className="w-3.5 h-3.5" /> Portal de Clientes
            </span>
            <h1 className="text-3xl font-extrabold text-[#1B1C1E] tracking-tight">
              Iniciar Sesión
            </h1>
            <p className="text-xs text-[#5B5F63] mt-2">
              Accede al seguimiento en vivo de tu unidad, planos y bitácora de obra.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 text-center animate-in fade-in">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5F63] mb-1.5">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5B5F63]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF9FB] border border-[#8C716D]/30 rounded-xl text-sm text-[#1B1C1E] focus:border-[#8E1E19] focus:ring-2 focus:ring-[#8E1E19]/20 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5B5F63]">
                  Contraseña
                </label>
                {onNavigateToActivation && (
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); onNavigateToActivation(); }} className="text-xs text-[#8E1E19] hover:underline font-semibold">
                    ¿Olvidaste tu clave?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5B5F63]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contraseña"
                  className="w-full pl-10 pr-10 py-3 bg-[#FAF9FB] border border-[#8C716D]/30 rounded-xl text-sm text-[#1B1C1E] focus:border-[#8E1E19] focus:ring-2 focus:ring-[#8E1E19]/20 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#8E1E19] hover:bg-[#6D0205] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:active:scale-100"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Ingresar a Mi Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Activation Prompt Box */}
          {onNavigateToActivation && (
            <div className="p-4 bg-[#FAF9FB] rounded-xl border border-[#E0BFBB]/60 text-center space-y-2">
              <div className="text-xs font-bold text-[#1B1C1E] flex items-center justify-center gap-1.5">
                <Key className="w-4 h-4 text-[#8E1E19]" />
                <span>¿Es tu primera vez o recibiste un código?</span>
              </div>
              <button
                onClick={onNavigateToActivation}
                className="text-xs text-[#8E1E19] hover:text-[#6D0205] font-extrabold underline block mx-auto"
              >
                Activar mi cuenta con código temporal →
              </button>
            </div>
          )}

          {/* Admin shortcut button */}
          {onQuickLoginAsAdmin && (
            <div className="pt-2 text-center">
              <button
                onClick={onQuickLoginAsAdmin}
                className="text-xs text-[#5B5F63] hover:text-[#1B1C1E] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E0E3E7] hover:bg-gray-50 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-[#8E1E19]" />
                <span>Acceder como Personal de Staff / Panel Admin</span>
              </button>
            </div>
          )}
        </div>

        <div className="text-center text-[11px] text-[#5B5F63] mt-8">
          © {new Date().getFullYear()} Tierra Firme Desarrollos Sólidos
        </div>
      </div>

      {/* Right Column: Architectural Render Hero */}
      <div className="hidden md:block md:w-1/2 lg:w-7/12 relative bg-black overflow-hidden flex-1">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          alt="Tierra Firme Portal"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
        
        <div className="absolute bottom-12 left-12 right-12 text-white max-w-lg space-y-2 z-10">
          <div className="text-xs uppercase tracking-widest text-[#FFA095] font-bold">
            Portal Exclusivo
          </div>
          <h2 className="text-3xl font-bold leading-tight">
            Tu unidad, tus planos y cada avance de obra en la palma de tu mano.
          </h2>
        </div>
      </div>
    </div>
  );
};
