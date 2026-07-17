import { motion } from "framer-motion";
import { Target, Eye, Heart, Award, Users, TrendingUp } from "lucide-react";

import { Section } from "@/components/marketing/Section";

const VALUES = [
  { icon: Target, title: "Our Mission", desc: "To empower every student with the knowledge, skills, and confidence to excel academically and beyond." },
  { icon: Eye, title: "Our Vision", desc: "To be the most trusted coaching institute, recognized for transforming aspirations into achievements." },
  { icon: Heart, title: "Our Values", desc: "Integrity, excellence, and student-first thinking guide every decision we make." },
];

const MILESTONES = [
  { year: "2010", title: "Founded", desc: "Started with 30 students and a single classroom." },
  { year: "2014", title: "First AIR 100", desc: "Produced our first JEE Advanced top-100 ranker." },
  { year: "2018", title: "Expanded Campus", desc: "Opened our flagship 40,000 sq ft learning campus." },
  { year: "2021", title: "Digital Learning", desc: "Launched hybrid learning with live online classes." },
  { year: "2024", title: "12,000+ Alumni", desc: "Crossed 12,000 students and 1,500+ top ranks." },
];

export function AboutPage() {
  return (
    <>
      <Section
        eyebrow="About Us"
        title="A decade of shaping futures"
        description="From a single classroom to a leading coaching institute, our journey has always been about one thing — student success."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm hover:shadow-premium transition-all"
            >
              <div className="size-12 rounded-xl gradient-brand flex items-center justify-center mb-5 shadow-glow">
                <v.icon className="size-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Our Journey"
        title="Milestones along the way"
        className="bg-gradient-to-b from-background to-accent/10"
      >
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative flex gap-6 mb-8 ${i % 2 === 0 ? "sm:flex-row-reverse" : ""}`}
            >
              <div className="hidden sm:block sm:w-1/2" />
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 size-4 rounded-full gradient-brand border-4 border-background shadow-glow" />
              <div className="flex-1 sm:w-1/2 pl-12 sm:pl-0">
                <div className={`rounded-2xl border border-border/60 bg-card p-5 shadow-sm ${i % 2 === 0 ? "sm:ml-8" : "sm:mr-8"}`}>
                  <span className="text-xs font-bold text-primary">{m.year}</span>
                  <h3 className="text-base font-semibold mt-1">{m.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="By the Numbers"
        title="Impact that speaks"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Users, value: "12,000+", label: "Students" },
            { icon: Award, value: "1,500+", label: "Top Ranks" },
            { icon: TrendingUp, value: "98%", label: "Success Rate" },
            { icon: Target, value: "14", label: "Years" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm"
            >
              <s.icon className="size-8 text-primary mx-auto mb-3" />
              <p className="text-3xl font-bold tracking-tight">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
