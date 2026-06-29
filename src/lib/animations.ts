import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function getGsap() {
  if (typeof window === "undefined") return null;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return gsap;
}

export { ScrollTrigger };

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Fade + rise reveal for a list of elements with stagger. */
export function revealStagger(
  els: Element[] | NodeListOf<Element>,
  opts: { trigger?: Element; y?: number; stagger?: number; duration?: number } = {},
) {
  const g = getGsap();
  if (!g || prefersReducedMotion()) {
    (els as Element[]).forEach((el) => (el as HTMLElement).style.setProperty("opacity", "1"));
    return;
  }
  const { trigger, y = 24, stagger = 0.08, duration = 0.8 } = opts;
  g.fromTo(
    els,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      ease: "power3.out",
      stagger,
      scrollTrigger: trigger ? { trigger, start: "top 80%", once: true } : undefined,
    },
  );
}
