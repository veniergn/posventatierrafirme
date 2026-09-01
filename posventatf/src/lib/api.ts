import { supabase } from './supabase';
import { Project, User, ConstructionMilestone, UnitDetail, ContactItem, MediaUploadItem, ObraVolumetria, UnidadMapeada } from '../types';

export const api = {
  // ==========================================
  // PROJECTS
  // ==========================================
  async getProjects(): Promise<Project[] | null> {
    try {
      const { data, error } = await supabase.from('projects').select('*');
      if (error) throw error;
      return data as Project[];
    } catch (err) {
      console.error('Error fetching projects from Supabase:', err);
      return null;
    }
  },
  async createProject(project: Project) {
    const { data, error } = await supabase.from('projects').insert(project).select().single();
    if (error) throw error;
    return data;
  },
  async updateProject(project: Project) {
    const { data, error } = await supabase.from('projects').update(project).eq('id', project.id).select().single();
    if (error) throw error;
    return data;
  },
  async deleteProject(id: string) {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
  },

  // ==========================================
  // USERS
  // ==========================================
  async getUsers(): Promise<User[] | null> {
    try {
      const { data, error } = await supabase.from('app_users').select('*');
      if (error) throw error;
      return data as User[];
    } catch (err) {
      console.error('Error fetching users from Supabase:', err);
      return null;
    }
  },
  async createUser(user: User) {
    const { data, error } = await supabase.from('app_users').insert(user).select().single();
    if (error) throw error;
    return data;
  },
  async updateUser(user: User) {
    const { data, error } = await supabase.from('app_users').update(user).eq('id', user.id).select().single();
    if (error) throw error;
    return data;
  },
  async deleteUser(id: string) {
    const { error } = await supabase.from('app_users').delete().eq('id', id);
    if (error) throw error;
  },

  // ==========================================
  // MILESTONES
  // ==========================================
  async getMilestones(): Promise<ConstructionMilestone[] | null> {
    try {
      const { data, error } = await supabase.from('milestones').select('*');
      if (error) throw error;
      return data as ConstructionMilestone[];
    } catch (err) {
      console.error('Error fetching milestones from Supabase:', err);
      return null;
    }
  },
  async createMilestone(milestone: ConstructionMilestone) {
    const { data, error } = await supabase.from('milestones').insert(milestone).select().single();
    if (error) throw error;
    return data;
  },
  async updateMilestone(milestone: ConstructionMilestone) {
    const { data, error } = await supabase.from('milestones').update(milestone).eq('id', milestone.id).select().single();
    if (error) throw error;
    return data;
  },
  async deleteMilestone(id: string) {
    const { error } = await supabase.from('milestones').delete().eq('id', id);
    if (error) throw error;
  },

  // ==========================================
  // UNITS
  // ==========================================
  async getUnits(): Promise<UnitDetail[] | null> {
    try {
      const { data, error } = await supabase.from('units').select('*');
      if (error) throw error;
      return (data || []).map((u: any) => ({
        ...u,
        unitNumber: u.unitnumber || u.unitNumber
      })) as UnitDetail[];
    } catch (err) {
      console.error('Error fetching units from Supabase:', err);
      return null;
    }
  },
  async createUnit(unit: UnitDetail) {
    const { unitNumber, ...rest } = unit;
    const dbUnit = { ...rest, unitnumber: unitNumber };
    const { data, error } = await supabase.from('units').insert(dbUnit).select().single();
    if (error) throw error;
    return { ...data, unitNumber: data.unitnumber || data.unitNumber };
  },
  async updateUnit(unit: UnitDetail) {
    const { unitNumber, ...rest } = unit;
    const dbUnit = { ...rest, unitnumber: unitNumber };
    const { data, error } = await supabase.from('units').update(dbUnit).eq('id', unit.id).select().single();
    if (error) throw error;
    return { ...data, unitNumber: data.unitnumber || data.unitNumber };
  },
  async deleteUnit(unitId: string) {
    const { error } = await supabase.from('units').delete().eq('id', unitId);
    if (error) throw error;
  },

  // ==========================================
  // CONTACTS
  // ==========================================
  async getContacts(): Promise<ContactItem[] | null> {
    try {
      const { data, error } = await supabase.from('contacts').select('*');
      if (error) throw error;
      return data as ContactItem[];
    } catch (err) {
      console.error('Error fetching contacts from Supabase:', err);
      return null;
    }
  },
  async createContact(contact: ContactItem) {
    const { data, error } = await supabase.from('contacts').insert(contact).select().single();
    if (error) throw error;
    return data;
  },
  async updateContact(contact: ContactItem) {
    const { data, error } = await supabase.from('contacts').update(contact).eq('id', contact.id).select().single();
    if (error) throw error;
    return data;
  },
  async deleteContact(id: string) {
    const { error } = await supabase.from('contacts').delete().eq('id', id);
    if (error) throw error;
  },

  // ==========================================
  // MEDIA UPLOADS
  // ==========================================
  async getMediaUploads(): Promise<MediaUploadItem[] | null> {
    try {
      const { data, error } = await supabase.from('media_uploads').select('*');
      if (error) throw error;
      return data as MediaUploadItem[];
    } catch (err) {
      console.error('Error fetching media uploads from Supabase:', err);
      return null;
    }
  },
  async createMediaUpload(media: MediaUploadItem) {
    const { data, error } = await supabase.from('media_uploads').insert(media).select().single();
    if (error) throw error;
    return data;
  },
  async deleteMediaUpload(id: string) {
    const { error } = await supabase.from('media_uploads').delete().eq('id', id);
    if (error) throw error;
  },

  // ==========================================
  // STORAGE BUCKET UPLOAD
  // ==========================================
  async uploadFileToStorage(file: File, folder: string = 'general'): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('posventa_media')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('posventa_media')
        .getPublicUrl(fileName);

      return publicUrlData.publicUrl;
    } catch (err) {
      console.error('Error uploading file to Supabase Storage:', err);
      throw err;
    }
  },

  // ==========================================
  // MAPEO 2D (VOLUMETRÍAS Y UNIDADES)
  // ==========================================
  async getObrasVolumetria(): Promise<ObraVolumetria[] | null> {
    try {
      const { data, error } = await supabase.from('obras_volumetria').select('*');
      if (error) throw error;
      return data as ObraVolumetria[];
    } catch (err) {
      console.error('Error fetching obras_volumetria:', err);
      return null;
    }
  },
  async getUnidadesMapeadas(): Promise<UnidadMapeada[] | null> {
    try {
      const { data, error } = await supabase.from('unidades_mapeadas').select('*');
      if (error) throw error;
      return data as UnidadMapeada[];
    } catch (err) {
      console.error('Error fetching unidades_mapeadas:', err);
      return null;
    }
  },
  async createUnidadMapeada(mapping: UnidadMapeada) {
    const projectId = mapping.volumetria_id.replace('vol-', '');
    // Check if a dummy volumetria exists for this project to satisfy foreign key constraint
    let { data: vol } = await supabase.from('obras_volumetria').select('id').eq('nombre', projectId).maybeSingle();
    
    if (!vol) {
      // Create a dummy volumetria record to satisfy foreign key
      const newVolId = crypto.randomUUID();
      const { data: newVol, error: volErr } = await supabase.from('obras_volumetria').insert({
        id: newVolId,
        nombre: projectId,
        imagen_url: 'placeholder',
        width_original: 100,
        height_original: 100,
        estado: 'Activo'
      }).select().single();
      
      if (volErr) throw volErr;
      vol = newVol;
    }

    // Assign the valid UUID foreign key
    const mappingToSave = { ...mapping, volumetria_id: vol.id };

    const { data, error } = await supabase.from('unidades_mapeadas').insert(mappingToSave).select().single();
    if (error) throw error;
    return data;
  },
  async deleteUnidadMapeada(id: string) {
    const { error } = await supabase.from('unidades_mapeadas').delete().eq('id', id);
    if (error) throw error;
  },

  // ==========================================
  // OWNER AUTHENTICATION
  // ==========================================
  async loginOwner(email: string, passwordHash: string) {
    const { data, error } = await supabase
      .from('app_users')
      .select('*')
      .eq('email', email)
      .eq('password', passwordHash)
      .single();

    if (error || !data) {
      return null;
    }
    return data;
  }
};
