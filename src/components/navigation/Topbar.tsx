import { Menu, LogOut, Sun, Moon, Monitor } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SidebarContext";
import { useTheme } from "@/context/ThemeContext";
import { SearchBar } from "@/components/common/SearchBar";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ROUTES } from "@/constants/routes";
import { initials } from "@/utils/format";
import { cn } from "@/lib/utils";

export function Topbar() {
  const { user, signOut } = useAuth();
  const { setMobileOpen } = useSidebar();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const themeIcons = [
    { key: "light" as const, icon: Sun },
    { key: "dark" as const, icon: Moon },
    { key: "system" as const, icon: Monitor },
  ];

  return (
    <header className="sticky top-0 z-20 h-16 flex items-center gap-4 border-b border-border/60 bg-background/80 backdrop-blur-xl px-4 sm:px-6">
      <button
        type="button"
        className="lg:hidden inline-flex size-9 items-center justify-center rounded-md hover:bg-accent"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </button>

      <div className="hidden sm:block flex-1 max-w-md">
        <SearchBar />
      </div>

      <div className="flex-1 sm:hidden" />

      <div className="flex items-center gap-3">
        <Breadcrumbs className="hidden md:flex" />

        {/* Theme toggle */}
        <div className="flex items-center gap-0.5 rounded-lg border border-border/60 p-0.5">
          {themeIcons.map((t) => (
            <button
              key={t.key}
              onClick={() => setTheme(t.key)}
              className={cn(
                "size-7 inline-flex items-center justify-center rounded-md transition-colors",
                theme === t.key ? "bg-accent text-primary" : "text-muted-foreground hover:text-foreground",
              )}
              aria-label={`${t.key} theme`}
            >
              <t.icon className="size-3.5" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full gradient-brand text-white text-xs font-medium flex items-center justify-center shadow-glow">
            {initials(user?.displayName ?? user?.email ?? "")}
          </div>
          <button
            type="button"
            onClick={async () => {
              await signOut();
              navigate(ROUTES.auth.login, { replace: true });
            }}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Sign out"
          >
            <LogOut className="size-3.5" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
