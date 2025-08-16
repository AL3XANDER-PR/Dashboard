"use client";

import * as React from "react";
import { Command } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { Link, useNavigate } from "react-router-dom";
import { NavMain } from "./nav-main";
import { useAuthStore } from "@/store/auth.store";
import { useRouteStore } from "@/store/route.store";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const logout = useAuthStore((s) => s.logout);
  const resetRoutes = useRouteStore((s) => s.resetRoutes);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    resetRoutes();
    navigate("/login", { replace: true }); // <-- importante
    console.log("logout");
  };
  const userSession = useAuthStore((s) => s.user);
  const user = {
    name: userSession?.email?.split("@")[0],
    email: userSession?.email,
    avatar: "https://ui.shadcn.com/avatars/shadcn.jpg",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} logout={handleLogout} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
