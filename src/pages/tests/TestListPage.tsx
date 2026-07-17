import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, FileText, ChevronRight, ClipboardList } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/common/EmptyState";
import { ROUTES } from "@/constants/routes";
import { SAMPLE_TESTS } from "./testData";

export function TestListPage() {
  return (
    <div>
      <PageHeader title="Tests" description="Computer-based tests and assessments." />

      {SAMPLE_TESTS.length === 0 ? (
        <EmptyState
          icon={<ClipboardList className="size-5" />}
          title="No tests available"
          description="Tests will appear here once your teacher publishes them."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_TESTS.map((test, i) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to={`${ROUTES.app.tests}/${test.id}`}>
                <Card className="h-full hover:shadow-premium hover:border-primary/30 transition-all cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="size-10 rounded-lg gradient-brand-soft flex items-center justify-center">
                        <FileText className="size-5 text-primary" />
                      </div>
                      <Badge variant={test.status === "published" ? "default" : "secondary"}>
                        {test.status}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{test.title}</h3>
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{test.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {test.durationMinutes} min
                      </span>
                      <span>{test.totalMarks} marks</span>
                      {test.negativeMarking && (
                        <Badge variant="outline" className="text-xs text-destructive">−ve</Badge>
                      )}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{test.subject}</span>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
