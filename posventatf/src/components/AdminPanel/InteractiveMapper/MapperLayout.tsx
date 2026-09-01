import React, { useState, useRef, useEffect } from 'react';
import { UnitDetail, Project, UnidadMapeada } from '../../../types';
import { MousePointerClick, Save, Trash2, Undo, CheckCircle2, Image as ImageIcon, MapPin } from 'lucide-react';
import { FileDropzone } from '../../FileDropzone';
import { AdminUnitMediaModal } from './AdminUnitMediaModal';

const POLYGON_COLORS = [
  '#FF3B30', '#FF9500', '#FFCC00', '#4CD964', 
  '#5AC8FA', '#007AFF', '#5856D6', '#FF2D55'
];

interface Point {
  x: number;
  y: number;
}

interface MapperLayoutProps {
  units: UnitDetail[];
  projects: Project[];
  mappedUnits: UnidadMapeada[];
  onSaveMappedUnit: (mapping: UnidadMapeada) => void;
  onDeleteMappedUnit: (id: string) => void;
  onUpdateProjectDetails: (project: Project) => void;
  onUpdateUnit?: (unit: UnitDetail) => void;
}

export const MapperLayout: React.FC<MapperLayoutProps> = ({
  units,
  projects,
  mappedUnits,
  onSaveMappedUnit,
  onDeleteMappedUnit,
  onUpdateProjectDetails,
  onUpdateUnit
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPolygon, setCurrentPolygon] = useState<Point[]>([]);
  const [selectedUnitId, setSelectedUnitId] = useState<string>('');
  const [hoveredPoly, setHoveredPoly] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<Point | null>(null);
  const [selectedUnitForMedia, setSelectedUnitForMedia] = useState<UnitDetail | null>(null);
  
  const svgRef = useRef<SVGSVGElement>(null);
  
  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const imgUrl = selectedProject?.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000";

  // Filter mapped units to only show ones belonging to the selected project's volumetria
  // We use `proj-${selectedProjectId}` as the volumetria_id by convention
  const volumetriaId = `vol-${selectedProjectId}`;
  const visibleMappedUnits = mappedUnits.filter(m => m.volumetria_id === volumetriaId);

  // Filter units available for mapping to only those in the selected project
  const availableUnits = units.filter(u => u.complexName === selectedProject?.name);

  useEffect(() => {
    if (projects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects]);

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
      volumetria_id: volumetriaId,
      unidad_id: selectedUnitId,
      polygon_points: pointsString,
      created_at: new Date().toISOString()
    };

    onSaveMappedUnit(newMapping);
    handleCancel();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] animate-in fade-in">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#1B1C1E]">Mapeo Volumétrico Interactivo</h2>
          <p className="text-sm text-[#5B5F63]">Dibuja polígonos sobre el render de tu proyecto para vincularlos a unidades.</p>
        </div>
        
        {/* Project Selector */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-[#1B1C1E] mb-1">Seleccionar Obra/Proyecto</label>
          <select
            value={selectedProjectId}
            onChange={(e) => {
              setSelectedProjectId(e.target.value);
              handleCancel();
            }}
            className="w-64 p-2 bg-white border border-[#E0E3E7] rounded-lg text-sm shadow-sm outline-none focus:border-[#8E1E19]"
          >
            {projects.length === 0 && <option value="">Sin proyectos</option>}
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        
        {/* LEFT PANEL: Canvas */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-[#E0E3E7] overflow-hidden flex flex-col relative">
          {/* Toolbar */}
          <div className="p-3 border-b border-[#E0E3E7] bg-gray-50 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDrawing(!isDrawing)}
                disabled={!selectedProject}
                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors ${
                  !selectedProject ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-500' :
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
              {selectedProject ? selectedProject.name : 'Ningún proyecto seleccionado'}
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
              {visibleMappedUnits.map((mapping, index) => {
                const points = mapping.polygon_points.split(' ').map(p => {
                  const [x, y] = p.split(',');
                  return `${x}%,${y}%`;
                }).join(' ');
                
                const isHovered = hoveredPoly === mapping.id;
                const baseColor = POLYGON_COLORS[index % POLYGON_COLORS.length];

                return (
                  <polygon
                    key={mapping.id}
                    points={points}
                    fill={isHovered ? baseColor : `${baseColor}40`}
                    stroke={baseColor}
                    strokeWidth="2"
                    onMouseEnter={() => setHoveredPoly(mapping.id)}
                    onMouseLeave={() => setHoveredPoly(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isDrawing) {
                        const unit = units.find(u => u.id === mapping.unidad_id);
                        if (unit) setSelectedUnitForMedia(unit);
                      }
                    }}
                    className={`transition-all duration-200 ${!isDrawing ? 'cursor-pointer hover:opacity-100' : ''}`}
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
        <div className="w-80 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E0E3E7] overflow-y-auto flex flex-col flex-1">
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
              <div className="p-5 flex flex-col h-full">
                <h3 className="font-bold text-sm border-b pb-2 mb-4">Unidades Mapeadas ({visibleMappedUnits.length})</h3>
                
                <div className="flex-1 overflow-y-auto space-y-2">
                  {visibleMappedUnits.length === 0 ? (
                    <div className="text-center text-gray-400 text-xs py-8">
                      No hay unidades mapeadas en este proyecto. Haz clic en "Dibujar Nuevo Polígono" para comenzar.
                    </div>
                  ) : (
                    visibleMappedUnits.map(mapping => {
                      const unit = units.find(u => u.id === mapping.unidad_id);
                      return (
                        <div key={mapping.id}>
                          <div 
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-[#E0E3E7] hover:border-[#8E1E19] transition-colors"
                            onMouseEnter={() => setHoveredPoly(mapping.id)}
                            onMouseLeave={() => setHoveredPoly(null)}
                          >
                            <div>
                              <div className="font-bold text-sm text-[#1B1C1E]">{unit?.unitNumber || 'Unidad Desconocida'}</div>
                              <div className="text-[10px] text-gray-500 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-green-600" />
                                Polígono vinculado
                              </div>
                            </div>
                            <button 
                              onClick={() => onDeleteMappedUnit(mapping.id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Eliminar mapeo"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          {/* Unit Image Editor - Expands when hovered or always visible */}
                          {unit && hoveredPoly === mapping.id && onUpdateUnit && (
                            <div 
                              className="mt-2 p-3 bg-white rounded-lg border border-gray-200"
                              onMouseEnter={() => setHoveredPoly(mapping.id)}
                              onMouseLeave={() => setHoveredPoly(null)}
                            >
                              <label className="block text-[10px] font-bold text-gray-700 mb-2 uppercase">Imagen/Render de esta Unidad</label>
                              <FileDropzone 
                                onUploadSuccess={(url) => {
                                  onUpdateUnit({
                                    ...unit,
                                    mainRender: url
                                  });
                                }}
                                folder="units"
                                label="Subir nueva foto"
                                currentImage={unit.mainRender}
                              />
                            </div>
                          )}
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Project Image Editor */}
          {selectedProject && !isDrawing && (
            <div className="bg-white rounded-2xl shadow-sm border border-[#E0E3E7] p-5">
              <h3 className="font-bold text-sm border-b pb-2 mb-3">Foto Volumétrica (Fondo)</h3>
              <FileDropzone 
                onUploadSuccess={(url) => {
                  onUpdateProjectDetails({
                    ...selectedProject,
                    image: url
                  });
                }}
                folder="projects"
                label="Cambiar foto volumétrica de la obra"
                currentImage={selectedProject.image}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
