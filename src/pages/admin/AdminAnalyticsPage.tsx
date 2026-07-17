import { motion } from "framer-motion";
import { ChartBar as BarChart3, TrendingUp, Users, GraduationCap, BookOpen, Award, Download } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartPlaceholder } from "@/components/dashboard/ChartPlaceholder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const STATS = [
  { title: "Total Users", value: "1,621", change: "+12%", trend: "up" as const, icon: <Users className="size-5 text-primary" /> },
  { title: "Avg. Performance", value: "82.4%", change: "+3.2%", trend: "up" as const, icon: <Award className="size-5 text-primary" /> },
  { title: "Course Completion", value: "76%", change: "+5%", trend: "up" as const, icon: <GraduationCap className="size-5 text-primary" /> },
  { title: "Engagement", value: "89%", change: "+2%", trend: "up" as const, icon: <BarChart3 className="size-5 text-primary" /> },
];

export function AdminAnalyticsPage() {
  return (
    <div>
      <PageHeader
        title="Institute Analytics"
        description="Comprehensive analytics across all institute operations."
        actions={<Button variant="outline" size="sm"><Download className="size-4" /> Export Dashboard</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {STATS.map((s, i) => (
          <StatCard key={s.title} {...s} delay={i * 0.08} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2 mb-6">
        <ChartPlaceholder
          title="User Growth (6 months)"
          type="line"
          data={[200, 350, 500, 720, 950, 1248]}
          labels={["Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
        />
        <ChartPlaceholder
          title="Revenue Trend"
          type="area"
          data={[32, 35, 38, 42, 40, 45, 48]}
          labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
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
          title="Course Performance"
          type="bar"
          data={[88, 82, 78, 85, 72, 68]}
          labels={["JEE", "NEET", "F11", "F10", "Crash", "Olymp"]}
          height={200}
        />
        <ChartPlaceholder
          title="Monthly Engagement"
          type="line"
          data={[82, 85, 87, 86, 88, 89]}
          labels={["Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
          height={200}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="size-4 text-primary" />
              Top Performing Courses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "JEE Advanced", students: 320, avgScore: 88, completion: 82 },
              { name: "NEET 2025", students: 280, avgScore: 85, completion: 78 },
              { name: "Foundation 11th", students: 240, avgScore: 82, completion: 76 },
            ].map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 rounded-lg border border-border/60 p-3"
              >
                <div className="size-10 rounded-lg gradient-brand-soft flex items-center justify-center shrink-0">
                  <BookOpen className="size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.students} students</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{c.avgScore}%</p>
                  <p className="text-xs text-muted-foreground">{c.completion}% done</p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Award className="size-4 text-primary" />
              Top Teachers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Dr. Rajesh Sharma", subject: "Physics", students: 320, rating: 4.9 },
              { name: "Dr. Sneha Rao", subject: "Biology", students: 280, rating: 4.8 },
              { name: "Prof. Anil Kumar", subject: "Mathematics", students: 340, rating: 4.7 },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 rounded-lg border border-border/60 p-3"
              >
                <div className="size-10 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-semibold shrink-0">
                  {t.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.subject} · {t.students} students</p>
                </div>
                <span className="text-sm font-bold text-warning">★ {t.rating}</span>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
