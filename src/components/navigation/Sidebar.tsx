import { NavLink } from "react-router-dom";
import { LayoutDashboard, Settings, GraduationCap, PanelLeftClose, PanelLeft } from "lucide-react";

import { APP } from "@/constants/app";
import { ROUTES } from "@/constants/routes";
import { useSidebar } from "@/context/SidebarContext";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV: NavItem[] = [
  { label: "Dashboard", to: ROUTES.app.dashboard, icon: LayoutDashboard },
  { label: "Settings", to: ROUTES.app.settings, icon: Settings },
];

export function Sidebar() {
  const { collapsed, toggleCollapsed } = useSidebar();

  return (
    <aside
      className={cn(
        "hidden lg:flex fixed inset-y-0 left-0 z-30 flex-col border-r border-border/60 bg-card/60 backdrop-blur-xl transition-[width] duration-200 ease-out",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="h-16 flex items-center px-4 border-b border-border/60">
        <div className="flex items-center gap-2 min-w-0">
          <div className="size-8 rounded-lg gradient-brand flex items-center justify-center shrink-0 shadow-glow">
            <GraduationCap className="size-4 text-white" />
          </div>
          {!collapsed && (
            <span className="text-sm font-semibold tracking-tight truncate">
              {APP.shortName}
            </span>
          )}
        </div>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                "text-muted-foreground hover:text-foreground hover:bg-accent",
                isActive && "bg-accent text-primary font-medium",
                collapsed && "justify-center px-2",
              )
            }
          >
            <item.icon className="size-4 shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-2 border-t border-border/60">
        <button
          type="button"
          onClick={toggleCollapsed}
          className={cn(
            "w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
            collapsed && "justify-center px-2",
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeft className="size-4" /> : <PanelLeftClose className="size-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
