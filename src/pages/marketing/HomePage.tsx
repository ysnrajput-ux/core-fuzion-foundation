import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Trophy,
  BookOpen,
  TrendingUp,
  Clock,
  Shield,
  Heart,
  Target,
  Award,
  GraduationCap,
  Star,
  Quote,
  Plus,
  Minus,
  ArrowRight,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Hero } from "@/components/marketing/Hero";
import { Section } from "@/components/marketing/Section";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const STATS = [
  { icon: Users, value: "12,000+", label: "Students Trained" },
  { icon: Trophy, value: "1,500+", label: "Top Ranks" },
  { icon: BookOpen, value: "45+", label: "Expert Faculty" },
  { icon: TrendingUp, value: "98%", label: "Success Rate" },
];

const WHY_CHOOSE = [
  { icon: Target, title: "Personalized Mentorship", desc: "1-on-1 guidance tailored to each student's learning style and goals." },
  { icon: Clock, title: "Smart Time Management", desc: "Structured schedules and real-time progress tracking keep students on track." },
  { icon: Shield, title: "Proven Curriculum", desc: "Research-backed study materials refined over a decade of excellence." },
  { icon: Heart, title: "Doubt Support 24/7", desc: "Round-the-clock doubt resolution through live sessions and AI assistance." },
  { icon: Award, title: "Award-Winning Faculty", desc: "Learn from educators with a track record of producing top rankers." },
  { icon: TrendingUp, title: "Performance Analytics", desc: "Data-driven insights help students identify and close knowledge gaps." },
];

const COURSES = [
  { title: "JEE Main & Advanced", desc: "Comprehensive engineering entrance preparation", icon: "🚀", tag: "2 Year Program", color: "from-blue-500/10 to-blue-500/5" },
  { title: "NEET Preparation", desc: "Medical entrance exam mastery with biology focus", icon: "🧬", tag: "2 Year Program", color: "from-emerald-500/10 to-emerald-500/5" },
  { title: "Foundation IX–X", desc: "Strong conceptual base for future competitive exams", icon: "📐", tag: "1 Year Program", color: "from-amber-500/10 to-amber-500/5" },
  { title: "Board Exam Prep", desc: "Targeted coaching for Class XI–XII board excellence", icon: "📚", tag: "1 Year Program", color: "from-violet-500/10 to-violet-500/5" },
  { title: "Olympiad Training", desc: "National & international olympiad skill building", icon: "🏆", tag: "Flexible", color: "from-rose-500/10 to-rose-500/5" },
  { title: "Crash Courses", desc: "Intensive last-minute revision and mock test series", icon: "⚡", tag: "3 Month", color: "from-cyan-500/10 to-cyan-500/5" },
];

