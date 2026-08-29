import React, { useState, useEffect } from 'react';
import { 
  User, 
  Project, 
  ConstructionMilestone, 
  MediaUploadItem, 
  AuditLog, 
  UnitDetail,
  ActiveAppView 
} from './types';
import { 
  INITIAL_USERS, 
  INITIAL_PROJECTS, 
  INITIAL_MILESTONES, 
  INITIAL_UPLOADS, 
  INITIAL_AUDIT_LOGS,
  INITIAL_UNITS
} from './data/initialData';
import { api } from './lib/api';
import { PrototypeBar } from './components/PrototypeBar';
import { AdminLayout } from './components/AdminPanel/AdminLayout';
import { UserManagement } from './components/AdminPanel/UserManagement';
import { UnitsManagement } from './components/AdminPanel/UnitsManagement';
import { NewUserModal } from './components/AdminPanel/NewUserModal';
import { EditUserModal } from './components/AdminPanel/EditUserModal';
import { ProjectsDashboard } from './components/AdminPanel/ProjectsDashboard';
import { MultimediaManager } from './components/AdminPanel/MultimediaManager';
import { AuditLogsModal } from './components/AdminPanel/AuditLogsModal';
import { PreviewModeView } from './components/PreviewMode/PreviewModeView';
import { OwnerApp } from './components/OwnerPortal/OwnerApp';
import { ActivationPage } from './components/ActivationScreen/ActivationPage';
import { OwnerLoginPage } from './components/OwnerLogin/OwnerLoginPage';
import { EmailInboxView } from './components/EmailInboxView';
import { EmailSimulatorModal } from './components/EmailSimulatorModal';
import { SplashScreen } from './components/SplashScreen';

