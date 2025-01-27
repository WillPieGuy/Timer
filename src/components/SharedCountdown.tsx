import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Timer } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CountdownTimer } from './CountdownTimer';

export function SharedCountdown() {
  const [countdown, setCountdown] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const { shareId } = useParams();

  React.useEffect(() => {
    async function fetchSharedCountdown() {
      try {
        const { data, error } = await supabase
          .from('countdowns')
          .select('*')
          .eq('share_id', shareId)
          .single();

        if (error) {
          throw new Error('This countdown does not exist or has been deleted');
        }
        
        if (!data) {
          throw new Error('Countdown not found');
        }

        setCountdown(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (shareId) {
      fetchSharedCountdown();
    }
  }, [shareId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading countdown...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <Timer className="text-red-600" size={48} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Countdown Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <CountdownTimer {...countdown} />
      </div>
    </div>
  );
}