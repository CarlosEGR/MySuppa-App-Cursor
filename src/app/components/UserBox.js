'use client';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function UserBox() {
  const { data: session, status } = useSession();

  if (status === 'loading') return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md px-4 py-2 flex items-center gap-3">
      {session ? (
        <>
          <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">{session.user.email}</span>
          <button
            onClick={() => signOut()}
            className="ml-2 px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Sign out
          </button>
        </>
      ) : (
        <button
          onClick={() => signIn('google')}
          className="px-3 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
} 