import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LoopMark } from "@/components/app-shell";
import { GlassCard } from "@/components/ui-kit";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — MyDayLoop" }] }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  return (
    <AuthShell title="Welcome back" subtitle="Continue your loop.">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          nav({ to: "/dashboard" });
        }}
        className="space-y-4"
      >
        <Field label="Email">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@college.edu"
            className="input"
          />
        </Field>
        <Field label="Password">
          <input type="password" required placeholder="••••••••" className="input" />
        </Field>
        <button className="btn-primary w-full">
          Log in <ArrowRight className="h-4 w-4" />
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        New here?{" "}
        <Link to="/signup" className="text-primary hover:underline">
          Create account
        </Link>
      </p>
    </AuthShell>
  );
}

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none fixed -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
      <div className="relative w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <LoopMark />
          <span className="font-display text-lg font-semibold">MyDayLoop</span>
        </Link>
        <GlassCard className="p-8">
          <h1 className="font-display text-2xl font-semibold">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </GlassCard>
      </div>
      <style>{`
        .input { width: 100%; background: color-mix(in oklab, white 6%, transparent); border: 1px solid var(--border); border-radius: 12px; padding: 10px 14px; font-size: 14px; color: var(--foreground); outline: none; transition: border-color .2s; }
        .input:focus { border-color: color-mix(in oklab, var(--primary) 60%, transparent); }
        .btn-primary { display:inline-flex; align-items:center; justify-content:center; gap:.5rem; background: var(--primary); color: var(--primary-foreground); border-radius: 12px; padding: 10px 16px; font-weight: 500; font-size: 14px; box-shadow: 0 0 0 1px color-mix(in oklab, var(--primary) 40%, transparent), 0 10px 40px -10px color-mix(in oklab, var(--primary) 60%, transparent); transition: opacity .2s; }
        .btn-primary:hover { opacity: .9; }
      `}</style>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
