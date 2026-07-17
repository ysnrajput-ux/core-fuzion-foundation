import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, LayoutDashboard, Settings, GraduationCap } from "lucide-react";

import { useSidebar } from "@/context/SidebarContext";
import { ROUTES } from "@/constants/routes";
import { APP } from "@/constants/app";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", to: ROUTES.app.dashboard, icon: LayoutDashboard },
  { label: "Settings", to: ROUTES.app.settings, icon: Settings },
];

export function MobileNav() {
  const { mobileOpen, setMobileOpen } = useSidebar();

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
                <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <GraduationCap className="size-4" />
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
            <nav className="flex-1 p-2 space-y-1">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      "text-muted-foreground hover:text-foreground hover:bg-accent",
                      isActive && "bg-accent text-foreground font-medium",
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
