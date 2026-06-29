"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link as LinkIcon, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prefersReducedMotion } from "@/lib/animations";

export interface OrbitalTimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
  accent?: string; // CSS color or var(--loop-*)
}

interface RadialOrbitalTimelineProps {
  timelineData: OrbitalTimelineItem[];
  className?: string;
  radius?: number;
  height?: string;
}

export default function RadialOrbitalTimeline({
  timelineData,
  className = "",
  radius = 180,
  height = "h-[560px]",
}: RadialOrbitalTimelineProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const reduce = prefersReducedMotion();

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedId(null);
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedId((prev) => {
      if (prev === id) {
        setAutoRotate(true);
        return null;
      }
      setAutoRotate(false);
      const idx = timelineData.findIndex((i) => i.id === id);
      const target = (idx / timelineData.length) * 360;
      setRotationAngle(270 - target);
      return id;
    });
  };

  useEffect(() => {
    if (reduce || !autoRotate) return;
    const t = setInterval(() => {
      setRotationAngle((p) => Number(((p + 0.25) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(t);
  }, [autoRotate, reduce]);

  const calc = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const rad = (angle * Math.PI) / 180;
    const x = radius * Math.cos(rad);
    const y = radius * Math.sin(rad);
    const zIndex = Math.round(100 + 50 * Math.cos(rad));
    const opacity = Math.max(0.45, Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(rad)) / 2)));
    return { x, y, zIndex, opacity };
  };

  const related = (id: number) => timelineData.find((i) => i.id === id)?.relatedIds ?? [];

  const isRelated = (id: number) => expandedId != null && related(expandedId).includes(id);

  const statusStyles = (s: OrbitalTimelineItem["status"]) =>
    s === "completed"
      ? "border-loop-fitness/50 text-loop-fitness bg-loop-fitness/10"
      : s === "in-progress"
        ? "border-primary/50 text-primary bg-primary/10"
        : "border-border text-muted-foreground bg-white/5";

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className={`relative w-full ${height} overflow-hidden ${className}`}
    >
      <div
        ref={orbitRef}
        className="absolute inset-0 grid place-items-center"
        style={{ perspective: "1000px" }}
      >
        {/* Center core */}
        <div className="pointer-events-none absolute z-[60] grid h-24 w-24 place-items-center">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-60 blur-xl" />
          <div className="relative grid h-20 w-20 place-items-center rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-xl">
            {!reduce && (
              <span className="absolute inset-0 rounded-full border border-primary/40 animate-pulse-ring" />
            )}
            <div className="text-center">
              <div className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                Loop
              </div>
              <div className="font-display text-2xl font-semibold text-gradient">76</div>
            </div>
          </div>
        </div>

        {/* Orbit rings */}
        <svg viewBox="-260 -260 520 520" className="absolute inset-0 h-full w-full" aria-hidden>
          <g fill="none" stroke="currentColor" className="text-white/10">
            <circle r={radius - 40} strokeDasharray="2 4" />
            <circle r={radius} strokeWidth="0.6" />
            <circle r={radius + 40} strokeDasharray="1 6" />
          </g>
        </svg>

        {/* Nodes */}
        {timelineData.map((item, i) => {
          const p = calc(i, timelineData.length);
          const expanded = expandedId === item.id;
          const rel = isRelated(item.id);
          const Icon = item.icon;
          const accent = item.accent ?? "var(--primary)";

          return (
            <div
              key={item.id}
              className="absolute transition-transform duration-700 ease-out"
              style={{
                transform: `translate(${p.x}px, ${p.y}px)`,
                zIndex: expanded ? 200 : p.zIndex,
                opacity: expanded ? 1 : p.opacity,
              }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
                aria-label={`${item.title} — ${item.category}`}
                aria-expanded={expanded}
                className={`group relative grid h-12 w-12 place-items-center rounded-full border backdrop-blur-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  expanded
                    ? "scale-125 border-white/30 bg-white/[0.12]"
                    : rel
                      ? "scale-110 border-white/20 bg-white/[0.08]"
                      : "border-white/10 bg-white/[0.05] hover:scale-110 hover:bg-white/[0.1]"
                }`}
                style={{
                  color: accent,
                  boxShadow: expanded
                    ? `0 0 28px color-mix(in oklab, ${accent} 55%, transparent)`
                    : rel
                      ? `0 0 14px color-mix(in oklab, ${accent} 40%, transparent)`
                      : undefined,
                }}
              >
                {(expanded || rel) && !reduce && (
                  <span
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{
                      background: `color-mix(in oklab, ${accent} 25%, transparent)`,
                    }}
                  />
                )}
                <Icon className="h-5 w-5 relative" />
              </button>

              {/* Label */}
              <div
                className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium transition-all ${
                  expanded ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.title}
              </div>

              {/* Expanded card */}
              {expanded && (
                <Card
                  className="absolute left-1/2 top-full mt-10 w-64 -translate-x-1/2 border-white/10 bg-background/90 backdrop-blur-xl shadow-2xl animate-rise-in"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={statusStyles(item.status)}>
                        {item.status === "completed"
                          ? "ON TRACK"
                          : item.status === "in-progress"
                            ? "ACTIVE"
                            : "PENDING"}
                      </Badge>
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        {item.date}
                      </span>
                    </div>
                    <CardTitle className="mt-2 font-display text-base">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-3">
                    <p className="leading-relaxed">{item.content}</p>
                    <div>
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest">
                        <span className="flex items-center gap-1 text-foreground/80">
                          <Zap className="h-3 w-3" /> Energy
                        </span>
                        <span className="text-foreground">{item.energy}%</span>
                      </div>
                      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full transition-[width] duration-500"
                          style={{
                            width: `${item.energy}%`,
                            background: accent,
                          }}
                        />
                      </div>
                    </div>
                    {item.relatedIds.length > 0 && (
                      <div>
                        <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-foreground/80">
                          <LinkIcon className="h-3 w-3" /> Connected loops
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {item.relatedIds.map((rid) => {
                            const r = timelineData.find((x) => x.id === rid);
                            if (!r) return null;
                            return (
                              <button
                                key={rid}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleItem(rid);
                                }}
                                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] hover:bg-white/10 transition"
                              >
                                {r.title}
                                <ArrowRight className="h-2.5 w-2.5" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
