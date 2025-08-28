import { create } from "zustand";
import { type Session, type User } from "@supabase/supabase-js";
import Axios from "@/lib/apiClient";

interface AuthState {
  user: User | null;
  session: Session | null;
  accessToken: string | null;
  setAccessToken: (value: string) => void;

  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (value: boolean) => void;
  clearUser: () => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,
  accessToken: null,

  setLoading: (value: boolean) => set({ loading: value }),
  setAccessToken: (value: string) => set({ accessToken: value }),
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  logout: async () => {
    set({ user: null, session: null, accessToken: null, loading: false });
    // await supabase.auth.signOut();
    await Axios.post("/auth/logout");
  },
}));
