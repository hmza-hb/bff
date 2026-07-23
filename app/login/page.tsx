import type { Metadata } from "next";
import { AuthFlow } from "@/components/auth/auth-flow";

export const metadata: Metadata = {
  title: "Sign in | Big Film Fund",
  description: "Sign in to your Big Film Fund account.",
};

export default function LoginPage() {
  return <AuthFlow />;
}
