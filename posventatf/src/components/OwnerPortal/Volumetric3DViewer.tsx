import React, { useState } from 'react';
import { Project, VolumetricRender } from '../../types';
import { 
  RotateCw, 
  RotateCcw, 
  Sun, 
  Moon, 
  Layers, 
  Maximize2, 
  Compass, 
  Box, 
  Sparkles,
  Eye,
  Camera,
  Grid
} from 'lucide-react';

interface Volumetric3DViewerProps {
  project: Project;
  onExpandRender?: (url: string) => void;
}

export const Volumetric3DViewer: React.FC<Volumetric3DViewerProps> = ({
  project,
  onExpandRender
}) => {
  const [viewMode, setViewMode] = useState<'3d_interactive' | 'photorealistic'>('3d_interactive');
  const [lightingMode, setLightingMode] = useState<'day' | 'night' | 'sunset'>('day');
  const [displayMode, setDisplayMode] = useState<'rendered' | 'wireframe'>('rendered');
  const [rotationAngle, setRotationAngle] = useState<number>(35);
  const [elevationAngle, setElevationAngle] = useState<number>(20);
  const [selectedFloor, setSelectedFloor] = useState<string>('all');
  const [activeRenderIndex, setActiveRenderIndex] = useState<number>(0);

  const renders = project.volumetricRenders || [
    {
      id: 'vr-default-1',
      title: 'Fachada Principal Diurna',
      category: 'diurno' as const,
      url: project.image,
      description: 'Vista frontal con orientación norte y protección solar pasiva.'
    }
  ];

  const handleRotateLeft = () => {
    setRotationAngle((prev) => (prev - 30 + 360) % 360);
  };

  const handleRotateRight = () => {
    setRotationAngle((prev) => (prev + 30) % 360);
  };

  const handleResetOrientation = () => {
    setRotationAngle(35);
    setElevationAngle(20);
    setSelectedFloor('all');
  };

  // Lighting backgrounds
  const getSkyBackground = () => {
    if (lightingMode === 'night') {
      return 'from-[#0B0F19] via-[#111827] to-[#1E1B4B]';
    }
    if (lightingMode === 'sunset') {
      return 'from-[#4C1D95] via-[#831843] to-[#C2410C]';
    }
    return 'from-[#1E293B] via-[#334155] to-[#475569]';
  };

  return (
    <div className="space-y-4">
      {/* View Switcher Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-[#E0E3E7] shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('3d_interactive')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              viewMode === '3d_interactive'
                ? 'bg-[#8E1E19] text-white shadow-xs'
                : 'bg-[#FAF9FB] text-[#5B5F63] hover:bg-gray-100'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>Simulador Volumétrico 3D</span>
          </button>

          <button
            onClick={() => setViewMode('photorealistic')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              viewMode === 'photorealistic'
                ? 'bg-[#8E1E19] text-white shadow-xs'
                : 'bg-[#FAF9FB] text-[#5B5F63] hover:bg-gray-100'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Galería de Renders y Vistas</span>
          </button>
        </div>

        {viewMode === '3d_interactive' && (
          <div className="flex items-center gap-2 text-xs">
            {/* Day / Sunset / Night mode */}
            <div className="flex items-center bg-[#FAF9FB] p-1 rounded-lg border border-[#E0E3E7]">
              <button
                onClick={() => setLightingMode('day')}
                className={`p-1.5 rounded-md transition-colors ${
                  lightingMode === 'day' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-gray-400 hover:text-gray-700'
                }`}
                title="Iluminación Diurna"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setLightingMode('sunset')}
                className={`p-1.5 rounded-md transition-colors ${
                  lightingMode === 'sunset' ? 'bg-orange-100 text-orange-900 font-bold' : 'text-gray-400 hover:text-gray-700'
                }`}
                title="Atardecer Dorado"
              >
                <Sparkles className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setLightingMode('night')}
                className={`p-1.5 rounded-md transition-colors ${
                  lightingMode === 'night' ? 'bg-indigo-100 text-indigo-900 font-bold' : 'text-gray-400 hover:text-gray-700'
                }`}
                title="Iluminación Nocturna"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Rendered vs Wireframe */}
            <button
              onClick={() => setDisplayMode(displayMode === 'rendered' ? 'wireframe' : 'rendered')}
              className={`p-2 rounded-lg border border-[#E0E3E7] font-semibold flex items-center gap-1.5 ${
                displayMode === 'wireframe' ? 'bg-[#FFDAD5] text-[#8A1B17]' : 'bg-[#FAF9FB] text-[#5B5F63]'
              }`}
              title="Alternar estructura alámbrica"
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">{displayMode === 'rendered' ? 'Estructura 3D' : 'Volumetría'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Display Area */}
      {viewMode === '3d_interactive' ? (
        <div className="space-y-3">
          {/* 3D Canvas Simulator Container */}
          <div className={`relative h-[380px] sm:h-[420px] rounded-2xl bg-gradient-to-b ${getSkyBackground()} p-4 overflow-hidden border border-[#33363A] shadow-xl flex items-center justify-center select-none`}>
            {/* HUD Status Overlay */}
            <div className="absolute top-4 left-4 z-10 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/50 text-white/90 backdrop-blur-md text-[11px] font-mono border border-white/10">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ángulo: {rotationAngle}° | Elevación: {elevationAngle}°</span>
              </div>
              <div className="text-[10px] text-gray-300 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                {displayMode === 'rendered' ? 'Volumetría Arquitectónica HD' : 'Estructura & Masa de Hormigón'}
              </div>
            </div>

            {/* Interactive SVG 3D Isometric / Orthographic Building Model */}
            <div 
              className="w-full h-full flex items-center justify-center transition-transform duration-300"
              style={{
                transform: `rotate(${rotationAngle * 0.05}deg) scale(0.95)`
              }}
            >
              <svg
                viewBox="0 0 500 400"
                className="w-full h-full max-w-[460px] drop-shadow-2xl"
              >
                <defs>
                  {/* Gradients based on lighting */}
                  <linearGradient id="wallGradientFront" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={lightingMode === 'night' ? '#1e293b' : '#e2e8f0'} />
                    <stop offset="100%" stopColor={lightingMode === 'night' ? '#0f172a' : '#94a3b8'} />
                  </linearGradient>
                  
                  <linearGradient id="wallGradientSide" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={lightingMode === 'night' ? '#0f172a' : '#cbd5e1'} />
                    <stop offset="100%" stopColor={lightingMode === 'night' ? '#020617' : '#64748b'} />
                  </linearGradient>

                  <linearGradient id="terracottaAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A8322D" />
                    <stop offset="100%" stopColor="#6D0205" />
                  </linearGradient>

                  <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={lightingMode === 'night' ? '#fbbf24' : '#38bdf8'} stopOpacity={lightingMode === 'night' ? '0.7' : '0.5'} />
                    <stop offset="100%" stopColor={lightingMode === 'night' ? '#f59e0b' : '#0284c7'} stopOpacity={lightingMode === 'night' ? '0.9' : '0.3'} />
                  </linearGradient>

                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Ground Platform Grid */}
                <ellipse cx="250" cy="350" rx="190" ry="40" fill="rgba(0,0,0,0.3)" />
                <path d="M 60 350 L 250 310 L 440 350 L 250 390 Z" fill={lightingMode === 'night' ? '#1e1b4b' : '#334155'} stroke="#475569" strokeWidth="1" opacity="0.6" />

                {/* Building Base / Ground Floor */}
                <g opacity={selectedFloor === 'all' || selectedFloor === 'ground' ? 1 : 0.25} className="transition-opacity duration-300">
                  {/* Left Facade Base */}
                  <polygon points="160,330 250,300 250,260 160,285" fill={displayMode === 'wireframe' ? 'none' : 'url(#wallGradientSide)'} stroke="#38bdf8" strokeWidth="1.5" />
                  {/* Right Facade Base */}
                  <polygon points="250,300 340,330 340,285 250,260" fill={displayMode === 'wireframe' ? 'none' : 'url(#wallGradientFront)'} stroke="#38bdf8" strokeWidth="1.5" />
                  {/* Ground floor commercial windows */}
                  <polygon points="175,315 240,295 240,270 175,290" fill="url(#glassGradient)" stroke="#0284c7" strokeWidth="1" />
                  <polygon points="260,295 325,315 325,290 260,270" fill="url(#glassGradient)" stroke="#0284c7" strokeWidth="1" />
                </g>

                {/* Tower Body / Residential Levels 1 to 8 */}
                <g opacity={selectedFloor === 'all' || selectedFloor === 'residential' ? 1 : 0.25} className="transition-opacity duration-300">
                  {/* Main West Face */}
                  <polygon points="160,285 250,260 250,110 160,135" fill={displayMode === 'wireframe' ? 'none' : 'url(#wallGradientSide)'} stroke="#38bdf8" strokeWidth="1.5" />
                  
                  {/* Main North Face */}
                  <polygon points="250,260 340,285 340,135 250,110" fill={displayMode === 'wireframe' ? 'none' : 'url(#wallGradientFront)'} stroke="#38bdf8" strokeWidth="1.5" />

                  {/* Terracotta vertical architectural blade */}
                  <polygon points="248,260 252,260 252,105 248,105" fill="url(#terracottaAccent)" stroke="#FFDAD5" strokeWidth="0.5" />

                  {/* Terraced Balconies (Floors 1-6) */}
                  {[0, 1, 2, 3, 4, 5].map((i) => {
                    const yOffset = i * 24;
                    return (
                      <g key={i}>
                        {/* Balcony Left */}
                        <polygon
                          points={`150,${270 - yOffset} 240,${245 - yOffset} 240,${238 - yOffset} 150,${263 - yOffset}`}
                          fill="url(#terracottaAccent)"
                          stroke="#FFA095"
                          strokeWidth="1"
                        />
                        {/* Windows Left */}
                        <polygon
                          points={`165,${260 - yOffset} 235,${240 - yOffset} 235,${222 - yOffset} 165,${242 - yOffset}`}
                          fill="url(#glassGradient)"
                          stroke="#38bdf8"
                          strokeWidth="0.5"
                          filter={lightingMode === 'night' ? 'url(#glow)' : undefined}
                        />

                        {/* Balcony Right */}
                        <polygon
                          points={`260,${245 - yOffset} 350,${270 - yOffset} 350,${263 - yOffset} 260,${238 - yOffset}`}
                          fill="url(#terracottaAccent)"
                          stroke="#FFA095"
                          strokeWidth="1"
                        />
                        {/* Windows Right */}
                        <polygon
                          points={`265,${240 - yOffset} 335,${260 - yOffset} 335,${242 - yOffset} 265,${222 - yOffset}`}
                          fill="url(#glassGradient)"
                          stroke="#38bdf8"
                          strokeWidth="0.5"
                          filter={lightingMode === 'night' ? 'url(#glow)' : undefined}
                        />
                      </g>
                    );
                  })}
                </g>

                {/* Rooftop Penthouse & Amenities Deck */}
                <g opacity={selectedFloor === 'all' || selectedFloor === 'rooftop' ? 1 : 0.25} className="transition-opacity duration-300">
                  {/* Top Roof Surface */}
                  <polygon points="160,135 250,110 340,135 250,160" fill={lightingMode === 'night' ? '#312e81' : '#f1f5f9'} stroke="#38bdf8" strokeWidth="2" />
                  
                  {/* Sky Lounge Pergola */}
                  <polygon points="190,130 250,115 310,130 250,145" fill="none" stroke="#8E1E19" strokeWidth="2" strokeDasharray="3" />
                  
                  {/* Infinity Pool Simulation */}
                  <polygon points="210,140 250,130 290,140 250,150" fill="#06b6d4" opacity="0.8" filter={lightingMode === 'night' ? 'url(#glow)' : undefined} />
                </g>

                {/* Architectural Compass North Indicator */}
                <g transform="translate(420, 80)">
                  <circle cx="0" cy="0" r="22" fill="rgba(0,0,0,0.5)" stroke="#38bdf8" strokeWidth="1" />
                  <path d="M 0 -18 L 6 0 L -6 0 Z" fill="#ef4444" />
                  <path d="M 0 18 L 6 0 L -6 0 Z" fill="#94a3b8" />
                  <text x="-4" y="-22" fill="#ef4444" fontSize="10" fontWeight="bold">N</text>
                </g>
              </svg>
            </div>

            {/* Interactive Orbit Buttons on bottom corners */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1 rounded-xl border border-white/15">
              <button
                onClick={handleRotateLeft}
                className="p-2 hover:bg-white/20 text-white rounded-lg transition-colors"
                title="Girar a la izquierda"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetOrientation}
                className="px-2.5 py-1 text-[11px] font-bold text-cyan-300 hover:text-white transition-colors"
                title="Restablecer"
              >
                Frontal
              </button>
              <button
                onClick={handleRotateRight}
                className="p-2 hover:bg-white/20 text-white rounded-lg transition-colors"
                title="Girar a la derecha"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Floor Filter */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-xl border border-white/15 text-[11px] text-white">
              <button
                onClick={() => setSelectedFloor('all')}
                className={`px-2 py-1 rounded-lg font-bold transition-all ${
                  selectedFloor === 'all' ? 'bg-[#8E1E19] text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Todo
              </button>
              <button
                onClick={() => setSelectedFloor('rooftop')}
                className={`px-2 py-1 rounded-lg font-bold transition-all ${
                  selectedFloor === 'rooftop' ? 'bg-[#8E1E19] text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Rooftop
              </button>
              <button
                onClick={() => setSelectedFloor('residential')}
                className={`px-2 py-1 rounded-lg font-bold transition-all ${
                  selectedFloor === 'residential' ? 'bg-[#8E1E19] text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Viviendas
              </button>
            </div>
          </div>

          {/* Helper caption */}
          <div className="p-3 bg-white rounded-xl border border-[#E0E3E7] text-xs text-[#5B5F63] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Orientación Solar Certificada: Máxima radiación diurna y ventilación cruzada garantizada.
            </span>
            <span className="font-semibold text-[#1B1C1E]">{project.address}</span>
          </div>
        </div>
      ) : (
        /* Photorealistic Renders Gallery View */
        <div className="space-y-4">
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-gray-900 border border-[#E0E3E7] group shadow-md">
            <img
              src={renders[activeRenderIndex]?.url || project.image}
              alt={renders[activeRenderIndex]?.title || project.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Top Tag */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-black/60 text-white backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider border border-white/20">
                {renders[activeRenderIndex]?.category || 'Fachada'}
              </span>
            </div>

            {/* Expand Button */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => onExpandRender && onExpandRender(renders[activeRenderIndex]?.url || project.image)}
                className="p-2.5 bg-black/60 hover:bg-black/90 text-white rounded-full backdrop-blur-md transition-colors"
                title="Ampliar en pantalla completa"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Caption */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h4 className="text-lg font-bold">
                {renders[activeRenderIndex]?.title}
              </h4>
              <p className="text-xs text-gray-200 mt-1 max-w-lg">
                {renders[activeRenderIndex]?.description || project.description}
              </p>
            </div>
          </div>

          {/* Thumbnails row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {renders.map((render, idx) => (
              <button
                key={render.id || idx}
                onClick={() => setActiveRenderIndex(idx)}
                className={`text-left rounded-xl overflow-hidden border-2 transition-all p-1 bg-white shadow-xs ${
                  activeRenderIndex === idx
                    ? 'border-[#8E1E19] ring-2 ring-[#8E1E19]/30 scale-[0.98]'
                    : 'border-[#E0E3E7] hover:border-gray-400 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="h-20 rounded-lg overflow-hidden bg-gray-100 mb-1.5">
                  <img
                    src={render.url}
                    alt={render.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-1 py-0.5">
                  <span className="text-[11px] font-bold text-[#1B1C1E] line-clamp-1 block">
                    {render.title}
                  </span>
                  <span className="text-[9px] text-[#8E1E19] uppercase font-bold">
                    {render.category}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
