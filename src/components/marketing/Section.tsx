import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  centered?: boolean;
}

export function Section({ children, className, eyebrow, title, description, centered = true }: Props) {
  return (
    <section className={cn("py-20 sm:py-24", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(eyebrow || title || description) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn("mb-12 sm:mb-16", centered && "text-center mx-auto max-w-2xl")}
          >
            {eyebrow && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-accent/40 px-3 py-1 text-xs font-medium text-primary mb-4">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
                {description}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
