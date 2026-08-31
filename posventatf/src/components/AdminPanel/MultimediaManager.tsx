import React, { useState } from 'react';
import { MediaUploadItem, AuditLog } from '../../types';
import { 
  UploadCloud, 
  FileText, 
  Image as ImageIcon, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Layers
} from 'lucide-react';
import { FileDropzone } from '../FileDropzone';

interface MultimediaManagerProps {
  uploads: MediaUploadItem[];
  onAddUpload: (item: MediaUploadItem) => void;
  onDeleteUpload: (id: string) => void;
  onOpenAuditLogs: () => void;
  currentStaffName: string;
  currentStaffRole: string;
}

export const MultimediaManager: React.FC<MultimediaManagerProps> = ({
  uploads,
  onAddUpload,
  onDeleteUpload,
  onOpenAuditLogs,
  currentStaffName,
  currentStaffRole
}) => {
  const [selectedType, setSelectedType] = useState<'render' | 'blueprint' | 'progress'>('progress');
  const [selectedComplex, setSelectedComplex] = useState('Complejo Terrazas');
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [customFileName, setCustomFileName] = useState('');

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    const defaultNames = {
      render: 'Render_Living_VistaNorte_Final.jpg',
      blueprint: 'Plano_Arquitectonico_Nivel4_RevB.pdf',
      progress: 'Avance_Obra_ColadoLosa_Semana44.jpg'
    };

    const fileName = customFileName.trim() || defaultNames[selectedType];
    const previewUrls = {
      render: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7Dg5-GoB6fJxtvSnd4FBKz6U5WEwu_1v1CWDnnwmcS4_Rww1AvyLXO5vB8z0PaSOsVUZrc5RK4pgeTQEwwOVlNm-KRso8Or1-ydLLhMSUPQmkrCF5QsAm3lGLuU8mjgE-S9TIBGYog8exCNoyW1kJqhmVYoCrIUhb9K47zAB7gnvSJ3kF2Yv1JesulYLzqF83qlBeBtbuKDqbH0Wznri32nprrfd9Sz3TCCbeErekaEkN2az8CodAyQ',
      blueprint: '#plano-sample.pdf',
      progress: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcaC2IrPvxkrLBSJszPUrW9iM2axLGxSCdzaNcIu3bl4ytILeSJEs4ki4BJrMjUQqXQ6AVyO3JzPwT2sTakIsD7ba8x7ss3r0IE9JLV-4LSc6W1CG5Ge7Sclojc1puQjReP5MEO1yDlJAOxPemlFa5Bj4lUNwDfd8-doUca5qP3h4N5JLA5WETT_3GmfTVwRXVahzVJO-5gEc6OXh4K9r4wcrOexRm2wQ6OSx3Hjb3nNCezXw-t6JLfw'
    };

    setTimeout(() => {
      const newItem: MediaUploadItem = {
        id: `up-${Date.now()}`,
        fileName,
        type: selectedType,
        size: uploadedUrl ? 'Auto' : `${(Math.random() * 8 + 2).toFixed(1)} MB`,
        timestamp: 'Recién ahora',
        uploadedBy: currentStaffName,
        uploadedByRole: currentStaffRole,
        status: 'synced',
        url: uploadedUrl || previewUrls[selectedType],
        complexName: selectedComplex
      };

      onAddUpload(newItem);
      setIsUploading(false);
      setUploadSuccess(true);
      setCustomFileName('');
      setTimeout(() => setUploadSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1B1C1E] tracking-tight">
            Gestión Multimedia & Carga de Avance
          </h1>
          <p className="text-sm text-[#5B5F63] mt-0.5">
            Centraliza renders de alta resolución, planos técnicos y fotografías de bitácora con registro de autoría.
          </p>
        </div>
        <button
          onClick={onOpenAuditLogs}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E0E3E7] hover:bg-gray-50 text-[#1B1C1E] text-xs font-semibold rounded-lg shadow-xs transition-colors self-start sm:self-auto"
        >
          <ShieldAlert className="w-4 h-4 text-[#8E1E19]" />
          <span>Ver Historial de Auditoría</span>
        </button>
      </div>

      {/* Upload Box Card (Fiel a Image 1.png & 14.png) */}
      <div className="bg-white rounded-xl border border-[#E0E3E7] shadow-xs p-6 md:p-8 space-y-6">
        <form onSubmit={handleSimulateUpload} className="space-y-6">
          {/* Controls: Type & Complex */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5F63] mb-1.5">
                Categoría del Archivo
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedType('progress')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border flex flex-col items-center gap-1 transition-all ${
                    selectedType === 'progress'
                      ? 'border-[#8E1E19] bg-[#FFDAD5]/30 text-[#8A1B17]'
                      : 'border-[#E0E3E7] text-[#5B5F63] hover:bg-[#FAF9FB]'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>Avance Obra</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType('render')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border flex flex-col items-center gap-1 transition-all ${
                    selectedType === 'render'
                      ? 'border-[#8E1E19] bg-[#FFDAD5]/30 text-[#8A1B17]'
                      : 'border-[#E0E3E7] text-[#5B5F63] hover:bg-[#FAF9FB]'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Render 3D</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType('blueprint')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border flex flex-col items-center gap-1 transition-all ${
                    selectedType === 'blueprint'
                      ? 'border-[#8E1E19] bg-[#FFDAD5]/30 text-[#8A1B17]'
                      : 'border-[#E0E3E7] text-[#5B5F63] hover:bg-[#FAF9FB]'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Plano / Doc</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5F63] mb-1.5">
                Desarrollo / Complejo Asignado
              </label>
              <select
                value={selectedComplex}
                onChange={(e) => setSelectedComplex(e.target.value)}
                className="w-full py-2.5 px-3 border border-[#8C716D]/30 rounded-lg text-sm bg-white outline-none focus:border-[#8E1E19]"
              >
                <option value="Complejo Terrazas">Complejo Terrazas</option>
                <option value="Torre A - Norte">Torre A - Norte</option>
                <option value="Proyecto Vista Real">Proyecto Vista Real</option>
                <option value="Altura Residences">Altura Residences</option>
                <option value="Madero Boutique">Madero Boutique</option>
                <option value="Distrito Palermo">Distrito Palermo</option>
              </select>
            </div>
          </div>

          {/* Drag & Drop Area */}
          <div className="w-full">
            <FileDropzone 
              onUploadSuccess={(url) => setUploadedUrl(url)}
              folder="multimedia"
              label="Arrastra y suelta tus archivos aquí o haz clic para explorar"
              accept="image/*,.pdf"
            />
            
            <div className="w-full mt-4">
              <input
                type="text"
                value={customFileName}
                onChange={(e) => setCustomFileName(e.target.value)}
                placeholder="Nombre descriptivo opcional (ej. Losa Nivel 5 Octubre)"
                className="w-full px-3 py-2 text-xs bg-white border border-[#E0E3E7] rounded-lg text-center outline-none focus:border-[#8E1E19]"
              />
            </div>
          </div>

          {/* Staff signature notice & Upload Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-[#5B5F63] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#005613]" />
              <span>
                Firma de auditoría: <strong>{currentStaffName}</strong> ({currentStaffRole})
              </span>
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="w-full sm:w-auto px-8 py-3 bg-[#8E1E19] hover:bg-[#6D0205] disabled:bg-gray-400 text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow flex items-center justify-center gap-2 transition-all"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sincronizando Archivo...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Cargar y Publicar Avance</span>
                </>
              )}
            </button>
          </div>

          {uploadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>¡Archivo sincronizado y registrado en la bitácora del proyecto con éxito!</span>
            </div>
          )}
        </form>
      </div>

      {/* Recent Uploads Table */}
      <div className="bg-white rounded-xl border border-[#E0E3E7] shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E0E3E7] flex items-center justify-between">
          <h2 className="text-base font-bold text-[#1B1C1E]">Archivos y Renders Recientes</h2>
          <span className="text-xs text-[#5B5F63]">Registro en vivo</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF9FB] border-b border-[#E0E3E7] text-[11px] font-bold uppercase tracking-wider text-[#5B5F63]">
                <th className="py-3 px-6">Archivo</th>
                <th className="py-3 px-4">Categoría</th>
                <th className="py-3 px-4">Complejo</th>
                <th className="py-3 px-4">Subido por</th>
                <th className="py-3 px-4">Fecha / Estado</th>
                <th className="py-3 px-6 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3E7] text-xs">
              {uploads.map((file) => (
                <tr key={file.id} className="hover:bg-[#FAF9FB] transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FFDAD5] text-[#8E1E19] flex items-center justify-center shrink-0">
                        {file.type === 'blueprint' ? (
                          <FileText className="w-4 h-4" />
                        ) : (
                          <ImageIcon className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-[#1B1C1E] max-w-xs truncate">{file.fileName}</div>
                        <div className="text-[10px] text-[#5B5F63]">{file.size}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#F4F3F5] text-[#1B1C1E] border border-[#E0E3E7]">
                      {file.type}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-medium text-[#1B1C1E]">
                    {file.complexName || 'Complejo Terrazas'}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-medium text-[#1B1C1E]">{file.uploadedBy}</div>
                    <div className="text-[10px] text-[#5B5F63]">{file.uploadedByRole}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-[#1B1C1E]">{file.timestamp}</div>
                    <div className="text-[10px] text-[#005613] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Sincronizado
                    </div>
                  </td>

                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onDeleteUpload(file.id)}
                        className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                        title="Eliminar archivo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
