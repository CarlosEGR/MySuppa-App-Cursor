'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { apiKeyService } from '../lib/api';
import { isSupabaseConfigured } from '../lib/supabase';
import ApiKeyTable from '../components/ApiKeyTable';
import CreateApiKeyModal from '../components/CreateApiKeyModal';
import UsagePlanCard from '../components/UsagePlanCard';

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApiKeys = async () => {
    try {
      setError(null);
      
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase is not properly configured. Please check your environment variables.');
      }
      
      const data = await apiKeyService.getAllKeys();
      setApiKeys(data || []);
    } catch (error) {
      console.error('Error fetching API keys:', error);
      setError(error.message || 'Failed to fetch API keys. Please try again.');
      toast.error('Failed to fetch API keys');
    } finally {
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const handleCreateKey = async (formData) => {
    if (!formData.name.trim() || !formData.value.trim()) {
      toast.error('Please enter both name and API key');
      return;
    }

    setIsLoading(true);
    try {
      const data = await apiKeyService.createKey(formData);
      setApiKeys(prev => [data, ...prev]);
      setShowCreateModal(false);
      toast.success('API key created successfully');
    } catch (error) {
      console.error('Error creating API key:', error);
      toast.error('Failed to create API key: ' + (error?.message || error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteKey = async (id) => {
    try {
      await apiKeyService.deleteKey(id);
      setApiKeys(prev => prev.filter(key => key.id !== id));
      toast.success('API key deleted successfully');
    } catch (error) {
      console.error('Error deleting API key:', error);
      toast.error('Failed to delete API key');
    }
  };

  const handleEditName = async (id, newName) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('api_keys')
        .update({ name: newName })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      setApiKeys(prev =>
        prev.map(key => (key.id === id ? { ...key, name: newName } : key))
      );
      toast.success('Name updated!');
    } catch (error) {
      toast.error('Failed to update name: ' + (error.message || error));
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] dark:bg-gray-900 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-purple-600 border-purple-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading API keys...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] dark:bg-gray-900 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-gray-900 dark:text-white text-lg mb-4">{error}</p>
          <button
            onClick={fetchApiKeys}
            className="px-4 py-2 bg-[#9333EA] hover:bg-[#8829DB] text-white rounded-lg transition-colors text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const totalUsage = apiKeys.reduce((acc, key) => acc + key.usage, 0);

  return (
    <div className="min-h-screen bg-[#f8f9fc] dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">API Keys</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage your API keys for authentication
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-[#9333EA] hover:bg-[#8829DB] text-white rounded-lg transition-colors text-sm font-medium"
          >
            + Create API Key
          </button>
        </div>

        <UsagePlanCard totalUsage={totalUsage} />

        {/* API Keys Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">API Keys</h3>
              <p className="text-sm text-gray-500">The key is used to authenticate your requests to the Research API.</p>
            </div>
          </div>

          <ApiKeyTable
            apiKeys={apiKeys}
            onDelete={handleDeleteKey}
            onEditName={handleEditName}
          />
        </div>
      </div>

      <CreateApiKeyModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateKey}
        isLoading={isLoading}
      />
    </div>
  );
} 