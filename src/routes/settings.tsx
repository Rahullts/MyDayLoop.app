import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { GlassCard, PageHeader } from "@/components/ui-kit";
import { useState } from "react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — MyDayLoop" }] }),
  component: Settings,
});

function Settings() {
  const nav = useNavigate();
  const [name, setName] = useState("Rahul Verma");
  const [email, setEmail] = useState("riya@college.edu");
  const [protein, setProtein] = useState(125);
  const [sleep, setSleep] = useState("23:30");
  const [notif, setNotif] = useState(true);

  return (
    <AppShell>
      <PageHeader title="Settings" subtitle="Tune your loop." />

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h2 className="font-display text-lg font-semibold">Profile</h2>
          <div className="mt-5 space-y-4">
            <Field label="Name">
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
            </Field>
            <Field label="Email">
              <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="font-display text-lg font-semibold">Goals</h2>
          <div className="mt-5 space-y-4">
            <Field label="Daily protein target (g)">
              <input
                type="number"
                className="input"
                value={protein}
                onChange={(e) => setProtein(Number(e.target.value))}
              />
            </Field>
            <Field label="Sleep cutoff">
              <input
                type="time"
                className="input"
                value={sleep}
                onChange={(e) => setSleep(e.target.value)}
              />
            </Field>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="font-display text-lg font-semibold">Notifications</h2>
          <div className="mt-5 flex items-center justify-between rounded-xl border border-border bg-white/5 px-4 py-3">
            <div>
              <div className="text-sm">Daily loop reminder</div>
              <div className="text-xs text-muted-foreground">8:00 PM each evening</div>
            </div>
            <button
              onClick={() => setNotif((v) => !v)}
              className={`relative h-6 w-11 rounded-full transition ${notif ? "bg-primary" : "bg-white/10"}`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${notif ? "left-5" : "left-0.5"}`}
              />
            </button>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="font-display text-lg font-semibold">Account</h2>
          <div className="mt-5 space-y-3">
            <button className="w-full rounded-xl border border-border bg-white/5 px-4 py-2.5 text-sm hover:bg-white/10">
              Export my data
            </button>
            <button
              onClick={() => nav({ to: "/" })}
              className="w-full rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/15"
            >
              Log out
            </button>
          </div>
        </GlassCard>
      </div>
      <style>{`.input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 12px; padding: 10px 14px; font-size: 14px; color: var(--foreground); outline: none; }`}</style>
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
