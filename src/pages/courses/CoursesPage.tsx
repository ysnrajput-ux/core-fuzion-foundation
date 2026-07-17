import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, CirclePlay as PlayCircle, FileText, Clock, ChevronRight } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";

const COURSES = [
  { id: "c1", title: "Physics — Mechanics", subject: "Physics", chapters: 12, videos: 24, pdfs: 18, progress: 75 },
  { id: "c2", title: "Chemistry — Organic", subject: "Chemistry", chapters: 8, videos: 16, pdfs: 12, progress: 40 },
  { id: "c3", title: "Mathematics — Calculus", subject: "Math", chapters: 10, videos: 20, pdfs: 15, progress: 100 },
  { id: "c4", title: "Biology — Human Physiology", subject: "Biology", chapters: 6, videos: 12, pdfs: 8, progress: 60 },
  { id: "c5", title: "English — Grammar", subject: "English", chapters: 4, videos: 8, pdfs: 6, progress: 30 },
  { id: "c6", title: "Physics — Optics", subject: "Physics", chapters: 5, videos: 10, pdfs: 7, progress: 0 },
];

export function CoursesPage() {
  return (
    <div>
      <PageHeader title="Courses" description="Browse and continue your enrolled courses." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COURSES.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link to={`${ROUTES.app.courses}/${course.id}`}>
              <Card className="h-full hover:shadow-premium hover:border-primary/30 transition-all cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="size-10 rounded-lg gradient-brand-soft flex items-center justify-center">
                      <BookOpen className="size-5 text-primary" />
                    </div>
                    <Badge variant="secondary">{course.subject}</Badge>
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{course.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><BookOpen className="size-3" />{course.chapters} ch</span>
                    <span className="flex items-center gap-1"><PlayCircle className="size-3" />{course.videos}</span>
                    <span className="flex items-center gap-1"><FileText className="size-3" />{course.pdfs}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full gradient-brand rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{course.progress}%</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="size-3" />
                      {course.progress === 100 ? "Completed" : course.progress > 0 ? "Resume" : "Start"}
                    </span>
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
