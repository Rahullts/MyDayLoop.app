import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { GlassCard, MetricCard, PageHeader, RingProgress, Bar, CountUp } from "@/components/ui-kit";
import {
  Briefcase,
  FolderKanban,
  Dumbbell,
  Apple,
  Moon,
  Flame,
  CheckCircle2,
  Circle,
  TrendingUp,
  Sparkles,
  Sunrise,
  BookOpen,
  Utensils,
  Code2,
  BedDouble,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";
import { loopScore, todayLoop, scoreTrend } from "@/lib/mock-data";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — MyDayLoop" }] }),
  component: Dashboard,
});

const loopIcons: Record<string, React.ElementType> = {
  placement: Briefcase,
  project: FolderKanban,
  fitness: Dumbbell,
  nutrition: Apple,
  recovery: Moon,
};

const timeline = [
  { time: "7:00 AM", label: "Wake + recovery check", icon: Sunrise, loop: "recovery" },
  { time: "9:00 AM", label: "Placement DSA — 2 problems", icon: BookOpen, loop: "placement" },
  { time: "1:00 PM", label: "Protein target update", icon: Utensils, loop: "nutrition" },
  { time: "5:00 PM", label: "Workout / run", icon: Dumbbell, loop: "fitness" },
  { time: "8:00 PM", label: "Project sprint", icon: Code2, loop: "project" },
  { time: "10:30 PM", label: "Sleep wind-down", icon: BedDouble, loop: "recovery" },
];

const insights = [
  {
    tone: "positive" as const,
    icon: TrendingUp,
    title: "Placement consistency is strong",
    body: "You closed 5/7 placement loops this week — but sleep recovery is limiting morning output.",
  },
  {
    tone: "warning" as const,
    icon: AlertTriangle,
    title: "Protein target missed 2 days",
    body: "Avg 92g vs 125g goal. Add a whey + curd combo after evening workouts to close the gap.",
  },
  {
    tone: "positive" as const,
    icon: Sparkles,
    title: "Project streak improved 18%",
    body: "Commit cadence trending up. Ship the auth module next to unlock the portfolio loop.",
  },
];

const weeklyBalance = [
  { key: "placement", label: "Placement", value: 62, delta: "+8%" },
  { key: "project", label: "Projects", value: 48, delta: "+18%" },
  { key: "fitness", label: "Fitness", value: 72, delta: "+4%" },
  { key: "nutrition", label: "Nutrition", value: 70, delta: "-3%" },
  { key: "recovery", label: "Recovery", value: 58, delta: "-6%" },
] as const;

