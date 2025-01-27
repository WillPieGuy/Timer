import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { Share2, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useStore } from '../lib/store';

interface CountdownProps {
  id: string;
  title: string;
  target_time: string;
  timezone: string;
  share_id: string;
  onDelete?: () => void;
}

export function CountdownTimer({ id, title, target_time, timezone, share_id, onDelete }: CountdownProps) {
  const [timeLeft, setTimeLeft] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const targetDate = zonedTimeToUtc(target_time, timezone);
      setTimeLeft(formatDistanceToNow(targetDate, { addSuffix: true }));
    }, 1000);

    return () => clearInterval(timer);
  }, [target_time, timezone]);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/shared/${share_id}`;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from('countdowns')
      .delete()
      .eq('id', id);

    if (!error && onDelete) {
      onDelete();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <div className="flex gap-2">
          {onDelete && (
            <>
              <button
                onClick={handleShare}
                className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                title="Share countdown"
              >
                <Share2 size={20} />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-red-600 hover:text-red-800 transition-colors"
                title="Delete countdown"
              >
                <Trash2 size={20} />
              </button>
            </>
          )}
        </div>
      </div>
      <p className="text-4xl font-bold text-indigo-600 mb-2">{timeLeft}</p>
      <p className="text-sm text-gray-600">
        Target: {new Date(target_time).toLocaleString(undefined, {
          timeZone: timezone,
          dateStyle: 'full',
          timeStyle: 'long',
        })}
      </p>
      {copied && (
        <p className="text-sm text-green-600 mt-2">Share URL copied to clipboard!</p>
      )}
    </div>
  );
}