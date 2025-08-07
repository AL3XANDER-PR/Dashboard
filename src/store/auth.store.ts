import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { type Session, type User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  setUser: (user: User | null, session: Session | null) => void;
  setLoading: (value: boolean) => void;
  clearUser: () => void;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,

  setLoading: (value: boolean) => set({ loading: value }),
  setUser: (user, session) => set({ user, session }),
  clearUser: () => set({ user: null }),

  fetchUser: async () => {
    set({ loading: true });
    try {
      const { data } = await supabase.auth.getUser();
      set({ user: data?.user ?? null });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ user: null, session: null, loading: false });
    await supabase.auth.signOut();
  },
}));
