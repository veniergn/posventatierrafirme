import React, { useState } from 'react';
import { User, ConstructionMilestone, UnitDetail } from '../../types';
import { INITIAL_UNIT_DETAILS } from '../../data/initialData';
import { 
  Building, 
  Layers, 
  Clock, 
  Map, 
  Maximize2, 
  Download, 
  FileText, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

interface OwnerMyUnitProps {
  user: User;
  units?: UnitDetail[];
  milestones: ConstructionMilestone[];
  onExpandImage?: (url: string) => void;
}

export const OwnerMyUnit: React.FC<OwnerMyUnitProps> = ({
  user,
  units = [],
  milestones,
  onExpandImage
}) => {
  const [subTab, setSubTab] = useState<'renders' | 'planos' | 'avance' | 'especificaciones'>('renders');
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [blueprintZoom, setBlueprintZoom] = useState<number>(100);
  const [downloadModalDoc, setDownloadModalDoc] = useState<string | null>(null);

  // Intentar encontrar la unidad vinculada al usuario desde la base de datos
  const dbUnit = units.find(u => u.assignedUserId === user.id);
  
  // Fallback a los datos locales por defecto si no se encuentra
  const assignedUnitKey = user.unit || 'Unidad 4° B';
  const fallbackUnit = INITIAL_UNIT_DETAILS[assignedUnitKey] || INITIAL_UNIT_DETAILS['Unidad 4° B'];
  
  const unitDetail: UnitDetail = dbUnit || fallbackUnit;

  const galleryImages = [
    { title: 'Living & Comedor Integrado', url: unitDetail.livingRender, category: 'Interiorismo' },
    { title: 'Fachada & Balcón Aterrazado', url: unitDetail.mainRender, category: 'Exterior' },
    { title: 'Dormitorio Principal en Suite', url: unitDetail.masterBedroomRender, category: 'Dormitorio' },
    { title: 'Cocina & Acabados de Cuarzo', url: unitDetail.kitchenRender, category: 'Cocina' }
  ].filter(img => img.url && img.url.trim() !== '');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Unit Title Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#E0E3E7] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#8E1E19] flex items-center gap-1.5">
              <Building className="w-4 h-4" /> Unidad Hermética Certificada
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B1C1E] tracking-tight mt-0.5">
              {unitDetail.unitNumber}
            </h1>
            <p className="text-xs text-[#5B5F63]">
              {unitDetail.complexName} • {unitDetail.address}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#8E1E19] text-white text-xs font-bold rounded-full uppercase tracking-wider">
              {unitDetail.status}
            </span>
          </div>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#E0E3E7]">
          <button
            onClick={() => setSubTab('renders')}
            className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              subTab === 'renders'
                ? 'bg-[#8E1E19] text-white shadow-xs'
                : 'bg-[#FAF9FB] text-[#5B5F63] hover:bg-gray-100 border border-[#E0E3E7]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Renders & Vistas</span>
          </button>

          <button
            onClick={() => setSubTab('planos')}
            className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              subTab === 'planos'
                ? 'bg-[#8E1E19] text-white shadow-xs'
                : 'bg-[#FAF9FB] text-[#5B5F63] hover:bg-gray-100 border border-[#E0E3E7]'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Planos & Cotas</span>
          </button>

          <button
            onClick={() => setSubTab('avance')}
            className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              subTab === 'avance'
                ? 'bg-[#8E1E19] text-white shadow-xs'
                : 'bg-[#FAF9FB] text-[#5B5F63] hover:bg-gray-100 border border-[#E0E3E7]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Bitácora de Obra</span>
          </button>

          <button
            onClick={() => setSubTab('especificaciones')}
            className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              subTab === 'especificaciones'
                ? 'bg-[#8E1E19] text-white shadow-xs'
                : 'bg-[#FAF9FB] text-[#5B5F63] hover:bg-gray-100 border border-[#E0E3E7]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Ficha & Documentos</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          SUB-TAB 1: RENDERS INTERIORES & FOTORREALISMO
      ======================================================== */}
      {subTab === 'renders' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#E0E3E7] overflow-hidden shadow-xs p-4 space-y-4">
            <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden bg-gray-100 group">
              <img
                src={galleryImages[activeGalleryIndex].url}
                alt={galleryImages[activeGalleryIndex].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => onExpandImage && onExpandImage(galleryImages[activeGalleryIndex].url)}
                  className="p-2.5 bg-black/40 hover:bg-black/70 text-white rounded-full backdrop-blur-xs transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#8E1E19] px-2.5 py-0.5 rounded">
                  {galleryImages[activeGalleryIndex].category}
                </span>
                <h3 className="text-lg font-bold mt-1">
                  {galleryImages[activeGalleryIndex].title}
                </h3>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveGalleryIndex(idx)}
                  className={`text-left rounded-xl overflow-hidden border-2 transition-all p-1 bg-white shadow-xs ${
                    activeGalleryIndex === idx
                      ? 'border-[#8E1E19] ring-2 ring-[#8E1E19]/30 scale-[0.98]'
                      : 'border-[#E0E3E7] hover:border-gray-400 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="h-16 rounded-lg overflow-hidden bg-gray-100 mb-1">
                    <img src={img.url} alt={img.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold text-[#1B1C1E] line-clamp-1 block px-1">
                    {img.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 2: PLANOS ARQUITECTÓNICOS CON ZOOM INTERACTIVO
      ======================================================== */}
      {subTab === 'planos' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E0E3E7] shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-[#1B1C1E]">
                Plano Conforme a Obra N° 4B
              </h3>
              <p className="text-xs text-[#5B5F63]">
                Superficie {unitDetail.surfaceM2} m² • Escala técnica 1:50
              </p>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto bg-[#FAF9FB] p-1 rounded-lg border border-[#E0E3E7]">
              <button
                onClick={() => setBlueprintZoom(Math.max(50, blueprintZoom - 20))}
                className="p-1.5 hover:bg-gray-200 rounded text-[#1B1C1E]"
                title="Alejar"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold px-2">{blueprintZoom}%</span>
              <button
                onClick={() => setBlueprintZoom(Math.min(200, blueprintZoom + 20))}
                className="p-1.5 hover:bg-gray-200 rounded text-[#1B1C1E]"
                title="Acercar"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setBlueprintZoom(100)}
                className="p-1.5 hover:bg-gray-200 rounded text-[#1B1C1E]"
                title="Restablecer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Technical Blueprint Display */}
          <div className="bg-[#14213d] rounded-2xl p-6 overflow-auto min-h-[420px] flex items-center justify-center border border-cyan-500/40 relative shadow-2xl">
            <div
              style={{ transform: `scale(${blueprintZoom / 100})`, transformOrigin: 'center center' }}
              className="transition-transform duration-200"
            >
              <svg
                viewBox="0 0 600 400"
                className="w-[520px] h-[350px] bg-[#0d1b2a] rounded-lg border border-cyan-500/50 text-cyan-400 font-mono text-xs shadow-2xl"
              >
                <defs>
                  <pattern id="unitGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#unitGrid)" />

                {/* Outer Walls */}
                <rect x="50" y="40" width="500" height="320" fill="none" stroke="#38bdf8" strokeWidth="4" />
                
                {/* Living */}
                <rect x="50" y="40" width="280" height="200" fill="rgba(56, 189, 248, 0.06)" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4" />
                <text x="70" y="70" fill="#38bdf8" fontSize="14" fontWeight="bold">ESTAR / COMEDOR</text>
                <text x="70" y="90" fill="#94a3b8" fontSize="10">6.40 m x 4.80 m (30.7 m²)</text>
                <text x="70" y="110" fill="#e0f2fe" fontSize="10">Piso Porcelanato 60x120</text>

                {/* Balcony */}
                <rect x="50" y="240" width="280" height="120" fill="rgba(56, 189, 248, 0.1)" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="270" fill="#38bdf8" fontSize="12" fontWeight="bold">TERRAZA BALCÓN</text>
                <text x="70" y="290" fill="#94a3b8" fontSize="10">6.40 m x 2.20 m (14.0 m²)</text>

                {/* Master Bedroom */}
                <rect x="330" y="40" width="220" height="160" fill="rgba(56, 189, 248, 0.06)" stroke="#38bdf8" strokeWidth="2" />
                <text x="350" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold">DORMITORIO PPAL (SUITE)</text>
                <text x="350" y="90" fill="#94a3b8" fontSize="10">3.80 m x 3.60 m (13.6 m²)</text>

                {/* Bathroom */}
                <rect x="330" y="200" width="110" height="160" fill="rgba(56, 189, 248, 0.06)" stroke="#38bdf8" strokeWidth="2" />
                <text x="340" y="230" fill="#38bdf8" fontSize="10" fontWeight="bold">BAÑO PPAL</text>

                {/* Kitchen */}
                <rect x="440" y="200" width="110" height="160" fill="rgba(56, 189, 248, 0.06)" stroke="#38bdf8" strokeWidth="2" />
                <text x="450" y="230" fill="#38bdf8" fontSize="10" fontWeight="bold">COCINA</text>

                {/* Title block */}
                <rect x="60" y="315" width="240" height="35" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" rx="4" />
                <text x="70" y="330" fill="#f8fafc" fontSize="10" fontWeight="bold">TIERRA FIRME • {unitDetail.unitNumber}</text>
                <text x="70" y="342" fill="#38bdf8" fontSize="8">Plano de Arquitectura Aprobado</text>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 3: BITÁCORA MENSUAL DE OBRA
      ======================================================== */}
      {subTab === 'avance' && (
        <div className="space-y-6">
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-[#E0E3E7]">
            {milestones.filter(m => m.projectId === unitDetail.projectId).map((m, idx) => (
              <div key={m.id} className="relative pl-10">
                {/* Dot */}
                <div className={`absolute left-2.5 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full border-2 bg-white ${
                  idx === 0 ? 'border-[#8E1E19] ring-4 ring-[#FFDAD5]' : 'border-gray-400'
                }`} />

                <div className="bg-white rounded-2xl border border-[#E0E3E7] shadow-xs overflow-hidden space-y-4 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E1E19] bg-[#FFDAD5] px-2 py-0.5 rounded">
                        {m.phaseStatus}
                      </span>
                      <h3 className="text-lg font-bold text-[#1B1C1E] mt-1">{m.title}</h3>
                    </div>
                    <span className="text-xs font-semibold text-[#5B5F63]">{m.month}</span>
                  </div>

                  <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden bg-gray-100 group">
                    <img
                      src={m.photoUrl}
                      alt={m.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => onExpandImage && onExpandImage(m.photoUrl)}
                      className="absolute bottom-3 right-3 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-xs transition-colors"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-[#FAF9FB] p-4 rounded-xl border border-[#E0E3E7]">
                    <p className="text-xs text-[#5B5F63] italic leading-relaxed">
                      "{m.quote}"
                    </p>
                    <div className="mt-2 text-[11px] font-bold text-[#8E1E19] flex items-center justify-between">
                      <span>{m.authorName} • {m.authorRole}</span>
                      {m.progressPercentage && (
                        <span className="text-xs text-[#1B1C1E] font-extrabold">{m.progressPercentage}% completado</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 4: ESPECIFICACIONES Y DOCUMENTOS
      ======================================================== */}
      {subTab === 'especificaciones' && (
        <div className="space-y-6">
          {/* Tech Specs */}
          <div className="bg-white rounded-2xl p-6 border border-[#E0E3E7] shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#1B1C1E]">
              Ficha Técnica de la Unidad
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 bg-[#FAF9FB] rounded-xl border border-[#E0E3E7]">
                <span className="text-[#5B5F63] block">Superficie Total</span>
                <span className="text-lg font-extrabold text-[#1B1C1E]">{unitDetail.surfaceM2} m²</span>
              </div>
              <div className="p-3.5 bg-[#FAF9FB] rounded-xl border border-[#E0E3E7]">
                <span className="text-[#5B5F63] block">Distribución</span>
                <span className="text-lg font-extrabold text-[#1B1C1E]">{unitDetail.rooms} Ambientes</span>
              </div>
              <div className="p-3.5 bg-[#FAF9FB] rounded-xl border border-[#E0E3E7]">
                <span className="text-[#5B5F63] block">Dormitorios</span>
                <span className="text-lg font-extrabold text-[#1B1C1E]">{unitDetail.bedrooms}</span>
              </div>
              <div className="p-3.5 bg-[#FAF9FB] rounded-xl border border-[#E0E3E7]">
                <span className="text-[#5B5F63] block">Baños</span>
                <span className="text-lg font-extrabold text-[#1B1C1E]">{unitDetail.bathrooms}</span>
              </div>
              <div className="p-3.5 bg-[#FAF9FB] rounded-xl border border-[#E0E3E7]">
                <span className="text-[#5B5F63] block">Cochera Asignada</span>
                <span className="text-lg font-extrabold text-[#1B1C1E]">{user.parking || 'N° 12 (Nivel 1)'}</span>
              </div>
              <div className="p-3.5 bg-[#FAF9FB] rounded-xl border border-[#E0E3E7]">
                <span className="text-[#5B5F63] block">Baulera Asignada</span>
                <span className="text-lg font-extrabold text-[#1B1C1E]">{user.storage || 'Baulera B-04'}</span>
              </div>
            </div>
          </div>

          {/* Certified PDFs */}
          <div className="bg-white rounded-2xl p-6 border border-[#E0E3E7] shadow-xs space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#1B1C1E]">
              Documentación Certificada Descargable
            </h3>
            <div className="divide-y divide-[#E0E3E7]">
              {[
                { name: 'Plano Arquitectónico Oficial (PDF)', size: '3.4 MB', type: 'Arquitectura', url: unitDetail.blueprintPdfUrl },
                { name: 'Instalaciones Eléctricas y Domótica (PDF)', size: '2.1 MB', type: 'Ingeniería', url: unitDetail.electricalPdfUrl },
                { name: 'Instalaciones Hidrosanitarias (PDF)', size: '1.8 MB', type: 'Sanitaria', url: unitDetail.hydraulicPdfUrl },
                { name: 'Boleto de Compraventa y Certificado de Dominio', size: '4.5 MB', type: 'Legal', url: unitDetail.deedPdfUrl }
              ].map((doc, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#8E1E19]" />
                    <div>
                      <div className="font-bold text-[#1B1C1E]">{doc.name}</div>
                      <div className="text-[10px] text-[#5B5F63]">{doc.type} • {doc.size}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (doc.url && doc.url !== '#' && !doc.url.startsWith('#')) {
                        window.open(doc.url, '_blank', 'noopener,noreferrer');
                      } else {
                        setDownloadModalDoc(doc.name);
                      }
                    }}
                    className="px-3.5 py-1.5 bg-[#FAF9FB] hover:bg-[#FFDAD5]/50 text-[#8E1E19] font-bold rounded-lg border border-[#E0BFBB] flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Download Modal feedback */}
      {downloadModalDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-[#1B1C1E]">Descarga de Documento</h3>
              <p className="text-xs text-[#5B5F63] mt-1">{downloadModalDoc}</p>
            </div>
            <button
              onClick={() => setDownloadModalDoc(null)}
              className="w-full py-2.5 bg-[#8E1E19] text-white text-xs font-bold rounded-xl"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
