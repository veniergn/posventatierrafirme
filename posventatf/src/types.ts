export type UserRole = 'propietario' | 'staff';

export type StaffRole = 'Director de Obra' | 'Arquitecto' | 'Administración' | 'Ventas' | 'Gerencia General';

export type StaffPermission = 'admin' | 'fotos' | 'edicion' | 'lectura';

export type UserStatus = 'activo' | 'pendiente';

export interface User {
  id: string;
  name: string;
  dni: string;
  email: string;
  phone: string;
  role: UserRole;
  // Propietario fields
  complex?: string;
  unit?: string;
  parking?: string;
  storage?: string;
  balance?: string;
  nextPaymentDate?: string;
  password?: string;
  isCustomPassword?: boolean;
  // Staff fields
  staffRole?: StaffRole;
  permissions?: StaffPermission;
  // Authorization & Token
  activationCode: string;
  status: UserStatus;
  createdAt: string;
  activatedAt?: string;
  avatar?: string;
}

export interface VolumetricRender {
  id: string;
  title: string;
  url: string;
  category: 'diurno' | 'nocturno' | 'aereo' | 'volumetria';
  description?: string;
}

export interface ProjectTypology {
  id: string;
  title: string;
  rooms: string;
  surfaceM2: number;
  balconyM2: number;
  floorPlanUrl: string;
  description: string;
  features: string[];
  priceEstimate?: string;
  unitsAvailable?: number;
}

export interface ProjectAmenity {
  id: string;
  title: string;
  description: string;
  renderUrl: string;
  iconName?: string;
}

export interface Project {
  id: string;
  name: string;
  phase: string;
  status: 'Active Phase 1' | 'Active Phase 2' | 'Pre-Sale' | 'Sold Out' | 'En Construcción' | 'Entregado' | string;
  commercialStatus?: 'En Pozo - Preventa' | 'En Construcción' | 'Próxima Entrega' | 'Últimas Unidades' | '100% Vendido';
  unitsSold: number;
  totalUnits: number;
  progress: number;
  image: string;
  address: string;
  estimatedDelivery: string;
  description: string;
  tagline?: string;
  advisorName?: string;
  advisorPhone?: string;
  advisorEmail?: string;
  volumetricRenders?: VolumetricRender[];
  typologies?: ProjectTypology[];
  amenitiesList?: ProjectAmenity[];
  generalBlueprints?: string[];
}

export interface ConstructionMilestone {
  id: string;
  projectId: string;
  unitId?: string;
  title: string;
  month: string;
  phaseStatus: 'Fase Actual' | 'Completado' | 'Próximamente';
  quote: string;
  authorName: string;
  authorRole: string;
  photoUrl: string;
  mediaUrls?: string[];
  videoUrl?: string;
  tasksCompleted?: string[];
  progressPercentage?: number;
}

export interface UnitDetail {
  id: string;
  unitNumber: string;
  complexName: string;
  projectId?: string;
  address: string;
  status: 'En Construcción' | 'Entregado' | 'En Terminaciones' | 'Disponible' | 'Reservado';
  surfaceM2: number;
  balconySurfaceM2?: number;
  orientation?: 'Norte' | 'Sur' | 'Este' | 'Oeste' | 'Nororiente' | 'Norponiente';
  rooms: number;
  bedrooms: string;
  bathrooms: number;
  parking: string;
  storage?: string;
  assignedUserId?: string;
  assignedUserName?: string;
  assignedUserEmail?: string;
  mainRender: string;
  livingRender: string;
  masterBedroomRender: string;
  kitchenRender: string;
  blueprintPdfUrl: string;
  electricalPdfUrl: string;
  hydraulicPdfUrl: string;
  deedPdfUrl: string;
}

export interface MediaUploadItem {
  id: string;
  fileName: string;
  type: 'render' | 'blueprint' | 'progress';
  size: string;
  timestamp: string;
  uploadedBy: string;
  uploadedByRole: string;
  status: 'synced' | 'syncing';
  url: string;
  complexName?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  details: string;
  staffName: string;
  staffRole: string;
  timestamp: string;
  entityType: 'user' | 'media' | 'project' | 'token' | 'unit';
}

export interface ContactItem {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  category: 'Tierra Firme' | 'FOWN Propiedades';
  preferredChannel: 'whatsapp' | 'email' | 'call';
}

export interface ObraVolumetria {
  id: string;
  nombre: string;
  descripcion?: string;
  imagen_url: string;
  width_original: number;
  height_original: number;
  estado: string;
  created_at?: string;
}

export interface UnidadMapeada {
  id: string;
  volumetria_id: string;
  unidad_id: string;
  polygon_points: string;
  tour_360_url?: string;
  plano_pdf_url?: string;
  created_at?: string;
}

export type ActiveAppView = 
  | 'splash_screen'
  | 'admin_users' 
  | 'admin_dashboard' 
  | 'admin_units'
  | 'admin_multimedia' 
  | 'admin_contacts'
  | 'admin_mapper'
  | 'admin_commercial'
  | 'preview_mode' 
  | 'owner_portal' 
  | 'owner_login' 
  | 'activation_screen' 
  | 'email_inbox';
