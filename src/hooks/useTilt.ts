import { useCallback, useRef } from "react";
import { prefersReducedMotion } from "@/lib/animations";

/**
 * Subtle 3D tilt on hover via CSS transforms. No re-renders.
 */
export function useTilt(max = 6) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion()) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) translateZ(0)`;
    },
    [max],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  }, []);

  return {
    ref,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    style: { transition: "transform 400ms cubic-bezier(0.22,1,0.36,1)" },
  };
}
