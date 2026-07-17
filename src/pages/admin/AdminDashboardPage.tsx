import { motion } from "framer-motion";
import { Users, GraduationCap, BookOpen, DollarSign, Shield, TrendingUp } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartPlaceholder } from "@/components/dashboard/ChartPlaceholder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STATS = [
  { title: "Total Students", value: "1,248", change: "+12%", trend: "up" as const, icon: <Users className="size-5 text-primary" /> },
  { title: "Total Teachers", value: "45", change: "+2", trend: "up" as const, icon: <GraduationCap className="size-5 text-primary" /> },
  { title: "Active Courses", value: "24", change: "+3", trend: "up" as const, icon: <BookOpen className="size-5 text-primary" /> },
  { title: "Revenue (MTD)", value: "₹4.8L", change: "+18%", trend: "up" as const, icon: <DollarSign className="size-5 text-primary" /> },
];

const RECENT = [
  { name: "Arjun Mehta", role: "Student", action: "Enrolled in JEE batch", time: "2 min ago" },
  { name: "Dr. Rajesh Sharma", role: "Teacher", action: "Updated course material", time: "1 hr ago" },
  { name: "Sneha Reddy", role: "Student", action: "Fee payment — ₹45,000", time: "3 hrs ago" },
  { name: "Meera Nair", role: "Parent", action: "Viewed progress report", time: "5 hrs ago" },
];

export function AdminDashboardPage() {
  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="Institute-wide overview — manage users, courses, and operations."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {STATS.map((s, i) => (
          <StatCard key={s.title} {...s} delay={i * 0.08} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2 mb-6">
        <ChartPlaceholder
          title="Revenue Trend"
          type="area"
          data={[40, 55, 48, 70, 65, 80, 72, 88, 92]}
          labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]}
        />
        <ChartPlaceholder
          title="User Growth"
          type="line"
          data={[200, 350, 500, 720, 950, 1100, 1248]}
          labels={["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3 mb-6">
        <ChartPlaceholder
          title="Role Distribution"
          type="doughnut"
          data={[1248, 45, 320, 8]}
          labels={["Students", "Teachers", "Parents", "Admins"]}
          height={200}
        />
        <ChartPlaceholder
          title="Course Enrollment"
          type="progress"
          data={[88, 76, 92, 68, 84, 60]}
          labels={["JEE", "NEET", "Foundation", "Board", "Olympiad", "Crash"]}
          height={200}
        />
        <ChartPlaceholder
          title="Monthly Growth"
          type="bar"
          data={[70, 85, 60, 90, 75, 95, 80]}
          labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          height={200}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="size-4 text-primary" />
            Recent User Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {RECENT.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 rounded-lg border border-border/60 p-3"
            >
              <div className="size-9 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-semibold shrink-0">
                {r.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.action}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-medium text-primary">{r.role}</span>
                <p className="text-xs text-muted-foreground">{r.time}</p>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
        <TrendingUp className="size-3.5" />
        Admin console — all actions are logged for audit.
      </div>
    </div>
  );
}
