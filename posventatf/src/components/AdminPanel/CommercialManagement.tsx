import React, { useState } from 'react';
import { Project } from '../../types';
import { Phone, Mail, User, Save, BoxSelect } from 'lucide-react';
import { api } from '../../lib/api';

interface CommercialManagementProps {
  projects: Project[];
  onUpdateProjectDetails: (updatedProject: Project) => void;
}

export const CommercialManagement: React.FC<CommercialManagementProps> = ({
  projects,
  onUpdateProjectDetails
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    advisorName: '',
    advisorPhone: '',
    advisorEmail: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  const startEditing = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      advisorName: project.advisorName || '',
      advisorPhone: project.advisorPhone || '',
      advisorEmail: project.advisorEmail || ''
    });
  };

  const handleSave = async (projectId: string) => {
    try {
      setIsSaving(true);
      const project = projects.find(p => p.id === projectId);
      if (!project) return;
      
      const updatedProject = {
        ...project,
        ...formData
      };
      
      await api.updateProject(updatedProject);
      onUpdateProjectDetails(updatedProject);
      setEditingId(null);
    } catch (error) {
      console.error('Error saving commercial details:', error);
      alert('Hubo un error al guardar los datos.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto animate-in fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#1B1C1E] tracking-tight">
          Atención Comercial Personalizada
        </h1>
        <p className="text-sm text-[#5B5F63] mt-1">
          Configura la información de contacto de los asesores para cada proyecto.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => {
          const isEditing = editingId === project.id;

          return (
            <div 
              key={project.id}
              className="bg-white border border-[#E0E3E7] rounded-xl overflow-hidden shadow-sm flex flex-col"
            >
              <div className="relative h-32 bg-gray-100">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="font-bold">{project.name}</h3>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col gap-4">
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-[#5B5F63] uppercase block mb-1">Nombre del Asesor</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={formData.advisorName}
                          onChange={(e) => setFormData(prev => ({ ...prev, advisorName: e.target.value }))}
                          placeholder="Ej: Lic. Matías Valenzuela"
                          className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#8E1E19]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#5B5F63] uppercase block mb-1">Teléfono / WhatsApp</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={formData.advisorPhone}
                          onChange={(e) => setFormData(prev => ({ ...prev, advisorPhone: e.target.value }))}
                          placeholder="Ej: +54 9 11 4920-3344"
                          className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#8E1E19]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#5B5F63] uppercase block mb-1">Correo Electrónico</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          value={formData.advisorEmail}
                          onChange={(e) => setFormData(prev => ({ ...prev, advisorEmail: e.target.value }))}
                          placeholder="Ej: ventas@tierrafirme.com"
                          className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#8E1E19]"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={() => handleSave(project.id)}
                        disabled={isSaving}
                        className="flex-1 bg-[#8E1E19] text-white py-2 rounded-lg text-xs font-bold hover:bg-[#6D0205] transition-colors flex items-center justify-center gap-1"
                      >
                        <Save className="w-4 h-4" />
                        {isSaving ? 'Guardando...' : 'Guardar'}
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        disabled={isSaving}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FFF4F2] text-[#8E1E19] flex items-center justify-center shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-[#5B5F63] uppercase">Asesor Asignado</p>
                        <p className="text-sm font-semibold text-[#1B1C1E]">{project.advisorName || 'Lic. Matías Valenzuela'}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FFF4F2] text-[#8E1E19] flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-[#5B5F63] uppercase">Contacto</p>
                        <p className="text-sm font-semibold text-[#1B1C1E]">{project.advisorPhone || '+54 9 11 4920-3344'}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FFF4F2] text-[#8E1E19] flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-[#5B5F63] uppercase">Email</p>
                        <p className="text-sm font-semibold text-[#1B1C1E]">{project.advisorEmail || 'ventas@tierrafirme.com'}</p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => startEditing(project)}
                        className="w-full py-2 bg-[#FAF9FB] border border-[#E0E3E7] text-[#1B1C1E] text-xs font-bold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                      >
                        <BoxSelect className="w-4 h-4" />
                        Editar Asesor
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
