import React, { useState, useEffect } from 'react';
import { BrandLogo } from '../BrandLogo';
import { Key, Lock, Eye, EyeOff, CheckCircle2, ArrowRight, ArrowLeft, RefreshCw, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ActivationPageProps {
  initialCode?: string;
  onSuccessActivation: (code: string, password: string) => void;
  onNavigateToLogin: () => void;
}

export const ActivationPage: React.FC<ActivationPageProps> = ({
  initialCode = '',
  onSuccessActivation,
  onNavigateToLogin
}) => {
  const [code, setCode] = useState(initialCode);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    }
  }, [initialCode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!code.trim()) {
      setErrorMessage('Por favor ingresa tu código de activación.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden. Por favor verifica.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Fire confetti effect
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore if not supported
      }

      setTimeout(() => {
        onSuccessActivation(code, password);
      }, 2000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FAF9FB] flex flex-col md:flex-row">
      {/* Left Column: Activation Form */}
      <div className="w-full md:w-1/2 lg:w-5/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-white shadow-xl z-10">
        {/* Brand Header */}
        <div>
          <BrandLogo variant="horizontal" size="md" />
        </div>

        {/* Form Container */}
        <div className="my-8 space-y-6 max-w-md w-full mx-auto">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFDAD5] text-[#8A1B17] text-xs font-semibold rounded-full mb-3">
              <Key className="w-3.5 h-3.5" /> Flujo de Autorización
            </span>
            <h1 className="text-3xl font-extrabold text-[#1B1C1E] tracking-tight">
              Activación de Cuenta
            </h1>
            <p className="text-xs text-[#5B5F63] mt-2 leading-relaxed">
              Ingresa el código que enviamos a tu correo electrónico para verificar tu identidad y establecer una contraseña segura.
            </p>
          </div>

          {isSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3 animate-in zoom-in-95">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950">¡Cuenta Activada Exitosamente!</h3>
              <p className="text-xs text-emerald-800">
                Tu identidad ha sido verificada. Redirigiendo a tu panel de seguimiento...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium animate-in fade-in">
                  {errorMessage}
                </div>
              )}

              {/* Code Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5F63] mb-1.5">
                  Código de Activación / Token *
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E1E19]" />
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="Ej. TF-8492"
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF9FB] border border-[#8C716D]/30 rounded-xl text-sm font-mono font-bold tracking-wider text-[#8E1E19] focus:border-[#8E1E19] focus:ring-2 focus:ring-[#8E1E19]/20 outline-none uppercase transition-all"
                  />
                </div>
                <span className="text-[10px] text-[#5B5F63] mt-1 block">
                  Código de 6-8 caracteres provisto en tu email de bienvenida
                </span>
              </div>

              {/* New Password Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5F63] mb-1.5">
                  Nueva Contraseña *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5B5F63]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
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

              {/* Confirm Password Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5F63] mb-1.5">
                  Confirmar Contraseña *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5B5F63]" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repite tu contraseña"
                    className="w-full pl-10 pr-10 py-3 bg-[#FAF9FB] border border-[#8C716D]/30 rounded-xl text-sm text-[#1B1C1E] focus:border-[#8E1E19] focus:ring-2 focus:ring-[#8E1E19]/20 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#8E1E19] hover:bg-[#6D0205] disabled:bg-gray-400 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verificando Token...</span>
                  </>
                ) : (
                  <>
                    <span>Activar Mi Cuenta</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Bottom helper links */}
          <div className="pt-4 border-t border-[#E0E3E7] flex flex-col items-center gap-3 text-xs text-[#5B5F63]">
            <button
              onClick={() => setCode('TF-8492')}
              className="text-[#8E1E19] hover:underline font-semibold flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Usar código de prueba (ej. TF-8492 de Juan Pérez)</span>
            </button>

            <button
              onClick={onNavigateToLogin}
              className="text-[#5B5F63] hover:text-[#1B1C1E] font-medium flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver al inicio de sesión</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-[#5B5F63]">
          © {new Date().getFullYear()} Tierra Firme Desarrollos Sólidos • Acceso Seguro SSL
        </div>
      </div>

      {/* Right Column: Architectural Photography Hero (Fiel a la imagen 9 y 18) */}
      <div className="hidden md:block md:w-1/2 lg:w-7/12 relative bg-black overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWq6C84h81Xhr9fnBPMuddOo4JrFXjqer8r7LrepnpTDv_ikHtvjlkBIychnGbFMSROL-l7EkiXp6IS1IG0P__mzveajRcAJw9saNsUEaAjPJYYAN8_9w4vKd1-i-U-0ZpzyZufsgBMevIt2TDu2Ibh63CpwKQNzlAySv-QWuokpuZXBIQ3UEmz-VfniAutQL8CgpnByF-Ex_6Ttiz4MO37jcgkJ5uHELrlzJwRBOnuIaehjrfRYfZgQ"
          alt="Tierra Firme Arquitectura"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        {/* Floating Architectural Quote Card */}
        <div className="absolute bottom-12 left-12 right-12 text-white max-w-lg space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Infraestructura & Solidez Constructiva</span>
          </div>
          <h2 className="text-3xl font-bold leading-tight">
            "Construimos espacios donde cada detalle cuenta y la solidez es nuestro compromiso."
          </h2>
          <p className="text-xs text-gray-300">
            Complejo Terrazas • Av. del Libertador 1234, CABA
          </p>
        </div>
      </div>
    </div>
  );
};
