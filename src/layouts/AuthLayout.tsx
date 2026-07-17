import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

import { APP } from "@/constants/app";
import { ROUTES } from "@/constants/routes";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground grid lg:grid-cols-2">
      <aside className="hidden lg:flex flex-col justify-between p-10 relative overflow-hidden border-r border-border/60">
        <div className="absolute inset-0 gradient-brand" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] animate-float-slow" />
        <Link to={ROUTES.root} className="relative flex items-center gap-2.5 text-white">
          <div className="size-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
            <GraduationCap className="size-5" />
          </div>
          <span className="font-serif text-lg font-bold tracking-tight">{APP.name}</span>
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative space-y-4 max-w-md text-white"
        >
          <h2 className="text-3xl font-bold tracking-tight text-balance">
            One platform for your entire institute.
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Manage students, teachers, parents, and administration from a single
            elegant workspace — built for scale.
          </p>
        </motion.div>
        <p className="relative text-xs text-white/60">
          © {new Date().getFullYear()} {APP.name}
        </p>
      </aside>

      <main className="flex items-center justify-center p-6 sm:p-10 bg-gradient-to-b from-background to-accent/10">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
