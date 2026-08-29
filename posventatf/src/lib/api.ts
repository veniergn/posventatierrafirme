import { supabase } from './supabase';
import { Project, User, ConstructionMilestone, UnitDetail } from '../types';

export const api = {
  async getProjects(): Promise<Project[] | null> {
    try {
      const { data, error } = await supabase.from('projects').select('*');
      if (error) {
        console.error('Error fetching projects from Supabase:', error);
        return null;
      }
      return data as Project[];
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  async getUsers(): Promise<User[] | null> {
    try {
      const { data, error } = await supabase.from('app_users').select('*');
      if (error) {
        console.error('Error fetching users from Supabase:', error);
        return null;
      }
      return data as User[];
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  async getMilestones(): Promise<ConstructionMilestone[] | null> {
    try {
      const { data, error } = await supabase.from('milestones').select('*');
      if (error) {
        console.error('Error fetching milestones from Supabase:', error);
        return null;
      }
      return data as ConstructionMilestone[];
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  async getUnits(): Promise<UnitDetail[] | null> {
    try {
      const { data, error } = await supabase.from('units').select('*');
      if (error) {
        console.error('Error fetching units from Supabase:', error);
        return null;
      }
      return data as UnitDetail[];
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  async deleteUnit(unitId: string) {
    const { error } = await supabase.from('units').delete().eq('id', unitId);
    if (error) {
      console.error('Error al eliminar unidad:', error);
      throw error;
    }
  },

  // Owner Authentication
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
