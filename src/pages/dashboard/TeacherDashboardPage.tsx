import { motion } from "framer-motion";
import { Users, CalendarCheck, ClipboardList, FileText, Upload, ChartBar as BarChart3, Award, Bell } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartPlaceholder } from "@/components/dashboard/ChartPlaceholder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const STATS = [
  { title: "Total Students", value: "124", change: "+8", trend: "up" as const, icon: <Users className="size-5 text-primary" /> },
  { title: "Avg. Attendance", value: "89%", change: "+2%", trend: "up" as const, icon: <CalendarCheck className="size-5 text-primary" /> },
  { title: "Tests Created", value: "32", change: "+5", trend: "up" as const, icon: <ClipboardList className="size-5 text-primary" /> },
  { title: "Materials", value: "78", change: "+12", trend: "up" as const, icon: <FileText className="size-5 text-primary" /> },
];

const RECENT_STUDENTS = [
  { name: "Arjun Mehta", grade: "A+", attendance: 95, performance: 88 },
  { name: "Sneha Reddy", grade: "A", attendance: 92, performance: 85 },
  { name: "Karan Patel", grade: "A+", attendance: 98, performance: 91 },
  { name: "Priya Singh", grade: "B+", attendance: 85, performance: 78 },
];

const QUICK_ACTIONS = [
  { label: "Upload Notes", icon: Upload, color: "bg-primary/10 text-primary" },
  { label: "Upload Video", icon: Upload, color: "bg-success/10 text-success" },
  { label: "Create Test", icon: ClipboardList, color: "bg-warning/10 text-warning" },
  { label: "Enter Marks", icon: Award, color: "bg-destructive/10 text-destructive" },
];

export function TeacherDashboardPage() {
  const { user } = useAuth();
  const firstName = user?.displayName?.split(" ")[0] ?? "Teacher";

  return (
    <div>
      <PageHeader
        title={`Welcome, ${firstName}`}
        description="Manage your students, classes, and materials efficiently."
        actions={<Button size="sm"><ClipboardList className="size-4" /> Create Test</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {STATS.map((s, i) => (
          <StatCard key={s.title} {...s} delay={i * 0.08} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {QUICK_ACTIONS.map((a, i) => (
          <motion.button
            key={a.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4 shadow-sm hover:shadow-premium transition-all text-left"
          >
            <div className={`size-10 rounded-lg flex items-center justify-center ${a.color}`}>
              <a.icon className="size-5" />
            </div>
            <span className="text-sm font-medium">{a.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2 mb-6">
        <ChartPlaceholder
          title="Class Attendance"
          type="area"
          data={[82, 88, 85, 90, 87, 92, 89]}
          labels={["W1", "W2", "W3", "W4", "W5", "W6", "W7"]}
        />
        <ChartPlaceholder
          title="Student Performance"
          type="line"
          data={[75, 80, 78, 85, 82, 88, 87]}
          labels={["M1", "M2", "M3", "M4", "M5", "M6", "M7"]}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3 mb-6">
        <ChartPlaceholder
          title="Subject Distribution"
          type="doughnut"
          data={[40, 35, 25]}
          labels={["Physics", "Chemistry", "Math"]}
          height={200}
        />
        <ChartPlaceholder
          title="Test Performance"
          type="bar"
          data={[88, 75, 92, 68, 84, 60]}
          labels={["T1", "T2", "T3", "T4", "T5", "T6"]}
        />
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="size-4 text-primary" />
              Student Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Top Performers</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Need Attention</span>
              <span className="font-medium text-warning">8</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">At Risk</span>
              <span className="font-medium text-destructive">3</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Improved</span>
              <span className="font-medium text-success">15</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Management Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="size-4 text-primary" />
            Student Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-muted-foreground text-xs uppercase">
                <tr className="border-b border-border/60">
                  <th className="text-left font-medium px-3 py-2.5">Student</th>
                  <th className="text-left font-medium px-3 py-2.5">Grade</th>
                  <th className="text-left font-medium px-3 py-2.5">Attendance</th>
                  <th className="text-left font-medium px-3 py-2.5">Performance</th>
                  <th className="text-left font-medium px-3 py-2.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {RECENT_STUDENTS.map((s, i) => (
                  <motion.tr
                    key={s.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.08 }}
                    className="hover:bg-accent/40 transition-colors"
                  >
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="size-8 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-semibold">
                          {s.name[0]}
                        </div>
                        <span className="font-medium">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3"><Badge variant="secondary">{s.grade}</Badge></td>
                    <td className="px-3 py-3">{s.attendance}%</td>
                    <td className="px-3 py-3">{s.performance}%</td>
                    <td className="px-3 py-3">
                      <Button variant="ghost" size="sm">View</Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
