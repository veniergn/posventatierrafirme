import React, { useCallback, useState } from 'react';
import { UploadCloud, File as FileIcon, X, Loader2 } from 'lucide-react';
import { api } from '../../lib/api';

interface FileDropzoneProps {
  onUploadSuccess: (url: string) => void;
  folder?: string;
  accept?: string;
  label?: string;
  currentImage?: string;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({ 
  onUploadSuccess, 
  folder = 'general',
  accept = "image/*",
  label = "Arrastra una imagen aquí o haz clic para subir",
  currentImage
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    setError(null);
    setIsUploading(true);

    try {
      // Local preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Upload to Supabase Storage
      const url = await api.uploadFileToStorage(file, folder);
      onUploadSuccess(url);
    } catch (err) {
      console.error(err);
      setError("Error al subir el archivo. Verifica tu conexión o intenta con una imagen más pequeña.");
      setPreview(currentImage || null);
    } finally {
      setIsUploading(false);
    }
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onUploadSuccess('');
  };

  return (
    <div className="w-full">
      <div
        className={`relative w-full border-2 border-dashed rounded-xl p-6 transition-all duration-200 flex flex-col items-center justify-center cursor-pointer min-h-[160px]
          ${isDragging ? 'border-[#8E1E19] bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}
          ${error ? 'border-red-500 bg-red-50' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleChange}
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="flex flex-col items-center justify-center text-[#8E1E19]">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p className="text-sm font-semibold">Subiendo a la nube...</p>
          </div>
        ) : preview ? (
          <div className="relative w-full flex flex-col items-center group">
            {preview.match(/\.(jpeg|jpg|gif|png|webp|svg)/i) || preview.startsWith('blob:') || preview.includes('unsplash') ? (
              <img 
                src={preview} 
                alt="Preview" 
                className="max-h-40 object-contain rounded-lg shadow-sm"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <FileIcon className="w-12 h-12 mb-2" />
                <p className="text-sm truncate max-w-xs">{preview.split('/').pop()}</p>
              </div>
            )}
            
            {/* Overlay hover actions */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <p className="text-white text-sm font-bold bg-black/50 px-3 py-1 rounded-full">Cambiar</p>
            </div>

            <button
              onClick={clearImage}
              className="absolute -top-3 -right-3 bg-white text-gray-500 hover:text-red-500 border border-gray-200 rounded-full p-1 shadow-md transition-colors z-10"
              title="Eliminar imagen"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
            <p className="text-sm font-semibold text-gray-700 text-center px-4">{label}</p>
            <p className="text-xs text-gray-400 mt-2">Formatos permitidos: JPG, PNG, WEBP (Max 5MB)</p>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-xs text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
};
