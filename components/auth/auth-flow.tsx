"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AnimatedSphere } from "@/components/landing/animated-sphere";
import {
  simulateAuthDelay,
  setSession,
  createAccount,
  authenticate,
} from "@/lib/auth-store";
import { cn } from "@/lib/utils";

type AuthMode = "signin" | "signup";
type SignUpStep = "details" | "verify" | "agreements";

const fieldClass =
  "h-11 rounded-full border-foreground/20 bg-background px-4 focus-visible:border-foreground/40";

export function AuthFlow() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [step, setStep] = useState<SignUpStep>("details");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
    termsAccepted: false,
    riskAcknowledged: false,
  });

  const update = (key: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const switchMode = (next: AuthMode) => {
    setMode(next);
    setStep("details");
    setShowPassword(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await simulateAuthDelay();

    const result = authenticate(form.email, form.password);
    setLoading(false);

    if (!result.ok) {
      toast.error(result.error);
      return;
    }

    setSession(result.user);
    toast.success("Signed in");
    router.push("/dashboard");
  };

  const handleSignUpDetails = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    await simulateAuthDelay(600);
    setLoading(false);
    setStep("verify");
    toast.message("Verification code sent", {
      description: `Enter any 6-digit code to continue. Sent to ${form.email}`,
    });
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.otp.length !== 6) {
      toast.error("Enter the 6-digit verification code.");
      return;
    }
    setLoading(true);
    await simulateAuthDelay(500);
    setLoading(false);
    setStep("agreements");
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.termsAccepted || !form.riskAcknowledged) {
      toast.error("Please accept the required agreements.");
      return;
    }

    setLoading(true);
    await simulateAuthDelay();

    const result = createAccount({
      email: form.email,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
    });

    setLoading(false);

    if (!result.ok) {
      toast.error(result.error);
      setStep("details");
      return;
    }

    setSession(result.user);
    toast.success("Account created");
    router.push("/dashboard");
  };

  const stepIndex = step === "details" ? 0 : step === "verify" ? 1 : 2;

  return (
    <div className="noise-overlay flex min-h-[100svh] bg-background">
      <aside className="relative hidden w-[42%] overflow-hidden border-r border-foreground/10 lg:flex lg:flex-col">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <AnimatedSphere />
        </div>
        <div className="relative flex h-full flex-col justify-between p-10 xl:p-12">
          <BrandLogo size="md" />
          <div className="max-w-sm">
            <h2 className="font-display text-3xl tracking-tight xl:text-4xl">
              Sign in to manage your film investments.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Access your account to track offerings, view statements, and
              receive updates as new projects become available.
            </p>
            <p className="mt-6 rounded-lg border border-foreground/10 bg-foreground/[0.02] p-4 text-xs leading-relaxed text-muted-foreground">
              Demo only — this login is not connected to a live platform. Join
              the waitlist for launch updates.
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 Big Film Fund, Inc.
          </p>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-foreground/10 px-4 py-4 sm:px-6 lg:hidden">
          <BrandLogo size="sm" />
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Home
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8">
          <div className="w-full max-w-[400px]">
            {mode === "signup" && (
              <div className="mb-8">
                <div className="flex items-center gap-2">
                  {["Account", "Verify", "Agreements"].map((label, i) => (
                    <div key={label} className="flex flex-1 items-center gap-2">
                      <div
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium",
                          i < stepIndex
                            ? "bg-foreground text-background"
                            : i === stepIndex
                              ? "border border-foreground bg-background text-foreground"
                              : "bg-muted text-muted-foreground"
                        )}
                      >
                        {i < stepIndex ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : (
                          i + 1
                        )}
                      </div>
                      <span
                        className={cn(
                          "hidden text-xs sm:inline",
                          i === stepIndex ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {label}
                      </span>
                      {i < 2 && (
                        <div
                          className={cn(
                            "h-px flex-1",
                            i < stepIndex ? "bg-foreground" : "bg-foreground/20"
                          )}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mode === "signin" && (
              <div>
                <h1 className="font-display text-2xl tracking-tight">Sign in</h1>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Enter your email and password to continue.
                </p>

                <form onSubmit={handleSignIn} className="mt-8 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        className={cn(fieldClass, "pl-11")}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <button
                        type="button"
                        className="text-xs text-muted-foreground hover:text-foreground"
                        onClick={() =>
                          toast.message("Password reset", {
                            description:
                              "If this email is registered, a reset link will be sent.",
                          })
                        }
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        autoComplete="current-password"
                        value={form.password}
                        onChange={(e) => update("password", e.target.value)}
                        className={cn(fieldClass, "pr-11 pl-11")}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="mt-2 h-11 w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
                  >
                    {loading ? "Signing in…" : "Sign in"}
                    {!loading && <ArrowRight className="h-4 w-4" />}
                  </Button>
                </form>

                <p className="mt-8 text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("signup")}
                    className="font-medium text-foreground hover:underline"
                  >
                    Create one
                  </button>
                </p>
              </div>
            )}

            {mode === "signup" && step === "details" && (
              <div>
                <h1 className="font-display text-2xl tracking-tight">Create an account</h1>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Fill in your details to get started.
                </p>

                <form onSubmit={handleSignUpDetails} className="mt-8 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <div className="relative">
                        <User className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="firstName"
                          required
                          autoComplete="given-name"
                          value={form.firstName}
                          onChange={(e) => update("firstName", e.target.value)}
                          className={cn(fieldClass, "pl-11")}
                          placeholder="Jane"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        id="lastName"
                        required
                        autoComplete="family-name"
                        value={form.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        className={fieldClass}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        className={cn(fieldClass, "pl-11")}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        required
                        minLength={8}
                        autoComplete="new-password"
                        value={form.password}
                        onChange={(e) => update("password", e.target.value)}
                        className={cn(fieldClass, "pr-11 pl-11")}
                        placeholder="At least 8 characters"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      required
                      autoComplete="new-password"
                      value={form.confirmPassword}
                      onChange={(e) => update("confirmPassword", e.target.value)}
                      className={fieldClass}
                      placeholder="••••••••"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="mt-2 h-11 w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
                  >
                    {loading ? "Please wait…" : "Continue"}
                    {!loading && <ArrowRight className="h-4 w-4" />}
                  </Button>
                </form>

                <p className="mt-8 text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("signin")}
                    className="font-medium text-foreground hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            )}

            {mode === "signup" && step === "verify" && (
              <div>
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                <h1 className="font-display text-2xl tracking-tight">Verify your email</h1>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Enter the 6-digit code sent to{" "}
                  <span className="text-foreground">{form.email}</span>
                </p>

                <form onSubmit={handleVerify} className="mt-8 space-y-6">
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={form.otp}
                      onChange={(v) => update("otp", v)}
                    >
                      <InputOTPGroup className="gap-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className="h-12 w-11 rounded-lg border border-foreground/20 first:rounded-lg first:border-l last:rounded-lg"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading || form.otp.length !== 6}
                    className="h-11 w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
                  >
                    {loading ? "Verifying…" : "Verify email"}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    Didn&apos;t get a code?{" "}
                    <button
                      type="button"
                      className="text-foreground hover:underline"
                      onClick={() =>
                        toast.message("Code resent", {
                          description: `A new code was sent to ${form.email}`,
                        })
                      }
                    >
                      Resend
                    </button>
                  </p>
                </form>
              </div>
            )}

            {mode === "signup" && step === "agreements" && (
              <div>
                <button
                  type="button"
                  onClick={() => setStep("verify")}
                  className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                <h1 className="font-display text-2xl tracking-tight">Review and confirm</h1>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Please confirm the following before creating your account.
                </p>

                <form onSubmit={handleCreateAccount} className="mt-8 space-y-5">
                  <div className="space-y-4 rounded-lg border border-foreground/10 p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="terms"
                        checked={form.termsAccepted}
                        onCheckedChange={(c) => update("termsAccepted", c === true)}
                      />
                      <Label htmlFor="terms" className="text-sm leading-relaxed font-normal">
                        I agree to the Terms of Service and Privacy Policy.
                      </Label>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="risk"
                        checked={form.riskAcknowledged}
                        onCheckedChange={(c) =>
                          update("riskAcknowledged", c === true)
                        }
                      />
                      <Label htmlFor="risk" className="text-sm leading-relaxed font-normal">
                        I understand that film investments involve risk, including
                        the possible loss of capital. Past performance does not
                        guarantee future results.
                      </Label>
                    </div>
                  </div>

                  <div className="rounded-lg border border-foreground/10 bg-foreground/[0.02] p-4">
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      This is not an offer to sell securities. Investment
                      opportunities will be made available through a regulated
                      crowdfunding portal in compliance with SEC regulations.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={
                      loading || !form.termsAccepted || !form.riskAcknowledged
                    }
                    className="h-11 w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
                  >
                    {loading ? "Creating account…" : "Create account"}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
