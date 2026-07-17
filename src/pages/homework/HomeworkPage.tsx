import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Clock, Upload, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, FileText } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/EmptyState";
import { cn } from "@/lib/utils";

interface HomeworkItem {
  id: string;
  subject: string;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded" | "overdue";
  attachments?: string[];
  marks?: number;
  totalMarks?: number;
}

const HOMEWORK: HomeworkItem[] = [
  { id: "h1", subject: "Physics", title: "Kinematics Problem Set", description: "Solve problems 1-15 from Chapter 2. Show all working.", dueDate: "Jul 19, 2025", status: "pending", attachments: ["kinematics.pdf"] },
  { id: "h2", subject: "Mathematics", title: "Calculus Worksheet", description: "Differentiation techniques — 20 problems.", dueDate: "Jul 20, 2025", status: "submitted" },
  { id: "h3", subject: "Chemistry", title: "Organic Reactions", description: "Write mechanisms for 10 named reactions.", dueDate: "Jul 22, 2025", status: "pending" },
  { id: "h4", subject: "Biology", title: "Cell Structure Diagram", description: "Label and describe the animal cell diagram.", dueDate: "Jul 15, 2025", status: "graded", marks: 18, totalMarks: 20 },
  { id: "h5", subject: "Physics", title: "Thermodynamics MCQ", description: "30 MCQs on laws of thermodynamics.", dueDate: "Jul 12, 2025", status: "overdue" },
];

const STATUS_CONFIG = {
  pending: { label: "Pending", color: "bg-warning/10 text-warning", icon: Clock },
  submitted: { label: "Submitted", color: "bg-info/10 text-info", icon: Upload },
  graded: { label: "Graded", color: "bg-success/10 text-success", icon: CheckCircle2 },
  overdue: { label: "Overdue", color: "bg-destructive/10 text-destructive", icon: AlertCircle },
};

export function HomeworkPage() {
  const [filter, setFilter] = useState<"all" | "pending" | "submitted" | "graded" | "overdue">("all");

  const filtered = filter === "all" ? HOMEWORK : HOMEWORK.filter((h) => h.status === filter);
  const pendingCount = HOMEWORK.filter((h) => h.status === "pending").length;
  const overdueCount = HOMEWORK.filter((h) => h.status === "overdue").length;

  return (
    <div>
      <PageHeader
        title="Homework"
        description="Track and submit your homework assignments."
        actions={
          <div className="flex items-center gap-2">
            {pendingCount > 0 && <Badge variant="outline" className="text-warning">{pendingCount} pending</Badge>}
            {overdueCount > 0 && <Badge variant="outline" className="text-destructive">{overdueCount} overdue</Badge>}
          </div>
        }
      />

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(["all", "pending", "submitted", "graded", "overdue"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors",
              filter === f ? "bg-accent text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<ClipboardList className="size-5" />}
          title="No homework found"
          description="You're all caught up for this filter."
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((hw, i) => {
            const cfg = STATUS_CONFIG[hw.status];
            return (
              <motion.div
                key={hw.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="hover:shadow-premium transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="size-11 rounded-lg gradient-brand-soft flex items-center justify-center shrink-0">
                        <ClipboardList className="size-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold">{hw.title}</h3>
                          <Badge variant="secondary" className="text-xs">{hw.subject}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{hw.description}</p>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            Due: {hw.dueDate}
                          </span>
                          {hw.attachments?.map((a) => (
                            <span key={a} className="flex items-center gap-1">
                              <FileText className="size-3" />
                              {a}
                            </span>
                          ))}
                          {hw.status === "graded" && hw.marks !== undefined && (
                            <span className="font-medium text-success">
                              Score: {hw.marks}/{hw.totalMarks}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <Badge variant="outline" className={cn("text-xs", cfg.color)}>
                          <cfg.icon className="size-3 mr-1" />
                          {cfg.label}
                        </Badge>
                        {hw.status === "pending" && (
                          <Button size="sm">
                            <Upload className="size-4" />
                            Submit
                          </Button>
                        )}
                        {hw.status === "overdue" && (
                          <Button size="sm" variant="destructive">
                            <Upload className="size-4" />
                            Submit Late
                          </Button>
                        )}
                        {hw.status === "submitted" && (
                          <span className="text-xs text-muted-foreground">Awaiting review</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
