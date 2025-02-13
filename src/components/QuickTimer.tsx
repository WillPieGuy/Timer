import React, { useState, useEffect } from 'react';

type QuickTimerProps = {
  minutes: number;
  onComplete?: () => void;
};

export default function QuickTimer({ minutes, onComplete }: QuickTimerProps) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={`p-6 rounded-lg shadow-md ${isComplete ? 'bg-gray-100' : 'bg-white'}`}>
      <div className="text-2xl font-bold text-blue-600">{formatTime(timeLeft)}</div>
      {isComplete && <div className="text-green-600">Time's up!</div>}
    </div>
  );
}