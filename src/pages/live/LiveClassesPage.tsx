import { motion } from "framer-motion";
import { Video, Calendar, Clock, Users, Radio, CirclePlay as PlayCircle, VideoOff } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/EmptyState";
import { cn } from "@/lib/utils";

const STATS = [
  { title: "Live Now", value: "1", change: "Physics", trend: "up" as const, icon: <Radio className="size-5 text-destructive" /> },
  { title: "Scheduled", value: "5", change: "This week", trend: "up" as const, icon: <Calendar className="size-5 text-primary" /> },
  { title: "Recorded", value: "48", change: "Available", trend: "up" as const, icon: <Video className="size-5 text-primary" /> },
  { title: "Hours Watched", value: "126h", change: "+18h", trend: "up" as const, icon: <Clock className="size-5 text-primary" /> },
];

interface LiveClass {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  date: string;
  time: string;
  duration: string;
  status: "live" | "upcoming" | "completed";
  participants: number;
  thumbnail?: string;
}

const CLASSES: LiveClass[] = [
  { id: "lc1", title: "Kinematics — Live Problem Solving", subject: "Physics", teacher: "Dr. Rajesh Sharma", date: "Today", time: "4:00 PM", duration: "1.5 hrs", status: "live", participants: 84 },
  { id: "lc2", title: "Organic Chemistry — Reaction Mechanisms", subject: "Chemistry", teacher: "Dr. Priya Verma", date: "Tomorrow", time: "10:00 AM", duration: "2 hrs", status: "upcoming", participants: 0 },
  { id: "lc3", title: "Calculus — Integration Techniques", subject: "Mathematics", teacher: "Prof. Anil Kumar", date: "Jul 19", time: "2:00 PM", duration: "1.5 hrs", status: "upcoming", participants: 0 },
  { id: "lc4", title: "Human Physiology — Circulatory System", subject: "Biology", teacher: "Dr. Sneha Rao", date: "Jul 20", time: "11:00 AM", duration: "1 hr", status: "upcoming", participants: 0 },
  { id: "lc5", title: "Waves & Optics — Revision", subject: "Physics", teacher: "Dr. Rajesh Sharma", date: "Jul 21", time: "4:00 PM", duration: "2 hrs", status: "upcoming", participants: 0 },
  { id: "lc6", title: "Thermodynamics — Complete Chapter", subject: "Physics", teacher: "Dr. Rajesh Sharma", date: "Jul 15", time: "4:00 PM", duration: "2 hrs", status: "completed", participants: 92 },
];

const STATUS_CONFIG = {
  live: { label: "Live Now", color: "bg-destructive/10 text-destructive", pulse: true },
  upcoming: { label: "Upcoming", color: "bg-primary/10 text-primary", pulse: false },
  completed: { label: "Completed", color: "bg-muted text-muted-foreground", pulse: false },
};

export function LiveClassesPage() {
  const live = CLASSES.filter((c) => c.status === "live");
  const upcoming = CLASSES.filter((c) => c.status === "upcoming");
  const completed = CLASSES.filter((c) => c.status === "completed");

  return (
    <div>
      <PageHeader title="Live Classes" description="Join live sessions and watch recordings." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {STATS.map((s, i) => (
          <StatCard key={s.title} {...s} delay={i * 0.08} />
        ))}
      </div>

      {/* Live now */}
      {live.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Radio className="size-4 text-destructive animate-pulse" />
            Live Now
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {live.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="overflow-hidden border-destructive/30">
                  <div className="relative aspect-video bg-gradient-to-br from-destructive/20 to-primary/20 flex items-center justify-center">
                    <PlayCircle className="size-16 text-white/80" />
                    <Badge className="absolute top-3 left-3 bg-destructive text-white">
                      <Radio className="size-3 mr-1 animate-pulse" /> LIVE
                    </Badge>
                    <Badge variant="secondary" className="absolute top-3 right-3">
                      <Users className="size-3 mr-1" /> {c.participants}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-1">{c.title}</h3>
                    <p className="text-xs text-muted-foreground">{c.teacher} · {c.subject}</p>
                    <Button className="w-full mt-3" size="sm">
                      <Video className="size-4" /> Join Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Calendar className="size-4 text-primary" />
          Upcoming Classes
        </h2>
        {upcoming.length === 0 ? (
          <EmptyState icon={<Video className="size-5" />} title="No upcoming classes" description="Check back later for scheduled sessions." />
        ) : (
          <div className="space-y-3">
            {upcoming.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="hover:shadow-premium transition-all">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="size-12 rounded-lg gradient-brand-soft flex items-center justify-center shrink-0">
                      <Video className="size-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{c.title}</p>
                      <p className="text-xs text-muted-foreground">{c.teacher} · {c.subject}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-medium">{c.date}</p>
                      <p className="text-xs text-muted-foreground">{c.time} · {c.duration}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Set Reminder
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Completed */}
      <div>
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <VideoOff className="size-4 text-muted-foreground" />
          Recent Recordings
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {completed.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="overflow-hidden hover:shadow-premium transition-all cursor-pointer">
                <div className="relative aspect-video bg-muted flex items-center justify-center group">
                  <PlayCircle className="size-12 text-muted-foreground group-hover:text-primary transition-colors" />
                  <Badge variant="secondary" className="absolute bottom-2 right-2 text-xs">
                    {c.duration}
                  </Badge>
                </div>
                <CardContent className="p-3">
                  <p className="text-sm font-medium truncate">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.teacher} · {c.date}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
