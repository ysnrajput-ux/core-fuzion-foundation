import { AppRouter } from "@/routes/AppRouter";
import { ErrorBoundary } from "@/components/feedback/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  );
}
