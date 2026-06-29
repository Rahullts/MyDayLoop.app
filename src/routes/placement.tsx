import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { GlassCard, PageHeader, RingProgress } from "@/components/ui-kit";
import { useState } from "react";
import { placementTasks } from "@/lib/mock-data";
import { CheckCircle2, Circle, Plus } from "lucide-react";

export const Route = createFileRoute("/placement")({
  head: () => ({ meta: [{ title: "Placement Tracker — MyDayLoop" }] }),
  component: Placement,
});

const CATEGORIES = ["DSA", "Resume", "Project", "Interview", "Aptitude"] as const;
type Cat = (typeof CATEGORIES)[number];

function Placement() {
  const [tasks, setTasks] = useState(placementTasks);
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState<Cat>("DSA");

  const done = tasks.filter((t) => t.done).length;
  const pct = Math.round((done / tasks.length) * 100);

  return (
    <AppShell>
      <PageHeader
        title="Placement Tracker"
        subtitle="DSA, resume, interview, aptitude — all in one place."
      />

      <div className="grid lg:grid-cols-[1fr_1.6fr] gap-6">
        <GlassCard className="p-6 flex flex-col items-center text-center">
          <RingProgress value={pct} label="READY" size={160} stroke={12} />
          <div className="mt-4 text-sm text-muted-foreground">
            {done} of {tasks.length} tasks complete
          </div>
          <div className="mt-6 w-full grid grid-cols-2 gap-2">
            {CATEGORIES.map((c) => {
              const total = tasks.filter((t) => t.category === c).length;
              const d = tasks.filter((t) => t.category === c && t.done).length;
              return (
                <div key={c} className="rounded-xl bg-white/5 p-3 text-left">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {c}
                  </div>
                  <div className="mt-1 font-display text-lg">
                    {d}/{total || 0}
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="font-display text-lg font-semibold">Tasks</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!title.trim()) return;
              setTasks((ts) => [
                ...ts,
                { id: Date.now(), title: title.trim(), category: cat, done: false },
              ]);
              setTitle("");
            }}
            className="mt-4 grid grid-cols-[1fr_140px_auto] gap-2"
          >
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a task..."
              className="rounded-xl border border-border bg-white/5 px-3 py-2 text-sm outline-none focus:border-primary/50"
            />
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value as Cat)}
              className="rounded-xl border border-border bg-white/5 px-3 py-2 text-sm outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button className="rounded-xl bg-primary px-3 py-2 text-sm text-primary-foreground glow-primary hover:opacity-90 flex items-center gap-1">
              <Plus className="h-4 w-4" /> Add
            </button>
          </form>

          <div className="mt-5 space-y-2">
            {tasks.map((t) => (
              <button
                key={t.id}
                onClick={() =>
                  setTasks((ts) => ts.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))
                }
                className="w-full flex items-center gap-3 rounded-xl border border-border/60 bg-white/5 px-4 py-3 hover:bg-white/10 transition text-left"
              >
                <span className="text-[10px] uppercase tracking-widest rounded-md px-2 py-1 bg-loop-placement/15 text-loop-placement">
                  {t.category}
                </span>
                <span
                  className={`flex-1 text-sm ${t.done ? "line-through text-muted-foreground" : ""}`}
                >
                  {t.title}
                </span>
                {t.done ? (
                  <CheckCircle2 className="h-5 w-5 text-loop-fitness" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
            ))}
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
