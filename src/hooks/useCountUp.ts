import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/animations";

/**
 * Animate a number from 0 to `value` once the element is in view.
 * Respects prefers-reduced-motion (returns the final value immediately).
 */
export function useCountUp(value: number, duration = 1200) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(prefersReducedMotion() ? value : 0);
  const started = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setN(value);
      return;
    }
    const el = ref.current;
    if (!el || started.current) return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const from = 0;
      const to = value;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setN(from + (to - from) * eased);
        if (t < 1) requestAnimationFrame(tick);
        else setN(to);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return { ref, value: n };
}
