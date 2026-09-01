import React, { useState } from 'react';
import { UnitDetail, ObraVolumetria, UnidadMapeada } from '../../../types';
import { X, ExternalLink, BoxSelect, MapPin, Maximize } from 'lucide-react';

interface InteractiveBuildingProps {
  volumetria: ObraVolumetria;
  mappedUnits: UnidadMapeada[];
  units: UnitDetail[];
  onSelectUnit?: (unit: UnitDetail) => void;
}

export const InteractiveBuilding: React.FC<InteractiveBuildingProps> = ({
  volumetria,
  mappedUnits,
  units,
  onSelectUnit
}) => {
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<UnitDetail | null>(null);

  const handleUnitClick = (mapping: UnidadMapeada) => {
    const unit = units.find(u => u.id === mapping.unidad_id);
    if (unit) {
      setSelectedUnit(unit);
    }
  };

  return (
    <div className="relative w-full h-[60vh] sm:h-[75vh] bg-gray-100 rounded-2xl overflow-hidden shadow-inner flex flex-col">
      {/* Title / Toolbar */}
      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-md border border-white flex items-center gap-2">
        <BoxSelect className="w-4 h-4 text-[#8E1E19]" />
        <span className="text-xs font-bold text-[#1B1C1E]">Volumetría Interactiva</span>
      </div>

      <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-[10px] font-semibold flex items-center gap-1">
        <Maximize className="w-3 h-3" /> Toca una unidad
      </div>

      {/* Main Interactive Area */}
      <div className="flex-1 relative w-full h-full overflow-hidden touch-pan-y">
        <img 
          src={volumetria.imagen_url} 
          alt={volumetria.nombre}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />

        <svg 
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          {mappedUnits.filter(m => m.volumetria_id === volumetria.id).map(mapping => {
            const points = mapping.polygon_points.split(' ').map(p => {
              const [x, y] = p.split(',');
              return `${x}%,${y}%`;
            }).join(' ');

            const isHovered = hoveredUnit === mapping.id;
            const isSelected = selectedUnit?.id === mapping.unidad_id;

            return (
              <polygon
                key={mapping.id}
                points={points}
                fill={isHovered || isSelected ? 'rgba(255, 255, 255, 0.4)' : 'transparent'}
                stroke={isHovered || isSelected ? '#FFFFFF' : 'transparent'}
                strokeWidth={isHovered || isSelected ? "3" : "0"}
                className="cursor-pointer transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                onMouseEnter={() => setHoveredUnit(mapping.id)}
                onMouseLeave={() => setHoveredUnit(null)}
                onClick={() => handleUnitClick(mapping)}
              />
            );
          })}
        </svg>
      </div>

      {/* Bottom Sheet Modal for Selected Unit */}
      <div className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.15)] transition-transform duration-500 ease-spring ${selectedUnit ? 'translate-y-0' : 'translate-y-full'}`}>
        {selectedUnit && (
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase rounded-md mb-2">
                  {selectedUnit.status}
                </span>
                <h3 className="text-xl font-extrabold text-[#1B1C1E]">
                  Unidad {selectedUnit.unitNumber}
                </h3>
                <p className="text-xs text-[#5B5F63] flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5" /> {selectedUnit.complexName}
                </p>
              </div>
              <button 
                onClick={() => setSelectedUnit(null)}
                className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-[#FAF9FB] p-3 rounded-xl border border-[#E0E3E7]">
                <p className="text-[10px] text-[#5B5F63] font-semibold uppercase">Superficie</p>
                <p className="text-sm font-bold text-[#1B1C1E]">{selectedUnit.surfaceM2} m²</p>
              </div>
              <div className="bg-[#FAF9FB] p-3 rounded-xl border border-[#E0E3E7]">
                <p className="text-[10px] text-[#5B5F63] font-semibold uppercase">Ambientes</p>
                <p className="text-sm font-bold text-[#1B1C1E]">{selectedUnit.rooms}</p>
              </div>
              <div className="bg-[#FAF9FB] p-3 rounded-xl border border-[#E0E3E7]">
                <p className="text-[10px] text-[#5B5F63] font-semibold uppercase">Orientación</p>
                <p className="text-sm font-bold text-[#1B1C1E]">{selectedUnit.orientation || 'N/A'}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => {
                  if (onSelectUnit) onSelectUnit(selectedUnit);
                  setSelectedUnit(null);
                }}
                className="flex-1 py-3 bg-[#1B1C1E] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Ver Planos e Imágenes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
