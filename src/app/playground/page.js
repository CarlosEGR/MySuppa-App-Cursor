'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';

export default function Playground() {
  const { data: session, status } = useSession();
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (status === 'loading') {
    return null;
  }
  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast.error('Please enter an API key');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('API key is valid!');
        router.push('/protected');
      } else {
        toast.error(data.message || 'Invalid API key');
      }
    } catch (error) {
      toast.error('An error occurred while validating the API key');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            API Playground
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Test your API key to ensure it&apos;s working correctly. Enter your API key below to validate it.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="apiKey"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                API Key
              </label>
              <input
                type="text"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700"
                placeholder="Enter your API key"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 bg-[#9333EA] hover:bg-[#8829DB] text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Validating...' : 'Validate API Key'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 