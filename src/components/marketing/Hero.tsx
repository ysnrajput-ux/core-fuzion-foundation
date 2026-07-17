import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { ROUTES } from "@/constants/routes";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 gradient-brand-soft" />
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/30 rounded-full blur-[100px] animate-float" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-32 left-[8%] hidden lg:block animate-float">
        <div className="glass rounded-2xl border border-white/20 p-4 shadow-premium">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl gradient-brand flex items-center justify-center">
              <Sparkles className="size-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold">Live Mentorship</p>
              <p className="text-xs text-muted-foreground">24/7 doubt support</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-40 right-[6%] hidden lg:block animate-float-slow">
        <div className="glass rounded-2xl border border-white/20 p-4 shadow-premium">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-success/15 flex items-center justify-center">
              <span className="text-success font-bold text-sm">98%</span>
            </div>
            <div>
              <p className="text-xs font-semibold">Success Rate</p>
              <p className="text-xs text-muted-foreground">Board results 2025</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/60 backdrop-blur px-4 py-1.5 text-xs font-medium text-primary shadow-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              Admissions Open · 2025–26 Batch
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-balance"
          >
            Where ambition meets{" "}
            <span className="gradient-text">world-class coaching</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty"
          >
            Fuzion Coaching Institute blends expert mentorship, smart technology, and a proven
            curriculum to help every student achieve their highest potential.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              to={ROUTES.marketing.demo}
              className="group inline-flex items-center gap-2 rounded-xl gradient-brand px-6 py-3 text-sm font-medium text-white shadow-lg hover:shadow-glow transition-all"
            >
              Book a Free Demo
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="tel:+911234567890"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/60 backdrop-blur px-6 py-3 text-sm font-medium shadow-sm hover:shadow-md transition-all"
            >
              Call Now
            </a>
            <a
              href="https://wa.me/911234567890"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-medium text-white shadow-lg hover:shadow-glow transition-all"
            >
              WhatsApp
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-muted-foreground"
        >
          <span className="text-xs">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-border flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-muted-foreground" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
