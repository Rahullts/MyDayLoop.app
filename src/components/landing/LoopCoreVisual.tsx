import { useState } from "react";
import { Briefcase, FolderKanban, Dumbbell, Apple, Moon, Sparkles } from "lucide-react";
import { prefersReducedMotion } from "@/lib/animations";

type LoopKey = "placement" | "project" | "fitness" | "nutrition" | "recovery";

const MODULES: {
  key: LoopKey;
  label: string;
  metric: string;
  icon: typeof Briefcase;
}[] = [
  { key: "placement", label: "Placement", metric: "62% ready", icon: Briefcase },
  { key: "project", label: "Projects", metric: "3 shipping", icon: FolderKanban },
  { key: "fitness", label: "Fitness", metric: "4-day split", icon: Dumbbell },
  { key: "nutrition", label: "Nutrition", metric: "104g avg", icon: Apple },
  { key: "recovery", label: "Recovery", metric: "6.4h sleep", icon: Moon },
];

/**
 * Lightweight 3D-style orbiting visual.
 * Pure DOM/CSS — no Three.js. Uses CSS variables for orbit positions so
 * GPU compositing handles the motion. Respects prefers-reduced-motion.
 */
export function LoopCoreVisual() {
  const [active, setActive] = useState<LoopKey | null>(null);
  const reduce = prefersReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* glow background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_60%)] opacity-40 blur-2xl" />
        <div className="absolute inset-[28%] rounded-full bg-[radial-gradient(circle_at_center,var(--loop-fitness)_0%,transparent_60%)] opacity-30 blur-3xl" />
      </div>

      {/* orbit rings */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id="lcv-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.85 0.18 200)" stopOpacity="0.9" />
            <stop offset="60%" stopColor="oklch(0.55 0.15 220)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <g fill="none" stroke="oklch(1 0 0 / 0.08)" strokeWidth="0.3">
          <circle cx="100" cy="100" r="42" />
          <circle cx="100" cy="100" r="62" strokeDasharray="0.6 1.6" />
          <circle cx="100" cy="100" r="82" strokeDasharray="0.4 2" />
        </g>
        <circle cx="100" cy="100" r="22" fill="url(#lcv-core)" />
      </svg>

      {/* rotating ring container */}
      <div
        className={`absolute inset-0 ${reduce ? "" : "lcv-rotate"}`}
        style={{ animationDuration: "38s" }}
      >
        {MODULES.map((m, i) => {
          const angle = (i / MODULES.length) * 360;
          const isActive = active === m.key;
          return (
            <div
              key={m.key}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-42%) rotate(-${angle}deg)`,
              }}
            >
              {/* counter-rotate to keep chips upright */}
              <div className={reduce ? "" : "lcv-counter"} style={{ animationDuration: "38s" }}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(m.key)}
                  onMouseLeave={() => setActive((a) => (a === m.key ? null : a))}
                  onFocus={() => setActive(m.key)}
                  onBlur={() => setActive((a) => (a === m.key ? null : a))}
                  onClick={() => setActive((a) => (a === m.key ? null : m.key))}
                  aria-label={`${m.label} — ${m.metric}`}
                  className={`group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 backdrop-blur-xl transition-all duration-300 hover:scale-[1.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive
                      ? "scale-110 bg-white/[0.12] shadow-[0_0_24px_rgba(80,200,255,0.35)]"
                      : ""
                  }`}
                  style={{
                    color: `var(--loop-${m.key})`,
                  }}
                >
                  <span
                    className="grid h-7 w-7 place-items-center rounded-full"
                    style={{
                      background: `color-mix(in oklab, var(--loop-${m.key}) 22%, transparent)`,
                    }}
                  >
                    <m.icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-display text-xs font-semibold text-foreground/90">
                    {m.label}
                  </span>
                  <span
                    className={`overflow-hidden whitespace-nowrap text-[10px] text-muted-foreground transition-all duration-300 ${
                      isActive ? "ml-1 max-w-[120px] opacity-100" : "max-w-0 opacity-0"
                    }`}
                  >
                    {m.metric}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* center core */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="relative grid h-28 w-28 place-items-center rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-xl">
          <div
            className={`absolute inset-0 rounded-full ${reduce ? "" : "animate-pulse-ring"} border border-primary/40`}
          />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" /> Loop
            </div>
            <div className="font-display text-3xl font-semibold text-gradient">76</div>
            <div className="text-[10px] text-muted-foreground">/ 100</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes lcv-spin { to { transform: rotate(360deg); } }
        @keyframes lcv-spin-rev { to { transform: rotate(-360deg); } }
        .lcv-rotate { animation: lcv-spin linear infinite; }
        .lcv-counter { animation: lcv-spin-rev linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .lcv-rotate, .lcv-counter { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