const FACULTY = [
  { name: "Dr. Rajesh Sharma", subject: "Physics", exp: "18+ years", image: "https://images.pexels.com/photos/5212343/pexels-photo-5212343.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Prof. Anjali Verma", subject: "Chemistry", exp: "15+ years", image: "https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Mr. Sunil Gupta", subject: "Mathematics", exp: "20+ years", image: "https://images.pexels.com/photos/5212685/pexels-photo-5212685.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Dr. Meera Nair", subject: "Biology", exp: "12+ years", image: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400" },
];

const ACHIEVEMENTS = [
  { rank: "AIR 4", exam: "JEE Advanced 2024", name: "Arjun Mehta" },
  { rank: "AIR 12", exam: "NEET UG 2024", name: "Sneha Reddy" },
  { rank: "AIR 1", exam: "Olympiad 2024", name: "Karan Patel" },
  { rank: "AIR 8", exam: "JEE Main 2024", name: "Priya Singh" },
];

const TESTIMONIALS = [
  { name: "Rahul Kumar", role: "JEE 2024 · AIR 47", text: "The mentors at Fuzion believed in me even when I doubted myself. The structured approach and constant support made all the difference.", rating: 5 },
  { name: "Ananya Iyer", role: "NEET 2024 · AIR 89", text: "From struggling with Physics to scoring in the top 100 — the transformation was incredible. The faculty truly cares about every student.", rating: 5 },
  { name: "Vikram Joshi", role: "Parent", text: "As a parent, I always knew where my son stood. The progress reports and regular feedback gave me complete peace of mind.", rating: 5 },
];

const FAQS = [
  { q: "How do I enroll in a course?", a: "Simply click 'Book a Demo' to schedule a free counseling session. Our team will guide you through the enrollment process and help you choose the right program." },
  { q: "Are scholarships available?", a: "Yes! We offer merit-based scholarships up to 100% based on our scholarship test. Contact us to learn more about eligibility and test dates." },
  { q: "What is the batch size?", a: "We maintain small batch sizes of 25–30 students to ensure personalized attention and quality interaction with faculty." },
  { q: "Do you provide online classes?", a: "Yes, we offer both offline and hybrid learning options. All sessions are recorded and available for revision anytime." },
  { q: "How are parents kept informed?", a: "Parents receive weekly progress reports, attendance updates, and have access to a dedicated parent portal for real-time monitoring." },
];

export function HomePage() {
  return (
    <>
      <Hero />

      {/* Stats */}
      <section className="border-y border-border/60 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="size-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <stat.icon className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <Section
        eyebrow="Why Fuzion"
        title="Built for student success"
        description="Every element of our institute is designed to maximize learning outcomes and student well-being."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group rounded-2xl border border-border/60 bg-card p-6 shadow-sm hover:shadow-premium hover:border-primary/20 transition-all"
            >
              <div className="size-12 rounded-xl gradient-brand-soft flex items-center justify-center mb-4 group-hover:gradient-brand group-hover:text-white transition-all">
                <item.icon className="size-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-1.5">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Courses */}
      <Section
        eyebrow="Our Programs"
        title="Courses designed to win"
        description="Choose from a range of expertly crafted programs for every academic goal."
        className="bg-gradient-to-b from-background to-accent/10"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={cn(
                "group relative rounded-2xl border border-border/60 bg-gradient-to-br p-6 shadow-sm hover:shadow-premium hover:border-primary/20 transition-all overflow-hidden",
                course.color,
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{course.icon}</span>
                <span className="text-xs font-medium text-muted-foreground bg-white/60 rounded-full px-2.5 py-1">
                  {course.tag}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{course.desc}</p>
              <Link
                to={ROUTES.marketing.courses}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all"
              >
                Learn more
                <ArrowRight className="size-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Faculty */}
      <Section
        eyebrow="Our Educators"
        title="Learn from the best"
        description="Our faculty brings decades of experience and a passion for teaching."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FACULTY.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm hover:shadow-premium transition-all"
            >
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm">{member.name}</h3>
                <p className="text-xs text-primary font-medium">{member.subject}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{member.exp}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to={ROUTES.marketing.faculty}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium shadow-sm hover:shadow-md transition-all"
          >
            Meet all faculty
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      {/* Achievements */}
      <Section
        eyebrow="Results"
        title="A legacy of excellence"
        description="Our students consistently achieve top ranks in competitive exams."
        className="bg-gradient-to-b from-background to-accent/10"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ACHIEVEMENTS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm hover:shadow-premium transition-all"
            >
              <div className="size-14 mx-auto rounded-full gradient-brand flex items-center justify-center mb-4 shadow-glow">
                <Trophy className="size-7 text-white" />
              </div>
              <p className="text-2xl font-bold gradient-text">{item.rank}</p>
              <p className="text-sm font-medium mt-1">{item.exam}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.name}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section
        eyebrow="Student Stories"
        title="Success in their words"
        description="Hear from the students and parents who trusted Fuzion."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
            >
              <Quote className="size-8 text-primary/20 mb-4" />
              <p className="text-sm text-foreground leading-relaxed mb-4">{t.text}</p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                <div className="size-10 rounded-full gradient-brand flex items-center justify-center text-white text-sm font-semibold">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FAQs */}
      <Section
        eyebrow="FAQs"
        title="Questions, answered"
        description="Everything you need to know before joining Fuzion."
        className="bg-gradient-to-b from-background to-accent/10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, i) => (
            <FaqItem key={i} {...faq} />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl gradient-brand p-10 sm:p-16 text-center overflow-hidden shadow-glow"
          >
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="relative">
              <GraduationCap className="size-12 text-white mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight text-balance">
                Ready to begin your journey?
              </h2>
              <p className="mt-4 text-white/80 max-w-xl mx-auto text-pretty">
                Book a free demo class today and experience the Fuzion difference firsthand.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to={ROUTES.marketing.demo}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary shadow-lg hover:scale-105 transition-transform"
                >
                  Book a Free Demo
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="tel:+911234567890"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 backdrop-blur px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  <Phone className="size-4" />
                  Call Now
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border/60 bg-card overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className="text-sm font-semibold">{q}</span>
        <span className="shrink-0 size-7 rounded-full bg-accent flex items-center justify-center">
          {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
      </motion.div>
    </div>
  );
}
