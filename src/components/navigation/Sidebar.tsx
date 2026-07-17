import { NavLink } from "react-router-dom";
import { LayoutDashboard, Settings, GraduationCap, PanelLeftClose, PanelLeft, BookOpen, CalendarCheck, ClipboardList, CreditCard, Bell, Bookmark, Users, ChartBar as BarChart3, MessageSquare, User, Video, FileText, Trophy, Download } from "lucide-react";

import { APP } from "@/constants/app";
import { ROUTES } from "@/constants/routes";
import { useSidebar } from "@/context/SidebarContext";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/types/user";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_BY_ROLE: Record<UserRole, NavItem[]> = {
  student: [
    { label: "Dashboard", to: ROUTES.app.dashboard, icon: LayoutDashboard },
    { label: "Courses", to: ROUTES.app.courses, icon: BookOpen },
    { label: "Attendance", to: ROUTES.app.attendance, icon: CalendarCheck },
    { label: "Tests", to: ROUTES.app.tests, icon: ClipboardList },
    { label: "Results", to: ROUTES.app.results, icon: Trophy },
    { label: "Homework", to: ROUTES.app.homework, icon: ClipboardList },
    { label: "Study Material", to: ROUTES.app.materials, icon: FileText },
    { label: "Live Classes", to: ROUTES.app.live, icon: Video },
    { label: "Fees", to: ROUTES.app.fees, icon: CreditCard },
    { label: "Messages", to: ROUTES.app.messages, icon: MessageSquare },
    { label: "Reports", to: ROUTES.app.reports, icon: Download },
    { label: "Bookmarks", to: ROUTES.app.bookmarks, icon: Bookmark },
    { label: "Notifications", to: ROUTES.app.notifications, icon: Bell },
    { label: "Profile", to: ROUTES.app.profile, icon: User },
    { label: "Settings", to: ROUTES.app.settings, icon: Settings },
  ],
  teacher: [
    { label: "Dashboard", to: ROUTES.app.dashboard, icon: LayoutDashboard },
    { label: "Students", to: ROUTES.app.students, icon: Users },
    { label: "Courses", to: ROUTES.app.courses, icon: BookOpen },
    { label: "Attendance", to: ROUTES.app.attendance, icon: CalendarCheck },
    { label: "Tests", to: ROUTES.app.tests, icon: ClipboardList },
    { label: "Results", to: ROUTES.app.results, icon: Trophy },
    { label: "Homework", to: ROUTES.app.homework, icon: ClipboardList },
    { label: "Study Material", to: ROUTES.app.materials, icon: FileText },
    { label: "Live Classes", to: ROUTES.app.live, icon: Video },
    { label: "Messages", to: ROUTES.app.messages, icon: MessageSquare },
    { label: "Analytics", to: ROUTES.app.analytics, icon: BarChart3 },
    { label: "Reports", to: ROUTES.app.reports, icon: Download },
    { label: "Profile", to: ROUTES.app.profile, icon: User },
    { label: "Settings", to: ROUTES.app.settings, icon: Settings },
  ],
  parent: [
    { label: "Dashboard", to: ROUTES.app.dashboard, icon: LayoutDashboard },
    { label: "Attendance", to: ROUTES.app.attendance, icon: CalendarCheck },
    { label: "Tests", to: ROUTES.app.tests, icon: ClipboardList },
    { label: "Results", to: ROUTES.app.results, icon: Trophy },
    { label: "Fees", to: ROUTES.app.fees, icon: CreditCard },
    { label: "Messages", to: ROUTES.app.messages, icon: MessageSquare },
    { label: "Reports", to: ROUTES.app.reports, icon: Download },
    { label: "Notifications", to: ROUTES.app.notifications, icon: Bell },
    { label: "Profile", to: ROUTES.app.profile, icon: User },
    { label: "Settings", to: ROUTES.app.settings, icon: Settings },
  ],
  admin: [
    { label: "Dashboard", to: ROUTES.admin.dashboard, icon: LayoutDashboard },
    { label: "Students", to: ROUTES.admin.students, icon: Users },
    { label: "Teachers", to: ROUTES.admin.teachers, icon: GraduationCap },
    { label: "Parents", to: ROUTES.admin.parents, icon: Users },
    { label: "Batches", to: ROUTES.admin.batches, icon: BookOpen },
    { label: "Courses", to: ROUTES.admin.courses, icon: BookOpen },
    { label: "Revenue", to: ROUTES.admin.revenue, icon: CreditCard },
    { label: "Fees", to: ROUTES.admin.fees, icon: CreditCard },
    { label: "Notifications", to: ROUTES.admin.notifications, icon: Bell },
    { label: "Analytics", to: ROUTES.admin.analytics, icon: BarChart3 },
    { label: "Settings", to: ROUTES.admin.settings, icon: Settings },
  ],
};

export function Sidebar() {
  const { collapsed, toggleCollapsed } = useSidebar();
  const { role } = useAuth();
  const nav = NAV_BY_ROLE[role ?? "student"];

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

      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {nav.map((item) => (
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
