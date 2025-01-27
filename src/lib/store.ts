import { create } from 'zustand';
import { supabase } from './supabase';

interface User {
  id: string;
  email: string;
}

interface Countdown {
  id: string;
  title: string;
  target_time: string;
  timezone: string;
  share_id: string;
}

interface AppState {
  user: User | null;
  countdowns: Countdown[];
  setUser: (user: User | null) => void;
  setCountdowns: (countdowns: Countdown[]) => void;
  addCountdown: (countdown: Countdown) => void;
  removeCountdown: (id: string) => void;
  fetchCountdowns: () => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  user: null,
  countdowns: [],
  setUser: (user) => set({ user }),
  setCountdowns: (countdowns) => set({ countdowns }),
  addCountdown: (countdown) => set((state) => ({ 
    countdowns: [...state.countdowns, countdown] 
  })),
  removeCountdown: (id) => set((state) => ({ 
    countdowns: state.countdowns.filter((c) => c.id !== id) 
  })),
  fetchCountdowns: async () => {
    const { data, error } = await supabase
      .from('countdowns')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      set({ countdowns: data });
    }
  },
}));