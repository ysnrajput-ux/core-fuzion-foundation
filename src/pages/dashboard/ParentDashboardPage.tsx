import { motion } from "framer-motion";
import {
  CalendarCheck,
  Trophy,
  CreditCard,
  ClipboardList,
  MessageSquare,
  Bell,
  TrendingUp,
} from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartPlaceholder } from "@/components/dashboard/ChartPlaceholder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STATS = [
  { title: "Child Attendance", value: "92%", change: "+3%", trend: "up" as const, icon: <CalendarCheck className="size-5 text-primary" /> },
  { title: "Avg. Score", value: "87.5", change: "+5.2", trend: "up" as const, icon: <Trophy className="size-5 text-primary" /> },
  { title: "Class Rank", value: "#4", change: "+2", trend: "up" as const, icon: <TrendingUp className="size-5 text-primary" /> },
  { title: "Fees Pending", value: "₹45K", change: "Due 25 Jul", trend: "down" as const, icon: <CreditCard className="size-5 text-primary" /> },
];

const EXAM_REPORTS = [
  { test: "JEE Mock #7", subject: "Physics", marks: 88, total: 100, rank: 3, grade: "A+" },
  { test: "NEET Practice", subject: "Biology", marks: 92, total: 100, rank: 1, grade: "A+" },
  { test: "Chem Quiz #3", subject: "Chemistry", marks: 78, total: 100, rank: 6, grade: "A" },
];

const HOMEWORK = [
  { subject: "Physics", title: "Kinematics Problems", due: "Jul 19", status: "pending" as const },
  { subject: "Math", title: "Calculus Worksheet", due: "Jul 20", status: "submitted" as const },
  { subject: "Chemistry", title: "Organic Reactions", due: "Jul 22", status: "pending" as const },
];

const MESSAGES = [
  { from: "Dr. Rajesh Sharma", subject: "Great improvement in Physics", time: "3 hrs ago", unread: true },
  { from: "Class Teacher", subject: "Regarding attendance", time: "1 day ago", unread: false },
];

const STATUS_STYLES = {
  pending: "bg-warning/10 text-warning",
  submitted: "bg-success/10 text-success",
};

export function ParentDashboardPage() {
  return (
    <div>
      <PageHeader
        title="Parent Dashboard"
        description="Monitor your child's academic progress and stay informed."
        actions={<Button variant="outline" size="sm"><MessageSquare className="size-4" /> Message Teacher</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {STATS.map((s, i) => (
          <StatCard key={s.title} {...s} delay={i * 0.08} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2 mb-6">
        <ChartPlaceholder
          title="Child Attendance"
          type="area"
          data={[85, 90, 88, 92, 87, 94, 92]}
          labels={["W1", "W2", "W3", "W4", "W5", "W6", "W7"]}
        />
        <ChartPlaceholder
          title="Performance Trend"
          type="line"
          data={[72, 78, 75, 82, 85, 88, 87]}
          labels={["M1", "M2", "M3", "M4", "M5", "M6", "M7"]}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3 mb-6">
        {/* Exam Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Trophy className="size-4 text-primary" />
              Exam Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {EXAM_REPORTS.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 rounded-lg border border-border/60 p-3"
              >
                <div className="size-10 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
                  <span className="text-success font-bold text-sm">{r.grade}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{r.test}</p>
                  <p className="text-xs text-muted-foreground">{r.subject} · {r.marks}/{r.total}</p>
                </div>
                <Badge variant="outline" className="text-xs">#{r.rank}</Badge>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Homework */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ClipboardList className="size-4 text-primary" />
              Homework
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {HOMEWORK.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 rounded-lg border border-border/60 p-3"
              >
                <div className="size-10 rounded-lg gradient-brand-soft flex items-center justify-center shrink-0">
                  <ClipboardList className="size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{h.title}</p>
                  <p className="text-xs text-muted-foreground">{h.subject} · Due {h.due}</p>
                </div>
                <Badge className={`text-xs ${STATUS_STYLES[h.status]}`}>{h.status}</Badge>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Teacher Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquare className="size-4 text-primary" />
              Teacher Messages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {MESSAGES.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 rounded-lg border border-border/60 p-3"
              >
                <div className="size-10 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-semibold shrink-0">
                  {m.from[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium truncate">{m.from}</p>
                    {m.unread && <span className="size-2 rounded-full bg-primary shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{m.subject}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{m.time}</p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Fee Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CreditCard className="size-4 text-primary" />
            Fee Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border/60 p-4">
              <p className="text-xs text-muted-foreground">Total Fees</p>
              <p className="text-xl font-bold mt-1">₹1,80,000</p>
            </div>
            <div className="rounded-lg border border-border/60 p-4">
              <p className="text-xs text-muted-foreground">Paid</p>
              <p className="text-xl font-bold mt-1 text-success">₹1,35,000</p>
            </div>
            <div className="rounded-lg border border-warning/30 bg-warning/5 p-4">
              <p className="text-xs text-muted-foreground">Pending</p>
              <p className="text-xl font-bold mt-1 text-warning">₹45,000</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
