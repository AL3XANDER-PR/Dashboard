import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

export default function PublicOnlyRoute() {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  // console.log("💻 - PublicOnlyRoute - loading:", loading);

  if (loading) return null;

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
