import React, { useState } from 'react';
import { UnitDetail, Project, User } from '../../types';
import { FileDropzone } from '../FileDropzone';
import { 
  Building, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  MapPin, 
  FileText, 
  Layers, 
  Maximize2, 
  Check, 
  X, 
  Upload, 
  DollarSign, 
  UserCheck, 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';

interface UnitsManagementProps {
  units: UnitDetail[];
  projects: Project[];
  users: User[];
  onAddUnit: (unit: UnitDetail) => void;
  onUpdateUnit: (unit: UnitDetail) => void;
  onDeleteUnit: (unitId: string) => void;
  onPreviewUnitOwner?: (user: User) => void;
}

export const UnitsManagement: React.FC<UnitsManagementProps> = ({
  units,
  projects,
  users,
  onAddUnit,
  onUpdateUnit,
  onDeleteUnit,
  onPreviewUnitOwner
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<UnitDetail | null>(null);
  const [deletingUnit, setDeletingUnit] = useState<UnitDetail | null>(null);
  const [viewingUnitDetail, setViewingUnitDetail] = useState<UnitDetail | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState<Partial<UnitDetail>>({
    unitNumber: '',
    complexName: projects[0]?.name || 'Complejo Terrazas Park',
    address: projects[0]?.address || 'Av. del Libertador 1234, CABA',
    status: 'En Construcción',
    surfaceM2: 95,
    balconySurfaceM2: 15,
    orientation: 'Nororiente',
    rooms: 3,
    bedrooms: '2 Dormitorios',
    bathrooms: 2,
    parking: 'Cochera N° 01',
    storage: 'Baulera B-01',
    assignedUserId: '',
    mainRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7Dg5-GoB6fJxtvSnd4FBKz6U5WEwu_1v1CWDnnwmcS4_Rww1AvyLXO5vB8z0PaSOsVUZrc5RK4pgeTQEwwOVlNm-KRso8Or1-ydLLhMSUPQmkrCF5QsAm3lGLuU8mjgE-S9TIBGYog8exCNoyW1kJqhmVYoCrIUhb9K47zAB7gnvSJ3kF2Yv1JesulYLzqF83qlBeBtbuKDqbH0Wznri32nprrfd9Sz3TCCbeErekaEkN2az8CodAyQ',
    livingRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATl4nmeyMNVmef3ekZT525cWqAgZi0ezmd_hiElShr58TVq-lWiQIuEeJlX-Li4vyawMmT-2hxRHmK3XaxKSpDmXT602nJsmcXimxanJDW6tyLHThhDDZ4V2_sDzudBVgp4AqWlBlG-nDj-2DQ5XPiqxDdswsFUIUYu0oHIXq7V6DJeZ_W5L9hEG1ObR1ZFxHe5AJ10VFZgkdNMpasSp87xZI6CUT0FVtd1UxHSxg15-OSasP0SwadZQ',
    masterBedroomRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcsLOpHMxnDQlp2HsHkfw91PLU8vDJlDejjLWrf5zs0mkOGXAroStcYaw1bfYej9nAXPG-hTGGkvE13ghzCTn3-Op1Y67nu2_lWDpMFEQz2JX-kqyNjk7vRgq2adAscn36sxv4Tg9xfxOAXScDrXOgexiiJFKMrqaqKDGw4YIZqoPwrq-BROUkQVK5igq8BveOv-3oVr2fVK98BonVs80v2hUBTtVg6VEeE2ey8y1devVu_aFHSIuApw',
    kitchenRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClvMsO_dw82NPAMbxXFaM4elWpTcr66m-GsmYMPDJ6P5rxQj3xaBAaEkwFI5YjnKB9r24hFmxVTU1dSYpE9CkxJdLNa1cLDlW6-EFOjZ5IH7qJwTze1Om2SJTh0TWKD5sMd0FgcCRTDHdTV4IG-zd89Oe8fMcqJL57jlFxBKWFwwvjAx3IhCUHNMK4v3A_9FZZihHZk5Vze5QqiPTc4hkOwncfXVp3nFTWlTU-O508YDx1P_Zywyihog',
    blueprintPdfUrl: '#plano-arquitectonico.pdf',
    electricalPdfUrl: '#plano-electrico.pdf',
    hydraulicPdfUrl: '#plano-hidraulico.pdf',
    deedPdfUrl: '#boleto-compraventa.pdf'
  });

  const registeredOwners = users.filter((u) => u.role === 'propietario');

  const filteredUnits = units.filter((unit) => {
    if (selectedProjectFilter !== 'all' && unit.complexName !== selectedProjectFilter) return false;
    if (selectedStatusFilter !== 'all' && unit.status !== selectedStatusFilter) return false;
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      const matchNum = unit.unitNumber.toLowerCase().includes(term);
      const matchComplex = unit.complexName.toLowerCase().includes(term);
      const matchOwner = (unit.assignedUserName || '').toLowerCase().includes(term);
      const matchBedrooms = unit.bedrooms.toLowerCase().includes(term);
      return matchNum || matchComplex || matchOwner || matchBedrooms;
    }
    return true;
  });

  // Calculate Metrics
  const totalSurface = units.reduce((acc, u) => acc + (u.surfaceM2 || 0), 0);
  const avgSurface = Math.round(totalSurface / (units.length || 1));
  const countInConstruction = units.filter((u) => u.status === 'En Construcción').length;
  const countDelivered = units.filter((u) => u.status === 'Entregado').length;
  const countAvailable = units.filter((u) => u.status === 'Disponible').length;

  const handleOpenAddModal = () => {
    setFormData({
      unitNumber: `NIVEL 0${units.length + 1} // DPTO A`,
      complexName: projects[0]?.name || 'Complejo Terrazas Park',
      address: projects[0]?.address || 'Av. del Libertador 1234, CABA',
      status: 'En Construcción',
      surfaceM2: 110,
      balconySurfaceM2: 16,
      orientation: 'Nororiente',
      rooms: 3,
      bedrooms: '2 Dormitorios en Suite',
      bathrooms: 2,
      parking: `Cochera N° ${units.length + 1}`,
      storage: `Baulera B-0${units.length + 1}`,
      assignedUserId: '',
      assignedUserName: 'Disponible para Asignar',
      mainRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7Dg5-GoB6fJxtvSnd4FBKz6U5WEwu_1v1CWDnnwmcS4_Rww1AvyLXO5vB8z0PaSOsVUZrc5RK4pgeTQEwwOVlNm-KRso8Or1-ydLLhMSUPQmkrCF5QsAm3lGLuU8mjgE-S9TIBGYog8exCNoyW1kJqhmVYoCrIUhb9K47zAB7gnvSJ3kF2Yv1JesulYLzqF83qlBeBtbuKDqbH0Wznri32nprrfd9Sz3TCCbeErekaEkN2az8CodAyQ',
      livingRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATl4nmeyMNVmef3ekZT525cWqAgZi0ezmd_hiElShr58TVq-lWiQIuEeJlX-Li4vyawMmT-2hxRHmK3XaxKSpDmXT602nJsmcXimxanJDW6tyLHThhDDZ4V2_sDzudBVgp4AqWlBlG-nDj-2DQ5XPiqxDdswsFUIUYu0oHIXq7V6DJeZ_W5L9hEG1ObR1ZFxHe5AJ10VFZgkdNMpasSp87xZI6CUT0FVtd1UxHSxg15-OSasP0SwadZQ',
      masterBedroomRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcsLOpHMxnDQlp2HsHkfw91PLU8vDJlDejjLWrf5zs0mkOGXAroStcYaw1bfYej9nAXPG-hTGGkvE13ghzCTn3-Op1Y67nu2_lWDpMFEQz2JX-kqyNjk7vRgq2adAscn36sxv4Tg9xfxOAXScDrXOgexiiJFKMrqaqKDGw4YIZqoPwrq-BROUkQVK5igq8BveOv-3oVr2fVK98BonVs80v2hUBTtVg6VEeE2ey8y1devVu_aFHSIuApw',
      kitchenRender: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClvMsO_dw82NPAMbxXFaM4elWpTcr66m-GsmYMPDJ6P5rxQj3xaBAaEkwFI5YjnKB9r24hFmxVTU1dSYpE9CkxJdLNa1cLDlW6-EFOjZ5IH7qJwTze1Om2SJTh0TWKD5sMd0FgcCRTDHdTV4IG-zd89Oe8fMcqJL57jlFxBKWFwwvjAx3IhCUHNMK4v3A_9FZZihHZk5Vze5QqiPTc4hkOwncfXVp3nFTWlTU-O508YDx1P_Zywyihog',
      blueprintPdfUrl: '#plano-arquitectonico.pdf',
      electricalPdfUrl: '#plano-electrico.pdf',
      hydraulicPdfUrl: '#plano-hidraulico.pdf',
      deedPdfUrl: '#boleto-compraventa.pdf'
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (unit: UnitDetail) => {
    setEditingUnit(unit);
    setFormData({ ...unit });
  };

  const handleFileUpload = (field: keyof UnitDetail, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const assignedUser = registeredOwners.find((u) => u.id === formData.assignedUserId);
    const newUnit: UnitDetail = {
      id: `unit-${Date.now()}`,
      unitNumber: formData.unitNumber || 'Unidad Nueva',
      complexName: formData.complexName || projects[0]?.name || 'Complejo Terrazas Park',
      address: formData.address || 'Av. Libertador',
      status: formData.status as any || 'En Construcción',
      surfaceM2: Number(formData.surfaceM2) || 100,
      balconySurfaceM2: Number(formData.balconySurfaceM2) || 15,
      orientation: formData.orientation as any || 'Norte',
      rooms: Number(formData.rooms) || 3,
      bedrooms: formData.bedrooms || '2 Dormitorios',
      bathrooms: Number(formData.bathrooms) || 2,
      parking: formData.parking || 'Cochera Estándar',
      storage: formData.storage || 'Baulera Estándar',
      assignedUserId: assignedUser?.id,
      assignedUserName: assignedUser ? assignedUser.name : 'Disponible',
      assignedUserEmail: assignedUser?.email,
      mainRender: formData.mainRender || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7Dg5-GoB6fJxtvSnd4FBKz6U5WEwu_1v1CWDnnwmcS4_Rww1AvyLXO5vB8z0PaSOsVUZrc5RK4pgeTQEwwOVlNm-KRso8Or1-ydLLhMSUPQmkrCF5QsAm3lGLuU8mjgE-S9TIBGYog8exCNoyW1kJqhmVYoCrIUhb9K47zAB7gnvSJ3kF2Yv1JesulYLzqF83qlBeBtbuKDqbH0Wznri32nprrfd9Sz3TCCbeErekaEkN2az8CodAyQ',
      livingRender: formData.livingRender || 'https://lh3.googleusercontent.com/aida-public/AB6AXuATl4nmeyMNVmef3ekZT525cWqAgZi0ezmd_hiElShr58TVq-lWiQIuEeJlX-Li4vyawMmT-2hxRHmK3XaxKSpDmXT602nJsmcXimxanJDW6tyLHThhDDZ4V2_sDzudBVgp4AqWlBlG-nDj-2DQ5XPiqxDdswsFUIUYu0oHIXq7V6DJeZ_W5L9hEG1ObR1ZFxHe5AJ10VFZgkdNMpasSp87xZI6CUT0FVtd1UxHSxg15-OSasP0SwadZQ',
      masterBedroomRender: formData.masterBedroomRender || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcsLOpHMxnDQlp2HsHkfw91PLU8vDJlDejjLWrf5zs0mkOGXAroStcYaw1bfYej9nAXPG-hTGGkvE13ghzCTn3-Op1Y67nu2_lWDpMFEQz2JX-kqyNjk7vRgq2adAscn36sxv4Tg9xfxOAXScDrXOgexiiJFKMrqaqKDGw4YIZqoPwrq-BROUkQVK5igq8BveOv-3oVr2fVK98BonVs80v2hUBTtVg6VEeE2ey8y1devVu_aFHSIuApw',
      kitchenRender: formData.kitchenRender || 'https://lh3.googleusercontent.com/aida-public/AB6AXuClvMsO_dw82NPAMbxXFaM4elWpTcr66m-GsmYMPDJ6P5rxQj3xaBAaEkwFI5YjnKB9r24hFmxVTU1dSYpE9CkxJdLNa1cLDlW6-EFOjZ5IH7qJwTze1Om2SJTh0TWKD5sMd0FgcCRTDHdTV4IG-zd89Oe8fMcqJL57jlFxBKWFwwvjAx3IhCUHNMK4v3A_9FZZihHZk5Vze5QqiPTc4hkOwncfXVp3nFTWlTU-O508YDx1P_Zywyihog',
      blueprintPdfUrl: formData.blueprintPdfUrl || '#plano-arquitectonico.pdf',
      electricalPdfUrl: formData.electricalPdfUrl || '#plano-electrico.pdf',
      hydraulicPdfUrl: formData.hydraulicPdfUrl || '#plano-hidraulico.pdf',
      deedPdfUrl: formData.deedPdfUrl || '#boleto-compraventa.pdf'
    };

    onAddUnit(newUnit);
    setIsAddModalOpen(false);
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUnit) return;
    const assignedUser = registeredOwners.find((u) => u.id === formData.assignedUserId);
    const updated: UnitDetail = {
      ...editingUnit,
      unitNumber: formData.unitNumber || editingUnit.unitNumber,
      complexName: formData.complexName || editingUnit.complexName,
      address: formData.address || editingUnit.address,
      status: formData.status as any || editingUnit.status,
      surfaceM2: Number(formData.surfaceM2) || editingUnit.surfaceM2,
      balconySurfaceM2: Number(formData.balconySurfaceM2) || editingUnit.balconySurfaceM2,
      orientation: formData.orientation as any || editingUnit.orientation,
      rooms: Number(formData.rooms) || editingUnit.rooms,
      bedrooms: formData.bedrooms || editingUnit.bedrooms,
      bathrooms: Number(formData.bathrooms) || editingUnit.bathrooms,
      parking: formData.parking || editingUnit.parking,
      storage: formData.storage || editingUnit.storage,
      assignedUserId: assignedUser?.id || (formData.assignedUserId === '' ? undefined : editingUnit.assignedUserId),
      assignedUserName: assignedUser ? assignedUser.name : (formData.assignedUserId === '' ? 'Disponible' : editingUnit.assignedUserName),
      assignedUserEmail: assignedUser?.email || (formData.assignedUserId === '' ? undefined : editingUnit.assignedUserEmail),
      mainRender: formData.mainRender || editingUnit.mainRender,
      livingRender: formData.livingRender || editingUnit.livingRender,
      masterBedroomRender: formData.masterBedroomRender || editingUnit.masterBedroomRender,
      kitchenRender: formData.kitchenRender || editingUnit.kitchenRender,
      blueprintPdfUrl: formData.blueprintPdfUrl || editingUnit.blueprintPdfUrl,
      electricalPdfUrl: formData.electricalPdfUrl || editingUnit.electricalPdfUrl,
      hydraulicPdfUrl: formData.hydraulicPdfUrl || editingUnit.hydraulicPdfUrl,
      deedPdfUrl: formData.deedPdfUrl || editingUnit.deedPdfUrl
    };

    onUpdateUnit(updated);
    setEditingUnit(null);
  };

  const confirmDelete = () => {
    if (deletingUnit) {
      onDeleteUnit(deletingUnit.id);
      setDeletingUnit(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFDAD5] text-[#8A1B17] text-xs font-bold mb-1 border border-[#E0BFBB]">
            <Building className="w-3.5 h-3.5" /> Módulo de Inventario & Planos Técnicos
          </div>
          <h1 className="text-2xl font-bold text-[#1B1C1E] tracking-tight">
            Gestión de Unidades & Departamentos
          </h1>
          <p className="text-sm text-[#5B5F63] mt-0.5">
            Alta, edición de especificaciones arquitectónicas, vinculación de propietarios y biblioteca de planos.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#8E1E19] hover:bg-[#6D0205] text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Unidad</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E0E3E7] shadow-xs">
          <div className="flex items-center justify-between text-[#5B5F63] mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Unidades</span>
            <Building className="w-4 h-4 text-[#8E1E19]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1B1C1E]">{units.length}</div>
          <div className="text-xs text-[#5B5F63] mt-0.5">Superficie media: {avgSurface} m²</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E0E3E7] shadow-xs">
          <div className="flex items-center justify-between text-[#5B5F63] mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider">En Construcción</span>
            <Clock className="w-4 h-4 text-[#8E1E19]" />
          </div>
          <div className="text-2xl font-extrabold text-[#8E1E19]">{countInConstruction}</div>
          <div className="text-xs text-[#5B5F63] mt-0.5">En seguimiento activo</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E0E3E7] shadow-xs">
          <div className="flex items-center justify-between text-[#5B5F63] mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider">Entregadas</span>
            <CheckCircle2 className="w-4 h-4 text-[#005613]" />
          </div>
          <div className="text-2xl font-extrabold text-[#005613]">{countDelivered}</div>
          <div className="text-xs text-[#5B5F63] mt-0.5">Posesión otorgada</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E0E3E7] shadow-xs">
          <div className="flex items-center justify-between text-[#5B5F63] mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider">Disponibles / Venta</span>
            <DollarSign className="w-4 h-4 text-[#4E5256]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1B1C1E]">{countAvailable}</div>
          <div className="text-xs text-[#5B5F63] mt-0.5">Listos para comercializar</div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white rounded-xl p-4 border border-[#E0E3E7] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5B5F63]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por n° de unidad (ej: 4° B), complejo, propietario o tipología..."
              className="w-full pl-10 pr-4 py-2 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs text-[#1B1C1E] focus:border-[#8E1E19] outline-none transition-colors"
            />
          </div>

          {/* Complex Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={selectedProjectFilter}
              onChange={(e) => setSelectedProjectFilter(e.target.value)}
              className="px-3 py-2 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs text-[#1B1C1E] focus:border-[#8E1E19] outline-none"
            >
              <option value="all">Todos los Complejos</option>
              {projects.map((p) => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>

            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="px-3 py-2 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs text-[#1B1C1E] focus:border-[#8E1E19] outline-none"
            >
              <option value="all">Todos los Estados</option>
              <option value="En Construcción">En Construcción</option>
              <option value="En Terminaciones">En Terminaciones</option>
              <option value="Entregado">Entregado</option>
              <option value="Disponible">Disponible</option>
            </select>
          </div>
        </div>
      </div>

      {/* Units Inventory Table & Grid */}
      <div className="bg-white rounded-xl border border-[#E0E3E7] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9FB] border-b border-[#E0E3E7] text-[#5B5F63] uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3 px-4">Unidad / Nomenclatura</th>
                <th className="py-3 px-4">Complejo & Dirección</th>
                <th className="py-3 px-4">Superficie & Tipología</th>
                <th className="py-3 px-4">Cochera / Baulera</th>
                <th className="py-3 px-4">Propietario Asignado</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3E7]">
              {filteredUnits.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    No se encontraron unidades con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                filteredUnits.map((unit) => (
                  <tr key={unit.id} className="hover:bg-[#FAF9FB]/80 transition-colors">
                    {/* Unit Number & Render Thumbnail */}
                    <td className="py-3.5 px-4 font-bold text-[#1B1C1E]">
                      <div className="flex items-center gap-3">
                        <img
                          src={unit.mainRender}
                          alt={unit.unitNumber}
                          referrerPolicy="no-referrer"
                          className="w-11 h-11 rounded-lg object-cover border border-[#E0E3E7] shrink-0"
                        />
                        <div>
                          <div className="font-extrabold text-sm">{unit.unitNumber}</div>
                          <span className="text-[10px] font-mono text-[#8E1E19]">{unit.orientation || 'Norte'}</span>
                        </div>
                      </div>
                    </td>

                    {/* Complex & Address */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#1B1C1E]">{unit.complexName}</div>
                      <div className="text-[11px] text-[#5B5F63] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#8E1E19]" />
                        <span className="truncate max-w-[180px]">{unit.address}</span>
                      </div>
                    </td>

                    {/* Surface & Rooms */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#1B1C1E] flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#8E1E19]" />
                        <span>{unit.surfaceM2} m² cubiertos</span>
                        {unit.balconySurfaceM2 && (
                          <span className="text-[10px] text-[#5B5F63] font-normal">
                            (+{unit.balconySurfaceM2} m² balcón)
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#5B5F63]">
                        {unit.rooms} amb • {unit.bedrooms} • {unit.bathrooms} baños
                      </div>
                    </td>

                    {/* Parking & Storage */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#1B1C1E]">{unit.parking || 'Sin cochera'}</div>
                      <div className="text-[11px] text-[#5B5F63]">{unit.storage || 'Sin baulera'}</div>
                    </td>

                    {/* Assigned Owner */}
                    <td className="py-3.5 px-4">
                      {unit.assignedUserName && unit.assignedUserName !== 'Disponible' ? (
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#FFDAD5] text-[#8A1B17] font-bold flex items-center justify-center text-[10px]">
                            {unit.assignedUserName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-[#1B1C1E]">{unit.assignedUserName}</div>
                            <div className="text-[10px] text-[#5B5F63]">{unit.assignedUserEmail || 'Propietario registrado'}</div>
                          </div>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full text-[11px] font-semibold">
                          Disponible / Sin Asignar
                        </span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        unit.status === 'Entregado'
                          ? 'bg-[#E1F7E4] text-[#005613]'
                          : unit.status === 'En Terminaciones'
                          ? 'bg-[#FFF3D6] text-[#7A5800]'
                          : 'bg-[#FFDAD5] text-[#8A1B17]'
                      }`}>
                        {unit.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewingUnitDetail(unit)}
                          className="p-1.5 rounded-lg border border-[#E0E3E7] text-[#5B5F63] hover:text-[#8E1E19] hover:bg-[#FAF9FB] transition-colors"
                          title="Ver Ficha y Planos"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleOpenEditModal(unit)}
                          className="p-1.5 rounded-lg border border-[#E0E3E7] text-[#5B5F63] hover:text-[#1B1C1E] hover:bg-[#FAF9FB] transition-colors"
                          title="Editar Unidad"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setDeletingUnit(unit)}
                          className="p-1.5 rounded-lg border border-[#E0E3E7] text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Dar de baja unidad"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================
          MODAL 1: ALTA / EDICIÓN DE UNIDAD
      ======================================================== */}
      {(isAddModalOpen || editingUnit) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full my-8 overflow-hidden shadow-2xl border border-[#E0E3E7] flex flex-col">
            <div className="bg-[#1B1C1E] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-[#FFA095]" />
                <h3 className="font-bold text-sm">
                  {isAddModalOpen ? 'Alta de Nueva Unidad / Departamento' : `Editar: ${editingUnit?.unitNumber}`}
                </h3>
              </div>
              <button
                onClick={() => { setIsAddModalOpen(false); setEditingUnit(null); }}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={isAddModalOpen ? handleSubmitAdd : handleSubmitEdit} className="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#1B1C1E] block mb-1">Nomenclatura / Identificador</label>
                  <input
                    type="text"
                    required
                    value={formData.unitNumber || ''}
                    onChange={(e) => setFormData({ ...formData, unitNumber: e.target.value })}
                    placeholder="Ej: Unidad 4° B o NIVEL 04 // DPTO B"
                    className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs text-[#1B1C1E] focus:border-[#8E1E19] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1B1C1E] block mb-1">Complejo / Obra</label>
                  <select
                    value={formData.complexName || projects[0]?.name}
                    onChange={(e) => {
                      const selectedProj = projects.find((p) => p.name === e.target.value);
                      setFormData({ 
                        ...formData, 
                        complexName: e.target.value,
                        address: selectedProj?.address || formData.address 
                      });
                    }}
                    className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs text-[#1B1C1E] focus:border-[#8E1E19] outline-none"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-[#1B1C1E] block mb-1">Estado de Obra</label>
                  <select
                    value={formData.status || 'En Construcción'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs text-[#1B1C1E] focus:border-[#8E1E19] outline-none"
                  >
                    <option value="En Construcción">En Construcción</option>
                    <option value="En Terminaciones">En Terminaciones</option>
                    <option value="Entregado">Entregado</option>
                    <option value="Disponible">Disponible</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#1B1C1E] block mb-1">Superficie Cubierta (m²)</label>
                  <input
                    type="number"
                    value={formData.surfaceM2 || 0}
                    onChange={(e) => setFormData({ ...formData, surfaceM2: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs text-[#1B1C1E] focus:border-[#8E1E19] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1B1C1E] block mb-1">Superficie Balcón (m²)</label>
                  <input
                    type="number"
                    value={formData.balconySurfaceM2 || 0}
                    onChange={(e) => setFormData({ ...formData, balconySurfaceM2: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs text-[#1B1C1E] focus:border-[#8E1E19] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-[#1B1C1E] block mb-1">Ambientes</label>
                  <input
                    type="number"
                    value={formData.rooms || 3}
                    onChange={(e) => setFormData({ ...formData, rooms: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs text-[#1B1C1E] focus:border-[#8E1E19] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1B1C1E] block mb-1">Dormitorios</label>
                  <input
                    type="text"
                    value={formData.bedrooms || ''}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    placeholder="Ej: 3 en Suite"
                    className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs text-[#1B1C1E] focus:border-[#8E1E19] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1B1C1E] block mb-1">Baños</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.bathrooms || 2}
                    onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs text-[#1B1C1E] focus:border-[#8E1E19] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#1B1C1E] block mb-1">Cochera Asignada</label>
                  <input
                    type="text"
                    value={formData.parking || ''}
                    onChange={(e) => setFormData({ ...formData, parking: e.target.value })}
                    placeholder="Ej: N° 12 (Nivel 1)"
                    className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs text-[#1B1C1E] focus:border-[#8E1E19] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1B1C1E] block mb-1">Baulera Asignada</label>
                  <input
                    type="text"
                    value={formData.storage || ''}
                    onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                    placeholder="Ej: Baulera B-04"
                    className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs text-[#1B1C1E] focus:border-[#8E1E19] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#1B1C1E] block mb-1">Vincular Propietario Registrado</label>
                <select
                  value={formData.assignedUserId || ''}
                  onChange={(e) => setFormData({ ...formData, assignedUserId: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF9FB] border border-[#E0E3E7] rounded-xl text-xs text-[#1B1C1E] focus:border-[#8E1E19] outline-none"
                >
                  <option value="">-- Sin Propietario (Disponible) --</option>
                  {registeredOwners.map((u) => (
                    <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                  ))}
                </select>
              </div>

              {/* Renders URL & Upload Section */}
              <div className="pt-2 border-t border-[#E0E3E7] space-y-3">
                <span className="font-bold text-[#1B1C1E] block">Renders de Arquitectura & Vistas</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#5B5F63] block mb-1">Render Principal / Fachada</label>
                    <FileDropzone
                      onUploadSuccess={(url) => setFormData({ ...formData, mainRender: url })}
                      folder="units"
                      currentImage={formData.mainRender}
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#5B5F63] block mb-1">Render Living / Estar</label>
                    <FileDropzone
                      onUploadSuccess={(url) => setFormData({ ...formData, livingRender: url })}
                      folder="units"
                      currentImage={formData.livingRender}
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#5B5F63] block mb-1">Render Dormitorio</label>
                    <FileDropzone
                      onUploadSuccess={(url) => setFormData({ ...formData, masterBedroomRender: url })}
                      folder="units"
                      currentImage={formData.masterBedroomRender}
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#5B5F63] block mb-1">Render Cocina</label>
                    <FileDropzone
                      onUploadSuccess={(url) => setFormData({ ...formData, kitchenRender: url })}
                      folder="units"
                      currentImage={formData.kitchenRender}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E0E3E7] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setIsAddModalOpen(false); setEditingUnit(null); }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#1B1C1E] font-bold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#8E1E19] hover:bg-[#6D0205] text-white font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>{isAddModalOpen ? 'Guardar Nueva Unidad' : 'Actualizar Unidad'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: CONFIRMAR ELIMINACIÓN DE UNIDAD
      ======================================================== */}
      {deletingUnit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E0E3E7] space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-base text-[#1B1C1E]">¿Dar de baja esta unidad?</h3>
              <p className="text-xs text-[#5B5F63] mt-1">
                Estás a punto de eliminar la <strong>{deletingUnit.unitNumber}</strong> de <strong>{deletingUnit.complexName}</strong>. Esta acción desvinculará sus planos y registros.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setDeletingUnit(null)}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#1B1C1E] font-bold rounded-xl text-xs"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-sm"
              >
                Sí, Eliminar Unidad
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 3: FICHA TÉCNICA DETALLADA DE LA UNIDAD
      ======================================================== */}
      {viewingUnitDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E0E3E7] flex flex-col">
            <div className="relative h-48 bg-gray-100">
              <img
                src={viewingUnitDetail.mainRender}
                alt={viewingUnitDetail.unitNumber}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setViewingUnitDetail(null)}
                className="absolute top-3 right-3 p-1.5 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-4 text-white">
                <span className="px-2.5 py-0.5 bg-[#8E1E19] text-white text-[10px] font-bold rounded uppercase">
                  {viewingUnitDetail.status}
                </span>
                <h3 className="text-xl font-bold mt-1">{viewingUnitDetail.unitNumber}</h3>
                <p className="text-xs text-gray-200">{viewingUnitDetail.complexName} • {viewingUnitDetail.address}</p>
              </div>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-[#FAF9FB] p-3 rounded-xl border border-[#E0E3E7]">
                  <span className="text-[10px] text-[#5B5F63] block font-bold">Superficie Total</span>
                  <span className="font-extrabold text-sm text-[#1B1C1E]">{viewingUnitDetail.surfaceM2} m²</span>
                </div>
                <div className="bg-[#FAF9FB] p-3 rounded-xl border border-[#E0E3E7]">
                  <span className="text-[10px] text-[#5B5F63] block font-bold">Dormitorios</span>
                  <span className="font-extrabold text-sm text-[#1B1C1E]">{viewingUnitDetail.bedrooms}</span>
                </div>
                <div className="bg-[#FAF9FB] p-3 rounded-xl border border-[#E0E3E7]">
                  <span className="text-[10px] text-[#5B5F63] block font-bold">Cochera & Baulera</span>
                  <span className="font-extrabold text-sm text-[#1B1C1E]">{viewingUnitDetail.parking}</span>
                </div>
              </div>

              <div className="bg-[#FAF9FB] p-4 rounded-xl border border-[#E0E3E7] space-y-2">
                <span className="font-bold text-[#1B1C1E] block">Planos Técnicos Disponibles</span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <a href={viewingUnitDetail.blueprintPdfUrl} className="p-2 bg-white rounded border border-[#E0E3E7] text-[#8E1E19] font-bold flex items-center gap-1.5 hover:bg-gray-50">
                    <FileText className="w-3.5 h-3.5" /> Plano Arquitectónico
                  </a>
                  <a href={viewingUnitDetail.electricalPdfUrl} className="p-2 bg-white rounded border border-[#E0E3E7] text-[#8E1E19] font-bold flex items-center gap-1.5 hover:bg-gray-50">
                    <FileText className="w-3.5 h-3.5" /> Instalación Eléctrica
                  </a>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setViewingUnitDetail(null)}
                  className="px-5 py-2 bg-[#8E1E19] text-white font-bold rounded-xl"
                >
                  Cerrar Ficha
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
