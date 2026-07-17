import type { ReactNode } from "react";
import { Toaster } from "sonner";

import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";

interface Props {
  children: ReactNode;
}

/**
 * Central provider composition. Add new global providers here to keep
 * `main.tsx` clean and to control provider ordering explicitly.
 */
export function AppProviders({ children }: Props) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SidebarProvider>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </SidebarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
