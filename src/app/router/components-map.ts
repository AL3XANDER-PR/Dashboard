import {
  lazy,
  type FC,
  type JSX,
  type LazyExoticComponent,
  type PropsWithChildren,
} from "react";

// export const COMPONENTS_MAP = {
//   LoginPage: lazy(() => import("@/modules/auth/pages/LoginPage")),
//   RegisterPage: lazy(() => import("@/modules/auth/pages/RegisterPage")),
//   ForgotPassword: lazy(() => import("@/modules/auth/pages/ForgotPassword")),
//   UpdatePassword: lazy(() => import("@/modules/auth/pages/UpdatePassword")),
//   NotFoundRouter: lazy(() => import("@/shared/pages/NotFoundRouter")),
//   DashboardPage: lazy(() => import("@/modules/dashboard/pages/DashboardPage")),
//   UsuariosPage: lazy(() => import("@/modules/dashboard/pages/UsuariosPage")),
//   EditPage: lazy(() => import("@/modules/dashboard/pages/EditPage")),
// } as const satisfies Record<string, LazyExoticComponent<FC>>;

const modules = import.meta.glob([
  "@/modules/**/pages/**/*.tsx",
  "@/shared/pages/**/*.tsx",
]);

// Crea el mapa dinámico
export const COMPONENTS_MAP = Object.entries(modules).reduce(
  (acc, [path, importer]) => {
    const match = path.match(/\/([^/]+)\.tsx$/);
    if (!match) return acc;

    const componentName = match[1]; // Por ejemplo: LoginPage
    acc[componentName] = lazy(importer as () => Promise<{ default: FC }>);
    return acc;
  },
  {} as Record<string, LazyExoticComponent<FC>>
);

export const LAYOUTS_MAP = {
  AuthLayout: lazy(() => import("@/app/layout/AuthLayout")),
  MainLayout: lazy(() => import("@/app/layout/MainLayout")),
} as const satisfies Record<
  string,
  LazyExoticComponent<(props: PropsWithChildren) => JSX.Element>
>;

export const GUARDS_MAP = {
  public: lazy(() => import("@/app/guards/PublicOnlyRoute")),
  private: lazy(() => import("@/app/guards/ProtectedRoute")),
  none: null,
} as const;

export type ComponentKey = keyof typeof COMPONENTS_MAP;
export type LayoutKey = keyof typeof LAYOUTS_MAP;
export type GuardKey = keyof typeof GUARDS_MAP;
