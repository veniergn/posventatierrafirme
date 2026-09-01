import React, { useState } from 'react';
import { Project, User, ProjectTypology, ProjectAmenity, UnitDetail, UnidadMapeada, ObraVolumetria } from '../../types';
import { InteractiveBuilding } from '../VolumetricViewer/InteractiveBuilding';
import { AdvisorContactModal } from './AdvisorContactModal';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Box, 
  Layers, 
  Sparkles, 
  Phone, 
  MessageSquare, 
  Download, 
  Check, 
  Maximize2,
  FileText,
  ShieldCheck,
  Building,
  DollarSign,
  X
} from 'lucide-react';

interface ProjectCommercialDetailProps {
  project: Project;
  user: User;
  units?: UnitDetail[];
  mappedUnits?: UnidadMapeada[];
  volumetria?: ObraVolumetria;
  onBack: () => void;
  onExpandImage?: (url: string) => void;
}

export const ProjectCommercialDetail: React.FC<ProjectCommercialDetailProps> = ({
  project,
  user,
  units = [],
  mappedUnits = [],
  volumetria,
  onBack,
  onExpandImage
}) => {
  const [activeTab, setActiveTab] = useState<'volumetria' | 'plantas' | 'amenities'>('volumetria');
  const [selectedTypologyId, setSelectedTypologyId] = useState<string>(
    project.typologies?.[0]?.id || ''
  );
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
  const [downloadModalDoc, setDownloadModalDoc] = useState<string | null>(null);
  const [selectedUnitDetail, setSelectedUnitDetail] = useState<UnitDetail | null>(null);

  const typologies = project.typologies || [];
  const selectedTypology = typologies.find((t) => t.id === selectedTypologyId) || typologies[0];
  const amenities = project.amenitiesList || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-20">
      {/* Top Breadcrumb & Back Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#E0E3E7] text-[#1B1C1E] hover:bg-gray-50 text-xs font-bold transition-all shadow-xs w-fit"
        >
          <ArrowLeft className="w-4 h-4 text-[#8E1E19]" />
          <span>Volver al Portfolio de Proyectos</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-[#FFDAD5] text-[#8A1B17] text-xs font-bold rounded-full border border-[#E0BFBB]">
            {project.commercialStatus || project.status}
          </span>
          <span className="text-xs font-bold text-[#5B5F63]">
            {project.progress}% Avance de Obra
          </span>
        </div>
      </div>

      {/* Hero Overview Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#E0E3E7] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8E1E19] flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5" /> Desarrollo Inmobiliario Tierra Firme®
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B1C1E] tracking-tight">
              {project.name}
            </h1>
            <p className="text-xs text-[#5B5F63] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#8E1E19]" />
              {project.address}
            </p>
          </div>

          <div className="flex flex-row md:flex-col items-start md:items-end justify-between border-t md:border-t-0 md:border-l border-[#E0E3E7] pt-3 md:pt-0 md:pl-6 gap-2">
            <div>
              <span className="text-[11px] text-[#5B5F63] block">Fecha de Entrega Estimada</span>
              <span className="text-sm font-bold text-[#1B1C1E] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#8E1E19]" />
                {project.estimatedDelivery}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#5B5F63] block">Unidades Disponibles</span>
              <span className="text-sm font-extrabold text-[#005613]">
                {project.totalUnits - project.unitsSold} de {project.totalUnits}
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#5B5F63] leading-relaxed pt-2 border-t border-[#E0E3E7]">
          {project.description}
        </p>

        {/* 3 Main View Switcher Tabs */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('volumetria')}
            className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === 'volumetria'
                ? 'bg-[#8E1E19] text-white shadow-md'
                : 'bg-[#FAF9FB] text-[#5B5F63] hover:bg-gray-100 border border-[#E0E3E7]'
            }`}
          >
            <Box className="w-4 h-4" />
            <span className="truncate">Volumetría Interactiva</span>
          </button>

          <button
            onClick={() => setActiveTab('plantas')}
            className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === 'plantas'
                ? 'bg-[#8E1E19] text-white shadow-md'
                : 'bg-[#FAF9FB] text-[#5B5F63] hover:bg-gray-100 border border-[#E0E3E7]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="truncate">Plantas & Tipologías</span>
          </button>

          <button
            onClick={() => setActiveTab('amenities')}
            className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === 'amenities'
                ? 'bg-[#8E1E19] text-white shadow-md'
                : 'bg-[#FAF9FB] text-[#5B5F63] hover:bg-gray-100 border border-[#E0E3E7]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="truncate">Amenities & Servicios</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          TAB 1: VOLUMETRÍA Y RENDERS 3D
      ======================================================== */}
      {activeTab === 'volumetria' && (
        <div className="space-y-6">
          {volumetria ? (
            <InteractiveBuilding
              volumetria={volumetria}
              mappedUnits={mappedUnits}
              units={units}
              onSelectUnit={(unit) => setSelectedUnitDetail(unit)}
            />
          ) : (
            <div className="h-[50vh] bg-gray-100 rounded-2xl flex items-center justify-center border border-gray-200">
              <p className="text-gray-500 font-semibold text-sm flex items-center gap-2">
                <Box className="w-5 h-5" />
                La volumetría interactiva no está disponible para este proyecto aún.
              </p>
            </div>
          )}

          {/* Architectural Notes & Specs */}
          <div className="bg-white rounded-2xl p-6 border border-[#E0E3E7] shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#1B1C1E] flex items-center gap-2">
              <Box className="w-4 h-4 text-[#8E1E19]" />
              Memoria Arquitectónica & Diseño Volumétrico
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-[#FAF9FB] rounded-xl border border-[#E0E3E7] space-y-1.5">
                <span className="font-bold text-[#1B1C1E] block">Orientación & Eficiencia</span>
                <p className="text-[#5B5F63] leading-relaxed">
                  Volumetría pasiva orientada al norte para maximizar el asoleamiento invernal y reducir un 35% el consumo energético en climatización.
                </p>
              </div>

              <div className="p-4 bg-[#FAF9FB] rounded-xl border border-[#E0E3E7] space-y-1.5">
                <span className="font-bold text-[#1B1C1E] block">Materialidad Noble</span>
                <p className="text-[#5B5F63] leading-relaxed">
                  Hormigón visto tratado con hidrorrepelentes, carpinterías de aluminio A30 New con DVH y parasoles de aluminio anodizado.
                </p>
              </div>

              <div className="p-4 bg-[#FAF9FB] rounded-xl border border-[#E0E3E7] space-y-1.5">
                <span className="font-bold text-[#1B1C1E] block">Visuales Despejadas</span>
                <p className="text-[#5B5F63] leading-relaxed">
                  Balcones aterrazados continuos con barandas vidriadas que integran el interior con el paisaje urbano y el verde circundante.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: PLANTAS Y TIPOLOGÍAS
      ======================================================== */}
      {activeTab === 'plantas' && (
        <div className="space-y-6">
          {/* Typologies selector pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {typologies.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTypologyId(t.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedTypology?.id === t.id
                    ? 'bg-[#8E1E19] text-white shadow-xs'
                    : 'bg-white text-[#5B5F63] hover:bg-gray-50 border border-[#E0E3E7]'
                }`}
              >
                <span>{t.rooms}</span>
                <span className="text-[10px] opacity-80">({t.surfaceM2} m²)</span>
              </button>
            ))}
          </div>

          {selectedTypology && (
            <div className="bg-white rounded-2xl border border-[#E0E3E7] overflow-hidden shadow-xs space-y-6 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E0E3E7] pb-4">
                <div>
                  <span className="text-[11px] font-bold text-[#8E1E19] uppercase tracking-wider">
                    {selectedTypology.rooms}
                  </span>
                  <h3 className="text-xl font-bold text-[#1B1C1E]">
                    {selectedTypology.title}
                  </h3>
                  <p className="text-xs text-[#5B5F63] mt-1">
                    {selectedTypology.description}
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <span className="text-[11px] text-[#5B5F63] block">Valor Estimado</span>
                  <span className="text-lg font-extrabold text-[#8E1E19]">
                    {selectedTypology.priceEstimate || 'Consultar Lista Especial'}
                  </span>
                  {selectedTypology.unitsAvailable && (
                    <span className="text-[10px] text-[#005613] font-bold block mt-0.5">
                      {selectedTypology.unitsAvailable} unidades disponibles
                    </span>
                  )}
                </div>
              </div>

              {/* Surface & Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 bg-[#FAF9FB] rounded-xl border border-[#E0E3E7]">
                  <span className="text-[#5B5F63] block">Superficie Total</span>
                  <span className="text-lg font-extrabold text-[#1B1C1E]">
                    {selectedTypology.surfaceM2} m²
                  </span>
                </div>
                <div className="p-3.5 bg-[#FAF9FB] rounded-xl border border-[#E0E3E7]">
                  <span className="text-[#5B5F63] block">Sup. Cubierta</span>
                  <span className="text-lg font-extrabold text-[#1B1C1E]">
                    {selectedTypology.surfaceM2 - selectedTypology.balconyM2} m²
                  </span>
                </div>
                <div className="p-3.5 bg-[#FAF9FB] rounded-xl border border-[#E0E3E7]">
                  <span className="text-[#5B5F63] block">Balcón Terraza</span>
                  <span className="text-lg font-extrabold text-[#8E1E19]">
                    {selectedTypology.balconyM2} m²
                  </span>
                </div>
                <div className="p-3.5 bg-[#FAF9FB] rounded-xl border border-[#E0E3E7]">
                  <span className="text-[#5B5F63] block">Cochera Opcional</span>
                  <span className="text-lg font-extrabold text-[#1B1C1E]">
                    Subsuelo 1 / 2
                  </span>
                </div>
              </div>

              {/* Floor Plan Display */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B1C1E]">
                    Esquema de Planta & Distribución
                  </h4>
                  <button
                    onClick={() => setDownloadModalDoc(`Plano_Tipologia_${selectedTypology.title}.pdf`)}
                    className="text-xs font-bold text-[#8E1E19] hover:underline flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Descargar Ficha Técnica PDF
                  </button>
                </div>

                <div className="bg-[#14213d] rounded-xl p-6 border border-cyan-500/30 flex items-center justify-center relative group min-h-[260px]">
                  {/* Schematic SVG Layout */}
                  <svg
                    viewBox="0 0 500 280"
                    className="w-full h-full max-w-[420px] font-mono text-cyan-400 text-xs"
                  >
                    <rect x="20" y="20" width="460" height="240" fill="rgba(6, 182, 212, 0.05)" stroke="#38bdf8" strokeWidth="2" />
                    
                    {/* Living */}
                    <rect x="20" y="20" width="260" height="150" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3" />
                    <text x="40" y="55" fill="#38bdf8" fontSize="12" fontWeight="bold">ESTAR / COMEDOR</text>
                    <text x="40" y="75" fill="#94a3b8" fontSize="10">5.80 x 4.20 m</text>

                    {/* Balcony */}
                    <rect x="20" y="170" width="260" height="90" fill="rgba(56, 189, 248, 0.1)" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="40" y="205" fill="#38bdf8" fontSize="11" fontWeight="bold">TERRAZA ATERRAZADA</text>
                    <text x="40" y="225" fill="#94a3b8" fontSize="9">Parrilla individual</text>

                    {/* Bedroom Suite */}
                    <rect x="280" y="20" width="200" height="140" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="295" y="55" fill="#38bdf8" fontSize="11" fontWeight="bold">DORMITORIO PRINCIPAL</text>
                    <text x="295" y="75" fill="#94a3b8" fontSize="10">3.60 x 3.40 m</text>

                    {/* Kitchen & Bath */}
                    <rect x="280" y="160" width="100" height="100" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="290" y="195" fill="#38bdf8" fontSize="9" fontWeight="bold">BAÑO</text>

                    <rect x="380" y="160" width="100" height="100" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="390" y="195" fill="#38bdf8" fontSize="9" fontWeight="bold">COCINA</text>
                  </svg>
                </div>
              </div>

              {/* Quality Features List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B1C1E]">
                  Equipamiento y Terminaciones Incluidas
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedTypology.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#FAF9FB] rounded-xl border border-[#E0E3E7] flex items-start gap-2 text-xs"
                    >
                      <Check className="w-4 h-4 text-[#005613] shrink-0 mt-0.5" />
                      <span className="text-[#1B1C1E] font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          TAB 3: AMENITIES Y SERVICIOS
      ======================================================== */}
      {activeTab === 'amenities' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {amenities.map((amenity) => (
              <div
                key={amenity.id}
                className="bg-white rounded-2xl border border-[#E0E3E7] overflow-hidden shadow-xs flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 bg-gray-100 group overflow-hidden">
                  <img
                    src={amenity.renderUrl}
                    alt={amenity.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => onExpandImage && onExpandImage(amenity.renderUrl)}
                      className="p-2 bg-black/40 hover:bg-black/70 text-white rounded-full backdrop-blur-xs transition-colors"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h4 className="font-bold text-base">{amenity.title}</h4>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-[#5B5F63] leading-relaxed">
                    {amenity.description}
                  </p>
                  <div className="mt-3 pt-3 border-t border-[#E0E3E7] flex items-center justify-between text-[11px] text-[#8E1E19] font-semibold">
                    <span>Uso exclusivo para copropietarios</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Building Services Checklist */}
          <div className="bg-white rounded-2xl p-6 border border-[#E0E3E7] shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#1B1C1E]">
              Servicios Centrales & Seguridad
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-[#FAF9FB] rounded-xl border border-[#E0E3E7]">
                <ShieldCheck className="w-4 h-4 text-[#8E1E19] mb-1" />
                <span className="font-bold text-[#1B1C1E] block">Seguridad 24/7</span>
                <span className="text-[10px] text-[#5B5F63]">CCTV y control biométrico</span>
              </div>
              <div className="p-3 bg-[#FAF9FB] rounded-xl border border-[#E0E3E7]">
                <TrendingUp className="w-4 h-4 text-[#8E1E19] mb-1" />
                <span className="font-bold text-[#1B1C1E] block">Bajas Expensas</span>
                <span className="text-[10px] text-[#5B5F63]">Energía solar para comunes</span>
              </div>
              <div className="p-3 bg-[#FAF9FB] rounded-xl border border-[#E0E3E7]">
                <Building className="w-4 h-4 text-[#8E1E19] mb-1" />
                <span className="font-bold text-[#1B1C1E] block">Cocheras & Bauleras</span>
                <span className="text-[10px] text-[#5B5F63]">Subsuelos con rampa ancha</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          STICKY / FLOATING COMMERCIAL ADVISOR CTA
      ======================================================== */}
      <div className="fixed bottom-14 left-0 right-0 z-20 px-4 max-w-4xl mx-auto pointer-events-none">
        <div className="pointer-events-auto bg-[#1B1C1E] text-white p-3.5 rounded-2xl shadow-2xl border border-[#4E5256] flex flex-col sm:flex-row items-center justify-between gap-3 backdrop-blur-md">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-[#FFDAD5] text-[#8A1B17] font-extrabold flex items-center justify-center text-xs shrink-0">
              {project.advisorName?.split(' ')[0][0] || 'T'}{project.advisorName?.split(' ')[1]?.[0] || 'F'}
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                ¿Interesado en una unidad en {project.name}?
              </div>
              <div className="text-[11px] text-[#FFA095]">
                Asesor asignado: <strong>{project.advisorName || 'Lic. Matías Valenzuela'}</strong>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsAdvisorModalOpen(true)}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#8E1E19] hover:bg-[#6D0205] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Consultar con Asesor Inmobiliario</span>
          </button>
        </div>
      </div>

      {/* Advisor Contact Modal */}
      <AdvisorContactModal
        isOpen={isAdvisorModalOpen}
        onClose={() => setIsAdvisorModalOpen(false)}
        project={project}
        user={user}
      />

      {/* Simulated Document Download */}
      {downloadModalDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-[#1B1C1E]">Ficha Técnica Descargada</h3>
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

      {/* Unit Detail Modal */}
      {selectedUnitDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E0E3E7] flex flex-col">
            <div className="relative h-48 bg-gray-100">
              <img
                src={selectedUnitDetail.mainRender}
                alt={selectedUnitDetail.unitNumber}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedUnitDetail(null)}
                className="absolute top-3 right-3 p-1.5 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-4 text-white">
                <span className="px-2.5 py-0.5 bg-[#8E1E19] text-white text-[10px] font-bold rounded uppercase">
                  {selectedUnitDetail.status}
                </span>
                <h3 className="text-xl font-bold mt-1">{selectedUnitDetail.unitNumber}</h3>
                <p className="text-xs text-gray-200">{selectedUnitDetail.complexName} • {selectedUnitDetail.address}</p>
              </div>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-[#FAF9FB] p-3 rounded-xl border border-[#E0E3E7]">
                  <span className="text-[10px] text-[#5B5F63] block font-bold">Superficie Total</span>
                  <span className="font-extrabold text-sm text-[#1B1C1E]">{selectedUnitDetail.surfaceM2} m²</span>
                </div>
                <div className="bg-[#FAF9FB] p-3 rounded-xl border border-[#E0E3E7]">
                  <span className="text-[10px] text-[#5B5F63] block font-bold">Dormitorios</span>
                  <span className="font-extrabold text-sm text-[#1B1C1E]">{selectedUnitDetail.bedrooms}</span>
                </div>
                <div className="bg-[#FAF9FB] p-3 rounded-xl border border-[#E0E3E7]">
                  <span className="text-[10px] text-[#5B5F63] block font-bold">Cochera & Baulera</span>
                  <span className="font-extrabold text-sm text-[#1B1C1E]">{selectedUnitDetail.parking}</span>
                </div>
              </div>

              <div className="bg-[#FAF9FB] p-4 rounded-xl border border-[#E0E3E7] space-y-2">
                <span className="font-bold text-[#1B1C1E] block">Renders y Planos Técnicos</span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {selectedUnitDetail.mainRender && (
                    <button onClick={() => onExpandImage && onExpandImage(selectedUnitDetail.mainRender)} className="p-2 bg-white rounded border border-[#E0E3E7] text-[#8E1E19] font-bold flex items-center gap-1.5 hover:bg-gray-50">
                      <Maximize2 className="w-3.5 h-3.5" /> Ver Render Principal
                    </button>
                  )}
                  {selectedUnitDetail.livingRender && (
                    <button onClick={() => onExpandImage && onExpandImage(selectedUnitDetail.livingRender)} className="p-2 bg-white rounded border border-[#E0E3E7] text-[#8E1E19] font-bold flex items-center gap-1.5 hover:bg-gray-50">
                      <Maximize2 className="w-3.5 h-3.5" /> Ver Render Living
                    </button>
                  )}
                  <a href={selectedUnitDetail.blueprintPdfUrl} className="p-2 bg-white rounded border border-[#E0E3E7] text-[#5B5F63] font-bold flex items-center gap-1.5 hover:bg-gray-50">
                    <FileText className="w-3.5 h-3.5" /> Plano Arquitectónico
                  </a>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedUnitDetail(null)}
                  className="px-5 py-2 bg-[#8E1E19] text-white font-bold rounded-xl"
                >
                  Cerrar Detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
