import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

interface QuickTimerProps {
  minutes: number;
}

const QuickTimer: React.FC<QuickTimerProps> = ({ minutes }) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      setShowConfetti(true);
      const audio = new Audio('/path/to/chime.mp3');
      audio.play();
    }
  }, [timeLeft]);

  return (
    <div>
      <h2 className="text-2xl font-bold">{Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</h2>
      {showConfetti && <Confetti />}
    </div>
  );
};

export default QuickTimer;