import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { useStore } from './lib/store';
import { Auth } from './components/Auth';
import { Navigation } from './components/Navigation';
import { CreateCountdown } from './components/CreateCountdown';
import { CountdownTimer } from './components/CountdownTimer';
import { SharedCountdown } from './components/SharedCountdown';
import { AllCountdowns } from './components/AllCountdowns';

function Dashboard() {
  const user = useStore((state) => state.user);
  const countdowns = useStore((state) => state.countdowns);
  const fetchCountdowns = useStore((state) => state.fetchCountdowns);

  React.useEffect(() => {
    if (user) {
      fetchCountdowns();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
        <CreateCountdown />
        
        <div className="space-y-4">
          {countdowns.map((countdown) => (
            <CountdownTimer
              key={countdown.id}
              {...countdown}
              onDelete={fetchCountdowns}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function App() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email! });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email! });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Dashboard /> : <Auth />}
        />
        <Route
          path="/all"
          element={user ? <AllCountdowns /> : <Navigate to="/" replace />}
        />
        <Route
          path="/shared/:shareId"
          element={<SharedCountdown />}
        />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;