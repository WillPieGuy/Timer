import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Share2, ArrowLeft } from 'lucide-react';
import { supabase, type Timer, type Profile } from '../lib/supabase';
import CountdownTimer from '../components/CountdownTimer';

export default function TimerPage() {
  const { title, endTime } = useParams<{ title: string; endTime: string }>();
  const [timer, setTimer] = useState<Timer | null>(null);
  const [creator, setCreator] = useState<Profile | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchTimer = async () => {
      if (!title || !endTime) return;

      try {
        console.log(`Fetching timer with title: ${title} and end time: ${endTime}`);
        // Fetch timer by title and end time
        const { data: fetchedTimer, error: fetchError } = await supabase
          .from('timers')
          .select('*')
          .eq('title', title)
          .eq('end_time', endTime)
          .single();

        if (fetchError) throw fetchError;

        if (fetchedTimer) {
          console.log('Fetched timer:', fetchedTimer);
          // Increment views
          const { data: updatedTimer, error: updateError } = await supabase.rpc('increment_timer_views', {
            timer_id: fetchedTimer.id
          });

          if (updateError) throw updateError;

          setTimer(updatedTimer);

          // Fetch creator profile
          const { data: creatorData, error: creatorError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', updatedTimer.created_by)
            .single();

          if (creatorError) throw creatorError;
          setCreator(creatorData);
        } else {
          setError('Timer not found');
        }
      } catch (err) {
        console.error('Error fetching timer:', err);
        setError(err instanceof Error ? err.message : 'Failed to load timer');
      }
    };

    fetchTimer();
  }, [title, endTime]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);

    // Hide message after 3 seconds
    setTimeout(() => setCopied(false), 3000);
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

          {copied && (
            <p className="text-2xl font-bold text-green-600 text-center">Link Copied!</p>
          )}

          <div className="text-sm text-gray-600">
            <p>Created: {new Date(timer.created_at).toLocaleDateString()}</p>
            <p>Views: {timer.views}</p>
          </div>
        </div>
      </div>
    </div>
  );
}