import React, { useState } from 'react';
import { Lock, Mail, Loader2, KeyRound } from 'lucide-react';
import { User } from '../../types';
import { api } from '../../lib/api';

interface OwnerPublicLoginProps {
  onLoginSuccess: (user: User) => void;
}

export const OwnerPublicLogin: React.FC<OwnerPublicLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="flex flex-col items-center justify-center p-6 sm:p-12 animate-in fade-in zoom-in duration-500">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-[#E0E3E7] p-8 sm:p-10 relative overflow-hidden mt-8">
        {/* Decoración */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#FFDAD5]/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gray-100 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-[#8E1E19]/10 text-[#8E1E19] rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-[#8E1E19]/20">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1B1C1E] tracking-tight">
            Acceso Privado
          </h2>
          <p className="text-sm text-[#5B5F63] mt-2">
            Ingresa tus credenciales para ver el avance y documentación de tu unidad.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5 relative z-10 w-full">
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 text-center animate-in fade-in">
              {errorMsg}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1B1C1E] ml-1">Correo Electrónico</label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full pl-10 pr-4 py-3 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-sm focus:outline-none focus:border-[#8E1E19] focus:ring-1 focus:ring-[#8E1E19] transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1B1C1E] ml-1">Contraseña</label>
            <div className="relative">
              <KeyRound className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-sm focus:outline-none focus:border-[#8E1E19] focus:ring-1 focus:ring-[#8E1E19] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#8E1E19] hover:bg-[#6D0205] text-white font-bold py-3.5 rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:active:scale-100"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Ingresar a Mi Dpto'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
