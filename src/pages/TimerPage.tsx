import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Share2, ArrowLeft } from 'lucide-react';
import { supabase, type Timer, type Profile } from '../lib/supabase';
import CountdownTimer from '../components/CountdownTimer';

export default function TimerPage() {
  const { id } = useParams<{ id: string }>();
  const [timer, setTimer] = useState<Timer | null>(null);
  const [creator, setCreator] = useState<Profile | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTimer = async () => {
      if (!id) return;

      try {
        // Increment views
        const { data: updatedTimer, error: updateError } = await supabase.rpc('increment_timer_views', {
          timer_id: id
        });

        if (updateError) throw updateError;

        if (updatedTimer) {
          setTimer(updatedTimer);
          
          // Fetch creator profile
          const { data: creatorData, error: creatorError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', updatedTimer.created_by)
            .single();

          if (creatorError) throw creatorError;
          setCreator(creatorData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load timer');
      }
    };

    fetchTimer();
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <Link to="/" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
          Return to Home
        </Link>
      </div>
    );
  }

  if (!timer || !creator) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <CountdownTimer timer={timer} />
        
        <div className="p-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Created by</p>
              <p className="font-medium">{creator.username}</p>
            </div>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>

          <div className="text-sm text-gray-600">
            <p>Created: {new Date(timer.created_at).toLocaleDateString()}</p>
            <p>Views: {timer.views}</p>
          </div>
        </div>
      </div>
    </div>
  );
}