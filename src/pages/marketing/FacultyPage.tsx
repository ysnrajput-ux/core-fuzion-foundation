import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";

import { Section } from "@/components/marketing/Section";

const FACULTY = [
  { name: "Dr. Rajesh Sharma", subject: "Physics", exp: "18+ years", qual: "Ph.D., IIT Delhi", image: "https://images.pexels.com/photos/5212343/pexels-photo-5212343.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Prof. Anjali Verma", subject: "Chemistry", exp: "15+ years", qual: "M.Sc., IIT Bombay", image: "https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Mr. Sunil Gupta", subject: "Mathematics", exp: "20+ years", qual: "M.Sc., IIT Kanpur", image: "https://images.pexels.com/photos/5212685/pexels-photo-5212685.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Dr. Meera Nair", subject: "Biology", exp: "12+ years", qual: "Ph.D., AIIMS", image: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Mr. Akash Singh", subject: "Physics", exp: "10+ years", qual: "B.Tech, IIT Madras", image: "https://images.pexels.com/photos/5212695/pexels-photo-5212695.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Ms. Priya Kapoor", subject: "Chemistry", exp: "8+ years", qual: "M.Sc., Delhi University", image: "https://images.pexels.com/photos/5212315/pexels-photo-5212315.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Mr. Vivek Rao", subject: "Mathematics", exp: "14+ years", qual: "M.Sc., IISc Bangalore", image: "https://images.pexels.com/photos/5212687/pexels-photo-5212687.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Dr. Sunita Joshi", subject: "Biology", exp: "16+ years", qual: "Ph.D., JNU", image: "https://images.pexels.com/photos/5212312/pexels-photo-5212312.jpeg?auto=compress&cs=tinysrgb&w=400" },
];

export function FacultyPage() {
  return (
    <Section
      eyebrow="Our Faculty"
      title="Educators who inspire"
      description="Meet the dedicated mentors who turn potential into performance, day after day."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FACULTY.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
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
            <div className="p-5">
              <h3 className="font-semibold text-sm">{member.name}</h3>
              <p className="text-xs text-primary font-medium mt-0.5">{member.subject}</p>
              <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <GraduationCap className="size-3.5" />
                  {member.qual}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Award className="size-3.5" />
                  {member.exp}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
