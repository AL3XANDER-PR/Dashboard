import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { DashboardProvider } from "@/components/dashboard-provider";

export default function ProtectedRoute() {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  // console.log("💻 - ProtectedRoute:", loading);

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <DashboardProvider>
      <Outlet />
    </DashboardProvider>
  );
}
