// src/app/router/index.ts
import type { DBRoute } from "./types";

export const publicRoutes: DBRoute[] = [
  {
    id: "login",
    path: "/login",
    component: "LoginPage",
    layout: "AuthLayout",
    guard: "public",
    parent_id: null,
  },
  {
    id: "register",
    path: "/register",
    component: "RegisterPage",
    layout: "AuthLayout",
    guard: "public",
    parent_id: null,
  },
  {
    id: "forgot-password",
    path: "/forgot-password",
    component: "ForgotPassword",
    layout: "AuthLayout",
    guard: "public",
    parent_id: null,
  },
  {
    id: "dashboard",
    path: "/",
    component: "DashboardPage",
    layout: "MainLayout",
    guard: "private",
    parent_id: null,
  },
];
