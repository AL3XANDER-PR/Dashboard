"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Home, Users, ShoppingCart } from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "h-screen bg-gray-900 text-gray-100 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Toggle */}
      <div className="flex justify-end p-3">
        <button
          className="text-gray-400 hover:text-gray-100"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>

      {/* Items */}
      <nav className="flex flex-col gap-2 p-2">
        <SidebarItem collapsed={collapsed} icon={<Home />} label="Dashboard" />
        <SidebarItem
          collapsed={collapsed}
          icon={<Users />}
          label="User"
          subItems={[
            { label: "Profile", href: "/user/profile" },
            { label: "List", href: "/user/list" },
            { label: "Create", href: "/user/create" },
          ]}
        />
        <SidebarItem
          collapsed={collapsed}
          icon={<ShoppingCart />}
          label="Orders"
          subItems={[
            { label: "Active", href: "/orders/active" },
            { label: "History", href: "/orders/history" },
          ]}
        />
      </nav>
    </aside>
  );
}

function SidebarItem({
  collapsed,
  icon,
  label,
  subItems,
}: {
  collapsed: boolean;
  icon: React.ReactNode;
  label: string;
  subItems?: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  if (collapsed && subItems) {
    // 🔥 Popover controlado por hover
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className="p-2 hover:bg-gray-800 rounded"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            {icon}
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="right"
          align="start"
          className="backdrop-blur-md bg-gray-900/80 border border-gray-700 shadow-lg py-2"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="flex flex-col">
            <span className="px-3 py-1 text-sm font-semibold">{label}</span>
            {subItems.map(({ label: subLabel, href }) => (
              <a
                key={subLabel}
                href={href}
                className="px-3 py-1 text-sm hover:bg-gray-800 rounded"
              >
                {subLabel}
              </a>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  // Normal (expandido)
  return (
    <div
      className={cn(
        "flex flex-col",
        collapsed ? "items-center" : "items-start"
      )}
    >
      <button className="flex items-center gap-2 p-2 w-full hover:bg-gray-800 rounded">
        {icon}
        {!collapsed && <span>{label}</span>}
      </button>
      {!collapsed && subItems && (
        <div className="ml-8 flex flex-col gap-1">
          {subItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-2 py-1 text-sm rounded hover:bg-gray-800"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
