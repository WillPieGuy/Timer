import React, { useState } from 'react';
import { Timer } from 'lucide-react';
import QuickTimer from '../components/QuickTimer'; // Import QuickTimer component

export default function CreateQuickTimer() { // Ensure the component name matches the file name
  const [quickTimerMinutes, setQuickTimerMinutes] = useState<number | null>(null); // State to manage QuickTimer duration
  const [customMinutes, setCustomMinutes] = useState<number | ''>(''); // State to manage custom input for minutes
  const [customSeconds, setCustomSeconds] = useState<number | ''>(''); // State to manage custom input for seconds

  const setQuickTimer = (minutes: number) => {
    setQuickTimerMinutes(minutes);
  };

  const handleCustomTimeSubmit = () => {
    const totalSeconds = (Number(customMinutes) * 60) + Number(customSeconds);
    if (totalSeconds > 0) {
      setQuickTimer(totalSeconds / 60);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Timer className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold">Create Quick Timer</h1>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setQuickTimer(2)}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          2 Minutes
        </button>
        <button
          onClick={() => setQuickTimer(5)}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          5 Minutes
        </button>
        <button
          onClick={() => setQuickTimer(10)}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          10 Minutes
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="number"
          value={customMinutes}
          onChange={(e) => setCustomMinutes(Number(e.target.value))}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Minutes"
        />
        <input
          type="number"
          value={customSeconds}
          onChange={(e) => setCustomSeconds(Number(e.target.value))}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Seconds"
        />
        <button
          onClick={handleCustomTimeSubmit}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Set Custom Timer
        </button>
      </div>

      {quickTimerMinutes !== null && (
        <QuickTimer minutes={quickTimerMinutes} /> // Render QuickTimer with the selected duration
      )}
    </div>
  );
}