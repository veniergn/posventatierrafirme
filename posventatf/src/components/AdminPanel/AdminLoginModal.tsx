import React, { useState } from 'react';
import { Mail, Lock, X, ShieldAlert, Loader2 } from 'lucide-react';
import { api } from '../../lib/api';
import { User } from '../../types';

interface AdminLoginModalProps {
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const user = await api.loginOwner(email, password);
      if (user && user.role === 'staff') {
        onSuccess(user as User);
      } else if (user) {
        setErrorMsg('Esta cuenta no tiene permisos de staff.');
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-[#8E1E19]">
            <ShieldAlert className="w-5 h-5" />
            <h2 className="font-bold">Acceso a Panel de Control</h2>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100 text-center">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              Correo Institucional
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@tierrafirme.com"
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-[#8E1E19] focus:ring-1 focus:ring-[#8E1E19] outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-[#8E1E19] focus:ring-1 focus:ring-[#8E1E19] outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#8E1E19] hover:bg-[#6D0205] text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Ingresar al Panel'}
          </button>
        </form>
      </div>
    </div>
  );
};
