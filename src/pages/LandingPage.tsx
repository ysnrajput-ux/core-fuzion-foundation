import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";

import { APP } from "@/constants/app";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="h-16 flex items-center justify-between px-6 lg:px-10 border-b border-border/60">
        <Link to={ROUTES.root} className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <GraduationCap className="size-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">{APP.name}</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link to={ROUTES.auth.login}>
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link to={ROUTES.auth.register}>
            <Button size="sm">Get started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl text-center space-y-6"
        >
          <span className="inline-flex items-center rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground">
            Coaching ERP · Foundation
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
            The operating system for your coaching institute.
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {APP.name} unifies students, teachers, parents, and administration in
            a single premium workspace — built for scale.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link to={ROUTES.auth.register}>
              <Button size="lg">
                Get started
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link to={ROUTES.auth.login}>
              <Button size="lg" variant="outline">
                Sign in
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>

      <footer className="border-t border-border/60 px-6 lg:px-10 py-6 text-xs text-muted-foreground flex items-center justify-between">
        <span>
          © {new Date().getFullYear()} {APP.name}
        </span>
        <span>Foundation build</span>
      </footer>
    </div>
  );
}
