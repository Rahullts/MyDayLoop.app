import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AuthShell, Field } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — MyDayLoop" }] }),
  component: Signup,
});

function Signup() {
  const nav = useNavigate();
  return (
    <AuthShell title="Start your loop" subtitle="Free for students. Always.">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          nav({ to: "/onboarding" });
        }}
        className="space-y-4"
      >
        <Field label="Full name">
          <input className="input" required placeholder="Rahul Verma" />
        </Field>
        <Field label="College email">
          <input type="email" required placeholder="you@college.edu" className="input" />
        </Field>
        <Field label="Password">
          <input type="password" required placeholder="At least 8 characters" className="input" />
        </Field>
        <button className="btn-primary w-full">
          Create account <ArrowRight className="h-4 w-4" />
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}
