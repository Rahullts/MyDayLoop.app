import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { GlassCard, PageHeader, Bar } from "@/components/ui-kit";
import { projects } from "@/lib/mock-data";
import { ExternalLink, Github, Plus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Projects — MyDayLoop" }] }),
  component: Projects,
});

function Projects() {
  const [list, setList] = useState(projects);
  const [name, setName] = useState("");

  return (
    <AppShell>
      <PageHeader title="Project Tracker" subtitle="Ship more. Track every project end-to-end." />

      <GlassCard className="p-5 mb-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!name.trim()) return;
            setList((l) => [
              ...l,
              {
                id: Date.now(),
                name: name.trim(),
                stack: ["React"],
                github: "—",
                demo: "—",
                progress: 0,
                missing: ["Set up repo", "First commit", "README"],
              },
            ]);
            setName("");
          }}
          className="flex flex-wrap gap-2"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New project name"
            className="flex-1 min-w-[200px] rounded-xl border border-border bg-white/5 px-3 py-2 text-sm outline-none focus:border-primary/50"
          />
          <button className="rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground glow-primary flex items-center gap-1">
            <Plus className="h-4 w-4" /> Add project
          </button>
        </form>
      </GlassCard>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {list.map((p) => (
          <GlassCard key={p.id} hover className="p-6">
            <div className="flex items-start justify-between">
              <h3 className="font-display text-lg font-semibold">{p.name}</h3>
              <span className="text-xs text-muted-foreground">{p.progress}%</span>
            </div>
            <div className="mt-3">
              <Bar value={p.progress} accent="project" />
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="text-[10px] uppercase tracking-widest rounded-md px-2 py-1 bg-loop-project/15 text-loop-project"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-4 space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2 truncate">
                <Github className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{p.github}</span>
              </div>
              <div className="flex items-center gap-2 truncate">
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{p.demo}</span>
              </div>
            </div>
            <div className="mt-4 border-t border-border/60 pt-3">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                Missing
              </div>
              <ul className="space-y-1.5 text-sm">
                {p.missing.map((m) => (
                  <li key={m} className="flex items-center gap-2">
                    <input type="checkbox" className="accent-primary" />
                    <span className="text-foreground/80">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>
        ))}
      </div>
    </AppShell>
  );
}
