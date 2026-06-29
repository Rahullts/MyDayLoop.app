import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { GlassCard, MetricCard, PageHeader } from "@/components/ui-kit";
import { recoveryWeek } from "@/lib/mock-data";
import { Moon, Smile, BatteryCharging } from "lucide-react";
import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/recovery")({
  head: () => ({ meta: [{ title: "Recovery — MyDayLoop" }] }),
  component: Recovery,
});

function Recovery() {
  const [sleep, setSleep] = useState(6.0);
  const [mood, setMood] = useState(7);

  const avgSleep = (recoveryWeek.reduce((s, x) => s + x.sleep, 0) / recoveryWeek.length).toFixed(1);
  const avgRec = Math.round(recoveryWeek.reduce((s, x) => s + x.recovery, 0) / recoveryWeek.length);

  const intensity =
    avgRec > 75 ? "High — push today" : avgRec > 60 ? "Medium — moderate session" : "Low — recover";

  return (
    <AppShell>
      <PageHeader title="Recovery & Sleep" subtitle="Know when to push, when to back off." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          label="Avg sleep"
          value={`${avgSleep}h`}
          sub="7-day"
          accent="recovery"
          icon={<Moon className="h-4 w-4 text-loop-recovery" />}
        />
        <MetricCard
          label="Recovery"
          value={`${avgRec}`}
          sub="Out of 100"
          accent="recovery"
          icon={<BatteryCharging className="h-4 w-4 text-loop-recovery" />}
        />
        <MetricCard
          label="Mood"
          value={`${recoveryWeek[recoveryWeek.length - 1].mood}/10`}
          sub="Today"
          accent="recovery"
          icon={<Smile className="h-4 w-4 text-loop-recovery" />}
        />
        <MetricCard
          label="Suggested"
          value={intensity.split(" — ")[0]}
          sub={intensity.split(" — ")[1]}
          accent="fitness"
        />
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <GlassCard className="p-6">
          <h2 className="font-display text-lg font-semibold">Sleep & recovery this week</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={recoveryWeek} margin={{ left: -20, right: 6, top: 10 }}>
                <defs>
                  <linearGradient id="recFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.74 0.15 320)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.74 0.15 320)" stopOpacity={0} />
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
                  dataKey="recovery"
                  stroke="oklch(0.74 0.15 320)"
                  strokeWidth={2.5}
                  fill="url(#recFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="font-display text-lg font-semibold">Log tonight</h2>
          <div className="mt-4 space-y-5">
            <div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Sleep hours</span>
                <span>{sleep}h</span>
              </div>
              <input
                type="range"
                min={3}
                max={10}
                step={0.1}
                value={sleep}
                onChange={(e) => setSleep(Number(e.target.value))}
                className="mt-2 w-full accent-primary"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Mood</span>
                <span>{mood}/10</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={mood}
                onChange={(e) => setMood(Number(e.target.value))}
                className="mt-2 w-full accent-primary"
              />
            </div>
            <div className="rounded-xl border border-border bg-white/5 p-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Recovery status
              </div>
              <div className="mt-1 font-display text-xl">
                {sleep >= 7 && mood >= 7
                  ? "Recovered"
                  : sleep >= 6
                    ? "Borderline"
                    : "Under-recovered"}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {sleep < 6
                  ? "Skip intense training today. Walk + stretch."
                  : sleep < 7
                    ? "Moderate workout. Hydrate well."
                    : "Green light — train hard."}
              </div>
            </div>
            <button className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm text-primary-foreground glow-primary">
              Save
            </button>
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
