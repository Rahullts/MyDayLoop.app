import { useEffect, useState, type ReactNode, type HTMLAttributes } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { useTilt } from "@/hooks/useTilt";
import { prefersReducedMotion } from "@/lib/animations";

export function CountUp({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1200,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const { ref, value: n } = useCountUp(value, duration);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function GlassCard({
  children,
  className = "",
  hover = false,
  tilt = false,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  tilt?: boolean;
} & HTMLAttributes<HTMLDivElement>) {
  const tiltProps = useTilt(5);
  const tiltAttrs = tilt
    ? {
        ref: tiltProps.ref,
        onMouseMove: tiltProps.onMouseMove,
        onMouseLeave: tiltProps.onMouseLeave,
        style: { ...tiltProps.style, ...(rest.style ?? {}) },
      }
    : {};
  return (
    <div
      {...rest}
      {...tiltAttrs}
      className={`glass rounded-2xl ${hover ? "glass-hover" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
      <div className="min-w-0">
        <h1 className="truncate text-2xl sm:text-3xl font-semibold tracking-tight text-gradient">
          {title}
        </h1>
        {subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  sub,
  accent = "primary",
  icon,
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  accent?: "primary" | "placement" | "project" | "fitness" | "nutrition" | "recovery";
  icon?: ReactNode;
}) {
  const accentMap: Record<string, string> = {
    primary: "from-primary/50 to-primary/0",
    placement: "from-loop-placement/50 to-loop-placement/0",
    project: "from-loop-project/50 to-loop-project/0",
    fitness: "from-loop-fitness/50 to-loop-fitness/0",
    nutrition: "from-loop-nutrition/50 to-loop-nutrition/0",
    recovery: "from-loop-recovery/50 to-loop-recovery/0",
  };
  const iconBg: Record<string, string> = {
    primary: "bg-primary/15 text-primary",
    placement: "bg-loop-placement/15 text-loop-placement",
    project: "bg-loop-project/15 text-loop-project",
    fitness: "bg-loop-fitness/15 text-loop-fitness",
    nutrition: "bg-loop-nutrition/15 text-loop-nutrition",
    recovery: "bg-loop-recovery/15 text-loop-recovery",
  };
  return (
    <GlassCard hover className="group relative overflow-hidden p-5">
      <div
        className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${accentMap[accent]} blur-2xl transition-opacity duration-500`}
      />
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
        {icon && (
          <span className={`grid h-7 w-7 place-items-center rounded-lg ${iconBg[accent]}`}>
            {icon}
          </span>
        )}
      </div>
      <div className="mt-4 font-display text-[28px] leading-none font-semibold tracking-tight">
        {value}
      </div>
      {sub && <div className="mt-2 text-[11px] text-muted-foreground">{sub}</div>}
    </GlassCard>
  );
}

export function RingProgress({
  value,
  size = 132,
  stroke = 10,
  label,
  animated = true,
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  animated?: boolean;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const reduce = typeof window !== "undefined" && prefersReducedMotion();
  const [shown, setShown] = useState(animated && !reduce ? 0 : value);
  useEffect(() => {
    if (!animated || reduce) {
      setShown(value);
      return;
    }
    const start = performance.now();
    const from = 0;
    const dur = 1100;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(from + (value - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, animated, reduce]);

  const offset = c - (shown / 100) * c;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.16 210)" />
            <stop offset="100%" stopColor="oklch(0.78 0.18 150)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="oklch(1 0 0 / 0.08)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-display text-3xl font-semibold tabular-nums">{Math.round(shown)}</div>
        {label && (
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
        )}
      </div>
    </div>
  );
}

export function Bar({ value, accent = "primary" }: { value: number; accent?: string }) {
  const colorMap: Record<string, string> = {
    primary: "from-primary to-loop-fitness",
    placement: "from-loop-placement to-primary",
    project: "from-loop-project to-loop-placement",
    fitness: "from-loop-fitness to-primary",
    nutrition: "from-loop-nutrition to-loop-fitness",
    recovery: "from-loop-recovery to-loop-project",
  };
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${colorMap[accent] ?? colorMap.primary}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, transition: "width 600ms ease" }}
      />
    </div>
  );
}
