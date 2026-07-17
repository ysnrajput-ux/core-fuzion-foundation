import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, Lock, User } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/forms/FormField";
import { signUpWithEmail } from "@/services/firebase/auth.service";
import { setDocument } from "@/services/firestore/firestore.service";
import { toast } from "@/components/feedback/toast";
import { ROUTES } from "@/constants/routes";
import { ROLES } from "@/constants/roles";
import { isFirebaseConfigured } from "@/services/firebase/firebase";

interface FormValues {
  displayName: string;
  email: string;
  password: string;
}

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values: FormValues) => {
    if (!isFirebaseConfigured) {
      toast.error("Firebase is not configured. Add VITE_FIREBASE_* env vars.");
      return;
    }
    setLoading(true);
    try {
      const user = await signUpWithEmail(values.email, values.password, values.displayName);
      await setDocument("users", user.uid, {
        uid: user.uid,
        email: user.email,
        displayName: values.displayName,
        photoURL: user.photoURL,
        role: ROLES.STUDENT,
      });
      toast.success("Account created");
      navigate(ROUTES.app.dashboard, { replace: true });
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Create account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Get started with your institute.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="Full name"
          leadingIcon={<User className="size-4" />}
          error={errors.displayName?.message}
          {...register("displayName", { required: "Name is required" })}
        />
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
          autoComplete="new-password"
          leadingIcon={<Lock className="size-4" />}
          hint="At least 8 characters."
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Minimum 8 characters" },
          })}
        />
        <Button type="submit" loading={loading} className="w-full">
          Create account
        </Button>
      </form>
      <p className="text-sm text-center text-muted-foreground">
        Already have an account?{" "}
        <Link to={ROUTES.auth.login} className="text-foreground font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
