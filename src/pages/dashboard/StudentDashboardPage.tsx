import { motion } from "framer-motion";
import { CalendarCheck, Trophy, TrendingUp, Clock, CreditCard, BookOpen, Bell, Timer, Bookmark, ClipboardList, CirclePlay as PlayCircle, FileText } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartPlaceholder } from "@/components/dashboard/ChartPlaceholder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const STATS = [
  { title: "Attendance", value: "92%", change: "+3%", trend: "up" as const, icon: <CalendarCheck className="size-5 text-primary" /> },
  { title: "Avg. Score", value: "87.5", change: "+5.2", trend: "up" as const, icon: <Trophy className="size-5 text-primary" /> },
  { title: "Class Rank", value: "#4", change: "+2", trend: "up" as const, icon: <TrendingUp className="size-5 text-primary" /> },
  { title: "Study Hours", value: "42h", change: "+8h", trend: "up" as const, icon: <Clock className="size-5 text-primary" /> },
];

const UPCOMING_TESTS = [
  { title: "JEE Mock Test #8", subject: "Physics", date: "Jul 20", time: "10:00 AM", duration: "3 hrs" },
  { title: "Chemistry Unit Test", subject: "Chemistry", date: "Jul 22", time: "2:00 PM", duration: "1 hr" },
  { title: "Math Speed Test", subject: "Mathematics", date: "Jul 25", time: "4:00 PM", duration: "45 min" },
];

const RECENT_RESULTS = [
  { test: "JEE Mock #7", subject: "Physics", marks: 88, total: 100, rank: 3, grade: "A+" },
  { test: "NEET Practice", subject: "Biology", marks: 92, total: 100, rank: 1, grade: "A+" },
  { test: "Chem Quiz #3", subject: "Chemistry", marks: 78, total: 100, rank: 6, grade: "A" },
];

const VIDEO_COURSES = [
  { title: "Kinematics — Complete", duration: "2h 15m", progress: 75, thumb: "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { title: "Organic Chemistry Basics", duration: "1h 45m", progress: 40, thumb: "https://images.pexels.com/photos/228057/pexels-photo-228057.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { title: "Calculus Masterclass", duration: "3h 20m", progress: 100, thumb: "https://images.pexels.com/photos/3747168/pexels-photo-3747168.jpeg?auto=compress&cs=tinysrgb&w=400" },
];

const ANNOUNCEMENTS = [
  { title: "Holiday on July 18", body: "Institute remains closed for Eid. Classes resume July 19.", time: "2 hrs ago", priority: "info" as const },
  { title: "New study material uploaded", body: "Physics Chapter 8 notes are now available in Courses.", time: "5 hrs ago", priority: "success" as const },
  { title: "Fee reminder", body: "Q3 installment due by July 25. Avoid late fee.", time: "1 day ago", priority: "warning" as const },
];

const PRIORITY_STYLES = {
  info: "bg-info/10 text-info",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  error: "bg-destructive/10 text-destructive",
};

export function StudentDashboardPage() {
  const { user } = useAuth();
  const firstName = user?.displayName?.split(" ")[0] ?? "Student";

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${firstName}`}
        description="Here's your learning progress at a glance."
        actions={<Button variant="outline" size="sm"><Timer className="size-4" /> Start Study Session</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {STATS.map((s, i) => (
          <StatCard key={s.title} {...s} delay={i * 0.08} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2 mb-6">
        <ChartPlaceholder
          title="Attendance Trend"
          type="area"
          data={[85, 90, 88, 92, 87, 94, 92]}
          labels={["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"]}
        />
        <ChartPlaceholder
          title="Performance"
          type="line"
          data={[72, 78, 75, 82, 85, 88, 87]}
          labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3 mb-6">
        <ChartPlaceholder
          title="Subject-wise Score"
          type="bar"
          data={[88, 78, 92, 85, 80]}
          labels={["Physics", "Chem", "Math", "Bio", "Eng"]}
        />
        <ChartPlaceholder
          title="Rank Progression"
          type="line"
          data={[12, 10, 8, 7, 5, 4]}
          labels={["M1", "M2", "M3", "M4", "M5", "M6"]}
        />
        <ChartPlaceholder
          title="Daily Study Time (hrs)"
          type="bar"
          data={[3, 4, 5, 3, 6, 7, 5]}
          labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3 mb-6">
        {/* Upcoming Tests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ClipboardList className="size-4 text-primary" />
              Upcoming Tests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {UPCOMING_TESTS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 rounded-lg border border-border/60 p-3 hover:border-primary/30 transition-colors"
              >
                <div className="size-10 rounded-lg gradient-brand-soft flex items-center justify-center shrink-0">
                  <ClipboardList className="size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.subject} · {t.date} · {t.time}</p>
                </div>
                <Badge variant="secondary" className="text-xs">{t.duration}</Badge>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Trophy className="size-4 text-primary" />
              Recent Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {RECENT_RESULTS.map((r, i) => (
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

        {/* Announcements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="size-4 text-primary" />
              Announcements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {ANNOUNCEMENTS.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-lg border border-border/60 p-3"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">{a.title}</p>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full", PRIORITY_STYLES[a.priority])}>
                    {a.priority}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{a.body}</p>
                <p className="text-xs text-muted-foreground mt-1">{a.time}</p>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Video Courses */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <PlayCircle className="size-4 text-primary" />
            Continue Watching
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VIDEO_COURSES.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-xl border border-border/60 overflow-hidden hover:shadow-premium transition-all"
              >
                <div className="relative aspect-video bg-muted overflow-hidden">
                  <img src={v.thumb} alt={v.title} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="size-10 text-white" />
                  </div>
                  <span className="absolute bottom-2 right-2 text-xs text-white bg-black/60 px-2 py-0.5 rounded">{v.duration}</span>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium truncate">{v.title}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full gradient-brand rounded-full" style={{ width: `${v.progress}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{v.progress}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Access */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "PDF Notes", icon: FileText, to: "courses" },
          { label: "Assignments", icon: ClipboardList, to: "assignments" },
          { label: "Bookmarks", icon: Bookmark, to: "bookmarks" },
          { label: "Fees Status", icon: CreditCard, to: "fees" },
        ].map((q, i) => (
          <motion.div
            key={q.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="hover:shadow-premium transition-all cursor-pointer">
              <CardContent className="flex items-center gap-3 py-4">
                <div className="size-10 rounded-lg gradient-brand-soft flex items-center justify-center">
                  <q.icon className="size-5 text-primary" />
                </div>
                <span className="text-sm font-medium">{q.label}</span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
