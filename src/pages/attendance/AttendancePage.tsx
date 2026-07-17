import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, TrendingUp, Clock } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartPlaceholder } from "@/components/dashboard/ChartPlaceholder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATS = [
  { title: "Overall Attendance", value: "92%", change: "+3%", trend: "up" as const, icon: <CalendarCheck className="size-5 text-primary" /> },
  { title: "Present Days", value: "184", change: "+12", trend: "up" as const, icon: <TrendingUp className="size-5 text-primary" /> },
  { title: "Late Entries", value: "5", change: "-2", trend: "up" as const, icon: <Clock className="size-5 text-primary" /> },
  { title: "Leave Taken", value: "11", change: "0", trend: "up" as const, icon: <CalendarCheck className="size-5 text-primary" /> },
];

const MONTHLY = [
  { date: "Jul 1", status: "present" },
  { date: "Jul 2", status: "present" },
  { date: "Jul 3", status: "late" },
  { date: "Jul 4", status: "present" },
  { date: "Jul 5", status: "absent" },
  { date: "Jul 8", status: "present" },
  { date: "Jul 9", status: "present" },
  { date: "Jul 10", status: "present" },
  { date: "Jul 11", status: "excused" },
  { date: "Jul 12", status: "present" },
  { date: "Jul 15", status: "present" },
  { date: "Jul 16", status: "late" },
  { date: "Jul 17", status: "present" },
];

const STATUS_CONFIG = {
  present: { label: "P", color: "bg-success/15 text-success border-success/30" },
  absent: { label: "A", color: "bg-destructive/15 text-destructive border-destructive/30" },
  late: { label: "L", color: "bg-warning/15 text-warning border-warning/30" },
  excused: { label: "E", color: "bg-info/15 text-info border-info/30" },
};

export function AttendancePage() {
  const [tab, setTab] = useState<"daily" | "monthly" | "requests">("daily");

  return (
    <div>
      <PageHeader title="Attendance" description="Track your daily and monthly attendance." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {STATS.map((s, i) => (
          <StatCard key={s.title} {...s} delay={i * 0.08} />
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        {(["daily", "monthly", "requests"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors",
              tab === t ? "bg-accent text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "daily" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartPlaceholder
            title="Weekly Attendance"
            type="bar"
            data={[5, 4, 5, 3, 5, 4, 5]}
            labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          />
          <Card>
            <CardHeader>
              <CardTitle className="text-base">This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {MONTHLY.slice(0, 7).map((d, i) => {
                const cfg = STATUS_CONFIG[d.status as keyof typeof STATUS_CONFIG];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between rounded-lg border border-border/60 p-3"
                  >
                    <span className="text-sm">{d.date}</span>
                    <Badge variant="outline" className={cn("capitalize", cfg.color)}>
                      {d.status}
                    </Badge>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "monthly" && (
        <div className="space-y-6">
          <ChartPlaceholder
            title="Monthly Attendance Trend"
            type="area"
            data={[85, 90, 88, 92, 87, 94, 92, 89, 91, 93, 90, 92]}
            labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
            height={260}
          />
          <Card>
            <CardHeader>
              <CardTitle className="text-base">July 2025 — Calendar View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {MONTHLY.map((d, i) => {
                  const cfg = STATUS_CONFIG[d.status as keyof typeof STATUS_CONFIG];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className={cn(
                        "aspect-square rounded-lg border flex flex-col items-center justify-center text-xs font-medium",
                        cfg.color,
                      )}
                    >
                      <span>{d.date.split(" ")[1]}</span>
                      <span className="text-[10px] opacity-70">{cfg.label}</span>
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-xs">
                {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <span className={cn("size-3 rounded border", cfg.color)} />
                    <span className="capitalize">{key}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "requests" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Leave Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border border-border/60 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Medical Leave — Jul 11</span>
                <Badge variant="outline" className="text-success">Approved</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Doctor's appointment. Submitted 2 days in advance.</p>
            </div>
            <div className="rounded-lg border border-border/60 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Family Function — Jul 20</span>
                <Badge variant="outline" className="text-warning">Pending</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Family event. Will catch up on missed classes.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
