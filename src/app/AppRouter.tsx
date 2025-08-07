// src/app/AppRouter.tsx
import { useRouteStore } from "@/store/route.store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useMemo } from "react";
import { generateRoutesFromDB } from "./router/router-builder";

export function AppRouter() {
  const routes = useRouteStore((s) => s.routes);

  const router = useMemo(() => {
    return createBrowserRouter(generateRoutesFromDB(routes));
  }, [routes]);

  return <RouterProvider router={router} />;
}
