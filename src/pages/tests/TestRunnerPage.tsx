import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, TriangleAlert as AlertTriangle, Maximize2, ChevronLeft, ChevronRight, Flag, CircleCheck as CheckCircle2, Circle as XCircle } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/feedback/toast";
import { ROUTES } from "@/constants/routes";
import { useAntiCheat } from "@/hooks/useAntiCheat";
import { SAMPLE_QUESTIONS, SAMPLE_LEADERBOARD } from "./testData";
import type { Question } from "@/types/cbt";
import { cn } from "@/lib/utils";

type Phase = "intro" | "running" | "review" | "results";

export function TestRunnerPage() {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const questions: Question[] = testId ? SAMPLE_QUESTIONS[testId] ?? [] : [];

  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleAutoSubmit = useCallback(() => {
    setPhase("results");
    toast.warning("Test auto-submitted due to security violations.");
  }, []);

  const [antiCheat, antiCheatActions] = useAntiCheat(
    phase === "running",
    handleAutoSubmit,
  );

  // Timer
  useEffect(() => {
    if (phase !== "running" || timeLeft <= 0) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setPhase("results");
          toast.warning("Time's up! Test auto-submitted.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, timeLeft]);

  // Auto-submit on max warnings
  useEffect(() => {
    if (antiCheat.warnings >= 3 && phase === "running") {
      setPhase("results");
    }
  }, [antiCheat.warnings, phase]);

  const startTest = async () => {
    if (questions.length === 0) {
      toast.error("No questions found for this test.");
      return;
    }
    setTimeLeft(questions.length > 0 ? 180 * 60 : 0);
    setPhase("running");
    await antiCheatActions.enterFullscreen();
  };

  const submitTest = () => {
    let total = 0;
    for (const q of questions) {
      const ans = answers[q.id];
      if (ans && ans === q.correctAnswer) {
        total += q.marks;
      } else if (ans && q.negativeMarks > 0) {
        total -= q.negativeMarks;
      }
    }
    setScore(Math.max(0, total));
    setPhase("results");
    antiCheatActions.exitFullscreen();
  };

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (questions.length === 0) {
    return (
      <div>
        <PageHeader title="Test Not Found" />
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">
            This test doesn't exist or has no questions yet.
          </CardContent>
        </Card>
      </div>
    );
  }

  // Intro screen
  if (phase === "intro") {
    return (
      <div>
        <PageHeader title="Test Instructions" description="Read carefully before starting." />
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Before you begin:</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><CheckCircle2 className="size-4 text-success mt-0.5 shrink-0" /> The test will open in fullscreen mode.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="size-4 text-success mt-0.5 shrink-0" /> Do not switch tabs or windows during the test.</li>
                <li className="flex items-start gap-2"><AlertTriangle className="size-4 text-warning mt-0.5 shrink-0" /> Maximum 3 warnings — test auto-submits after that.</li>
                <li className="flex items-start gap-2"><XCircle className="size-4 text-destructive mt-0.5 shrink-0" /> Right-click and copy-paste are disabled.</li>
                <li className="flex items-start gap-2"><Clock className="size-4 text-primary mt-0.5 shrink-0" /> Timer auto-submits when time runs out.</li>
              </ul>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-border/60">
              <Button onClick={startTest} className="flex-1">
                <Maximize2 className="size-4" /> Start Test in Fullscreen
              </Button>
              <Button variant="outline" onClick={() => navigate(ROUTES.app.tests)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Results screen
  if (phase === "results") {
    const percentage = Math.round((score / questions.reduce((a, q) => a + q.marks, 0)) * 100);
    return (
      <div>
        <PageHeader title="Test Results" />
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="size-20 rounded-full gradient-brand flex items-center justify-center mx-auto mb-4 shadow-glow"
              >
                <span className="text-2xl font-bold text-white">{percentage}%</span>
              </motion.div>
              <h2 className="text-2xl font-bold">Test Submitted!</h2>
              <p className="text-muted-foreground mt-1">You scored {score} marks</p>
              {antiCheat.warnings > 0 && (
                <Badge variant="outline" className="mt-3 text-warning">
                  {antiCheat.warnings} warnings recorded
                </Badge>
              )}
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Leaderboard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {SAMPLE_LEADERBOARD.map((entry, i) => (
                <div
                  key={entry.studentUid}
                  className={cn(
                    "flex items-center gap-3 rounded-lg p-3",
                    i === 0 ? "bg-amber-50 dark:bg-amber-950/20" : "bg-muted/30",
                  )}
                >
                  <span className="size-8 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                    {entry.rank}
                  </span>
                  <span className="flex-1 text-sm font-medium">{entry.studentName}</span>
                  <span className="text-sm font-bold">{entry.score}/{entry.totalMarks}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setPhase("review")} className="flex-1">
              Review Answers
            </Button>
            <Button onClick={() => navigate(ROUTES.app.tests)} className="flex-1">
              Back to Tests
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Review screen
  if (phase === "review") {
    return (
      <div>
        <PageHeader title="Review Answers" />
        <div className="space-y-4 max-w-3xl">
          {questions.map((q, i) => {
            const userAns = answers[q.id];
            const isCorrect = userAns === q.correctAnswer;
            return (
              <Card key={q.id}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="size-7 rounded-full bg-muted flex items-center justify-center text-xs font-semibold shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-sm font-medium flex-1">{q.question}</p>
                    {isCorrect ? (
                      <CheckCircle2 className="size-5 text-success shrink-0" />
                    ) : (
                      <XCircle className="size-5 text-destructive shrink-0" />
                    )}
                  </div>
                  {q.type === "mcq" && q.options && (
                    <div className="space-y-2 ml-10">
                      {q.options.map((opt) => (
                        <div
                          key={opt}
                          className={cn(
                            "text-sm rounded-lg px-3 py-2 border",
                            opt === q.correctAnswer
                              ? "border-success/40 bg-success/10 text-success"
                              : opt === userAns
                                ? "border-destructive/40 bg-destructive/10 text-destructive"
                                : "border-border/60",
                          )}
                        >
                          {opt}
                          {opt === q.correctAnswer && " ✓ Correct"}
                          {opt === userAns && opt !== q.correctAnswer && " ✗ Your answer"}
                        </div>
                      ))}
                    </div>
                  )}
                  {q.explanation && (
                    <div className="mt-3 ml-10 rounded-lg bg-info/10 p-3 text-sm text-info">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
          <Button onClick={() => setPhase("results")}>Back to Results</Button>
        </div>
      </div>
    );
  }

  // Running test
  const currentQ = questions[currentIdx];
  const isLast = currentIdx === questions.length - 1;

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-auto">
      {/* Header bar */}
      <div className="sticky top-0 z-10 glass border-b border-border/60 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs">
            Q {currentIdx + 1}/{questions.length}
          </Badge>
          {antiCheat.warnings > 0 && (
            <Badge variant="outline" className="text-xs text-warning">
              <AlertTriangle className="size-3 mr-1" />
              {antiCheat.warnings}/3 warnings
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Clock className={cn("size-4", timeLeft < 300 ? "text-destructive" : "text-muted-foreground")} />
          <span className={cn("font-mono text-sm font-semibold", timeLeft < 300 && "text-destructive")}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Warning toast */}
      <AnimatePresence>
        {antiCheat.lastWarning && antiCheat.warnings > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sticky top-14 z-10 mx-4 mt-2 rounded-lg border border-warning/40 bg-warning/10 px-4 py-2 text-sm text-warning flex items-center gap-2"
          >
            <AlertTriangle className="size-4 shrink-0" />
            {antiCheat.lastWarning} ({antiCheat.warnings}/3)
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-start justify-between">
              <span className="text-xs text-muted-foreground">
                {currentQ.type === "mcq" ? "Multiple Choice" : "Subjective"} · {currentQ.marks} marks
                {currentQ.negativeMarks > 0 && ` · −${currentQ.negativeMarks} for wrong`}
              </span>
              <button
                onClick={() => {
                  setFlagged((prev) => {
                    const next = new Set(prev);
                    if (next.has(currentQ.id)) next.delete(currentQ.id);
                    else next.add(currentQ.id);
                    return next;
                  });
                }}
                className="text-muted-foreground hover:text-warning transition-colors"
              >
                <Flag className={cn("size-4", flagged.has(currentQ.id) && "fill-warning text-warning")} />
              </button>
            </div>

            <p className="text-base font-medium leading-relaxed">{currentQ.question}</p>

            {currentQ.type === "mcq" && currentQ.options && (
              <div className="space-y-2">
                {currentQ.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAnswers((prev) => ({ ...prev, [currentQ.id]: opt }))}
                    className={cn(
                      "w-full text-left rounded-lg border px-4 py-3 text-sm transition-all",
                      answers[currentQ.id] === opt
                        ? "border-primary bg-accent text-primary font-medium"
                        : "border-border/60 hover:border-primary/30 hover:bg-accent/40",
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {currentQ.type === "subjective" && (
              <textarea
                value={answers[currentQ.id] ?? ""}
                onChange={(e) => setAnswers((prev) => ({ ...prev, [currentQ.id]: e.target.value }))}
                placeholder="Write your answer here..."
                className="w-full min-h-[200px] rounded-lg border border-border/60 p-4 text-sm bg-background focus:ring-2 focus:ring-ring/40 outline-none resize-y"
                onCopy={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
            disabled={currentIdx === 0}
          >
            <ChevronLeft className="size-4" /> Previous
          </Button>
          {isLast ? (
            <Button onClick={submitTest}>
              Submit Test
            </Button>
          ) : (
            <Button onClick={() => setCurrentIdx((i) => Math.min(questions.length - 1, i + 1))}>
              Next <ChevronRight className="size-4" />
            </Button>
          )}
        </div>

        {/* Question palette */}
        <div className="mt-8">
          <p className="text-xs text-muted-foreground mb-3">Question Palette</p>
          <div className="flex flex-wrap gap-2">
            {questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(i)}
                className={cn(
                  "size-9 rounded-lg text-xs font-medium border transition-all",
                  i === currentIdx
                    ? "border-primary bg-primary text-primary-foreground"
                    : answers[q.id]
                      ? "border-success/40 bg-success/10 text-success"
                      : flagged.has(q.id)
                        ? "border-warning/40 bg-warning/10 text-warning"
                        : "border-border/60 text-muted-foreground hover:bg-accent",
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
