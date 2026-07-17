import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap, ChevronDown } from "lucide-react";

import { APP } from "@/constants/app";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", to: ROUTES.root },
  { label: "About", to: ROUTES.marketing.about },
  { label: "Courses", to: ROUTES.marketing.courses },
  { label: "Faculty", to: ROUTES.marketing.faculty },
  { label: "Achievements", to: ROUTES.marketing.achievements },
  { label: "Contact", to: ROUTES.marketing.contact },
];

export function MarketingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "glass border-b border-border/40 shadow-sm"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to={ROUTES.root} className="flex items-center gap-2.5 group">
              <div className="size-9 rounded-xl gradient-brand flex items-center justify-center shadow-glow transition-transform group-hover:scale-105">
                <GraduationCap className="size-5 text-white" />
              </div>
              <span className="font-serif text-lg font-bold tracking-tight">
                {APP.shortName}
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                      active
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-lg bg-accent/60"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Link
                to={ROUTES.auth.login}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign in
              </Link>
              <Link
                to={ROUTES.marketing.demo}
                className="inline-flex items-center gap-1.5 rounded-lg gradient-brand px-4 py-2 text-sm font-medium text-white shadow-md hover:shadow-glow transition-all"
              >
                Book a Demo
                <ChevronDown className="size-3.5 -rotate-90" />
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden inline-flex size-10 items-center justify-center rounded-lg hover:bg-accent transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] glass border-l border-border/40 shadow-xl flex flex-col"
            >
              <div className="h-16 flex items-center justify-between px-5 border-b border-border/40">
                <span className="font-serif font-bold">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="size-9 inline-flex items-center justify-center rounded-lg hover:bg-accent"
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {NAV_LINKS.map((link) => {
                  const active = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={cn(
                        "block rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                        active
                          ? "bg-accent text-primary"
                          : "text-foreground hover:bg-accent/60",
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
              <div className="p-4 border-t border-border/40 space-y-2">
                <Link
                  to={ROUTES.auth.login}
                  className="block rounded-lg px-4 py-2.5 text-sm font-medium text-center border border-border hover:bg-accent transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to={ROUTES.marketing.demo}
                  className="block rounded-lg px-4 py-2.5 text-sm font-medium text-center gradient-brand text-white shadow-md"
                >
                  Book a Demo
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
