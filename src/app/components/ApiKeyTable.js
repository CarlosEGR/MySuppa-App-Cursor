'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ApiKeyTable({ apiKeys, onDelete, onEditName }) {
  const [revealedKeys, setRevealedKeys] = useState({});
  const [editRowId, setEditRowId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleRevealKey = (keyId) => {
    setRevealedKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success('API key copied to clipboard'))
      .catch(() => toast.error('Failed to copy API key'));
  };

  const handleEditSubmit = async (id) => {
    if (!editName.trim()) {
      toast.error('Name cannot be empty');
      return;
    }
    await onEditName(id, editName);
    setEditRowId(null);
    setEditName('');
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="border-y border-gray-100 dark:border-gray-700">
          <th className="text-left text-sm text-gray-500 px-6 py-3">NAME</th>
          <th className="text-left text-sm text-gray-500 px-6 py-3">API KEY</th>
          <th className="text-left text-sm text-gray-500 px-6 py-3">USAGE</th>
          <th className="text-left text-sm text-gray-500 px-6 py-3">OPTIONS</th>
        </tr>
      </thead>
      <tbody>
        {apiKeys.length === 0 ? (
          <tr>
            <td colSpan="4" className="text-center py-8 text-gray-500">
              No API keys found. Create one to get started.
            </td>
          </tr>
        ) : (
          apiKeys.map((key) => (
            <tr key={key.id} className="border-b border-gray-100 dark:border-gray-700">
              <td className="px-6 py-4">
                {editRowId === key.id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-2 py-1 border rounded"
                      placeholder="Enter new name"
                    />
                    <button
                      onClick={() => handleEditSubmit(key.id)}
                      className="text-green-600 hover:text-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditRowId(null)}
                      className="text-gray-600 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>{key.name}</span>
                    <button
                      onClick={() => {
                        setEditRowId(key.id);
                        setEditName(key.name);
                      }}
                      className="text-gray-600 hover:text-gray-700"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono">
                    {revealedKeys[key.id] ? key.value : '*'.repeat(key.value.length)}
                  </span>
                  <button
                    onClick={() => handleRevealKey(key.id)}
                    className="text-gray-600 hover:text-gray-700"
                  >
                    {revealedKeys[key.id] ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={() => copyToClipboard(key.value)}
                    className="text-gray-600 hover:text-gray-700"
                  >
                    Copy
                  </button>
                </div>
              </td>
              <td className="px-6 py-4">{key.usage}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onDelete(key.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
} 