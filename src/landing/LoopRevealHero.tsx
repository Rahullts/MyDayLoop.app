import { useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Dumbbell,
  Moon,
  Apple,
  Code2,
  Briefcase,
  FolderKanban,
  Sparkles,
} from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * LoopRevealHero
 * A cursor / touch-driven reveal lens that swaps a chaotic student-day UI
 * for an optimized MyDayLoop day. Inspired by face-reveal interactions,
 * built entirely from CSS + SVG — no external assets.
 */
export function LoopRevealHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [revealed, setRevealed] = useState(false);

  const onEnter = () => setRevealed(true);
  const onLeave = () => setRevealed(false);
  const onToggle = () => setRevealed((v) => !v);

  return (
    <div
      ref={wrapRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-pressed={revealed}
      aria-label="Reveal optimized student day"
      className="relative aspect-[4/5] sm:aspect-[5/4] w-full overflow-hidden rounded-3xl glass select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
    >
      {/* Chaos base layer — visible by default */}
      <div
        className={`absolute inset-0 grayscale-[0.85] brightness-[0.55] contrast-[0.95] transition-opacity duration-500 ease-out ${
          revealed ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-hidden={revealed}
      >
        <DayPanel variant="chaos" />
      </div>

      {/* Optimized layer — cross-fades in on hover/focus/tap */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-out ${
          revealed ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!revealed}
      >
        <DayPanel variant="clarity" />
      </div>

      {/* Soft glow when revealed */}
      {!reduced && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: revealed ? 1 : 0,
            background:
              "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--primary) 18%, transparent) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Hint */}
      <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
        <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] text-muted-foreground backdrop-blur">
          <Sparkles className="h-3 w-3 text-primary" />
          <span className="hidden sm:inline">
            {revealed ? "Optimized day" : "Hover to reveal your optimized day"}
          </span>
          <span className="sm:inline md:hidden">
            {revealed ? "Optimized day" : "Tap to reveal"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------ Day Panel ------------ */

const chaosItems = [
  { icon: AlertTriangle, label: "DSA missed (0/2)", tone: "bad" },
  { icon: Moon, label: "Slept 4h 50m", tone: "bad" },
  { icon: Apple, label: "Protein 38 / 125g", tone: "warn" },
  { icon: FolderKanban, label: "Project pending", tone: "warn" },
  { icon: Dumbbell, label: "Skipped gym 3d", tone: "bad" },
  { icon: Briefcase, label: "Resume stale", tone: "warn" },
] as const;

const clarityItems = [
  { icon: CheckCircle2, label: "DSA 2/2 solved", accent: "placement" },
  { icon: Moon, label: "Sleep 7h 40m", accent: "recovery" },
  { icon: Apple, label: "Protein 128 / 125g", accent: "nutrition" },
  { icon: FolderKanban, label: "Project shipped", accent: "project" },
  { icon: Dumbbell, label: "Upper body done", accent: "fitness" },
  { icon: Code2, label: "Portfolio live", accent: "primary" },
] as const;

function DayPanel({ variant }: { variant: "chaos" | "clarity" }) {
  const isClarity = variant === "clarity";
  return (
    <div className="relative h-full w-full p-5 sm:p-7">
      {/* Pixel grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: isClarity
            ? "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--primary) 25%, transparent) 1px, transparent 0)"
            : "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Glow orbs (clarity only) */}
      {isClarity && (
        <>
          <div className="pointer-events-none absolute -top-10 -left-10 h-48 w-48 rounded-full bg-primary/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-loop-recovery/30 blur-3xl" />
        </>
      )}

      <div className="relative flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {isClarity ? "MyDayLoop · Today" : "Today · Drift mode"}
          </div>
          <div className="mt-1 font-display text-xl sm:text-2xl font-semibold">
            {isClarity ? "On track. Loop closing." : "Falling behind."}
          </div>
        </div>
        <div
          className={`grid h-12 w-12 place-items-center rounded-2xl font-display text-lg font-semibold ${
            isClarity
              ? "bg-primary/15 text-primary border border-primary/40"
              : "bg-white/5 text-muted-foreground border border-white/10"
          }`}
        >
          {isClarity ? "87" : "34"}
        </div>
      </div>

      <div className="relative mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {(isClarity ? clarityItems : chaosItems).map((it, i) => (
          <Row key={i} {...it} clarity={isClarity} />
        ))}
      </div>

      {/* Mini bars */}
      <div className="relative mt-5 flex items-end gap-1.5 h-14">
        {(isClarity ? [55, 62, 70, 68, 75, 82, 88] : [22, 28, 18, 30, 24, 20, 26]).map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-md ${
              isClarity ? "bg-gradient-to-t from-primary/30 to-primary" : "bg-white/10"
            }`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  clarity,
  tone,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  clarity: boolean;
  tone?: "bad" | "warn";
  accent?: string;
}) {
  const color = clarity
    ? `var(--loop-${accent}, var(--primary))`
    : tone === "bad"
      ? "oklch(0.7 0.18 25)"
      : "oklch(0.78 0.14 70)";
  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 text-xs sm:text-sm ${
        clarity ? "border-white/10 bg-white/[0.04] backdrop-blur" : "border-white/5 bg-white/[0.02]"
      }`}
    >
      <span
        className="grid h-7 w-7 place-items-center rounded-lg"
        style={{
          background: `color-mix(in oklab, ${color} 20%, transparent)`,
          color,
        }}
      >
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className={clarity ? "text-foreground" : "text-muted-foreground"}>{label}</span>
    </div>
  );
}
