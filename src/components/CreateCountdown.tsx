import React from 'react';
import { Clock, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useStore } from '../lib/store';

export function CreateCountdown() {
  const [title, setTitle] = React.useState('');
  const [targetDate, setTargetDate] = React.useState('');
  const [targetTime, setTargetTime] = React.useState('');
  const [hours, setHours] = React.useState('');
  const [minutes, setMinutes] = React.useState('');
  const [timezone, setTimezone] = React.useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const fetchCountdowns = useStore((state) => state.fetchCountdowns);
  const user = useStore((state) => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    let targetDateTime = '';
    if (targetDate && targetTime) {
      targetDateTime = `${targetDate}T${targetTime}`;
    } else {
      const now = new Date();
      const target = new Date(now.getTime() + (parseInt(hours) * 60 + parseInt(minutes)) * 60000);
      targetDateTime = target.toISOString();
    }

    const { error } = await supabase
      .from('countdowns')
      .insert({
        id: title, // Use the title as the ID
        title,
        target_time: targetDateTime,
        timezone,
        user_id: user.id // Add the user_id here
      });

    if (!error) {
      setTitle('');
      setTargetDate('');
      setTargetTime('');
      setHours('');
      setMinutes('');
      fetchCountdowns();
    } else {
      console.error('Error creating countdown:', error);
    }
  };

  const setQuickTimer = (minutes: number) => {
    const now = new Date();
    const target = new Date(now.getTime() + minutes * 60000);
    setTitle(`${minutes} Minute Timer`);
    setTargetDate(target.toISOString().split('T')[0]);
    setTargetTime(target.toTimeString().split(' ')[0].substring(0, 5));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="text-indigo-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Create New Countdown</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              id="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              End Time
            </label>
            <input
              type="time"
              id="time"
              value={targetTime}
              onChange={(e) => setTargetTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
              Hours
            </label>
            <input
              type="number"
              id="hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="minutes" className="block text-sm font-medium text-gray-700">
              Minutes
            </label>
            <input
              type="number"
              id="minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
            Timezone
          </label>
          <select
            id="timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {Intl.supportedValuesOf('timeZone').map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setQuickTimer(5)}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            5 Minutes
          </button>
          <button
            type="button"
            onClick={() => setQuickTimer(10)}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            10 Minutes
          </button>
          <button
            type="button"
            onClick={() => setQuickTimer(15)}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            15 Minutes
          </button>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} />
          Create Countdown
        </button>
      </div>
    </form>
  );
}