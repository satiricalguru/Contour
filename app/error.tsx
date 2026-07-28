'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App-level error caught:', error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 font-bold text-xl">
        !
      </div>
      <h2 className="text-xl font-bold text-white">Something went wrong!</h2>
      <p className="text-sm text-white/60 max-w-sm">
        {error.message || 'An unexpected error occurred in the application.'}
      </p>
      <button
        onClick={() => reset()}
        className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg transition-colors border border-white/15"
      >
        Try again
      </button>
    </div>
  );
}
