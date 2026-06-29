import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AuthShell, Field } from "./login";
import { ArrowRight, Briefcase, Dumbbell, Apple, Moon, FolderKanban } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Get started — MyDayLoop" }] }),
  component: Onboarding,
});

const goals = [
  { id: "placement", label: "Crack placements", icon: Briefcase },
  { id: "project", label: "Ship side projects", icon: FolderKanban },
  { id: "fitness", label: "Build fitness", icon: Dumbbell },
  { id: "nutrition", label: "Hit protein daily", icon: Apple },
  { id: "recovery", label: "Sleep better", icon: Moon },
];

function Onboarding() {
  const nav = useNavigate();
  const [selected, setSelected] = useState<string[]>(["placement", "fitness"]);
  const [protein, setProtein] = useState(125);
  const [sleep, setSleep] = useState("23:30");

  return (
    <AuthShell title="Let's tune your loop" subtitle="Takes 30 seconds.">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
          What matters most right now?
        </div>
        <div className="grid grid-cols-2 gap-2">
          {goals.map((g) => {
            const active = selected.includes(g.id);
            return (
              <button
                key={g.id}
                onClick={() =>
                  setSelected((s) =>
                    s.includes(g.id) ? s.filter((x) => x !== g.id) : [...s, g.id],
                  )
                }
                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition ${
                  active
                    ? "border-primary/50 bg-primary/10 text-foreground"
                    : "border-border bg-white/5 text-muted-foreground hover:text-foreground"
                }`}
              >
                <g.icon className="h-4 w-4" />
                {g.label}
              </button>
            );
          })}
        </div>

        <div className="mt-5 space-y-4">
          <Field label="Daily protein target (g)">
            <input
              type="number"
              value={protein}
              onChange={(e) => setProtein(Number(e.target.value))}
              className="input"
            />
          </Field>
          <Field label="Target sleep time">
            <input
              type="time"
              value={sleep}
              onChange={(e) => setSleep(e.target.value)}
              className="input"
            />
          </Field>
        </div>

        <button onClick={() => nav({ to: "/dashboard" })} className="btn-primary w-full mt-6">
          Enter dashboard <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </AuthShell>
  );
}
