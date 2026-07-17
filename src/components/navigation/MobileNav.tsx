import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, GraduationCap, LayoutDashboard, Settings, BookOpen, CalendarCheck, ClipboardList, CreditCard, Bell, Bookmark, Users, ChartBar as BarChart3, MessageSquare, User, Video, FileText, Trophy, Download } from "lucide-react";

import { useSidebar } from "@/context/SidebarContext";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/constants/routes";
import { APP } from "@/constants/app";
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
    { label: "Courses", to: ROUTES.admin.courses, icon: BookOpen },
    { label: "Revenue", to: ROUTES.admin.revenue, icon: CreditCard },
    { label: "Analytics", to: ROUTES.admin.analytics, icon: BarChart3 },
    { label: "Settings", to: ROUTES.admin.settings, icon: Settings },
  ],
};

export function MobileNav() {
  const { mobileOpen, setMobileOpen } = useSidebar();
  const { role } = useAuth();
  const nav = NAV_BY_ROLE[role ?? "student"];

  return (
    <AnimatePresence>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
          <motion.aside
            className="absolute inset-y-0 left-0 w-72 bg-card border-r border-border shadow-xl flex flex-col"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 240 }}
          >
            <div className="h-16 flex items-center justify-between px-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg gradient-brand flex items-center justify-center shadow-glow">
                  <GraduationCap className="size-4 text-white" />
                </div>
                <span className="text-sm font-semibold">{APP.shortName}</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex size-9 items-center justify-center rounded-md hover:bg-accent"
                aria-label="Close navigation"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      "text-muted-foreground hover:text-foreground hover:bg-accent",
                      isActive && "bg-accent text-primary font-medium",
                    )
                  }
                >
                  <item.icon className="size-4" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
