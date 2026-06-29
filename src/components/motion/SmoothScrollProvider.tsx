import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { getGsap, ScrollTrigger, prefersReducedMotion } from "@/lib/animations";

/**
 * Wraps the app with Lenis smooth scrolling and syncs GSAP ScrollTrigger.
 * Disables itself when prefers-reduced-motion is set or on coarse-pointer
 * (touch) devices below tablet width, where native scroll feels better.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion()) return;
    const isSmallTouch = window.matchMedia("(pointer: coarse)").matches && window.innerWidth < 768;
    if (isSmallTouch) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      lerp: 0.1,
    });

    const gsap = getGsap();
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    if (gsap) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
