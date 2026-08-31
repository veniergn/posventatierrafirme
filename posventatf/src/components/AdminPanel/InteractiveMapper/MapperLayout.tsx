import React, { useState, useRef, useEffect } from 'react';
import { UnitDetail, ObraVolumetria, UnidadMapeada } from '../../../types';
import { MousePointerClick, Save, Trash2, Undo, CheckCircle2, Image as ImageIcon, MapPin } from 'lucide-react';
import { FileDropzone } from '../../FileDropzone';

interface Point {
  x: number;
  y: number;
}

interface MapperLayoutProps {
  units: UnitDetail[];
  // Volumetric data
  volumetria?: ObraVolumetria;
  mappedUnits: UnidadMapeada[];
  onSaveMappedUnit: (mapping: UnidadMapeada) => void;
  onDeleteMappedUnit: (id: string) => void;
  onUpdateVolumetriaImage?: (url: string) => void;
}

export const MapperLayout: React.FC<MapperLayoutProps> = ({
  units,
  volumetria,
  mappedUnits,
  onSaveMappedUnit,
  onDeleteMappedUnit,
  onUpdateVolumetriaImage
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPolygon, setCurrentPolygon] = useState<Point[]>([]);
  const [selectedUnitId, setSelectedUnitId] = useState<string>('');
  const [hoveredPoly, setHoveredPoly] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<Point | null>(null);
  
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Default placeholder if no volumetria is provided
  const imgUrl = volumetria?.imagen_url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000";

  const getCoordinates = (e: React.MouseEvent<SVGSVGElement> | React.MouseEvent<HTMLDivElement>) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    return { x, y };
  };

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDrawing) return;
    const coords = getCoordinates(e);
    if (coords) setCurrentPolygon((prev) => [...prev, coords]);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDrawing) return;
    const coords = getCoordinates(e);
    if (coords) setMousePos(coords);
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  const handleUndo = () => {
    setCurrentPolygon((prev) => prev.slice(0, -1));
  };

  const handleCancel = () => {
    setIsDrawing(false);
    setCurrentPolygon([]);
    setSelectedUnitId('');
  };

  const handleSave = () => {
    if (currentPolygon.length < 3) {
      alert('Un polígono debe tener al menos 3 puntos.');
      return;
    }
    if (!selectedUnitId) {
      alert('Debes seleccionar una unidad para vincularla al polígono.');
      return;
    }

    // Convert points to string format: "x1,y1 x2,y2 ..."
    const pointsString = currentPolygon.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');

    const newMapping: UnidadMapeada = {
      id: `map-${Date.now()}`,
      volumetria_id: volumetria?.id || 'default-vol',
      unidad_id: selectedUnitId,
      polygon_points: pointsString,
      created_at: new Date().toISOString()
    };

    onSaveMappedUnit(newMapping);
    handleCancel();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] animate-in fade-in">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-[#1B1C1E]">Mapeo Volumétrico Interactivo</h2>
        <p className="text-sm text-[#5B5F63]">Dibuja polígonos sobre el render para hacerlos interactivos y vincularlos a unidades.</p>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        
        {/* LEFT PANEL: Canvas */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-[#E0E3E7] overflow-hidden flex flex-col relative">
          {/* Toolbar */}
          <div className="p-3 border-b border-[#E0E3E7] bg-gray-50 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDrawing(!isDrawing)}
                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors ${
                  isDrawing ? 'bg-[#8E1E19] text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <MousePointerClick className="w-4 h-4" />
                {isDrawing ? 'Modo Dibujo Activo' : 'Dibujar Nuevo Polígono'}
              </button>
              
              {isDrawing && currentPolygon.length > 0 && (
                <button
                  onClick={handleUndo}
                  className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-xs hover:bg-gray-100 flex items-center gap-2"
                >
                  <Undo className="w-4 h-4" /> Deshacer Punto
                </button>
              )}
            </div>
            
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <ImageIcon className="w-4 h-4" />
              Render Principal Activo
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 relative overflow-hidden bg-gray-100 cursor-crosshair group">
            {/* Base Image */}
            <img 
              src={imgUrl} 
              alt="Volumetria" 
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            />
            
            {/* SVG Overlay for Polygons */}
            <svg 
              ref={svgRef}
              className="absolute inset-0 w-full h-full"
              onClick={handleSvgClick}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              preserveAspectRatio="none"
            >
              {/* Existing Mapped Units */}
              {mappedUnits.map((mapping) => {
                const points = mapping.polygon_points.split(' ').map(p => {
                  const [x, y] = p.split(',');
                  return `${x}%,${y}%`;
                }).join(' ');
                
                const isHovered = hoveredPoly === mapping.id;

                return (
                  <polygon
                    key={mapping.id}
                    points={points}
                    fill={isHovered ? 'rgba(142, 30, 25, 0.4)' : 'rgba(142, 30, 25, 0.15)'}
                    stroke={isHovered ? '#8E1E19' : 'rgba(142, 30, 25, 0.5)'}
                    strokeWidth="2"
                    onMouseEnter={() => setHoveredPoly(mapping.id)}
                    onMouseLeave={() => setHoveredPoly(null)}
                    className="transition-all duration-200 cursor-pointer"
                  />
                );
              })}

              {/* Currently Drawing Polygon */}
              {isDrawing && currentPolygon.length > 0 && (
                <>
                  <polygon
                    points={[...currentPolygon, ...(mousePos ? [mousePos] : [])].map(p => `${p.x}%,${p.y}%`).join(' ')}
                    fill="rgba(37, 211, 102, 0.2)"
                    stroke="#25D366"
                    strokeWidth="2"
                    strokeDasharray="4"
                  />
                  {currentPolygon.map((p, i) => (
                    <circle
                      key={i}
                      cx={`${p.x}%`}
                      cy={`${p.y}%`}
                      r="4"
                      fill="#25D366"
                    />
                  ))}
                  {mousePos && (
                    <circle
                      cx={`${mousePos.x}%`}
                      cy={`${mousePos.y}%`}
                      r="4"
                      fill="rgba(37, 211, 102, 0.5)"
                    />
                  )}
                </>
              )}
            </svg>
          </div>
        </div>

        {/* RIGHT PANEL: Properties & Unit Linking */}
        <div className="w-80 bg-white rounded-2xl shadow-sm border border-[#E0E3E7] overflow-y-auto flex flex-col">
          {isDrawing ? (
            <div className="p-5 space-y-4">
              <h3 className="font-bold text-sm border-b pb-2">Propiedades del Nuevo Polígono</h3>
              
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-xs text-blue-800">
                Haz clic en la imagen para dibujar los vértices. Se requieren al menos 3 puntos.
                <br/><br/>
                Puntos actuales: <strong>{currentPolygon.length}</strong>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Vincular a Unidad Inmobiliaria</label>
                <select 
                  className="w-full text-sm border-gray-300 rounded-lg p-2.5 focus:ring-[#8E1E19]"
                  value={selectedUnitId}
                  onChange={(e) => setSelectedUnitId(e.target.value)}
                >
                  <option value="">-- Seleccionar Unidad --</option>
                  {units.map(u => (
                    <option key={u.id} value={u.id}>{u.complexName} - {u.unitNumber}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex gap-2">
                <button 
                  onClick={handleSave}
                  className="flex-1 bg-[#8E1E19] text-white py-2.5 rounded-lg text-xs font-bold flex justify-center items-center gap-2 hover:bg-[#6D0205]"
                >
                  <Save className="w-4 h-4"/> Guardar Mapeo
                </button>
                <button 
                  onClick={handleCancel}
                  className="px-4 bg-gray-100 text-gray-600 py-2.5 rounded-lg text-xs font-bold hover:bg-gray-200"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="p-5 space-y-6">
              
              {/* Background Image Upload Section */}
              {onUpdateVolumetriaImage && (
                <div className="space-y-2">
                  <h3 className="font-bold text-sm border-b pb-2 flex justify-between items-center">
                    <span>Fondo / Plano Base</span>
                    <ImageIcon className="w-4 h-4 text-gray-400" />
                  </h3>
                  <FileDropzone 
                    onUploadSuccess={(url) => {
                      if (url) onUpdateVolumetriaImage(url);
                    }}
                    folder="mapper"
                    label="Subir nuevo plano base"
                  />
                </div>
              )}

              {/* Mapped Units Section */}
              <div className="space-y-2">
                <h3 className="font-bold text-sm border-b pb-2 flex justify-between items-center">
                  <span>Unidades Mapeadas ({mappedUnits.length})</span>
                  <MapPin className="w-4 h-4 text-gray-400" />
                </h3>

                <div className="space-y-3">
                {mappedUnits.map(mapping => {
                  const unit = units.find(u => u.id === mapping.unidad_id);
                  return (
                    <div 
                      key={mapping.id} 
                      className="p-3 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#8E1E19] transition-colors group"
                      onMouseEnter={() => setHoveredPoly(mapping.id)}
                      onMouseLeave={() => setHoveredPoly(null)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs font-bold text-gray-900">{unit?.unitNumber || 'Unidad Desconocida'}</p>
                          <p className="text-[10px] text-gray-500">{unit?.complexName}</p>
                        </div>
                        <button 
                          onClick={() => { if(window.confirm('¿Eliminar este mapeo?')) onDeleteMappedUnit(mapping.id); }}
                          className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="mt-2 text-[10px] text-emerald-600 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3 h-3" /> Vinculado y Activo
                      </div>
                    </div>
                  );
                })}
                {mappedUnits.length === 0 && (
                  <p className="text-xs text-gray-500 text-center py-4">No hay áreas interactivas configuradas aún.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
