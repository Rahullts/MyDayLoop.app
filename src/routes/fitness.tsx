import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { GlassCard, MetricCard, PageHeader } from "@/components/ui-kit";
import { fitnessLog } from "@/lib/mock-data";
import { Dumbbell, Activity, Flame } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/fitness")({
  head: () => ({ meta: [{ title: "Fitness — MyDayLoop" }] }),
  component: Fitness,
});

function Fitness() {
  const [log, setLog] = useState(fitnessLog);
  const [entry, setEntry] = useState({ workout: "Upper body", run: 0, soreness: 2, notes: "" });

  const avgLoad = Math.round(log.reduce((s, x) => s + x.load, 0) / log.length);
  const totalKm = log.reduce((s, x) => s + x.run, 0);

  return (
    <AppShell>
      <PageHeader title="Fitness Tracker" subtitle="Train hard. Recover smart." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          label="Training load"
          value={`${avgLoad}`}
          sub="7-day avg"
          accent="fitness"
          icon={<Flame className="h-4 w-4 text-loop-fitness" />}
        />
        <MetricCard
          label="Distance"
          value={`${totalKm} km`}
          sub="This week"
          accent="fitness"
          icon={<Activity className="h-4 w-4 text-loop-fitness" />}
        />
        <MetricCard
          label="Sessions"
          value={`${log.filter((l) => l.workout !== "Rest").length}`}
          sub="Past 7 days"
          accent="fitness"
          icon={<Dumbbell className="h-4 w-4 text-loop-fitness" />}
        />
        <MetricCard
          label="Avg soreness"
          value={(log.reduce((s, x) => s + x.soreness, 0) / log.length).toFixed(1)}
          sub="Out of 10"
          accent="recovery"
        />
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <GlassCard className="p-6">
          <h2 className="font-display text-lg font-semibold">Weekly training load</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={log} margin={{ left: -20, right: 6, top: 10 }}>
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
                <Bar dataKey="load" radius={[8, 8, 0, 0]} fill="oklch(0.78 0.18 150)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 divide-y divide-border/60">
            {log.map((l) => (
              <div key={l.day} className="flex items-center justify-between py-2 text-sm">
                <span className="w-10 text-muted-foreground">{l.day}</span>
                <span className="flex-1 truncate">{l.workout}</span>
                <span className="text-xs text-muted-foreground w-16 text-right">{l.run}km</span>
                <span className="text-xs w-20 text-right" style={{ color: "var(--loop-fitness)" }}>
                  load {l.load}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="font-display text-lg font-semibold">Log a session</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLog((l) => [
                ...l.slice(1),
                {
                  day: new Date().toLocaleDateString("en", { weekday: "short" }),
                  workout: entry.workout,
                  run: Number(entry.run),
                  soreness: Number(entry.soreness),
                  load: 40 + Number(entry.run) * 5 + (entry.workout === "Rest" ? 0 : 30),
                },
              ]);
            }}
            className="mt-4 space-y-4"
          >
            <FormField label="Workout type">
              <select
                value={entry.workout}
                onChange={(e) => setEntry({ ...entry, workout: e.target.value })}
                className="input"
              >
                {[
                  "Upper body",
                  "Lower body",
                  "Push",
                  "Pull",
                  "Run",
                  "Long run",
                  "Mobility",
                  "Rest",
                ].map((w) => (
                  <option key={w}>{w}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Running (km)">
              <input
                type="number"
                min={0}
                value={entry.run}
                onChange={(e) => setEntry({ ...entry, run: Number(e.target.value) })}
                className="input"
              />
            </FormField>
            <FormField label={`Soreness: ${entry.soreness}/10`}>
              <input
                type="range"
                min={0}
                max={10}
                value={entry.soreness}
                onChange={(e) => setEntry({ ...entry, soreness: Number(e.target.value) })}
                className="w-full accent-primary"
              />
            </FormField>
            <FormField label="Notes">
              <textarea
                value={entry.notes}
                onChange={(e) => setEntry({ ...entry, notes: e.target.value })}
                rows={2}
                className="input"
                placeholder="Felt strong on bench..."
              />
            </FormField>
            <button className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm text-primary-foreground glow-primary">
              Save session
            </button>
          </form>
        </GlassCard>
      </div>
      <style>{`.input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 12px; padding: 10px 14px; font-size: 14px; color: var(--foreground); outline: none; }`}</style>
    </AppShell>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
