import { useEffect, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { useRouteStore } from "@/store/route.store";
import { publicRoutes } from "./router";
import { fetchPrivateRoutes } from "@/lib/fetchPrivateRoutes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Axios from "@/lib/apiClient";

const queryClient = new QueryClient();

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const setUser = useAuthStore((s) => s.setUser);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const user = useAuthStore((s) => s.user);
  const setLoading = useAuthStore((s) => s.setLoading);
  const setRoutes = useRouteStore((s) => s.setRoutes);

  const handleSession = async (userData: any | null) => {
    // Solo actualizar si hay cambio real
    // setUser(session?.user ?? null, session?.access_token ?? null);
    setUser(userData);
    if (userData) {
      const privateRoutes = await fetchPrivateRoutes();
      setRoutes([...publicRoutes, ...privateRoutes]);
    } else {
      setRoutes(publicRoutes);
    }
    setLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      if (!user) {
        try {
          // Intenta refrescar sesión
          const res = await Axios.post("/auth/refresh");
          setAccessToken(res.data.accessToken);
          await handleSession(res.data.user);
        } catch {
          await handleSession(null);
        }
      } else {
        await handleSession(user);
      }
    };
    init();
  }, []);

  // Reacciona a cambios de user → monta rutas privadas cuando se loguea
  useEffect(() => {
    if (user) {
      handleSession(user);
    }
  }, [user]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
