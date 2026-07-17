import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import { APP } from "@/constants/app";
import { ROUTES } from "@/constants/routes";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground grid lg:grid-cols-2">
      <aside className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-primary/10 via-background to-background border-r border-border/60">
        <Link to={ROUTES.root} className="text-lg font-semibold tracking-tight">
          {APP.name}
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="space-y-3 max-w-md"
        >
          <h2 className="text-3xl font-semibold tracking-tight">
            One platform for your institute.
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Manage students, teachers, parents, and administration from a single
            elegant workspace.
          </p>
        </motion.div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {APP.name}
        </p>
      </aside>

      <main className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
