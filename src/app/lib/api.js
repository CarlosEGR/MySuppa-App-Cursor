import { supabase } from './supabase';

export const apiKeyService = {
  // Fetch all API keys
  async getAllKeys() {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  },

  // Create a new API key
  async createKey({ name, value }) {
    const { data, error } = await supabase
      .from('api_keys')
      .insert([{ name, value, usage: 0 }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  // Delete an API key
  async deleteKey(id) {
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return true;
  },

  // Update API key usage
  async updateKeyUsage(id, usage) {
    const { data, error } = await supabase
      .from('api_keys')
      .update({ usage })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  async validateKey(apiKey) {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('id')
        .eq('value', apiKey)
        .single();

      if (error) {
        console.error('Error validating API key:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Error validating API key:', error);
      return false;
    }
  }
}; 