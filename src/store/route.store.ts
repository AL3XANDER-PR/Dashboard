// src/store/route.store.ts
import { create } from "zustand";
import type { DBRoute } from "@/app/router/types";
import { publicRoutes } from "@/app/router";

interface RouteState {
  routes: DBRoute[];
  setRoutes: (routes: DBRoute[]) => void;
  resetRoutes: () => void;
}

export const useRouteStore = create<RouteState>((set) => ({
  routes: publicRoutes,
  setRoutes: (routes) => set({ routes }),
  resetRoutes: () => {
    set({ routes: publicRoutes });
  },
}));
