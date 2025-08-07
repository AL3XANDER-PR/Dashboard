// src/app/App.tsx
import { AppRouter } from "./AppRouter";
import { useAuthStore } from "@/store/auth.store";

export function App() {
  const loading = useAuthStore((s) => s.loading);

  if (loading) return null; // O un Spinner si prefieres

  return <AppRouter />;
}
