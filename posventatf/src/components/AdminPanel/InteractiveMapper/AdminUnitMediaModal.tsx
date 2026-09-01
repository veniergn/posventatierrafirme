import React from 'react';
import { UnitDetail } from '../../../types';
import { X, Image as ImageIcon } from 'lucide-react';
import { FileDropzone } from '../../FileDropzone';

interface AdminUnitMediaModalProps {
  unit: UnitDetail;
  isOpen: boolean;
  onClose: () => void;
  onUpdateUnit: (updatedUnit: UnitDetail) => void;
}

export const AdminUnitMediaModal: React.FC<AdminUnitMediaModalProps> = ({
  unit,
  isOpen,
  onClose,
  onUpdateUnit,
}) => {
  if (!isOpen) return null;

  const handleUpdate = (field: keyof UnitDetail, url: string) => {
    onUpdateUnit({
      ...unit,
      [field]: url
    });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-[#FAF9FB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8E1E19]/10 flex items-center justify-center text-[#8E1E19]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1B1C1E]">
                Media de Unidad: {unit.unitNumber}
              </h2>
              <p className="text-sm text-[#5B5F63]">
                {unit.complexName}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Renders Principales */}
            <div className="space-y-4 border p-5 rounded-xl border-[#8C716D]/20">
              <div>
                <h3 className="font-semibold text-[#1B1C1E] text-lg">Renders Principales</h3>
                <p className="text-xs text-[#5B5F63]">Imagen principal del departamento</p>
              </div>
              <FileDropzone 
                onUploadSuccess={(url) => handleUpdate('mainRender', url)}
                folder={`units/${unit.id}`}
                label="Subir Render"
                currentImage={unit.mainRender}
              />
            </div>

            {/* Planta */}
            <div className="space-y-4 border p-5 rounded-xl border-[#8C716D]/20">
              <div>
                <h3 className="font-semibold text-[#1B1C1E] text-lg">Planta</h3>
                <p className="text-xs text-[#5B5F63]">Plano en formato de imagen</p>
              </div>
              <FileDropzone 
                onUploadSuccess={(url) => handleUpdate('blueprint', url)}
                folder={`units/${unit.id}`}
                label="Subir Planta"
                currentImage={unit.blueprint}
              />
            </div>

            {/* Vistas */}
            <div className="space-y-4 border p-5 rounded-xl border-[#8C716D]/20">
              <div>
                <h3 className="font-semibold text-[#1B1C1E] text-lg">Vistas</h3>
                <p className="text-xs text-[#5B5F63]">Imágenes de las vistas desde la unidad</p>
              </div>
              <FileDropzone 
                onUploadSuccess={(url) => handleUpdate('livingRender', url)}
                folder={`units/${unit.id}`}
                label="Subir Vistas"
                currentImage={unit.livingRender}
              />
            </div>

            {/* Croquis */}
            <div className="space-y-4 border p-5 rounded-xl border-[#8C716D]/20">
              <div>
                <h3 className="font-semibold text-[#1B1C1E] text-lg">Croquis</h3>
                <p className="text-xs text-[#5B5F63]">Croquis o esquemas del departamento</p>
              </div>
              <FileDropzone 
                onUploadSuccess={(url) => handleUpdate('masterBedroomRender', url)}
                folder={`units/${unit.id}`}
                label="Subir Croquis"
                currentImage={unit.masterBedroomRender}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
