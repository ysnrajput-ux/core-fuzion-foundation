import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Users, Settings, LogOut, Menu, X, Shield } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/constants/routes";
import { ROLE_LABELS } from "@/constants/roles";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", to: ROUTES.admin.dashboard, icon: LayoutDashboard },
  { label: "Users", to: ROUTES.admin.users, icon: Users },
  { label: "Settings", to: ROUTES.admin.settings, icon: Settings },
];

export function AdminLayout() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate(ROUTES.auth.login, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border/60 bg-card lg:flex">
        <AdminNavHeader />
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((item) => (
            <NavLink key={item.to} item={item} active={location.pathname === item.to} />
          ))}
        </nav>
        <AdminNavFooter user={user} role="admin" onSignOut={handleSignOut} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="absolute left-0 top-0 h-full w-64 bg-card border-r border-border/60 flex flex-col"
            >
              <AdminNavHeader onClose={() => setOpen(false)} />
              <nav className="flex-1 space-y-1 p-3">
                {NAV.map((item) => (
                  <NavLink
                    key={item.to}
                    item={item}
                    active={location.pathname === item.to}
                    onClick={() => setOpen(false)}
                  />
                ))}
              </nav>
              <AdminNavFooter user={user} role="admin" onSignOut={handleSignOut} />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 glass border-b border-border/40">
          <div className="flex h-14 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="lg:hidden size-9 inline-flex items-center justify-center rounded-lg hover:bg-accent"
              >
                <Menu className="size-5" />
              </button>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
                <Shield className="size-4 text-primary" />
                Admin Console
              </span>
            </div>
            <span className="text-xs text-muted-foreground hidden sm:block">
              {ROLE_LABELS.admin} workspace
            </span>
          </div>
        </header>
        <main className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function AdminNavHeader({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex h-14 items-center justify-between px-4 border-b border-border/60">
      <Link to={ROUTES.admin.dashboard} className="flex items-center gap-2">
        <div className="size-8 rounded-lg gradient-brand flex items-center justify-center shadow-glow">
          <Shield className="size-4 text-white" />
        </div>
        <span className="font-serif font-bold text-sm">Fuzion Admin</span>
      </Link>
      {onClose && (
        <button onClick={onClose} className="size-9 inline-flex items-center justify-center rounded-lg hover:bg-accent">
          <X className="size-5" />
        </button>
      )}
    </div>
  );
}

function AdminNavFooter({
  user,
  role,
  onSignOut,
}: {
  user: { displayName: string | null; email: string | null } | null;
  role: string;
  onSignOut: () => void;
}) {
  return (
    <div className="border-t border-border/60 p-3">
      <div className="flex items-center gap-3 rounded-lg px-2 py-2">
        <div className="size-9 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-semibold">
          {user?.displayName?.[0] ?? "A"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{user?.displayName ?? "Admin"}</p>
          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
        </div>
      </div>
      <button
        onClick={onSignOut}
        className="mt-1 w-full flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
      >
        <LogOut className="size-4" />
        Sign out
      </button>
    </div>
  );
}

function NavLink({
  item,
  active,
  onClick,
}: {
  item: { label: string; to: string; icon: React.ComponentType<{ className?: string }> };
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      to={item.to}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        active ? "bg-accent text-primary font-medium" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
      )}
    >
      <item.icon className="size-4" />
      {item.label}
    </Link>
  );
}
