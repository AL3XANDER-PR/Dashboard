import { DarkModeToggle } from "@/components/DarkModeToggle";
import { useLayout } from "@/components/dashboard-provider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useFullscreen } from "@/hooks/useFullscreen";
import { AppSidebar } from "@/modules/dashboard/components/AppSidebar";
import { Fullscreen, Maximize, Minimize, Shrink } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import React, { type JSX } from "react";

export default function MainLayout(): JSX.Element {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { layout, setLayout } = useLayout();

  const toggleLayout = () => {
    setLayout(layout === "full" ? "compact" : "full");
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="sidebar" />
      <SidebarInset>
        <header className="bg-background/70 sticky top-0 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b  backdrop-blur-md shadow-md translate-y-0 z-50">
          <div className="flex items-center gap-2 px-6 md:px-12">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4" />

            <Button
              className=" -ml-1 hidden md:flex"
              size={"icon"}
              variant={"ghost"}
              onClick={() => toggleLayout()}
            >
              {layout === "compact" ? <Fullscreen /> : <Shrink />}
            </Button>
            <Separator orientation="vertical" className="h-4 hidden md:flex" />
            <DarkModeToggle />
            <Separator orientation="vertical" className="h-4 hidden md:flex" />

            <Button
              className=" -ml-1"
              size={"icon"}
              variant={"ghost"}
              onClick={toggleFullscreen}
            >
              {!isFullscreen ? <Maximize /> : <Minimize />}
            </Button>
            <Separator orientation="vertical" className="mr-2 h-4" />

            <DynamicBreadcrumb />
          </div>
        </header>
        <div className="flex flex-1 flex-col">
          <div
            className={`@container/main flex flex-1 flex-col gap-2 transition-transform duration-500 ease w-full ${
              layout === "compact"
                ? "lg:w-[calc(100vw-25rem)] mx-auto"
                : "w-full"
            }`}
          >
            <div className="flex flex-col gap-4 px-6 md:px-12 md:gap-6 py-4 md:py-6">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export function DynamicBreadcrumb() {
  const location = useLocation();

  const pathnames = location.pathname
    .split("/")
    .filter(Boolean)
    .filter((segment) => isNaN(Number(segment)) && !isUUID(segment)); // Ignora ids y UUIDs

  const fullPaths = pathnames.map(
    (_, index) => "/" + pathnames.slice(0, index + 1).join("/")
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathnames.map((segment, index) => {
          const isLast = index === pathnames.length - 1;
          const href = fullPaths[index];

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{segment}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={href}>{segment}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// Helper para detectar si el segmento es UUID
function isUUID(value: string): boolean {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
    value
  );
}
