import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export default function CreateTimer() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('You must be signed in to create a timer');
      return;
    }

    const endDateTime = new Date(`${endDate}T${endTime}`);
    if (endDateTime <= new Date()) {
      setError('End time must be in the future');
      return;
    }

    try {
      const { data, error: insertError } = await supabase
        .from('timers')
        .insert([
          {
            title,
            description,
            end_time: endDateTime.toISOString(),
            created_by: user.id,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;
      if (data) {
        navigate(`/timer/${data.id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create timer');
    }
  };

  const setQuickTimer = (minutes: number) => {
    const now = new Date();
    const endDateTime = new Date(now.getTime() + minutes * 60000);
    setEndDate(endDateTime.toISOString().split('T')[0]);
    setEndTime(endDateTime.toTimeString().split(' ')[0].substring(0, 5));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Timer className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold">Create New Timer</h1>
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

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description (optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
              End Time
            </label>
            <input
              type="time"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Timer
        </button>
      </form>
    </div>
  );
}