// src/app/providers.tsx
import { useEffect, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/auth.store";
import { useRouteStore } from "@/store/route.store";
import { publicRoutes } from "./router";
import { fetchPrivateRoutes } from "@/lib/fetchPrivateRoutes";
import type { Session } from "@supabase/supabase-js";

const queryClient = new QueryClient();

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const setUser = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);
  const setRoutes = useRouteStore((s) => s.setRoutes);

  // Maneja rutas según sesión
  const handleSession = async (session: Session | null) => {
    setUser(session?.user ?? null, session ?? null);
    if (session?.user) {
      const privateRoutes = await fetchPrivateRoutes();
      setRoutes([...publicRoutes, ...privateRoutes]);
    } else {
      setRoutes(publicRoutes);
    }
    setLoading(false);
  };

  useEffect(() => {
    let unsubscribe: () => void;

    const init = async () => {
      // Sesión persistente
      const { data } = await supabase.auth.getSession();
      await handleSession(data.session);

      // Suscripción a cambios de sesión
      const { data: listener } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          await handleSession(session);
        }
      );

      unsubscribe = () => listener.subscription.unsubscribe();
    };

    init();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
