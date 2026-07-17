import type { BaseDocument } from "@/types/firestore";

export interface Question extends BaseDocument {
  testId: string;
  type: "mcq" | "subjective";
  question: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  marks: number;
  negativeMarks: number;
}

export interface Test extends BaseDocument {
  title: string;
  description?: string;
  subject: string;
  durationMinutes: number;
  totalMarks: number;
  negativeMarking: boolean;
  randomQuestions: boolean;
  status: "draft" | "published" | "completed";
  startDate?: string;
  endDate?: string;
  questions?: Question[];
}

export interface TestAttempt extends BaseDocument {
  testId: string;
  studentUid: string;
  answers: Record<string, string>;
  score: number;
  totalMarks: number;
  rank?: number;
  startedAt: string;
  submittedAt?: string;
  autoSubmitted: boolean;
  warnings: number;
  status: "in-progress" | "submitted" | "auto-submitted";
}

export interface LeaderboardEntry {
  studentUid: string;
  studentName: string;
  score: number;
  totalMarks: number;
  rank: number;
  percentage: number;
}
