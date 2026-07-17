import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/forms/FormField";
import { signInWithEmail } from "@/services/firebase/auth.service";
import { toast } from "@/components/feedback/toast";
import { ROUTES } from "@/constants/routes";
import { isFirebaseConfigured } from "@/services/firebase/firebase";

interface FormValues {
  email: string;
  password: string;
}

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? ROUTES.app.dashboard;

  const onSubmit = async (values: FormValues) => {
    if (!isFirebaseConfigured) {
      toast.error("Firebase is not configured. Add VITE_FIREBASE_* env vars.");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmail(values.email, values.password);
      toast.success("Welcome back");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">Welcome back to your workspace.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          leadingIcon={<Mail className="size-4" />}
          error={errors.email?.message}
          {...register("email", { required: "Email is required" })}
        />
        <FormField
          label="Password"
          type="password"
          autoComplete="current-password"
          leadingIcon={<Lock className="size-4" />}
          error={errors.password?.message}
          {...register("password", { required: "Password is required" })}
        />
        <div className="flex justify-end">
          <Link
            to={ROUTES.auth.forgotPassword}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Forgot password?
          </Link>
        </div>
        <Button type="submit" loading={loading} className="w-full">
          Sign in
        </Button>
      </form>
      <p className="text-sm text-center text-muted-foreground">
        Don't have an account?{" "}
        <Link to={ROUTES.auth.register} className="text-foreground font-medium hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
