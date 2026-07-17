import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

import { Section } from "@/components/marketing/Section";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const COURSES = [
  {
    title: "JEE Main & Advanced",
    desc: "Complete engineering entrance preparation with Physics, Chemistry, and Mathematics.",
    duration: "2 Years",
    icon: "🚀",
    features: ["750+ live classes", "Full-length mock tests", "Doubt support 24/7", "Performance analytics"],
    popular: true,
  },
  {
    title: "NEET Preparation",
    desc: "Medical entrance exam mastery with a focus on Biology, Physics, and Chemistry.",
    duration: "2 Years",
    icon: "🧬",
    features: ["700+ live classes", "NCERT-focused material", "Weekly test series", "Mentor support"],
  },
  {
    title: "Foundation IX–X",
    desc: "Build a strong conceptual base for future competitive exam success.",
    duration: "1 Year",
    icon: "📐",
    features: ["Concept-first teaching", "Olympiad exposure", "Regular assessments", "Parent updates"],
  },
  {
    title: "Board Exam Prep",
    desc: "Targeted coaching for Class XI–XII board examination excellence.",
    duration: "1 Year",
    icon: "📚",
    features: ["Chapter-wise tests", "Previous year papers", "Revision sessions", "Marking scheme focus"],
  },
  {
    title: "Olympiad Training",
    desc: "National and international olympiad skill development program.",
    duration: "Flexible",
    icon: "🏆",
    features: ["Advanced problem solving", "Competition mindset", "Guest lectures", "Mock olympiads"],
  },
  {
    title: "Crash Courses",
    desc: "Intensive last-minute revision with full mock test series.",
    duration: "3 Months",
    icon: "⚡",
    features: ["Rapid revision", "Daily mock tests", "Exam strategy", "Stress management"],
  },
];

export function CoursesPage() {
  return (
    <Section
      eyebrow="Our Programs"
      title="Find your perfect course"
      description="Expertly crafted programs designed for every academic aspiration — from foundation to final exams."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {COURSES.map((course, i) => (
          <motion.div
            key={course.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className={cn(
              "relative rounded-2xl border bg-card p-8 shadow-sm hover:shadow-premium transition-all",
              course.popular ? "border-primary/30 ring-1 ring-primary/10" : "border-border/60",
            )}
          >
            {course.popular && (
              <span className="absolute -top-3 right-6 inline-flex items-center rounded-full gradient-brand px-3 py-1 text-xs font-semibold text-white shadow-glow">
                Most Popular
              </span>
            )}
            <div className="flex items-start justify-between mb-5">
              <span className="text-4xl">{course.icon}</span>
              <span className="text-xs font-medium text-muted-foreground bg-accent rounded-full px-3 py-1">
                {course.duration}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{course.desc}</p>
            <ul className="space-y-2.5 mb-6">
              {course.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm">
                  <span className="size-5 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                    <Check className="size-3 text-success" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to={ROUTES.marketing.demo}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
            >
              Enroll Now
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
