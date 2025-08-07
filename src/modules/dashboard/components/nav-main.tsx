import { BookDashed, ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { useRouteStore } from "@/store/route.store";
import type { DBRoute } from "@/app/router/types";

interface SidebarItem {
  title: string | undefined;
  url: string;
  icon?: LucideIcon | undefined | string;
  isActive?: boolean;
  items?: SidebarItem[];
  fullPath?: string;
}

export function buildSidebarTree(routes: DBRoute[]): SidebarItem[] {
  const map = new Map<number | string, SidebarItem>();

  // Solo consideramos rutas privadas y sin parámetros
  const filteredRoutes = routes.filter(
    (route) =>
      route.guard === "private" && route.params === null && route.path !== "new" // cambiar las condicions para conincidir con la bd
  );

  // Crear los nodos base
  filteredRoutes.forEach((route) => {
    map.set(route.id, {
      title: route?.name,
      url: route.path,
      fullPath: route.path, // provisional
      icon: route.icon,
      items: [],
    });
  });

  const tree: SidebarItem[] = [];

  // Construir jerarquía solo con rutas filtradas
  filteredRoutes.forEach((route) => {
    const node = map.get(route.id)!;

    if (route.parent_id && map.has(route.parent_id)) {
      const parent = map.get(route.parent_id)!;
      node.fullPath = `${parent.fullPath}/${node.url}`.replace(/\/+/g, "/");
      parent.items!.push(node);
    } else {
      node.fullPath = `/${node.url}`;
      tree.push(node);
    }
  });

  return tree;
}

const renderSidebarItems = (
  items: SidebarItem[],
  parentPath = "",
  activePath = ""
) => {
  return items.map((item) => {
    const fullPath = `${parentPath}/${item.url}`.replace(/\/+/g, "/");
    const isActive =
      activePath === fullPath || activePath.startsWith(fullPath + "/");

    // Saber si algún hijo está activo
    const hasActiveChild = item.items?.some(
      (child) =>
        activePath === `${fullPath}/${child.url}` ||
        activePath.startsWith(`${fullPath}/${child.url}/`)
    );

    if (item.items && item.items.length > 0) {
      // Item con submenú
      return (
        <Collapsible
          key={fullPath}
          asChild
          defaultOpen={isActive && hasActiveChild === true}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={isActive && hasActiveChild === false}
              >
                <Link
                  to={item?.fullPath ? item?.fullPath : "/"}
                  className="flex justify-center items-center"
                >
                  <BookDashed className="w-4 h-4 mr-2" />
                  <span>{item.title}</span>
                </Link>
                <CollapsibleTrigger asChild>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarMenuButton>
            </>
            <CollapsibleContent>
              <SidebarMenuSub className="">
                {item.items.map((subItem) => {
                  const subFullPath = `${fullPath}/${subItem.url}`.replace(
                    /\/+/g,
                    "/"
                  );
                  const isSubActive =
                    activePath === subFullPath ||
                    activePath.startsWith(subFullPath + "/");

                  return (
                    <SidebarMenuSubItem key={subFullPath}>
                      <SidebarMenuSubButton asChild isActive={isSubActive}>
                        <Link to={subFullPath}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  );
                })}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }

    // Item sin submenú
    return (
      <SidebarMenuItem key={fullPath}>
        <SidebarMenuButton
          asChild
          className={isActive ? "bg-accent text-accent-foreground" : ""}
          tooltip={item.title}
          isActive={isActive}
        >
          <Link to={fullPath}>
            <BookDashed />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  });
};

export function NavMain() {
  const { pathname } = useLocation();
  const routes = useRouteStore((s) => s.routes);
  const sidebarItems = buildSidebarTree(routes);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <Link to={"/"}>
            <SidebarMenuButton
              tooltip={"Dashboard"}
              isActive={pathname === "/"}
            >
              <BookDashed />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        {renderSidebarItems(sidebarItems, "", pathname)}
      </SidebarMenu>
    </SidebarGroup>
  );
}
