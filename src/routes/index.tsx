import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  Briefcase,
  FolderKanban,
  Dumbbell,
  Apple,
  Moon,
  Sparkles,
  Target,
  TrendingUp,
  Github,
  Twitter,
  Linkedin,
  GraduationCap,
  Building2,
  Utensils,
  BedDouble,
} from "lucide-react";
import { useState } from "react";
import { GlassCard, RingProgress, Bar, CountUp } from "@/components/ui-kit";
import { LoopMark } from "@/components/app-shell";
import { AuroraBackground } from "@/components/aurora-background";
import { LoopRevealHero } from "@/components/landing/LoopRevealHero";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { revealStagger } from "@/lib/animations";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const orbitalLoops = [
  {
    id: 1,
    title: "Placement",
    date: "Today · 9:00 AM",
    content: "2 DSA problems queued. Resume review on Friday. Mock interview Sunday.",
    category: "Placement",
    icon: Briefcase,
    relatedIds: [2, 5],
    status: "in-progress" as const,
    energy: 62,
    accent: "var(--loop-placement)",
  },
  {
    id: 2,
    title: "Projects",
    date: "Today · 8:00 PM",
    content: "Auth module shipping. Portfolio v2 in review. 47 commits this week.",
    category: "Projects",
    icon: FolderKanban,
    relatedIds: [1, 3],
    status: "in-progress" as const,
    energy: 48,
    accent: "var(--loop-project)",
  },
  {
    id: 3,
    title: "Fitness",
    date: "Today · 5:00 PM",
    content: "Upper-body split. 4-day streak. Avg load: medium. Run scheduled Wed.",
    category: "Fitness",
    icon: Dumbbell,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 72,
    accent: "var(--loop-fitness)",
  },
  {
    id: 4,
    title: "Nutrition",
    date: "Today · 1:00 PM",
    content: "87g of 125g protein. Hostel-friendly: 2 eggs + paneer + whey to close gap.",
    category: "Nutrition",
    icon: Apple,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 70,
    accent: "var(--loop-nutrition)",
  },
  {
    id: 5,
    title: "Recovery",
    date: "Tonight · 10:30 PM",
    content: "5.8h last night — flagged. Wind-down at 10:30 to protect 7h sleep.",
    category: "Recovery",
    icon: Moon,
    relatedIds: [1, 4],
    status: "pending" as const,
    energy: 58,
    accent: "var(--loop-recovery)",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MyDayLoop — Close every loop. Build your future." },
      {
        name: "description",
        content:
          "One dashboard for placements, projects, fitness, nutrition and recovery. The student growth OS for the next generation.",
      },
      { property: "og:title", content: "MyDayLoop — Student growth dashboard" },
    ],
  }),
  component: Landing,
});

const loops = [
  {
    key: "placement",
    icon: Briefcase,
    title: "Placement Loop",
    body: "DSA grind, resume polish, mock interviews, aptitude — track every rep that gets you the offer.",
  },
  {
    key: "project",
    icon: FolderKanban,
    title: "Project Loop",
    body: "Ship more. Track GitHub commits, portfolio pages, deployments, and what's still missing.",
  },
  {
    key: "fitness",
    icon: Dumbbell,
    title: "Fitness Loop",
    body: "Workouts, runs, soreness and training load — built for students, not just lifters.",
  },
  {
    key: "nutrition",
    icon: Apple,
    title: "Food Loop",
    body: "Hit your protein target with hostel-friendly suggestions: whey, eggs, milk, paneer, dal.",
  },
  {
    key: "recovery",
    icon: Moon,
    title: "Recovery Loop",
    body: "Sleep, mood, stress and recovery score — know when to push and when to back off.",
  },
] as const;

