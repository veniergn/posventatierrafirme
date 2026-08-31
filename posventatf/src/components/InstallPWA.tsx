import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const InstallPWA: React.FC = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const onClick = async () => {
    if (!promptInstall) return;
    await promptInstall.prompt();
    const { outcome } = await promptInstall.userChoice;
    if (outcome === 'accepted') {
      setSupportsPWA(false);
    }
  };

  if (!supportsPWA) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 animate-in slide-in-from-bottom-5">
      <div className="bg-white p-3 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-[#E0E3E7] flex flex-col items-center gap-2 max-w-[150px] text-center relative group">
        <button 
          onClick={() => setSupportsPWA(false)} 
          className="absolute -top-2 -right-2 bg-gray-100 text-gray-500 rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-gray-200"
        >
          &times;
        </button>
        <div className="w-10 h-10 bg-[#FFDAD5] rounded-xl flex items-center justify-center">
          <img src="/logo-tf.png" alt="Tierra Firme Logo" className="w-6 h-6 object-contain" />
        </div>
        <p className="text-[10px] font-bold text-[#1B1C1E] leading-tight">
          Instala nuestra App
        </p>
        <button 
          onClick={onClick}
          className="w-full bg-[#8E1E19] hover:bg-[#6D0205] text-white py-1.5 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-colors"
        >
          <Download className="w-3 h-3" /> Instalar
        </button>
      </div>
    </div>
  );
};
