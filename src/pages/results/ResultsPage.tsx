import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, Download, Award, FileText } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartPlaceholder } from "@/components/dashboard/ChartPlaceholder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STATS = [
  { title: "Avg. Score", value: "87.5%", change: "+5.2%", trend: "up" as const, icon: <Trophy className="size-5 text-primary" /> },
  { title: "Tests Taken", value: "24", change: "+3", trend: "up" as const, icon: <FileText className="size-5 text-primary" /> },
  { title: "Best Rank", value: "#1", change: "NEET", trend: "up" as const, icon: <Award className="size-5 text-primary" /> },
  { title: "Improvement", value: "+12%", change: "This term", trend: "up" as const, icon: <TrendingUp className="size-5 text-primary" /> },
];

interface ResultItem {
  id: string;
  test: string;
  subject: string;
  date: string;
  marks: number;
  totalMarks: number;
  rank: number;
  grade: string;
  percentile: number;
}

const RESULTS: ResultItem[] = [
  { id: "r1", test: "JEE Mock #7", subject: "Physics", date: "Jul 14, 2025", marks: 88, totalMarks: 100, rank: 3, grade: "A+", percentile: 97 },
  { id: "r2", test: "NEET Practice", subject: "Biology", date: "Jul 10, 2025", marks: 92, totalMarks: 100, rank: 1, grade: "A+", percentile: 99 },
  { id: "r3", test: "Chem Quiz #3", subject: "Chemistry", date: "Jul 5, 2025", marks: 78, totalMarks: 100, rank: 6, grade: "A", percentile: 88 },
  { id: "r4", test: "Math Speed Test", subject: "Mathematics", date: "Jun 28, 2025", marks: 85, totalMarks: 100, rank: 4, grade: "A", percentile: 92 },
  { id: "r5", test: "Physics Unit Test", subject: "Physics", date: "Jun 20, 2025", marks: 72, totalMarks: 100, rank: 8, grade: "B+", percentile: 80 },
];

const GRADE_STYLES: Record<string, string> = {
  "A+": "bg-success/10 text-success",
  A: "bg-primary/10 text-primary",
  "B+": "bg-warning/10 text-warning",
  B: "bg-muted text-muted-foreground",
};

export function ResultsPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");

  const subjects = ["all", ...Array.from(new Set(RESULTS.map((r) => r.subject)))];
  const filtered = selectedSubject === "all" ? RESULTS : RESULTS.filter((r) => r.subject === selectedSubject);

  return (
    <div>
      <PageHeader
        title="Results"
        description="View your exam results and performance analysis."
        actions={<Button variant="outline" size="sm"><Download className="size-4" /> Download Report Card</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {STATS.map((s, i) => (
          <StatCard key={s.title} {...s} delay={i * 0.08} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2 mb-6">
        <ChartPlaceholder
          title="Score Trend"
          type="line"
          data={[72, 78, 75, 82, 85, 88, 87, 92]}
          labels={["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8"]}
        />
        <ChartPlaceholder
          title="Subject Performance"
          type="bar"
          data={[88, 78, 92, 85, 72]}
          labels={["Physics", "Chem", "Math", "Bio", "Eng"]}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3 mb-6">
        <ChartPlaceholder
          title="Rank Progression"
          type="line"
          data={[12, 10, 8, 7, 5, 4, 3, 1]}
          labels={["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8"]}
        />
        <ChartPlaceholder
          title="Percentile Trend"
          type="area"
          data={[80, 85, 82, 88, 90, 92, 97, 99]}
          labels={["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8"]}
        />
        <ChartPlaceholder
          title="Grade Distribution"
          type="doughnut"
          data={[3, 1, 1, 0]}
          labels={["A+", "A", "B+", "B"]}
          height={200}
        />
      </div>

      {/* Subject filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {subjects.map((s) => (
          <button
            key={s}
            onClick={() => setSelectedSubject(s)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors",
              selectedSubject === s ? "bg-accent text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Results table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Exam Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-muted-foreground text-xs uppercase">
                <tr className="border-b border-border/60">
                  <th className="text-left font-medium px-3 py-2.5">Test</th>
                  <th className="text-left font-medium px-3 py-2.5">Subject</th>
                  <th className="text-left font-medium px-3 py-2.5">Date</th>
                  <th className="text-left font-medium px-3 py-2.5">Marks</th>
                  <th className="text-left font-medium px-3 py-2.5">Rank</th>
                  <th className="text-left font-medium px-3 py-2.5">Percentile</th>
                  <th className="text-left font-medium px-3 py-2.5">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map((r, i) => (
                  <motion.tr
                    key={r.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.06 }}
                    className="hover:bg-accent/40 transition-colors"
                  >
                    <td className="px-3 py-3 font-medium">{r.test}</td>
                    <td className="px-3 py-3">{r.subject}</td>
                    <td className="px-3 py-3 text-muted-foreground">{r.date}</td>
                    <td className="px-3 py-3 font-medium">{r.marks}/{r.totalMarks}</td>
                    <td className="px-3 py-3">
                      <Badge variant="outline" className="text-xs">#{r.rank}</Badge>
                    </td>
                    <td className="px-3 py-3">{r.percentile}%</td>
                    <td className="px-3 py-3">
                      <Badge variant="outline" className={cn("text-xs", GRADE_STYLES[r.grade] ?? "bg-muted")}>
                        {r.grade}
                      </Badge>
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
