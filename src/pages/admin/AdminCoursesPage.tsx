import { motion } from "framer-motion";
import { BookOpen, Users, GraduationCap, Plus, CreditCard as Edit, MoveVertical as MoreVertical } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartPlaceholder } from "@/components/dashboard/ChartPlaceholder";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STATS = [
  { title: "Total Courses", value: "24", change: "+3", trend: "up" as const, icon: <BookOpen className="size-5 text-primary" /> },
  { title: "Total Enrollments", value: "1,248", change: "+48", trend: "up" as const, icon: <Users className="size-5 text-primary" /> },
  { title: "Active Teachers", value: "45", change: "+2", trend: "up" as const, icon: <GraduationCap className="size-5 text-primary" /> },
  { title: "Avg. Fill Rate", value: "78%", change: "+5%", trend: "up" as const, icon: <BookOpen className="size-5 text-primary" /> },
];

const COURSES = [
  { id: "c1", name: "JEE Advanced 2025", category: "JEE", students: 320, capacity: 400, teacher: "Dr. Rajesh Sharma", fee: 45000, status: "active" },
  { id: "c2", name: "NEET 2025", category: "NEET", students: 280, capacity: 350, teacher: "Dr. Sneha Rao", fee: 45000, status: "active" },
  { id: "c3", name: "Foundation 11th", category: "Foundation", students: 240, capacity: 300, teacher: "Prof. Anil Kumar", fee: 35000, status: "active" },
  { id: "c4", name: "Foundation 10th", category: "Foundation", students: 180, capacity: 250, teacher: "Dr. Priya Verma", fee: 30000, status: "active" },
  { id: "c5", name: "Crash Course JEE", category: "Crash", students: 128, capacity: 200, teacher: "Dr. Rajesh Sharma", fee: 25000, status: "active" },
  { id: "c6", name: "Olympiad Prep", category: "Olympiad", students: 100, capacity: 150, teacher: "Prof. Anil Kumar", fee: 20000, status: "active" },
];

export function AdminCoursesPage() {
  return (
    <div>
      <PageHeader
        title="Course Management"
        description="Create and manage institute courses."
        actions={<Button size="sm"><Plus className="size-4" /> Add Course</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {STATS.map((s, i) => (
          <StatCard key={s.title} {...s} delay={i * 0.08} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2 mb-6">
        <ChartPlaceholder
          title="Enrollment by Category"
          type="bar"
          data={[320, 280, 420, 128, 100]}
          labels={["JEE", "NEET", "Foundation", "Crash", "Olympiad"]}
        />
        <ChartPlaceholder
          title="Course Fill Rate"
          type="progress"
          data={[80, 80, 80, 72, 64, 67]}
          labels={["JEE", "NEET", "Found 11", "Found 10", "Crash", "Olympiad"]}
          height={200}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COURSES.map((c, i) => {
          const fillPct = Math.round((c.students / c.capacity) * 100);
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="hover:shadow-premium transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="size-10 rounded-lg gradient-brand-soft flex items-center justify-center">
                      <BookOpen className="size-5 text-primary" />
                    </div>
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreVertical className="size-4" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{c.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{c.teacher}</p>

                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary" className="text-xs">{c.category}</Badge>
                    <Badge variant="outline" className="text-xs">₹{c.fee.toLocaleString()}</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Enrollment</span>
                      <span className="font-medium">{c.students}/{c.capacity}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full gradient-brand rounded-full" style={{ width: `${fillPct}%` }} />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <Button size="sm" variant="outline" className="flex-1"><Edit className="size-3.5" /> Edit</Button>
                    <Button size="sm" variant="ghost" className="flex-1">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
