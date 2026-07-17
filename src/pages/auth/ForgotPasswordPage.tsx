import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/forms/FormField";
import { resetPassword } from "@/services/firebase/auth.service";
import { toast } from "@/components/feedback/toast";
import { ROUTES } from "@/constants/routes";
import { isFirebaseConfigured } from "@/services/firebase/firebase";

interface FormValues {
  email: string;
}

export function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (values: FormValues) => {
    if (!isFirebaseConfigured) {
      toast.error("Firebase is not configured.");
      return;
    }
    setLoading(true);
    try {
      await resetPassword(values.email);
      setSent(true);
      toast.success("Reset link sent");
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Reset password</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter your email and we'll send you a reset link.
        </p>
      </div>
      {sent ? (
        <div className="rounded-lg border border-border/60 p-4 text-sm bg-card">
          If an account exists for that email, a reset link has been sent.
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            label="Email"
            type="email"
            autoComplete="email"
            leadingIcon={<Mail className="size-4" />}
            error={errors.email?.message}
            {...register("email", { required: "Email is required" })}
          />
          <Button type="submit" loading={loading} className="w-full">
            Send reset link
          </Button>
        </form>
      )}
      <p className="text-sm text-center text-muted-foreground">
        <Link to={ROUTES.auth.login} className="hover:text-foreground">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
