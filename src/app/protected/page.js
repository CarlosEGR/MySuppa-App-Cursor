'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function Protected() {
  const router = useRouter();

  useEffect(() => {
    // You can add additional checks here if needed
    toast.success('Welcome to the protected area!');
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fc] dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Protected Area
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            You have successfully validated your API key. This is a protected area that only authenticated users can access.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => router.push('/playground')}
              className="w-full px-4 py-2 bg-[#9333EA] hover:bg-[#8829DB] text-white rounded-lg transition-colors"
            >
              Back to Playground
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 