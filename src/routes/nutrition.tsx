import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { GlassCard, PageHeader, RingProgress } from "@/components/ui-kit";
import { proteinSources } from "@/lib/mock-data";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/nutrition")({
  head: () => ({ meta: [{ title: "Nutrition — MyDayLoop" }] }),
  component: Nutrition,
});

function Nutrition() {
  const [target, setTarget] = useState(125);
  const [consumed, setConsumed] = useState(87);
  const [log, setLog] = useState<{ name: string; grams: number; t: number }[]>([
    { name: "Whey scoop", grams: 24, t: Date.now() - 4 * 3600e3 },
    { name: "3 eggs", grams: 18, t: Date.now() - 3 * 3600e3 },
    { name: "Curd bowl", grams: 11, t: Date.now() - 1 * 3600e3 },
  ]);

  const remaining = Math.max(0, target - consumed);
  const pct = Math.round((consumed / target) * 100);

  function add(s: { name: string; grams: number }) {
    setConsumed((c) => c + s.grams);
    setLog((l) => [{ ...s, t: Date.now() }, ...l]);
  }

  return (
    <AppShell>
      <PageHeader title="Nutrition Tracker" subtitle="Hit your protein target — hostel friendly." />

      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6">
        <GlassCard className="p-6 flex flex-col items-center text-center">
          <RingProgress value={Math.min(100, pct)} label="PROTEIN" size={180} stroke={14} />
          <div className="mt-5 font-display text-2xl">
            {consumed}g <span className="text-muted-foreground text-base">/ {target}g</span>
          </div>
          <div className="mt-1 text-sm text-loop-nutrition">{remaining}g remaining</div>

          <div className="mt-6 w-full grid grid-cols-2 gap-2 text-left">
            <FormField label="Target (g)">
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                className="input"
              />
            </FormField>
            <FormField label="Adjust">
              <div className="flex gap-2">
                <button
                  onClick={() => setConsumed((c) => Math.max(0, c - 5))}
                  className="flex-1 rounded-xl border border-border bg-white/5 py-2 text-sm flex items-center justify-center"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setConsumed((c) => c + 5)}
                  className="flex-1 rounded-xl border border-border bg-white/5 py-2 text-sm flex items-center justify-center"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </FormField>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="p-6">
            <h2 className="font-display text-lg font-semibold">Quick add</h2>
            <p className="text-sm text-muted-foreground">Common sources, hostel-friendly.</p>
            <div className="mt-4 grid sm:grid-cols-2 gap-2">
              {proteinSources.map((s) => (
                <button
                  key={s.name}
                  onClick={() => add(s)}
                  className="flex items-center justify-between rounded-xl border border-border bg-white/5 px-4 py-3 hover:bg-white/10 transition"
                >
                  <span className="text-sm">{s.name}</span>
                  <span className="text-xs text-loop-nutrition">+{s.grams}g</span>
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="font-display text-lg font-semibold">Today's log</h2>
            <div className="mt-3 divide-y divide-border/60">
              {log.map((l, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 text-sm">
                  <span>{l.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {new Date(l.t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <span className="text-loop-nutrition">+{l.grams}g</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
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
