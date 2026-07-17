import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Video, Link as LinkIcon, Download, CirclePlay as PlayCircle, Search, ListFilter as Filter } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/EmptyState";
import { cn } from "@/lib/utils";

interface Material {
  id: string;
  title: string;
  type: "pdf" | "video" | "link";
  subject: string;
  chapter: string;
  size?: string;
  duration?: string;
  uploadedBy: string;
  uploadedAt: string;
  bookmarked: boolean;
}

const MATERIALS: Material[] = [
  { id: "m1", title: "Kinematics — Complete Notes", type: "pdf", subject: "Physics", chapter: "Mechanics", size: "2.4 MB", uploadedBy: "Dr. Rajesh Sharma", uploadedAt: "Jul 15, 2025", bookmarked: true },
  { id: "m2", title: "Newton's Laws — Video Lecture", type: "video", subject: "Physics", chapter: "Mechanics", duration: "45 min", uploadedBy: "Dr. Rajesh Sharma", uploadedAt: "Jul 14, 2025", bookmarked: false },
  { id: "m3", title: "Organic Chemistry Reactions Sheet", type: "pdf", subject: "Chemistry", chapter: "Organic", size: "1.8 MB", uploadedBy: "Dr. Priya Verma", uploadedAt: "Jul 13, 2025", bookmarked: true },
  { id: "m4", title: "Calculus — Integration Techniques", type: "video", subject: "Mathematics", chapter: "Calculus", duration: "52 min", uploadedBy: "Prof. Anil Kumar", uploadedAt: "Jul 12, 2025", bookmarked: false },
  { id: "m5", title: "Cell Structure — Reference Link", type: "link", subject: "Biology", chapter: "Cell Biology", uploadedBy: "Dr. Sneha Rao", uploadedAt: "Jul 10, 2025", bookmarked: false },
  { id: "m6", title: "Thermodynamics — Problem Set", type: "pdf", subject: "Physics", chapter: "Thermodynamics", size: "1.2 MB", uploadedBy: "Dr. Rajesh Sharma", uploadedAt: "Jul 8, 2025", bookmarked: false },
  { id: "m7", title: "Waves & Oscillations — Full Chapter", type: "video", subject: "Physics", chapter: "Waves", duration: "1h 20min", uploadedBy: "Dr. Rajesh Sharma", uploadedAt: "Jul 5, 2025", bookmarked: true },
  { id: "m8", title: "NEET Biology — Complete Guide", type: "pdf", subject: "Biology", chapter: "All Chapters", size: "5.6 MB", uploadedBy: "Dr. Sneha Rao", uploadedAt: "Jul 1, 2025", bookmarked: false },
];

const TYPE_CONFIG = {
  pdf: { icon: FileText, color: "bg-destructive/10 text-destructive" },
  video: { icon: PlayCircle, color: "bg-primary/10 text-primary" },
  link: { icon: LinkIcon, color: "bg-info/10 text-info" },
};

export function StudyMaterialPage() {
  const [filter, setFilter] = useState<"all" | "pdf" | "video" | "link" | "bookmarked">("all");
  const [search, setSearch] = useState("");

  const filtered = MATERIALS.filter((m) => {
    if (filter === "bookmarked" && !m.bookmarked) return false;
    if (filter !== "all" && filter !== "bookmarked" && m.type !== filter) return false;
    if (search && !m.title.toLowerCase().includes(search.toLowerCase()) && !m.subject.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <PageHeader title="Study Material" description="Access notes, videos, and reference links." />

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            placeholder="Search materials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 rounded-md border border-input bg-background/50 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", "pdf", "video", "link", "bookmarked"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium capitalize transition-colors flex items-center gap-1.5",
                filter === f ? "bg-accent text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {f === "all" && <Filter className="size-3.5" />}
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<FileText className="size-5" />}
          title="No materials found"
          description="Try adjusting your filters or search."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m, i) => {
            const cfg = TYPE_CONFIG[m.type];
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="h-full hover:shadow-premium hover:border-primary/30 transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={cn("size-11 rounded-lg flex items-center justify-center shrink-0", cfg.color)}>
                        <cfg.icon className="size-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold truncate">{m.title}</h3>
                        <p className="text-xs text-muted-foreground">{m.subject} · {m.chapter}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      {m.size && <span>{m.size}</span>}
                      {m.duration && <span>{m.duration}</span>}
                      <span>· {m.uploadedAt}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs uppercase">{m.type}</Badge>
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost">
                          {m.type === "video" ? <PlayCircle className="size-4" /> : <Download className="size-4" />}
                        </Button>
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
