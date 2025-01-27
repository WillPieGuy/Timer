import React from 'react';
import { Timer } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CountdownTimer } from './CountdownTimer';

interface Countdown {
  id: string;
  title: string;
  target_time: string;
  timezone: string;
  share_id: string;
}

export function AllCountdowns() {
  const [countdowns, setCountdowns] = React.useState<Countdown[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchAllCountdowns() {
      try {
        const { data, error } = await supabase
          .from('countdowns')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setCountdowns(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllCountdowns();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (countdowns.length === 0) {
    return (
      <div className="text-center p-8">
        <Timer className="mx-auto text-gray-400 mb-4" size={48} />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">No Countdowns Found</h2>
        <p className="text-gray-500">There are currently no public countdowns available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Public Countdowns</h1>
        <p className="mt-2 text-gray-600">Browse all shared countdowns from the community</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {countdowns.map((countdown) => (
          <CountdownTimer key={countdown.id} {...countdown} />
        ))}
      </div>
    </div>
  );
}