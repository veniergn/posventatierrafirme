import React from 'react';
import { AuditLog } from '../../types';
import { ShieldCheck, X, Clock, FileText, UserCheck, UploadCloud, Edit3 } from 'lucide-react';

interface AuditLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: AuditLog[];
}

export const AuditLogsModal: React.FC<AuditLogsModalProps> = ({
  isOpen,
  onClose,
  logs
}) => {
  if (!isOpen) return null;

  const getEntityIcon = (type: AuditLog['entityType']) => {
    switch (type) {
      case 'user':
        return <UserCheck className="w-4 h-4 text-[#8E1E19]" />;
      case 'media':
        return <UploadCloud className="w-4 h-4 text-blue-600" />;
      case 'project':
        return <Edit3 className="w-4 h-4 text-emerald-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl border border-[#E0BFBB]/30 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="px-8 py-5 border-b border-[#E0E3E7] flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FFDAD5] flex items-center justify-center text-[#8E1E19]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1B1C1E]">Registro de Auditoría y Trazabilidad</h2>
              <p className="text-xs text-[#5B5F63] mt-0.5">
                Historial inmutable de operaciones y modificaciones del Staff
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto bg-[#FAF9FB] flex-1 space-y-4">
          <div className="bg-white rounded-xl shadow-xs border border-[#E0E3E7] divide-y divide-[#E0E3E7]">
            {logs.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#5B5F63]">
                No hay registros de auditoría aún.
              </div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="p-4 flex items-start gap-4 hover:bg-[#FAF9FB] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#F4F3F5] flex items-center justify-center shrink-0 mt-0.5">
                    {getEntityIcon(log.entityType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-[#1B1C1E]">{log.action}</span>
                      <span className="text-[11px] text-[#5B5F63] flex items-center gap-1 shrink-0 font-mono">
                        <Clock className="w-3 h-3" />
                        {log.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-[#5B5F63] mt-1">{log.details}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-[#8E1E19] bg-[#FFDAD5]/40 px-2 py-0.5 rounded">
                        {log.staffName} ({log.staffRole})
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-[#E0E3E7] bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1B1C1E] text-white text-xs font-semibold rounded-lg hover:bg-black"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