export default function App() {
  // Global State
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [units, setUnits] = useState<UnitDetail[]>(INITIAL_UNITS);
  const [milestones, setMilestones] = useState<ConstructionMilestone[]>(INITIAL_MILESTONES);
  const [uploads, setUploads] = useState<MediaUploadItem[]>(INITIAL_UPLOADS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Fetch from Supabase on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cloudProjects, cloudUsers, cloudMilestones, cloudUnits] = await Promise.all([
          api.getProjects(),
          api.getUsers(),
          api.getMilestones(),
          api.getUnits()
        ]);
        
        if (cloudProjects && cloudProjects.length > 0) setProjects(cloudProjects);
        if (cloudUsers && cloudUsers.length > 0) setUsers(cloudUsers);
        if (cloudMilestones && cloudMilestones.length > 0) setMilestones(cloudMilestones);
        if (cloudUnits && cloudUnits.length > 0) setUnits(cloudUnits);
      } catch (error) {
        console.error("Error loading data from cloud:", error);
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchData();
  }, []);

  // Navigation & View state
  const [currentView, setCurrentView] = useState<ActiveAppView>('splash_screen');
  const [selectedUserForPreview, setSelectedUserForPreview] = useState<User | null>(null);
  const [activationCodeForScreen, setActivationCodeForScreen] = useState<string>('TF-8492');

  // Modals state
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [activeUserForEmailModal, setActiveUserForEmailModal] = useState<User | null>(null);
  const [isAuditLogsModalOpen, setIsAuditLogsModalOpen] = useState(false);

  // Active Admin Staff profile
  const currentStaffUser = users.find((u) => u.role === 'staff') || INITIAL_USERS[2];

  // Helper to add audit logs
  const logAction = (action: string, details: string, entityType: AuditLog['entityType']) => {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      action,
      details,
      staffName: currentStaffUser.name,
      staffRole: currentStaffUser.staffRole || 'Administración',
      timestamp: new Date().toLocaleDateString('es-AR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      entityType
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Handlers for User Management
  const handleCreateUser = (newUser: User) => {
    setUsers((prev) => [newUser, ...prev]);
    logAction(
      newUser.role === 'propietario' ? 'Alta de Propietario' : 'Alta de Personal Staff',
      `Registró a ${newUser.name} (${newUser.email}) con token ${newUser.activationCode} y asignación ${newUser.unit || newUser.staffRole}`,
      'user'
    );
    // Open email preview modal automatically to demonstrate the dispatched template
    setActiveUserForEmailModal(newUser);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    logAction(
      'Actualización de Usuario',
      `Modificó datos de ${updatedUser.name} (${updatedUser.role})`,
      'user'
    );
  };

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find((u) => u.id === userId);
    if (userToDelete) {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      logAction(
        'Baja de Usuario',
        `Eliminó al usuario ${userToDelete.name} del sistema`,
        'user'
      );
    }
  };

  const handleResendCode = (user: User) => {
    const newCode = `TF-${Math.floor(1000 + Math.random() * 9000)}`;
    const updated = { ...user, activationCode: newCode, status: 'pendiente' as const };
    setUsers((prev) => prev.map((u) => (u.id === user.id ? updated : u)));
    logAction(
      'Reenvío de Token de Activación',
      `Generó nuevo código ${newCode} para ${user.name}`,
      'token'
    );
    setActiveUserForEmailModal(updated);
  };

  // Handlers for Units Management (CRUD)
  const handleAddUnit = (newUnit: UnitDetail) => {
    setUnits((prev) => [newUnit, ...prev]);
    logAction(
      'Alta de Unidad Inmobiliaria',
      `Agregó ${newUnit.unitNumber} en ${newUnit.complexName} (${newUnit.status})`,
      'project'
    );
  };

  const handleUpdateUnit = (updatedUnit: UnitDetail) => {
    setUnits((prev) => prev.map((u) => (u.id === updatedUnit.id ? updatedUnit : u)));
    logAction(
      'Actualización de Unidad',
      `Modificó especificaciones de ${updatedUnit.unitNumber} (${updatedUnit.complexName})`,
      'project'
    );
  };

  const handleDeleteUnit = (unitId: string) => {
    const unitToDelete = units.find((u) => u.id === unitId);
    if (unitToDelete) {
      setUnits((prev) => prev.filter((u) => u.id !== unitId));
      logAction(
        'Baja de Unidad',
        `Eliminó ${unitToDelete.unitNumber} de ${unitToDelete.complexName}`,
        'project'
      );
    }
  };

  // Handlers for Projects CRUD
  const handleAddProject = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
    logAction(
      'Creación de Nuevo Desarrollo',
      `Registró el desarrollo arquitectónico "${newProject.name}" con ${newProject.totalUnits} unidades`,
      'project'
    );
  };

  const handleDeleteProject = (projectId: string) => {
    const proj = projects.find((p) => p.id === projectId);
    if (proj) {
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      logAction(
        'Eliminación de Desarrollo',
        `Removió el proyecto "${proj.name}" y sus parámetros`,
        'project'
      );
    }
  };

  // Handlers for Preview Mode
  const handlePreviewAsOwner = (user: User) => {
    setSelectedUserForPreview(user);
    setCurrentView('preview_mode');
  };

  const handleSelectProjectForPreview = (projectName: string) => {
    const matchedUser = users.find((u) => u.role === 'propietario' && (u.complex?.includes(projectName) || projectName.includes(u.complex || '')));
    if (matchedUser) {
      setSelectedUserForPreview(matchedUser);
    } else {
      setSelectedUserForPreview(users[0]);
    }
    setCurrentView('preview_mode');
  };

  // Handlers for Multimedia Uploads
  const handleAddUpload = (item: MediaUploadItem) => {
    setUploads((prev) => [item, ...prev]);
    logAction(
      'Carga de Multimedia / Avance',
      `Subió "${item.fileName}" (${item.type.toUpperCase()}) asignado a ${item.complexName || 'Complejo Terrazas'}`,
      'media'
    );
  };

  const handleDeleteUpload = (id: string) => {
    const item = uploads.find((u) => u.id === id);
    setUploads((prev) => prev.filter((u) => u.id !== id));
    if (item) {
      logAction(
        'Eliminación de Archivo',
        `Eliminó "${item.fileName}" de la biblioteca multimedia`,
        'media'
      );
    }
  };

  // Handlers for Project Updates
  const handleUpdateProjectProgress = (projectId: string, newProgress: number) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, progress: newProgress } : p))
    );
    const p = projects.find((x) => x.id === projectId);
    logAction(
      'Ajuste de Avance de Obra',
      `Modificó porcentaje de ${p?.name || 'Proyecto'} a ${newProgress}%`,
      'project'
    );
  };

  const handleUpdateProjectDetails = (updatedProject: Project) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
    logAction(
      'Actualización Comercial de Proyecto',
      `Modificó parámetros comerciales / asesor de ${updatedProject.name}`,
      'project'
    );
  };

  // Handlers for Activation Flow
  const handleActivationSuccess = (code: string) => {
    // Find user with matching code and set to active
    const userToActivate = users.find((u) => u.activationCode.toUpperCase() === code.toUpperCase());
    if (userToActivate) {
      const updated = {
        ...userToActivate,
        status: 'activo' as const,
        activatedAt: new Date().toISOString().split('T')[0]
      };
      setUsers((prev) => prev.map((u) => (u.id === userToActivate.id ? updated : u)));
      setSelectedUserForPreview(updated);
      logAction(
        'Activación de Cuenta Exitosa',
        `El usuario ${userToActivate.name} verificó su token y activó su contraseña privada`,
        'user'
      );
    }
    setCurrentView('owner_portal');
  };

  const handleNavigateToActivation = (code?: string) => {
    if (code) setActivationCodeForScreen(code);
    setCurrentView('activation_screen');
  };

  const pendingUsersCount = users.filter((u) => u.status === 'pendiente').length;

  return (
    <div className="min-h-screen bg-[#FAF9FB] flex flex-col font-sans selection:bg-[#FFDAD5] selection:text-[#8A1B17]">
      {/* Main Screen Rendering */}
      <div className="flex-1 flex flex-col">
        {/* ========================================================
            VIEW 0: SPLASH SCREEN (Acceso de Autor)
        ======================================================== */}
        {currentView === 'splash_screen' && (
          <SplashScreen
            onSelectView={(view) => setCurrentView(view)}
          />
        )}

        {/* ========================================================
            VIEW 1: ADMIN PANEL (Usuarios, Unidades, Proyectos, Multimedia)
        ======================================================== */}
        {currentView.startsWith('admin_') && (
          <AdminLayout
            currentView={currentView}
            onNavigate={(view) => setCurrentView(view)}
            currentUser={currentStaffUser}
            onOpenAuditLogs={() => setIsAuditLogsModalOpen(true)}
          >
            {currentView === 'admin_users' && (
              <UserManagement
                users={users}
                onOpenNewUserModal={() => setIsNewUserModalOpen(true)}
                onEditUser={(u) => setEditingUser(u)}
                onDeleteUser={handleDeleteUser}
                onPreviewAsOwner={handlePreviewAsOwner}
                onViewEmail={(u) => setActiveUserForEmailModal(u)}
                onResendCode={handleResendCode}
              />
            )}

            {currentView === 'admin_units' && (
              <UnitsManagement
                units={units}
                projects={projects}
                users={users}
                onAddUnit={handleAddUnit}
                onUpdateUnit={handleUpdateUnit}
                onDeleteUnit={handleDeleteUnit}
                onPreviewUnitOwner={handlePreviewAsOwner}
              />
            )}

            {currentView === 'admin_dashboard' && (
              <ProjectsDashboard
                projects={projects}
                milestones={milestones}
                onSelectProjectForPreview={handleSelectProjectForPreview}
                onUpdateProjectProgress={handleUpdateProjectProgress}
                onUpdateProjectDetails={handleUpdateProjectDetails}
                onAddProject={handleAddProject}
                onDeleteProject={handleDeleteProject}
              />
            )}

            {currentView === 'admin_multimedia' && (
              <MultimediaManager
                uploads={uploads}
                onAddUpload={handleAddUpload}
                onDeleteUpload={handleDeleteUpload}
                onOpenAuditLogs={() => setIsAuditLogsModalOpen(true)}
                currentStaffName={currentStaffUser.name}
                currentStaffRole={currentStaffUser.staffRole || 'Staff'}
              />
            )}
          </AdminLayout>
        )}

        {/* ========================================================
            VIEW 2: MODO VISTA PREVIA (Preview Mode con marco móvil)
        ======================================================== */}
        {currentView === 'preview_mode' && (
          <PreviewModeView
            selectedUser={selectedUserForPreview || users[0]}
            allUsers={users}
            projects={projects}
            milestones={milestones}
            onExitPreview={() => setCurrentView('admin_users')}
            onSelectUserToPreview={(u) => setSelectedUserForPreview(u)}
          />
        )}

        {/* ========================================================
            VIEW 3: PORTAL DEL PROPIETARIO (Hermético)
        ======================================================== */}
        {currentView === 'owner_portal' && (
          <div className="min-h-screen bg-[#FAF9FB]">
            <OwnerApp
              user={selectedUserForPreview}
              projects={projects}
              milestones={milestones}
              isEmbeddedInSimulator={false}
              onAdminAccess={() => setCurrentView('admin_users')}
              onLoginSuccess={(u) => setSelectedUserForPreview(u)}
              onNavigateToActivation={() => handleNavigateToActivation()}
            />
          </div>
        )}

        {/* ========================================================
            VIEW 4: PANTALLA DE ACTIVACIÓN DE CUENTA
        ======================================================== */}
        {currentView === 'activation_screen' && (
          <ActivationPage
            initialCode={activationCodeForScreen}
            onSuccessActivation={handleActivationSuccess}
            onNavigateToLogin={() => setCurrentView('owner_login')}
          />
        )}

        {/* ========================================================
            VIEW 5: LOGIN PROPIETARIOS
        ======================================================== */}
        {currentView === 'owner_login' && (
          <OwnerLoginPage
            onLoginSuccess={(email) => {
              const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
              if (foundUser) setSelectedUserForPreview(foundUser);
              setCurrentView('owner_portal');
            }}
            onNavigateToActivation={() => setCurrentView('activation_screen')}
            onQuickLoginAsAdmin={() => setCurrentView('admin_users')}
          />
        )}

        {/* ========================================================
            VIEW 6: BANDEJA DE CORREOS DISPARADOS (Email Inbox)
        ======================================================== */}
        {currentView === 'email_inbox' && (
          <EmailInboxView
            users={users}
            onSelectUserToActivate={(code) => handleNavigateToActivation(code)}
          />
        )}
      </div>

      {/* ========================================================
          GLOBAL MODALS
        ======================================================== */}
      {/* 1. Modal: Crear Nuevo Usuario */}
      <NewUserModal
        isOpen={isNewUserModalOpen}
        onClose={() => setIsNewUserModalOpen(false)}
        onSave={handleCreateUser}
      />

      {/* 2. Modal: Editar Usuario Existente */}
      <EditUserModal
        user={editingUser}
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        onUpdate={handleUpdateUser}
        onResendCode={handleResendCode}
      />

      {/* 3. Modal: Visor de Correo Disparado */}
      <EmailSimulatorModal
        user={activeUserForEmailModal}
        onClose={() => setActiveUserForEmailModal(null)}
        onNavigateToActivation={(code) => handleNavigateToActivation(code)}
      />

      {/* 4. Modal: Registro de Auditoría */}
      <AuditLogsModal
        isOpen={isAuditLogsModalOpen}
        onClose={() => setIsAuditLogsModalOpen(false)}
        logs={auditLogs}
      />
    </div>
  );
}
