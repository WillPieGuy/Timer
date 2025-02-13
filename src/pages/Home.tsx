import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { supabase, type Timer } from '../lib/supabase';
import CountdownTimer from '../components/CountdownTimer';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTimers = async () => {
      const { data, error } = await supabase
        .from('timers')
        .select('*')
        .gt('end_time', new Date().toISOString()) // Filter timers with end_time in the future
        .order('views', { ascending: false })
        .limit(10);

      if (!error && data) {
        setTimers(data);
      }
    };

    fetchTimers();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Popular Countdowns</h1>
        {user && (
          <Link
            to="/create"
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Timer
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {timers.map((timer) => (
          <Link key={timer.id} to={`/timer/${timer.id}`}>
            <CountdownTimer timer={timer} />
          </Link>
        ))}
      </div>
    </div>
  );
}