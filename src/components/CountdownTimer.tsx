import React, { useState, useEffect } from 'react';
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
    const updateTimer = () => {
      const endTime = new Date(timer.end_time).getTime();
      const now = Date.now();
      const diff = endTime - now;

      if (diff <= 0) {
        setIsComplete(true);
        setTimeLeft('Completed');
        onComplete?.();
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const milliseconds = (diff % 1000).toString().padStart(1, '0');

      let formattedTime = '';
      if (days > 0) formattedTime += `${days}d `;
      if (hours > 0 || days > 0) formattedTime += `${hours}h `;
      if (minutes > 0 || hours > 0 || days > 0) formattedTime += `${minutes}m `;
      formattedTime += `${seconds}.${milliseconds}s`;

      setTimeLeft(formattedTime.trim());
    };

    updateTimer(); // Initial update

    const interval = setInterval(updateTimer, 10); // Update every 10ms

    return () => clearInterval(interval);
  }, [timer.end_time, onComplete]);

  return (
    <div className={`p-6 rounded-lg shadow-md ${isComplete ? 'bg-gray-100' : 'bg-white'}`}>
      <div className="flex items-center gap-2 mb-4">
        <TimerIcon className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-semibold">{timer.title}</h2>
      </div>
      {timer.description && <p className="text-gray-600 mb-4">{timer.description}</p>}
      <div className="text-2xl font-bold text-blue-600">{timeLeft}</div>
      <div className="mt-2 text-sm text-gray-500">{timer.views} views</div>
    </div>
  );
}
