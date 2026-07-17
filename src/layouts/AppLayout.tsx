import { Outlet } from "react-router-dom";

import { Sidebar } from "@/components/navigation/Sidebar";
import { Topbar } from "@/components/navigation/Topbar";
import { MobileNav } from "@/components/navigation/MobileNav";
import { useSidebar } from "@/context/SidebarContext";
import { cn } from "@/lib/utils";

export function AppLayout() {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <MobileNav />
      <div
        className={cn(
          "transition-[padding] duration-200 ease-out",
          "lg:pl-64",
          collapsed && "lg:pl-16",
        )}
      >
        <Topbar />
        <main className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
