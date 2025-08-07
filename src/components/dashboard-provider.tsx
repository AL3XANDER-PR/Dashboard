import { createContext, useContext, useState } from "react";

type Theme = "full" | "compact";

type DashboardProviderProps = {
  children: React.ReactNode;
  defaultLayout?: Theme;
  storageKey?: string;
};

type DashboardProviderState = {
  layout: Theme;
  setLayout: (layout: Theme) => void;
};

const initialState: DashboardProviderState = {
  layout: "full",
  setLayout: () => null,
};

const DashboardProviderContext =
  createContext<DashboardProviderState>(initialState);

export function DashboardProvider({
  children,
  defaultLayout = "full",
  storageKey = "vite-ui-content-layout",
}: DashboardProviderProps) {
  const [layout, setLayout] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultLayout
  );

  const value = {
    layout,
    setLayout: (layout: Theme) => {
      localStorage.setItem(storageKey, layout);
      setLayout(layout);
    },
  };

  return (
    <DashboardProviderContext.Provider value={value}>
      {children}
    </DashboardProviderContext.Provider>
  );
}

export const useLayout = () => {
  const context = useContext(DashboardProviderContext);

  if (!context)
    throw new Error("useLayout debe ser usado dentro de un DashboardProvider");

  return context;
};
