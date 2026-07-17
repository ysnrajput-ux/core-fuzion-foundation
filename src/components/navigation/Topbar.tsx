import { Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SidebarContext";
import { SearchBar } from "@/components/common/SearchBar";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ROUTES } from "@/constants/routes";
import { initials } from "@/utils/format";

export function Topbar() {
  const { user, signOut } = useAuth();
  const { setMobileOpen } = useSidebar();
  const navigate = useNavigate();

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
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
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
