import { motion } from "framer-motion";
import { Trophy, Star, TrendingUp } from "lucide-react";

import { Section } from "@/components/marketing/Section";

const TOP_RANKS = [
  { rank: "AIR 4", exam: "JEE Advanced 2024", name: "Arjun Mehta", img: "https://images.pexels.com/photos/5212343/pexels-photo-5212343.jpeg?auto=compress&cs=tinysrgb&w=300" },
  { rank: "AIR 12", exam: "NEET UG 2024", name: "Sneha Reddy", img: "https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=300" },
  { rank: "AIR 1", exam: "Olympiad 2024", name: "Karan Patel", img: "https://images.pexels.com/photos/5212685/pexels-photo-5212685.jpeg?auto=compress&cs=tinysrgb&w=300" },
  { rank: "AIR 8", exam: "JEE Main 2024", name: "Priya Singh", img: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=300" },
  { rank: "AIR 23", exam: "NEET UG 2024", name: "Rohit Das", img: "https://images.pexels.com/photos/5212695/pexels-photo-5212695.jpeg?auto=compress&cs=tinysrgb&w=300" },
  { rank: "AIR 15", exam: "JEE Advanced 2024", name: "Ishaan Kumar", img: "https://images.pexels.com/photos/5212315/pexels-photo-5212315.jpeg?auto=compress&cs=tinysrgb&w=300" },
];

const YEAR_STATS = [
  { year: "2024", toppers: 320, passRate: 98 },
  { year: "2023", toppers: 285, passRate: 96 },
  { year: "2022", toppers: 240, passRate: 95 },
  { year: "2021", toppers: 210, passRate: 94 },
];

export function AchievementsPage() {
  return (
    <>
      <Section
        eyebrow="Achievements"
        title="Where results speak louder"
        description="A consistent track record of producing top rankers across competitive exams, year after year."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOP_RANKS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm hover:shadow-premium transition-all"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full gradient-brand px-3 py-1 text-xs font-bold text-white shadow-glow">
                  <Trophy className="size-3.5" />
                  {item.rank}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-primary font-medium">{item.exam}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Year by Year"
        title="Consistent excellence"
        className="bg-gradient-to-b from-background to-accent/10"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {YEAR_STATS.map((s, i) => (
            <motion.div
              key={s.year}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm"
            >
              <p className="text-3xl font-bold gradient-text">{s.year}</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Star className="size-4 text-amber-400" />
                  <span className="font-semibold">{s.toppers}</span>
                  <span className="text-muted-foreground">toppers</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <TrendingUp className="size-4 text-success" />
                  <span className="font-semibold">{s.passRate}%</span>
                  <span className="text-muted-foreground">pass rate</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
