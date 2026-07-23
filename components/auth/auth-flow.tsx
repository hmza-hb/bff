"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
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
  "h-11 rounded-lg border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-600 focus-visible:border-zinc-600 focus-visible:ring-zinc-600/30";

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
    <div className="flex min-h-[100svh] bg-zinc-950">
      {/* Left panel */}
      <aside className="relative hidden w-[42%] overflow-hidden border-r border-zinc-800 lg:flex lg:flex-col">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-zinc-950/85" />

        <div className="relative flex h-full flex-col justify-between p-10 xl:p-12">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.jpeg"
              alt="Big Film Fund"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <span className="text-base font-medium text-white">
              Big Film Fund
            </span>
          </Link>

          <div className="max-w-sm">
            <h2 className="text-3xl font-normal tracking-tight text-white xl:text-[2.15rem] xl:leading-tight">
              Sign in to manage your film investments.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Access your account to track offerings, view statements, and
              receive updates as new projects become available.
            </p>
          </div>

          <p className="text-xs text-zinc-600">
            © 2026 Big Film Fund, Inc.
          </p>
        </div>
      </aside>

      {/* Right panel */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-zinc-800/80 px-4 py-4 sm:px-6 lg:hidden">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.jpeg"
              alt="Big Film Fund"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="text-sm font-medium text-white">Big Film Fund</span>
          </Link>
          <Link href="/" className="text-sm text-zinc-500 hover:text-white">
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
                            ? "bg-red-600 text-white"
                            : i === stepIndex
                              ? "bg-white text-zinc-950"
                              : "bg-zinc-800 text-zinc-500"
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
                          i === stepIndex ? "text-white" : "text-zinc-500"
                        )}
                      >
                        {label}
                      </span>
                      {i < 2 && (
                        <div
                          className={cn(
                            "h-px flex-1",
                            i < stepIndex ? "bg-red-600" : "bg-zinc-800"
                          )}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* Sign in */}
              {mode === "signin" && (
                <motion.div
                  key="signin"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1 className="text-2xl font-normal tracking-tight text-white">
                    Sign in
                  </h1>
                  <p className="mt-1.5 text-sm text-zinc-400">
                    Enter your email and password to continue.
                  </p>

                  <form onSubmit={handleSignIn} className="mt-8 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-zinc-400">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        <Input
                          id="email"
                          type="email"
                          required
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          className={cn(fieldClass, "pl-10")}
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-zinc-400">
                          Password
                        </Label>
                        <button
                          type="button"
                          className="text-xs text-zinc-500 hover:text-zinc-300"
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
                        <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          required
                          autoComplete="current-password"
                          value={form.password}
                          onChange={(e) => update("password", e.target.value)}
                          className={cn(fieldClass, "pr-10 pl-10")}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
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
                      className="mt-2 h-11 w-full rounded-lg bg-white text-zinc-950 hover:bg-zinc-200"
                    >
                      {loading ? "Signing in…" : "Sign in"}
                      {!loading && <ArrowRight className="h-4 w-4" />}
                    </Button>
                  </form>

                  <p className="mt-8 text-center text-sm text-zinc-500">
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => switchMode("signup")}
                      className="font-medium text-white hover:underline"
                    >
                      Create one
                    </button>
                  </p>
                </motion.div>
              )}

              {/* Sign up — details */}
              {mode === "signup" && step === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1 className="text-2xl font-normal tracking-tight text-white">
                    Create an account
                  </h1>
                  <p className="mt-1.5 text-sm text-zinc-400">
                    Fill in your details to get started.
                  </p>

                  <form
                    onSubmit={handleSignUpDetails}
                    className="mt-8 space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-zinc-400">
                          First name
                        </Label>
                        <div className="relative">
                          <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                          <Input
                            id="firstName"
                            required
                            autoComplete="given-name"
                            value={form.firstName}
                            onChange={(e) =>
                              update("firstName", e.target.value)
                            }
                            className={cn(fieldClass, "pl-10")}
                            placeholder="Jane"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-zinc-400">
                          Last name
                        </Label>
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
                      <Label htmlFor="signup-email" className="text-zinc-400">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        <Input
                          id="signup-email"
                          type="email"
                          required
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          className={cn(fieldClass, "pl-10")}
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-zinc-400">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          required
                          minLength={8}
                          autoComplete="new-password"
                          value={form.password}
                          onChange={(e) => update("password", e.target.value)}
                          className={cn(fieldClass, "pr-10 pl-10")}
                          placeholder="At least 8 characters"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
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
                      <Label
                        htmlFor="confirmPassword"
                        className="text-zinc-400"
                      >
                        Confirm password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        required
                        autoComplete="new-password"
                        value={form.confirmPassword}
                        onChange={(e) =>
                          update("confirmPassword", e.target.value)
                        }
                        className={fieldClass}
                        placeholder="••••••••"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="mt-2 h-11 w-full rounded-lg bg-white text-zinc-950 hover:bg-zinc-200"
                    >
                      {loading ? "Please wait…" : "Continue"}
                      {!loading && <ArrowRight className="h-4 w-4" />}
                    </Button>
                  </form>

                  <p className="mt-8 text-center text-sm text-zinc-500">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => switchMode("signin")}
                      className="font-medium text-white hover:underline"
                    >
                      Sign in
                    </button>
                  </p>
                </motion.div>
              )}

              {/* Sign up — verify */}
              {mode === "signup" && step === "verify" && (
                <motion.div
                  key="verify"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    type="button"
                    onClick={() => setStep("details")}
                    className="mb-6 flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>

                  <h1 className="text-2xl font-normal tracking-tight text-white">
                    Verify your email
                  </h1>
                  <p className="mt-1.5 text-sm text-zinc-400">
                    Enter the 6-digit code sent to{" "}
                    <span className="text-zinc-200">{form.email}</span>
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
                              className="h-12 w-11 rounded-lg border border-zinc-700 bg-zinc-900 text-white first:rounded-lg first:border-l last:rounded-lg"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading || form.otp.length !== 6}
                      className="h-11 w-full rounded-lg bg-white text-zinc-950 hover:bg-zinc-200"
                    >
                      {loading ? "Verifying…" : "Verify email"}
                    </Button>

                    <p className="text-center text-xs text-zinc-500">
                      Didn&apos;t get a code?{" "}
                      <button
                        type="button"
                        className="text-zinc-300 hover:underline"
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
                </motion.div>
              )}

              {/* Sign up — agreements */}
              {mode === "signup" && step === "agreements" && (
                <motion.div
                  key="agreements"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    type="button"
                    onClick={() => setStep("verify")}
                    className="mb-6 flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>

                  <h1 className="text-2xl font-normal tracking-tight text-white">
                    Review and confirm
                  </h1>
                  <p className="mt-1.5 text-sm text-zinc-400">
                    Please confirm the following before creating your account.
                  </p>

                  <form
                    onSubmit={handleCreateAccount}
                    className="mt-8 space-y-5"
                  >
                    <div className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="terms"
                          checked={form.termsAccepted}
                          onCheckedChange={(c) =>
                            update("termsAccepted", c === true)
                          }
                          className="mt-0.5 border-zinc-600 data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600"
                        />
                        <Label
                          htmlFor="terms"
                          className="text-sm leading-relaxed font-normal text-zinc-300"
                        >
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
                          className="mt-0.5 border-zinc-600 data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600"
                        />
                        <Label
                          htmlFor="risk"
                          className="text-sm leading-relaxed font-normal text-zinc-300"
                        >
                          I understand that film investments involve risk,
                          including the possible loss of capital. Past
                          performance does not guarantee future results.
                        </Label>
                      </div>
                    </div>

                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-4">
                      <p className="text-xs leading-relaxed text-zinc-500">
                        This is not an offer to sell securities. Investment
                        opportunities will be made available through a regulated
                        crowdfunding portal in compliance with SEC regulations.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={
                        loading ||
                        !form.termsAccepted ||
                        !form.riskAcknowledged
                      }
                      className="h-11 w-full rounded-lg bg-white text-zinc-950 hover:bg-zinc-200"
                    >
                      {loading ? "Creating account…" : "Create account"}
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
