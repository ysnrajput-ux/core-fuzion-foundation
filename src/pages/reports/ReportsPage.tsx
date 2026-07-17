import { motion } from "framer-motion";
import { Download, FileText, TrendingUp, Award, Calendar, ChartBar as BarChart3 } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartPlaceholder } from "@/components/dashboard/ChartPlaceholder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STATS = [
  { title: "Overall Avg.", value: "87.5%", change: "+5.2%", trend: "up" as const, icon: <TrendingUp className="size-5 text-primary" /> },
  { title: "Attendance", value: "92%", change: "+3%", trend: "up" as const, icon: <Calendar className="size-5 text-primary" /> },
  { title: "Best Subject", value: "Biology", change: "92%", trend: "up" as const, icon: <Award className="size-5 text-primary" /> },
  { title: "Reports Gen.", value: "12", change: "This term", trend: "up" as const, icon: <FileText className="size-5 text-primary" /> },
];

const REPORTS = [
  { id: "rep1", title: "Term 1 Progress Report", period: "Jan - Apr 2025", type: "Progress", status: "ready", date: "May 2, 2025" },
  { id: "rep2", title: "Mid-Term Assessment", period: "May - Jun 2025", type: "Assessment", status: "ready", date: "Jul 1, 2025" },
  { id: "rep3", title: "Attendance Summary", period: "Jul 2025", type: "Attendance", status: "ready", date: "Jul 17, 2025" },
  { id: "rep4", title: "Subject-wise Analysis", period: "Jan - Jul 2025", type: "Analytics", status: "ready", date: "Jul 17, 2025" },
  { id: "rep5", title: "JEE Mock Performance", period: "Jun - Jul 2025", type: "Exam", status: "processing", date: "Jul 18, 2025" },
];

const STATUS_STYLES = {
  ready: "bg-success/10 text-success",
  processing: "bg-warning/10 text-warning",
};

export function ReportsPage() {
  return (
    <div>
      <PageHeader
        title="Reports"
        description="Generate and download detailed performance reports."
        actions={<Button size="sm"><FileText className="size-4" /> Generate Report</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {STATS.map((s, i) => (
          <StatCard key={s.title} {...s} delay={i * 0.08} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2 mb-6">
        <ChartPlaceholder
          title="Overall Performance"
          type="line"
          data={[72, 78, 75, 82, 85, 88, 87, 92]}
          labels={["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8"]}
        />
        <ChartPlaceholder
          title="Subject Comparison"
          type="bar"
          data={[88, 78, 92, 85, 72]}
          labels={["Physics", "Chem", "Math", "Bio", "Eng"]}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3 mb-6">
        <ChartPlaceholder
          title="Monthly Attendance"
          type="area"
          data={[85, 90, 88, 92, 87, 94, 92]}
          labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
        />
        <ChartPlaceholder
          title="Grade Distribution"
          type="doughnut"
          data={[8, 12, 3, 1]}
          labels={["A+", "A", "B+", "B"]}
          height={200}
        />
        <ChartPlaceholder
          title="Rank Trend"
          type="line"
          data={[12, 10, 8, 7, 5, 4, 3]}
          labels={["M1", "M2", "M3", "M4", "M5", "M6", "M7"]}
        />
      </div>

      {/* Available reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BarChart3 className="size-4 text-primary" />
            Available Reports
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {REPORTS.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-4 rounded-lg border border-border/60 p-4 hover:border-primary/30 transition-colors"
            >
              <div className="size-10 rounded-lg gradient-brand-soft flex items-center justify-center shrink-0">
                <FileText className="size-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{r.title}</p>
                <p className="text-xs text-muted-foreground">
                  {r.period} · {r.type} · Generated {r.date}
                </p>
              </div>
              <Badge variant="outline" className={`text-xs capitalize ${STATUS_STYLES[r.status as keyof typeof STATUS_STYLES]}`}>
                {r.status}
              </Badge>
              {r.status === "ready" && (
                <Button size="sm" variant="ghost">
                  <Download className="size-4" />
                  Download
                </Button>
              )}
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
