import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface ChartPlaceholderProps {
  title: string;
  type: "bar" | "line" | "doughnut" | "area" | "progress";
  data?: number[];
  labels?: string[];
  height?: number;
  delay?: number;
  className?: string;
  children?: ReactNode;
}

const PALETTE = ["oklch(0.55 0.2 255)", "oklch(0.62 0.16 150)", "oklch(0.75 0.16 70)", "oklch(0.58 0.22 27)", "oklch(0.6 0.14 230)"];

export function ChartPlaceholder({
  title,
  type,
  data = [40, 65, 50, 75, 60, 85, 70],
  labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  height = 220,
  delay = 0,
  className,
}: ChartPlaceholderProps) {
  const max = Math.max(...data, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn("rounded-2xl border border-border/60 bg-card p-5 shadow-sm", className)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">{title}</h3>
        <span className="text-xs text-muted-foreground">Placeholder</span>
      </div>

      <div style={{ height }} className="flex items-end justify-between gap-2">
        {type === "bar" && data.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full flex items-end" style={{ height: height - 30 }}>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(v / max) * 100}%` }}
                transition={{ duration: 0.6, delay: delay + i * 0.05 }}
                className="w-full rounded-t-md gradient-brand"
                style={{ minHeight: 4 }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{labels[i]}</span>
          </div>
        ))}

        {type === "line" && (
          <div className="relative w-full" style={{ height }}>
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox={`0 0 ${data.length * 50} 100`}>
              <defs>
                <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.55 0.2 255 / 0.3)" />
                  <stop offset="100%" stopColor="oklch(0.55 0.2 255 / 0)" />
                </linearGradient>
              </defs>
              <motion.polyline
                fill="none"
                stroke="oklch(0.55 0.2 255)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={data.map((v, i) => `${i * 50},${100 - (v / max) * 90}`).join(" ")}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay }}
              />
              <polygon
                fill={`url(#grad-${title})`}
                points={`0,100 ${data.map((v, i) => `${i * 50},${100 - (v / max) * 90}`).join(" ")} ${(data.length - 1) * 50},100`}
              />
            </svg>
          </div>
        )}

        {type === "area" && (
          <div className="relative w-full" style={{ height }}>
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox={`0 0 ${data.length * 50} 100`}>
              <defs>
                <linearGradient id={`area-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.55 0.2 255 / 0.4)" />
                  <stop offset="100%" stopColor="oklch(0.55 0.2 255 / 0.02)" />
                </linearGradient>
              </defs>
              <motion.path
                fill={`url(#area-${title})`}
                d={`M0,100 ${data.map((v, i) => `L${i * 50},${100 - (v / max) * 90}`).join(" ")} L${(data.length - 1) * 50},100 Z`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay }}
              />
              <motion.polyline
                fill="none"
                stroke="oklch(0.55 0.2 255)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={data.map((v, i) => `${i * 50},${100 - (v / max) * 90}`).join(" ")}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay }}
              />
            </svg>
          </div>
        )}

        {type === "doughnut" && (
          <div className="flex items-center justify-center w-full gap-8">
            <div className="relative" style={{ width: height * 0.7, height: height * 0.7 }}>
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {data.map((v, i) => {
                  const offset = data.slice(0, i).reduce((a, b) => a + b, 0) / data.reduce((a, b) => a + b, 0) * 100;
                  const pct = (v / data.reduce((a, b) => a + b, 0)) * 100;
                  return (
                    <motion.circle
                      key={i}
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={PALETTE[i % PALETTE.length]}
                      strokeWidth="12"
                      strokeDasharray={`${pct * 2.51} ${100 * 2.51}`}
                      strokeDashoffset={-offset * 2.51}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: delay + i * 0.1 }}
                    />
                  );
                })}
              </svg>
            </div>
            <div className="space-y-2">
              {labels.slice(0, data.length).map((l, i) => (
                <div key={l} className="flex items-center gap-2 text-xs">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: PALETTE[i % PALETTE.length] }} />
                  <span className="text-muted-foreground">{l}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {type === "progress" && (
          <div className="w-full space-y-4">
            {data.map((v, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-muted-foreground">{labels[i]}</span>
                  <span className="text-xs font-medium">{v}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${v}%` }}
                    transition={{ duration: 0.8, delay: delay + i * 0.1 }}
                    className="h-full rounded-full gradient-brand"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
