import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CirclePlay as PlayCircle, FileText, Bookmark, CircleCheck as CheckCircle2, ChevronLeft } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const CHAPTERS = [
  { id: "ch1", title: "Introduction to Mechanics", videos: 3, pdfs: 2, completed: true },
  { id: "ch2", title: "Newton's Laws of Motion", videos: 4, pdfs: 3, completed: true },
  { id: "ch3", title: "Work, Energy & Power", videos: 5, pdfs: 3, completed: true },
  { id: "ch4", title: "Rotational Motion", videos: 6, pdfs: 4, completed: false, progress: 60 },
  { id: "ch5", title: "Gravitation", videos: 4, pdfs: 3, completed: false, progress: 0 },
];

const MATERIALS = [
  { id: "m1", title: "Kinematics — Lecture 1", type: "video", duration: "45 min", watched: true },
  { id: "m2", title: "Kinematics — Lecture 2", type: "video", duration: "52 min", watched: true },
  { id: "m3", title: "Newton's Laws — Notes", type: "pdf", duration: "12 pages", watched: true },
  { id: "m4", title: "Rotational Motion — Lecture 1", type: "video", duration: "48 min", watched: false, progress: 65 },
  { id: "m5", title: "Rotational Motion — Problem Set", type: "pdf", duration: "8 pages", watched: false },
];

export function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.app.courses)} className="mb-4">
        <ChevronLeft className="size-4" /> Back to Courses
      </Button>

      <PageHeader
        title="Physics — Mechanics"
        description="Master the fundamentals of classical mechanics."
        actions={<Button variant="outline" size="sm"><Bookmark className="size-4" /> Bookmark</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chapters */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-sm font-semibold mb-2">Chapters</h3>
          {CHAPTERS.map((ch, i) => (
            <motion.div
              key={ch.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className={cn("cursor-pointer hover:border-primary/30 transition-all", ch.completed && "border-success/30")}>
                <CardContent className="p-4 flex items-center gap-3">
                  {ch.completed ? (
                    <CheckCircle2 className="size-5 text-success shrink-0" />
                  ) : (
                    <div className="size-5 rounded-full border-2 border-border shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{ch.title}</p>
                    <p className="text-xs text-muted-foreground">{ch.videos} videos · {ch.pdfs} PDFs</p>
                  </div>
                  {ch.progress !== undefined && ch.progress > 0 && !ch.completed && (
                    <Badge variant="outline" className="text-xs">{ch.progress}%</Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Materials */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Study Materials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {MATERIALS.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 rounded-lg border border-border/60 p-3 hover:border-primary/30 transition-all"
                >
                  <div className={cn(
                    "size-10 rounded-lg flex items-center justify-center shrink-0",
                    m.type === "video" ? "bg-primary/10" : "bg-success/10",
                  )}>
                    {m.type === "video" ? (
                      <PlayCircle className="size-5 text-primary" />
                    ) : (
                      <FileText className="size-5 text-success" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{m.title}</p>
                    <p className="text-xs text-muted-foreground">{m.duration}</p>
                    {m.progress && (
                      <div className="mt-1 h-1 rounded-full bg-muted overflow-hidden">
                        <div className="h-full gradient-brand rounded-full" style={{ width: `${m.progress}%` }} />
                      </div>
                    )}
                  </div>
                  {m.watched ? (
                    <Badge variant="outline" className="text-success"><CheckCircle2 className="size-3 mr-1" />Watched</Badge>
                  ) : (
                    <Button size="sm" variant="ghost">
                      {m.type === "video" ? "Watch" : "Read"}
                    </Button>
                  )}
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
