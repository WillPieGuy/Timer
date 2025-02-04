import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Timer, Plus } from 'lucide-react';
import { supabase, type Timer as TimerType } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import CountdownTimer from '../components/CountdownTimer';

export default function Profile() {
  const { user } = useAuth();
  const [timers, setTimers] = useState<TimerType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserTimers = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('timers')
          .select('*')
          .eq('created_by', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTimers(data || []);
      } catch (err) {
        console.error('Error fetching timers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTimers();
  }, [user]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Timers</h1>
        <Link
          to="/create"
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Timer
        </Link>
      </div>

      {loading ? (
        <p className="text-center py-12 text-gray-600">Loading...</p>
      ) : timers.length === 0 ? (
        <div className="text-center py-12">
          <Timer className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">You haven't created any timers yet</p>
          <Link
            to="/create"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Create your first timer
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {timers.map((timer) => (
            <Link key={timer.id} to={`/timer/${timer.id}`}>
              <CountdownTimer timer={timer} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}