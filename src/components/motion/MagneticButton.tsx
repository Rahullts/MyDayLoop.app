import { useRef, type ReactNode, type CSSProperties } from "react";
import { prefersReducedMotion } from "@/lib/animations";

/**
 * Subtle magnetic hover: the element drifts toward the cursor.
 * Falls back to a static element when reduced-motion is on.
 */
export function MagneticButton({
  children,
  className,
  style,
  as: As = "div",
  strength = 0.25,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "span";
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <As
      ref={ref as React.Ref<HTMLDivElement>}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={className}
      style={{ transition: "transform 380ms cubic-bezier(0.22,1,0.36,1)", ...style }}
    >
      {children}
    </As>
  );
}