function Landing() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const groups = root.querySelectorAll<HTMLElement>("[data-reveal]");
    groups.forEach((section) => {
      const children = section.querySelectorAll<HTMLElement>("[data-reveal-item]");
      if (children.length === 0) {
        revealStagger([section], { trigger: section });
      } else {
        revealStagger(children, { trigger: section });
      }
    });
  }, []);

  return (
    <div ref={rootRef} className="relative min-h-screen overflow-x-hidden">
      <AuroraBackground />
      <ScrollProgress />

      {/* Nav */}
      <header className="relative z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-5">
          <Link to="/" className="flex items-center gap-2">
            <LoopMark />
            <span className="font-display text-lg font-semibold">MyDayLoop</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 rounded-full border border-border/60 bg-white/[0.04] px-1.5 py-1 text-sm text-muted-foreground backdrop-blur-xl">
            <a
              href="#loops"
              className="px-3 py-1.5 rounded-full hover:bg-white/5 hover:text-foreground transition"
            >
              Loops
            </a>
            <a
              href="#chaos"
              className="px-3 py-1.5 rounded-full hover:bg-white/5 hover:text-foreground transition"
            >
              Chaos → Clarity
            </a>
            <Link
              to="/dashboard"
              className="px-3 py-1.5 rounded-full hover:bg-white/5 hover:text-foreground transition"
            >
              Dashboard
            </Link>
            <a
              href="#students"
              className="px-3 py-1.5 rounded-full hover:bg-white/5 hover:text-foreground transition"
            >
              For students
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition"
            >
              Log in
            </Link>
            <MagneticButton>
              <Link
                to="/signup"
                className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground glow-primary hover:opacity-90 transition"
              >
                Start Free <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-20 sm:pt-16">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          <div className="animate-rise-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/5 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                <span className="relative rounded-full bg-primary h-1.5 w-1.5" />
              </span>
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              The student growth OS — built for placements
            </div>
            <h1 className="mt-6 font-display text-[2.5rem] leading-[1.02] sm:text-6xl lg:text-7xl font-semibold tracking-[-0.035em]">
              Close every loop. Build your <span className="text-gradient-peak">future.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              One dashboard for placements, projects, fitness, nutrition and recovery. Stop juggling
              apps. Start compounding daily reps.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton>
                <Link
                  to="/onboarding"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground glow-primary hover:opacity-90 transition"
                >
                  Start Your Loop
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.18}>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/5 px-5 py-3 text-sm font-medium hover:bg-white/10 transition backdrop-blur"
                >
                  View Dashboard
                </Link>
              </MagneticButton>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="text-primary tracking-widest">★★★★★</span>
                Loved by 2,400+ students
              </span>
              <span className="hidden sm:inline h-3 w-px bg-border" />
              <span className="hidden sm:inline">12-day average streak</span>
            </div>
          </div>

          {/* Reveal hero */}
          <div className="relative">
            <LoopRevealHero />
          </div>
        </div>
      </section>

      {/* Loop Core Visual — Radial Orbital Timeline */}
      <section data-reveal className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="text-center max-w-2xl mx-auto" data-reveal-item>
          <p className="text-xs uppercase tracking-widest text-primary">The loop core</p>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-semibold tracking-tight">
            Five loops, <span className="text-gradient">one orbit.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Each loop reinforces the others. Sleep powers DSA. Protein powers lifts. Projects power
            confidence. Tap a node to see today's metric.
          </p>
        </div>
        <div className="mt-6" data-reveal-item>
          <RadialOrbitalTimeline timelineData={orbitalLoops} />
        </div>
      </section>

      {/* Chaos → Clarity (interactive toggle) */}
      <ChaosClaritySection />

      {/* Five loops */}
      <section
        id="loops"
        data-reveal
        className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-20"
      >
        <div className="max-w-2xl" data-reveal-item>
          <p className="text-xs uppercase tracking-widest text-primary">The 5 Loops</p>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-semibold tracking-tight">
            One dashboard. Five loops that <span className="text-gradient">compound.</span>
          </h2>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loops.map((l) => (
            <GlassCard key={l.key} data-reveal-item hover tilt className="p-6">
              <div
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: `color-mix(in oklab, var(--loop-${l.key}) 25%, transparent)`,
                  color: `var(--loop-${l.key})`,
                }}
              >
                <l.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{l.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{l.body}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Dashboard preview (interactive) */}
      <DashboardPreviewSection />

      {/* How it works */}
      <section data-reveal id="how" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-primary">How it works</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
            Three steps. Then keep showing up.
          </h2>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {[
            {
              n: "01",
              t: "Add your goals",
              b: "Tell us where you want to be: dream company, dream physique, dream portfolio.",
            },
            {
              n: "02",
              t: "Track your daily loop",
              b: "Mark off tasks across all five loops. Takes 60 seconds.",
            },
            {
              n: "03",
              t: "Improve with weekly insights",
              b: "See trends, gaps, and the one thing to fix next week.",
            },
          ].map((s) => (
            <GlassCard key={s.n} hover className="p-6">
              <div className="font-display text-5xl text-primary/40">{s.n}</div>
              <h3 className="mt-3 font-display text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.b}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Analytics preview */}
      <section data-reveal className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary">Analytics</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
              Numbers that actually help you decide.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Placement tasks completed, project progress, protein average, sleep average, workout
              consistency — at a glance, weekly and monthly.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "DSA / week", n: 32, suffix: "", a: "placement" },
              { label: "Project commits", n: 47, suffix: "", a: "project" },
              { label: "Avg protein", n: 104, suffix: "g", a: "nutrition" },
              { label: "Avg sleep", n: 6.4, suffix: "h", decimals: 1, a: "recovery" },
            ].map((x) => (
              <GlassCard key={x.label} hover tilt className="p-5">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {x.label}
                </div>
                <div
                  className="mt-1 font-display text-2xl font-semibold tabular-nums"
                  style={{ color: `var(--loop-${x.a}, var(--primary))` }}
                >
                  <CountUp value={x.n} suffix={x.suffix} decimals={x.decimals ?? 0} />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Built for Students */}
      <section
        id="students"
        data-reveal
        className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-20"
      >
        <div className="max-w-2xl" data-reveal-item>
          <p className="text-xs uppercase tracking-widest text-primary">Built for students</p>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-semibold tracking-tight">
            Designed for <span className="text-gradient">campus life</span>, not corporate
            dashboards.
          </h2>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: GraduationCap,
              t: "Campus placements",
              b: "DSA, aptitude, mock interviews, resume — all in one tracker.",
            },
            {
              icon: Building2,
              t: "Project portfolio",
              b: "Track GitHub, deployments and what's missing per project.",
            },
            {
              icon: Utensils,
              t: "Hostel nutrition",
              b: "Protein math that works for dal, paneer, eggs and whey.",
            },
            {
              icon: BedDouble,
              t: "Sleep & recovery",
              b: "Protect your sleep window. Train smarter, not louder.",
            },
          ].map((s) => (
            <GlassCard key={s.t} data-reveal-item hover className="p-5">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{s.t}</h3>
              <p className="mt-1.5 text-xs text-muted-foreground">{s.b}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        data-reveal
        className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 py-24 text-center"
      >
        <div data-reveal-item>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight">
            Close every loop. <span className="text-gradient">Build your future.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Your future self is voting today. Make it easy.
          </p>
          <div className="mt-8 flex justify-center">
            <MagneticButton>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground glow-primary hover:opacity-90 transition"
              >
                Start MyDayLoop <ArrowRight className="h-4 w-4" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/60 mt-10">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <LoopMark />
            <span className="font-display font-semibold">MyDayLoop</span>
            <span className="text-xs text-muted-foreground ml-3">
              © {new Date().getFullYear()} — Plan your day. Track your growth.
            </span>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <a href="#" aria-label="GitHub" className="hover:text-foreground">
              <Github className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-foreground">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-foreground">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Stat({
  label,
  value,
  accent = "primary",
  big = false,
}: {
  label: string;
  value: string;
  accent?: "primary" | "placement" | "project" | "fitness" | "nutrition" | "recovery";
  big?: boolean;
}) {
  return (
    <GlassCard className={big ? "p-5" : "p-3"}>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div
        className={`mt-1 font-display font-semibold ${big ? "text-2xl" : "text-lg"}`}
        style={{ color: `var(--loop-${accent}, var(--primary))` }}
      >
        {value}
      </div>
    </GlassCard>
  );
}

/* ---------------- Interactive: Chaos → Clarity ---------------- */

const chaosClarityPairs = [
  { before: "DSA backlog growing", after: "2 problems / day, on autopilot", accent: "placement" },
  { before: "Resume half-edited", after: "Resume reviewed weekly", accent: "placement" },
  { before: "Skipped gym 4 days", after: "4-day split, on track", accent: "fitness" },
  { before: "Protein under target", after: "125g hit, hostel-friendly", accent: "nutrition" },
  { before: "GitHub looks empty", after: "Daily commit streak", accent: "project" },
  { before: "5h sleep again", after: "7h+ protected sleep", accent: "recovery" },
] as const;

function ChaosClaritySection() {
  const [mode, setMode] = useState<"chaos" | "clarity">("chaos");
  const isClarity = mode === "clarity";

  return (
    <section id="chaos" data-reveal className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div data-reveal-item>
          <p className="text-xs uppercase tracking-widest text-primary">From chaos to clarity</p>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-semibold tracking-tight">
            College is loud. <span className="text-gradient">Your goals deserve quiet.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            DSA today. Resume tomorrow. Gym at 6. Protein at 9. Project deadline Friday. Sleep?
            Maybe. Toggle the switch to see what one calm dashboard does.
          </p>

          {/* Toggle */}
          <div
            role="tablist"
            aria-label="Toggle chaos and clarity"
            className="mt-8 inline-flex items-center rounded-full border border-border/60 bg-white/[0.04] p-1 backdrop-blur-xl"
          >
            {(["chaos", "clarity"] as const).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={mode === m}
                onClick={() => setMode(m)}
                className={`relative px-5 py-2 text-sm font-medium rounded-full transition-colors ${
                  mode === m ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {mode === m && (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-primary/15 ring-1 ring-primary/30 shadow-[0_0_24px_color-mix(in_oklab,var(--primary)_40%,transparent)] transition"
                  />
                )}
                <span className="relative capitalize">{m}</span>
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {isClarity
              ? "Every loop is closing. One screen, zero context-switching."
              : "Six tools. Six tabs. Six places to forget. Sound familiar?"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {chaosClarityPairs.map((p, i) => (
            <GlassCard
              key={p.before}
              data-reveal-item
              hover
              className="relative p-4 text-sm overflow-hidden group cursor-pointer"
              style={{ transitionDelay: `${i * 30}ms` }}
              onClick={() => setMode(isClarity ? "chaos" : "clarity")}
            >
              {/* glow on clarity */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity: isClarity ? 0.18 : 0,
                  background: `radial-gradient(circle at 30% 0%, var(--loop-${p.accent}) 0%, transparent 60%)`,
                }}
              />
              <div className="relative h-10">
                {/* Chaos layer */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    isClarity ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"
                  }`}
                >
                  <div className="text-muted-foreground line-through decoration-loop-recovery/50">
                    {p.before}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-loop-recovery/70">
                    Today
                  </div>
                </div>
                {/* Clarity layer */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    isClarity ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                  }`}
                >
                  <div
                    className="text-foreground font-medium"
                    style={{ color: `var(--loop-${p.accent})` }}
                  >
                    {p.after}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-loop-fitness/80">
                    On track
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Interactive: Dashboard Preview ---------------- */

const previewLoops = [
  {
    key: "placement" as const,
    label: "Placement",
    icon: Briefcase,
    score: 62,
    headline: "Placement readiness",
    primary: { label: "DSA solved", value: "32", sub: "this week" },
    secondary: { label: "Mock interviews", value: "4", sub: "completed" },
    bar: { label: "Resume completeness", value: 78, accent: "placement" as const },
    priorities: ["Resume update", "2 DSA problems", "Mock interview Sun"],
    trend: [40, 48, 52, 50, 58, 60, 62, 62],
    delta: "+8%",
  },
  {
    key: "project" as const,
    label: "Projects",
    icon: FolderKanban,
    score: 48,
    headline: "Project momentum",
    primary: { label: "Commits", value: "47", sub: "this week" },
    secondary: { label: "Shipping", value: "3", sub: "projects" },
    bar: { label: "Portfolio v2 progress", value: 65, accent: "project" as const },
    priorities: ["Ship auth module", "Deploy portfolio", "README cleanup"],
    trend: [22, 28, 30, 35, 38, 42, 45, 48],
    delta: "+18%",
  },
  {
    key: "fitness" as const,
    label: "Fitness",
    icon: Dumbbell,
    score: 72,
    headline: "Fitness load",
    primary: { label: "Streak", value: "4d", sub: "training" },
    secondary: { label: "Avg load", value: "Med", sub: "balanced" },
    bar: { label: "Weekly volume", value: 80, accent: "fitness" as const },
    priorities: ["Upper body 5pm", "20-min run Wed", "Mobility 10m"],
    trend: [50, 55, 60, 58, 65, 68, 70, 72],
    delta: "+4%",
  },
  {
    key: "nutrition" as const,
    label: "Nutrition",
    icon: Apple,
    score: 70,
    headline: "Protein intake",
    primary: { label: "Today", value: "87g", sub: "of 125g" },
    secondary: { label: "7-day avg", value: "104g", sub: "trending up" },
    bar: { label: "Daily target", value: 70, accent: "nutrition" as const },
    priorities: ["2 eggs + whey", "Paneer at dinner", "Curd snack 9pm"],
    trend: [60, 68, 72, 66, 70, 74, 72, 70],
    delta: "-3%",
  },
  {
    key: "recovery" as const,
    label: "Recovery",
    icon: Moon,
    score: 58,
    headline: "Sleep & recovery",
    primary: { label: "Last night", value: "5.8h", sub: "below target" },
    secondary: { label: "7-day avg", value: "6.4h", sub: "improving" },
    bar: { label: "Sleep consistency", value: 55, accent: "recovery" as const },
    priorities: ["Wind-down 10:30", "No screens 11pm", "Hydrate +1L"],
    trend: [70, 64, 60, 65, 62, 58, 56, 58],
    delta: "-6%",
  },
];

function DashboardPreviewSection() {
  const [activeKey, setActiveKey] = useState<(typeof previewLoops)[number]["key"]>("placement");
  const active = previewLoops.find((l) => l.key === activeKey)!;
  const max = Math.max(...active.trend);

  return (
    <section data-reveal className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-20">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-primary">Dashboard preview</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
            Your day, in one calm screen.
          </h2>
          <p className="mt-3 text-muted-foreground text-sm">
            Tap a loop to focus the dashboard. Everything else stays quiet.
          </p>
        </div>

        {/* Loop selector */}
        <div className="flex flex-wrap gap-1.5 rounded-2xl border border-border/60 bg-white/[0.04] p-1.5 backdrop-blur-xl">
          {previewLoops.map((l) => {
            const Icon = l.icon;
            const isActive = l.key === activeKey;
            return (
              <button
                key={l.key}
                onClick={() => setActiveKey(l.key)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "text-foreground shadow-[0_0_24px_color-mix(in_oklab,var(--primary)_30%,transparent)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={
                  isActive
                    ? {
                        background: `color-mix(in oklab, var(--loop-${l.key}) 18%, transparent)`,
                        border: `1px solid color-mix(in oklab, var(--loop-${l.key}) 40%, transparent)`,
                      }
                    : undefined
                }
              >
                <Icon
                  className="h-3.5 w-3.5"
                  style={isActive ? { color: `var(--loop-${l.key})` } : undefined}
                />
                {l.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-[1fr_1.4fr] gap-5">
        <GlassCard
          key={`ring-${activeKey}`}
          className="p-6 flex flex-col items-center justify-center animate-rise-in"
        >
          <RingProgress value={active.score} label={active.label} size={180} stroke={14} />
          <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
            {active.headline}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 w-full">
            <Stat label={active.primary.label} value={active.primary.value} accent={activeKey} />
            <Stat
              label={active.secondary.label}
              value={active.secondary.value}
              accent={activeKey}
            />
          </div>
        </GlassCard>
        <div className="grid sm:grid-cols-2 gap-5 content-start">
          <GlassCard key={`bar-${activeKey}`} className="p-5 animate-rise-in">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              {active.bar.label}
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-3xl font-semibold">
                <CountUp value={active.bar.value} suffix="%" />
              </span>
            </div>
            <div className="mt-4">
              <Bar value={active.bar.value} accent={active.bar.accent} />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">{active.primary.sub}</div>
          </GlassCard>
          <GlassCard key={`prio-${activeKey}`} className="p-5 animate-rise-in">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Today's priority
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              {active.priorities.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <Target className="h-3.5 w-3.5" style={{ color: `var(--loop-${activeKey})` }} />
                  {p}
                </li>
              ))}
            </ul>
          </GlassCard>
          <GlassCard key={`trend-${activeKey}`} className="p-5 sm:col-span-2 animate-rise-in">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Weekly trend · {active.label}
              </div>
              <div
                className={`text-xs flex items-center gap-1 ${active.delta.startsWith("+") ? "text-loop-fitness" : "text-loop-nutrition"}`}
              >
                <TrendingUp className="h-3.5 w-3.5" /> {active.delta} this week
              </div>
            </div>
            <div className="mt-4 flex items-end gap-1.5 h-24">
              {active.trend.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-md transition-[height,background] duration-500"
                  style={{
                    height: `${(h / max) * 100}%`,
                    background: `linear-gradient(to top, color-mix(in oklab, var(--loop-${activeKey}) 30%, transparent), var(--loop-${activeKey}))`,
                  }}
                />
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
