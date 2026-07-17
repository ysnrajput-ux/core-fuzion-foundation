import { motion } from "framer-motion";
import { Bell, Clock, CircleAlert as AlertCircle, CircleCheck as CheckCircle2, BookOpen, CreditCard, ClipboardList } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/EmptyState";
import { cn } from "@/lib/utils";

interface NotificationItem {
  id: string;
  type: "exam" | "fee" | "homework" | "announcement" | "result";
  title: string;
  body: string;
  time: string;
  read: boolean;
  reminderCount: number;
}

const NOTIFICATIONS: NotificationItem[] = [
  { id: "n1", type: "exam", title: "JEE Mock Test #8 tomorrow", body: "Test starts at 10:00 AM. Ensure you have a stable internet connection.", time: "2 hrs ago", read: false, reminderCount: 1 },
  { id: "n2", type: "fee", title: "Q3 fee installment due Jul 25", body: "₹45,000 due in 8 days. Pay before the due date to avoid late fee.", time: "5 hrs ago", read: false, reminderCount: 2 },
  { id: "n3", type: "homework", title: "Physics homework due Jul 19", body: "Kinematics problem set. 15 questions to solve.", time: "1 day ago", read: false, reminderCount: 1 },
  { id: "n4", type: "result", title: "JEE Mock #7 results published", body: "You scored 88/100. Rank: #3. Check the review section for explanations.", time: "2 days ago", read: true, reminderCount: 0 },
  { id: "n5", type: "announcement", title: "New study material available", body: "Physics Chapter 8 notes uploaded. Check Courses section.", time: "3 days ago", read: true, reminderCount: 0 },
  { id: "n6", type: "fee", title: "Q3 fee reminder — 3rd and final", body: "This is your final reminder. Pay ₹45,000 before Jul 25 to avoid late fee.", time: "3 days ago", read: true, reminderCount: 3 },
];

const TYPE_CONFIG = {
  exam: { icon: ClipboardList, color: "bg-primary/10 text-primary" },
  fee: { icon: CreditCard, color: "bg-warning/10 text-warning" },
  homework: { icon: BookOpen, color: "bg-info/10 text-info" },
  announcement: { icon: Bell, color: "bg-muted text-muted-foreground" },
  result: { icon: CheckCircle2, color: "bg-success/10 text-success" },
};

export function NotificationsPage() {
  return (
    <div>
      <PageHeader
        title="Notifications"
        description="Stay updated with exam reminders, fee alerts, and announcements."
        actions={<Button variant="outline" size="sm"><CheckCircle2 className="size-4" /> Mark all read</Button>}
      />

      {NOTIFICATIONS.length === 0 ? (
        <EmptyState
          icon={<Bell className="size-5" />}
          title="No notifications"
          description="You're all caught up!"
        />
      ) : (
        <div className="space-y-3">
          {NOTIFICATIONS.map((n, i) => {
            const cfg = TYPE_CONFIG[n.type];
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className={cn(!n.read && "border-primary/30 bg-accent/20")}>
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className={cn("size-10 rounded-lg flex items-center justify-center shrink-0", cfg.color)}>
                      <cfg.icon className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium">{n.title}</p>
                        {!n.read && <span className="size-2 rounded-full bg-primary shrink-0" />}
                      </div>
                      <p className="text-xs text-muted-foreground">{n.body}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="size-3" /> {n.time}
                        </span>
                        {n.reminderCount > 0 && (
                          <Badge variant="outline" className={cn(
                            "text-xs",
                            n.reminderCount >= 3 ? "text-destructive" : n.reminderCount >= 2 ? "text-warning" : "text-muted-foreground",
                          )}>
                            <AlertCircle className="size-3 mr-1" />
                            Reminder {n.reminderCount}/3
                          </Badge>
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
