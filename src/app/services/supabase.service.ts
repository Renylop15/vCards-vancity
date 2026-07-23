import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Método para buscar la ejecutiva por el slug de la URL
  async getVcardBySlug(slug: string) {
    const { data, error } = await this.supabase
      .from('vcards')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single(); // Devuelve un solo objeto, no un array
      
    if (error) throw error;
    return data;
  }
}