function Dashboard() {
  const [tasks, setTasks] = useState(todayLoop);
  const completed = tasks.filter((t) => t.done).length;

  return (
    <AppShell>
      <PageHeader
        title="Good evening, Rahul"
        subtitle="Here's your loop for today — 5 tasks, 5 minutes."
        action={
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Flame className="h-4 w-4 text-loop-nutrition" />
            <span>12-day streak</span>
          </div>
        }
      />

      {/* Top metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <GlassCard
          tilt
          className="col-span-2 lg:col-span-2 xl:col-span-2 p-6 flex items-center gap-6"
        >
          <RingProgress value={loopScore.total} label="LOOP" size={132} />
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              MyDayLoop Score
            </div>
            <div className="mt-1 font-display text-3xl font-semibold tabular-nums">
              <CountUp value={loopScore.total} />
              <span className="text-muted-foreground text-lg">/100</span>
            </div>
            <div className="mt-2 text-xs text-loop-fitness flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" /> +6 vs last week
            </div>
          </div>
        </GlassCard>

        <MetricCard
          label="Placement"
          value={<CountUp value={loopScore.placement} suffix="%" />}
          sub="Readiness"
          accent="placement"
          icon={<Briefcase className="h-4 w-4 text-loop-placement" />}
        />
        <MetricCard
          label="Projects"
          value={<CountUp value={loopScore.project} suffix="%" />}
          sub="Avg progress"
          accent="project"
          icon={<FolderKanban className="h-4 w-4 text-loop-project" />}
        />
        <MetricCard
          label="Protein gap"
          value={
            <>
              <CountUp value={38} />g
            </>
          }
          sub="87 of 125g"
          accent="nutrition"
          icon={<Apple className="h-4 w-4 text-loop-nutrition" />}
        />
        <MetricCard
          label="Sleep"
          value={
            <>
              <CountUp value={5.8} decimals={1} />h
            </>
          }
          sub="High risk"
          accent="recovery"
          icon={<Moon className="h-4 w-4 text-loop-recovery" />}
        />
      </div>

      {/* Main row */}
      <div className="mt-6 grid lg:grid-cols-[1.2fr_1fr] gap-6">
        {/* Today's loop */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold">Today's Loop</h2>
              <p className="text-sm text-muted-foreground">
                {completed} of {tasks.length} complete
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              Fitness load: <span className="text-loop-fitness">Medium</span>
            </div>
          </div>
          <div className="mt-5 space-y-2">
            {tasks.map((t) => {
              const Icon = loopIcons[t.loop];
              return (
                <button
                  key={t.id}
                  onClick={() =>
                    setTasks((ts) => ts.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))
                  }
                  className="w-full flex items-center gap-3 rounded-xl border border-border/60 bg-white/5 px-4 py-3 hover:bg-white/10 hover:border-primary/30 transition text-left"
                >
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                    style={{
                      background: `color-mix(in oklab, var(--loop-${t.loop}) 22%, transparent)`,
                      color: `var(--loop-${t.loop})`,
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div
                      className={`text-sm truncate ${t.done ? "line-through text-muted-foreground" : ""}`}
                    >
                      {t.label}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {t.loop} loop
                    </div>
                  </div>
                  {t.done ? (
                    <CheckCircle2 className="h-5 w-5 text-loop-fitness" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
              );
            })}
          </div>
        </GlassCard>

        {/* Weekly chart preview */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Weekly Loop Score</h2>
            <div className="text-xs text-loop-fitness flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" /> +12%
            </div>
          </div>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scoreTrend} margin={{ left: -20, right: 6, top: 10 }}>
                <defs>
                  <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.16 210)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.78 0.16 210)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  stroke="rgba(255,255,255,0.3)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.3)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(20,22,40,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="oklch(0.78 0.16 210)"
                  strokeWidth={2.5}
                  fill="url(#scoreFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Today's Loop Timeline + AI Insights */}
      <div className="mt-6 grid lg:grid-cols-[1.2fr_1fr] gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold">Today's Loop Timeline</h2>
              <p className="text-sm text-muted-foreground">A calm rhythm across your day.</p>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Local time
            </span>
          </div>
          <ol className="mt-6 relative">
            <span className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-border to-transparent" />
            {timeline.map((t) => {
              const Icon = t.icon;
              return (
                <li key={t.time} className="relative flex gap-4 pb-5 last:pb-0">
                  <span
                    className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 backdrop-blur"
                    style={{
                      background: `color-mix(in oklab, var(--loop-${t.loop}) 18%, transparent)`,
                      color: `var(--loop-${t.loop})`,
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1 pt-1">
                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                      {t.time}
                    </div>
                    <div className="text-sm text-foreground">{t.label}</div>
                  </div>
                </li>
              );
            })}
          </ol>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/15 text-primary">
                <Sparkles className="h-4 w-4" />
              </span>
              <h2 className="font-display text-lg font-semibold">AI Loop Insights</h2>
            </div>
            <span className="rounded-full border border-border/60 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
              Beta
            </span>
          </div>
          <div className="mt-5 space-y-3">
            {insights.map((ins) => {
              const Icon = ins.icon;
              const tone =
                ins.tone === "positive"
                  ? "text-loop-fitness border-loop-fitness/30"
                  : "text-loop-nutrition border-loop-nutrition/30";
              return (
                <div key={ins.title} className={`rounded-xl border ${tone} bg-white/[0.03] p-4`}>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <div className="text-sm font-medium text-foreground">{ins.title}</div>
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{ins.body}</p>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* Weekly Loop Balance */}
      <div className="mt-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold">Weekly Loop Balance</h2>
              <p className="text-sm text-muted-foreground">
                How your five loops are compounding this week.
              </p>
            </div>
            <a
              href="/analytics"
              className="hidden sm:inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              See analytics <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {weeklyBalance.map((w) => {
              const Icon = loopIcons[w.key];
              const positive = w.delta.startsWith("+");
              return (
                <div
                  key={w.key}
                  className="group rounded-xl border border-border/60 bg-white/[0.03] p-4 hover:bg-white/[0.06] transition"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="grid h-8 w-8 place-items-center rounded-lg"
                      style={{
                        background: `color-mix(in oklab, var(--loop-${w.key}) 22%, transparent)`,
                        color: `var(--loop-${w.key})`,
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span
                      className={`text-[10px] font-medium ${positive ? "text-loop-fitness" : "text-loop-nutrition"}`}
                    >
                      {w.delta}
                    </span>
                  </div>
                  <div className="mt-3 text-[10px] uppercase tracking-widest text-muted-foreground">
                    {w.label}
                  </div>
                  <div className="mt-1 font-display text-2xl font-semibold tabular-nums">
                    <CountUp value={w.value} suffix="%" />
                  </div>
                  <div className="mt-3">
                    <Bar value={w.value} accent={w.key} />
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
