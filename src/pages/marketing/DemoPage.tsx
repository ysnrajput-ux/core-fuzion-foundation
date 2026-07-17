import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, Mail, Phone, BookOpen, CircleCheck as CheckCircle } from "lucide-react";

import { Section } from "@/components/marketing/Section";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/feedback/toast";

const COURSES = ["JEE Main & Advanced", "NEET Preparation", "Foundation IX–X", "Board Exam Prep", "Olympiad Training", "Crash Courses"];

export function DemoPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Demo registration received! We'll contact you shortly.");
    }, 800);
  };

  return (
    <Section
      eyebrow="Book a Demo"
      title="Experience Fuzion firsthand"
      description="Schedule a free demo class and discover why thousands of students choose Fuzion."
    >
      <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="rounded-2xl gradient-brand p-8 text-white shadow-glow">
            <h3 className="text-xl font-bold mb-2">Free Demo Class</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Attend a live class with our expert faculty. No commitment required.
            </p>
          </div>
          <ul className="space-y-3">
            {[
              "Interact with expert faculty in real time",
              "Experience our teaching methodology",
              "Get a personalized learning plan",
              "Tour our premium campus facilities",
              "Meet current students and alumni",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <CheckCircle className="size-5 text-success shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {submitted ? (
            <div className="rounded-2xl border border-success/30 bg-success/5 p-8 text-center">
              <CheckCircle className="size-12 text-success mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Registration received!</h3>
              <p className="text-sm text-muted-foreground">
                Our team will reach out within 24 hours to confirm your demo class schedule.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 shadow-sm space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field icon={User} label="Full Name" name="name" required />
                <Field icon={Mail} label="Email" name="email" type="email" required />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field icon={Phone} label="Phone" name="phone" type="tel" required />
                <Field icon={Calendar} label="Preferred Date" name="date" type="date" required />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Course of Interest</label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <select
                    name="course"
                    required
                    className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-3 text-sm shadow-sm focus-visible:ring-1 focus-visible:ring-ring outline-none"
                  >
                    {COURSES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Button type="submit" loading={loading} className="w-full">
                Register for Demo
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </Section>
  );
}

function Field({
  icon: Icon,
  label,
  name,
  type = "text",
  required,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium mb-1.5 block">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <input
          type={type}
          name={name}
          required={required}
          className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring outline-none"
        />
      </div>
    </div>
  );
}
