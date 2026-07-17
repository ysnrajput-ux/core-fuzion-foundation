import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  TrendingUp,
  DollarSign,
  BookOpen,
  Trophy,
  Calendar,
  Bell,
} from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartPlaceholder } from "@/components/dashboard/ChartPlaceholder";
import { useAuth } from "@/context/AuthContext";
import { ROLE_LABELS } from "@/constants/roles";

const STATS = [
  { title: "Total Students", value: "1,248", change: "+12%", trend: "up" as const, icon: <Users className="size-5 text-primary" /> },
  { title: "Active Courses", value: "24", change: "+3", trend: "up" as const, icon: <BookOpen className="size-5 text-primary" /> },
  { title: "Pass Rate", value: "98%", change: "+2%", trend: "up" as const, icon: <Trophy className="size-5 text-primary" /> },
  { title: "Revenue (MTD)", value: "₹4.8L", change: "+18%", trend: "up" as const, icon: <DollarSign className="size-5 text-primary" /> },
];

const RECENT_ACTIVITY = [
  { text: "New student enrolled in JEE batch", time: "2 min ago", icon: GraduationCap },
  { text: "Fee payment received — ₹45,000", time: "1 hr ago", icon: DollarSign },
  { text: "Mock test results published", time: "3 hrs ago", icon: Trophy },
  { text: "New course material uploaded", time: "5 hrs ago", icon: BookOpen },
];

const SCHEDULE = [
  { time: "09:00", title: "Physics — JEE Batch A", room: "Hall 1" },
  { time: "11:00", title: "Chemistry — NEET Batch B", room: "Hall 2" },
  { time: "14:00", title: "Math — Foundation IX", room: "Hall 3" },
  { time: "16:00", title: "Biology — NEET Batch A", room: "Lab 1" },
];

export function DashboardPage() {
  const { user, role } = useAuth();

  return (
    <div>
      <PageHeader
        title={`Welcome${user?.displayName ? `, ${user.displayName}` : ""}`}
        description="Your workspace overview — a snapshot of everything happening at your institute."
      />

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {STATS.map((s, i) => (
          <StatCard key={s.title} {...s} delay={i * 0.08} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-2 mb-6">
        <ChartPlaceholder
          title="Weekly Attendance"
          type="bar"
          data={[85, 92, 78, 95, 88, 76, 90]}
          labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
        />
        <ChartPlaceholder
          title="Student Performance Trend"
          type="area"
          data={[60, 68, 72, 78, 82, 85, 90]}
          labels={["W1", "W2", "W3", "W4", "W5", "W6", "W7"]}
        />
      </div>

      {/* Second row charts */}
      <div className="grid gap-4 lg:grid-cols-3 mb-6">
        <ChartPlaceholder
          title="Fee Analytics"
          type="doughnut"
          data={[45, 30, 15, 10]}
          labels={["Paid", "Pending", "Partial", "Overdue"]}
          height={200}
        />
        <ChartPlaceholder
          title="Subject Analysis"
          type="progress"
          data={[88, 76, 92, 68, 84]}
          labels={["Physics", "Chemistry", "Math", "Biology", "English"]}
          height={200}
        />
        <ChartPlaceholder
          title="Monthly Revenue"
          type="line"
          data={[40, 55, 48, 70, 65, 80, 72, 88]}
          labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]}
          height={200}
        />
      </div>

      {/* Growth + Weekly progress */}
      <div className="grid gap-4 lg:grid-cols-2 mb-6">
        <ChartPlaceholder
          title="Growth Overview"
          type="line"
          data={[20, 35, 30, 50, 45, 65, 60, 75, 80, 90]}
          labels={["J", "F", "M", "A", "M", "J", "J", "A", "S", "O"]}
        />
        <ChartPlaceholder
          title="Weekly Progress"
          type="bar"
          data={[70, 85, 60, 90, 75, 95, 80]}
          labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
        />
      </div>

      {/* Activity + Schedule */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="size-4 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {RECENT_ACTIVITY.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3"
              >
                <div className="size-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                  <a.icon className="size-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{a.text}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="size-4 text-primary" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {SCHEDULE.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 rounded-lg border border-border/60 p-3"
              >
                <div className="text-sm font-semibold text-primary w-12 shrink-0">{s.time}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.room}</p>
                </div>
                <TrendingUp className="size-4 text-muted-foreground" />
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Role badge */}
      <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
        <span>Logged in as</span>
        <span className="rounded-full bg-accent px-2.5 py-0.5 font-medium text-primary">
          {role ? ROLE_LABELS[role] : "—"}
        </span>
      </div>
    </div>
  );
}
