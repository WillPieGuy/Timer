import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Timer as TimerIcon } from 'lucide-react';
import type { Timer } from '../lib/supabase';

type Props = {
  timer: Timer;
  onComplete?: () => void;
};

export default function CountdownTimer({ timer, onComplete }: Props) {
  const [timeLeft, setTimeLeft] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const endTime = new Date(timer.end_time);
      const now = new Date();

      if (now >= endTime) {
        setIsComplete(true);
        setTimeLeft('Completed');
        onComplete?.();
        clearInterval(interval);
      } else {
        setTimeLeft(formatDistanceToNow(endTime, { addSuffix: true }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer.end_time, onComplete]);

  return (
    <div className={`p-6 rounded-lg shadow-md ${isComplete ? 'bg-gray-100' : 'bg-white'}`}>
      <div className="flex items-center gap-2 mb-4">
        <TimerIcon className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-semibold">{timer.title}</h2>
      </div>
      {timer.description && (
        <p className="text-gray-600 mb-4">{timer.description}</p>
      )}
      <div className="text-2xl font-bold text-blue-600">
        {timeLeft}
      </div>
      <div className="mt-2 text-sm text-gray-500">
        {timer.views} views
      </div>
    </div>
  );
}