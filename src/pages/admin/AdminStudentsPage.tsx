import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Search, Download, UserPlus, GraduationCap, BookOpen, TrendingUp } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STATS = [
  { title: "Total Students", value: "1,248", change: "+12%", trend: "up" as const, icon: <Users className="size-5 text-primary" /> },
  { title: "Active", value: "1,156", change: "92.6%", trend: "up" as const, icon: <GraduationCap className="size-5 text-primary" /> },
  { title: "New This Month", value: "48", change: "+18", trend: "up" as const, icon: <UserPlus className="size-5 text-primary" /> },
  { title: "Avg. Attendance", value: "89%", change: "+2%", trend: "up" as const, icon: <TrendingUp className="size-5 text-primary" /> },
];

const STUDENTS = [
  { id: "s1", name: "Arjun Mehta", email: "arjun.m@email.com", grade: "12th", batch: "JEE-A", attendance: 95, performance: 88, status: "active" },
  { id: "s2", name: "Sneha Reddy", email: "sneha.r@email.com", grade: "12th", batch: "NEET-A", attendance: 92, performance: 85, status: "active" },
  { id: "s3", name: "Karan Patel", email: "karan.p@email.com", grade: "11th", batch: "JEE-B", attendance: 98, performance: 91, status: "active" },
  { id: "s4", name: "Priya Singh", email: "priya.s@email.com", grade: "12th", batch: "NEET-B", attendance: 85, performance: 78, status: "active" },
  { id: "s5", name: "Rahul Kumar", email: "rahul.k@email.com", grade: "11th", batch: "JEE-A", attendance: 72, performance: 65, status: "at-risk" },
  { id: "s6", name: "Meera Nair", email: "meera.n@email.com", grade: "12th", batch: "JEE-A", attendance: 88, performance: 82, status: "active" },
  { id: "s7", name: "Vikram Rao", email: "vikram.r@email.com", grade: "11th", batch: "Foundation", attendance: 91, performance: 79, status: "active" },
  { id: "s8", name: "Ananya Das", email: "ananya.d@email.com", grade: "12th", batch: "NEET-A", attendance: 68, performance: 60, status: "at-risk" },
];

const STATUS_STYLES = {
  active: "bg-success/10 text-success",
  "at-risk": "bg-destructive/10 text-destructive",
  inactive: "bg-muted text-muted-foreground",
};

export function AdminStudentsPage() {
  const [search, setSearch] = useState("");
  const filtered = STUDENTS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <PageHeader
        title="Student Management"
        description="Manage all students across the institute."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="size-4" /> Export</Button>
            <Button size="sm"><UserPlus className="size-4" /> Add Student</Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {STATS.map((s, i) => (
          <StatCard key={s.title} {...s} delay={i * 0.08} />
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              placeholder="Search students by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 rounded-md border border-input bg-background/50 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-muted-foreground text-xs uppercase">
                <tr className="border-b border-border/60">
                  <th className="text-left font-medium px-3 py-2.5">Student</th>
                  <th className="text-left font-medium px-3 py-2.5">Grade</th>
                  <th className="text-left font-medium px-3 py-2.5">Batch</th>
                  <th className="text-left font-medium px-3 py-2.5">Attendance</th>
                  <th className="text-left font-medium px-3 py-2.5">Performance</th>
                  <th className="text-left font-medium px-3 py-2.5">Status</th>
                  <th className="text-left font-medium px-3 py-2.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map((s, i) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="hover:bg-accent/40 transition-colors"
                  >
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="size-8 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-semibold">
                          {s.name[0]}
                        </div>
                        <div>
                          <p className="font-medium">{s.name}</p>
                          <p className="text-xs text-muted-foreground">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">{s.grade}</td>
                    <td className="px-3 py-3"><Badge variant="secondary">{s.batch}</Badge></td>
                    <td className="px-3 py-3">
                      <span className={cn(s.attendance < 75 && "text-destructive font-medium")}>{s.attendance}%</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={cn(s.performance < 65 ? "text-destructive font-medium" : "")}>{s.performance}%</span>
                    </td>
                    <td className="px-3 py-3">
                      <Badge variant="outline" className={cn("text-xs capitalize", STATUS_STYLES[s.status as keyof typeof STATUS_STYLES])}>
                        {s.status}
                      </Badge>
                    </td>
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
