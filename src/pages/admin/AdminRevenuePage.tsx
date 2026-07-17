import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Download, CreditCard, Wallet, ArrowUpRight } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartPlaceholder } from "@/components/dashboard/ChartPlaceholder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STATS = [
  { title: "Revenue (MTD)", value: "₹4.8L", change: "+18%", trend: "up" as const, icon: <DollarSign className="size-5 text-primary" /> },
  { title: "Collected", value: "₹38.4L", change: "+₹4.8L", trend: "up" as const, icon: <Wallet className="size-5 text-success" /> },
  { title: "Pending", value: "₹6.2L", change: "-₹0.8L", trend: "up" as const, icon: <CreditCard className="size-5 text-warning" /> },
  { title: "Growth Rate", value: "18%", change: "+4%", trend: "up" as const, icon: <TrendingUp className="size-5 text-primary" /> },
];

const REVENUE_STREAMS = [
  { course: "JEE Advanced", students: 320, feePerStudent: 45000, total: 14400000, collected: 12800000 },
  { course: "NEET", students: 280, feePerStudent: 45000, total: 12600000, collected: 10800000 },
  { course: "Foundation 11th", students: 240, feePerStudent: 35000, total: 8400000, collected: 7200000 },
  { course: "Foundation 10th", students: 180, feePerStudent: 30000, total: 5400000, collected: 4500000 },
  { course: "Crash Course", students: 128, feePerStudent: 25000, total: 3200000, collected: 2800000 },
  { course: "Olympiad", students: 100, feePerStudent: 20000, total: 2000000, collected: 1500000 },
];

const RECENT_PAYMENTS = [
  { student: "Arjun Mehta", amount: 45000, method: "UPI", date: "Jul 17, 2025", status: "success" },
  { student: "Sneha Reddy", amount: 45000, method: "Card", date: "Jul 16, 2025", status: "success" },
  { student: "Karan Patel", amount: 35000, method: "Bank Transfer", date: "Jul 15, 2025", status: "success" },
  { student: "Priya Singh", amount: 45000, method: "UPI", date: "Jul 14, 2025", status: "success" },
  { student: "Rahul Kumar", amount: 25000, method: "Cash", date: "Jul 13, 2025", status: "pending" },
];

const formatLakh = (n: number) => `₹${(n / 100000).toFixed(1)}L`;

export function AdminRevenuePage() {
  return (
    <div>
      <PageHeader
        title="Revenue Dashboard"
        description="Track institute revenue, collections, and outstanding fees."
        actions={<Button variant="outline" size="sm"><Download className="size-4" /> Export Report</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {STATS.map((s, i) => (
          <StatCard key={s.title} {...s} delay={i * 0.08} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2 mb-6">
        <ChartPlaceholder
          title="Monthly Revenue"
          type="area"
          data={[32, 35, 38, 42, 40, 45, 48]}
          labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
        />
        <ChartPlaceholder
          title="Collection vs Pending"
          type="bar"
          data={[384, 62]}
          labels={["Collected", "Pending"]}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3 mb-6">
        <ChartPlaceholder
          title="Revenue by Course"
          type="doughnut"
          data={[144, 126, 84, 54, 32, 20]}
          labels={["JEE", "NEET", "Found 11", "Found 10", "Crash", "Olympiad"]}
          height={200}
        />
        <ChartPlaceholder
          title="Payment Methods"
          type="doughnut"
          data={[45, 30, 15, 10]}
          labels={["UPI", "Card", "Bank", "Cash"]}
          height={200}
        />
        <ChartPlaceholder
          title="Growth Trend"
          type="line"
          data={[12, 15, 14, 18, 20, 22, 18]}
          labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
          height={200}
        />
      </div>

      {/* Revenue by course */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Revenue by Course</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-muted-foreground text-xs uppercase">
                <tr className="border-b border-border/60">
                  <th className="text-left font-medium px-3 py-2.5">Course</th>
                  <th className="text-left font-medium px-3 py-2.5">Students</th>
                  <th className="text-left font-medium px-3 py-2.5">Fee/Student</th>
                  <th className="text-left font-medium px-3 py-2.5">Total</th>
                  <th className="text-left font-medium px-3 py-2.5">Collected</th>
                  <th className="text-left font-medium px-3 py-2.5">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {REVENUE_STREAMS.map((r, i) => {
                  const pct = Math.round((r.collected / r.total) * 100);
                  return (
                    <motion.tr
                      key={r.course}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.06 }}
                      className="hover:bg-accent/40 transition-colors"
                    >
                      <td className="px-3 py-3 font-medium">{r.course}</td>
                      <td className="px-3 py-3">{r.students}</td>
                      <td className="px-3 py-3">₹{r.feePerStudent.toLocaleString()}</td>
                      <td className="px-3 py-3 font-medium">{formatLakh(r.total)}</td>
                      <td className="px-3 py-3 text-success">{formatLakh(r.collected)}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden min-w-[60px]">
                            <div className="h-full gradient-brand rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{pct}%</span>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent payments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Payments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {RECENT_PAYMENTS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-4 rounded-lg border border-border/60 p-3"
            >
              <div className="size-9 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-semibold shrink-0">
                {p.student[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{p.student}</p>
                <p className="text-xs text-muted-foreground">{p.method} · {p.date}</p>
              </div>
              <span className="text-sm font-bold">₹{p.amount.toLocaleString()}</span>
              <Badge variant="outline" className={cn(
                "text-xs capitalize",
                p.status === "success" ? "text-success" : "text-warning",
              )}>
                {p.status === "success" && <ArrowUpRight className="size-3 mr-1" />}
                {p.status}
              </Badge>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
