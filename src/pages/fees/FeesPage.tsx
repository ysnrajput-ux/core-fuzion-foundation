import { motion } from "framer-motion";
import { CreditCard, Download, CircleCheck as CheckCircle2, Clock, CircleAlert as AlertCircle } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartPlaceholder } from "@/components/dashboard/ChartPlaceholder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STATS = [
  { title: "Total Fees", value: "₹1,80,000", change: "Annual", trend: "up" as const, icon: <CreditCard className="size-5 text-primary" /> },
  { title: "Paid", value: "₹1,35,000", change: "75%", trend: "up" as const, icon: <CheckCircle2 className="size-5 text-success" /> },
  { title: "Pending", value: "₹45,000", change: "Due Jul 25", trend: "down" as const, icon: <Clock className="size-5 text-warning" /> },
  { title: "Overdue", value: "₹0", change: "None", trend: "up" as const, icon: <AlertCircle className="size-5 text-success" /> },
];

const INSTALLMENTS = [
  { id: "i1", label: "Q1 — Admission", amount: 45000, dueDate: "Jan 15, 2025", status: "paid", paidDate: "Jan 10, 2025" },
  { id: "i2", label: "Q2 — Tuition", amount: 45000, dueDate: "Apr 15, 2025", status: "paid", paidDate: "Apr 12, 2025" },
  { id: "i3", label: "Q3 — Tuition", amount: 45000, dueDate: "Jul 25, 2025", status: "pending" },
  { id: "i4", label: "Q4 — Tuition", amount: 45000, dueDate: "Oct 15, 2025", status: "upcoming" },
];

const TRANSACTIONS = [
  { id: "t1", date: "Jan 10, 2025", amount: 45000, method: "UPI", txnId: "TXN001234", status: "success" },
  { id: "t2", date: "Apr 12, 2025", amount: 45000, method: "Card", txnId: "TXN001235", status: "success" },
];

const STATUS_STYLES = {
  paid: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  upcoming: "bg-muted text-muted-foreground",
  success: "bg-success/10 text-success",
};

export function FeesPage() {
  return (
    <div>
      <PageHeader title="Fees" description="Manage your fee payments and receipts." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {STATS.map((s, i) => (
          <StatCard key={s.title} {...s} delay={i * 0.08} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2 mb-6">
        <ChartPlaceholder
          title="Payment History"
          type="bar"
          data={[45000, 45000, 0, 0]}
          labels={["Q1", "Q2", "Q3", "Q4"]}
        />
        <ChartPlaceholder
          title="Fee Breakdown"
          type="doughnut"
          data={[135000, 45000]}
          labels={["Paid", "Pending"]}
          height={220}
        />
      </div>

      {/* Installments */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Fee Installments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {INSTALLMENTS.map((inst, i) => (
            <motion.div
              key={inst.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 rounded-lg border border-border/60 p-4"
            >
              <div className={cn(
                "size-10 rounded-lg flex items-center justify-center shrink-0",
                inst.status === "paid" ? "bg-success/10" : inst.status === "pending" ? "bg-warning/10" : "bg-muted",
              )}>
                {inst.status === "paid" ? (
                  <CheckCircle2 className="size-5 text-success" />
                ) : (
                  <Clock className={cn("size-5", inst.status === "pending" ? "text-warning" : "text-muted-foreground")} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{inst.label}</p>
                <p className="text-xs text-muted-foreground">
                  Due: {inst.dueDate}
                  {inst.paidDate && ` · Paid: ${inst.paidDate}`}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold">₹{inst.amount.toLocaleString()}</p>
                <Badge variant="outline" className={cn("text-xs capitalize mt-1", STATUS_STYLES[inst.status as keyof typeof STATUS_STYLES])}>
                  {inst.status}
                </Badge>
              </div>
              {inst.status === "pending" && (
                <Button size="sm">Pay Now</Button>
              )}
              {inst.status === "paid" && (
                <Button size="sm" variant="ghost"><Download className="size-4" /></Button>
              )}
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-muted-foreground text-xs uppercase">
                <tr className="border-b border-border/60">
                  <th className="text-left font-medium px-3 py-2.5">Date</th>
                  <th className="text-left font-medium px-3 py-2.5">Amount</th>
                  <th className="text-left font-medium px-3 py-2.5">Method</th>
                  <th className="text-left font-medium px-3 py-2.5">Transaction ID</th>
                  <th className="text-left font-medium px-3 py-2.5">Status</th>
                  <th className="text-left font-medium px-3 py-2.5">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {TRANSACTIONS.map((t) => (
                  <tr key={t.id} className="hover:bg-accent/40 transition-colors">
                    <td className="px-3 py-3">{t.date}</td>
                    <td className="px-3 py-3 font-medium">₹{t.amount.toLocaleString()}</td>
                    <td className="px-3 py-3">{t.method}</td>
                    <td className="px-3 py-3 font-mono text-xs">{t.txnId}</td>
                    <td className="px-3 py-3">
                      <Badge variant="outline" className={cn("text-xs capitalize", STATUS_STYLES[t.status as keyof typeof STATUS_STYLES])}>
                        {t.status}
                      </Badge>
                    </td>
                    <td className="px-3 py-3">
                      <Button size="sm" variant="ghost"><Download className="size-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
