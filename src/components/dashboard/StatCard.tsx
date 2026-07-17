import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  icon: ReactNode;
  delay?: number;
}

export function StatCard({ title, value, change, trend = "up", icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm hover:shadow-premium transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="size-11 rounded-xl gradient-brand-soft flex items-center justify-center">
          {icon}
        </div>
        {change && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
              trend === "up" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
            )}
          >
            {trend === "up" ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
            {change}
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight">{value}</p>
      <p className="text-sm text-muted-foreground mt-0.5">{title}</p>
    </motion.div>
  );
}
