/**
 * AuroraBackground
 * A looping, GPU-friendly "background video" built with layered animated
 * gradients + SVG. No external assets, no <video> element required.
 * Designed to sit behind the entire app at z-index -1.
 */
export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base deep gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,oklch(0.24_0.06_260)_0%,oklch(0.14_0.03_265)_55%,oklch(0.10_0.025_270)_100%)]" />

      {/* Aurora blobs — slow drifting, blurred */}
      <div className="aurora-blob aurora-a" />
      <div className="aurora-blob aurora-b" />
      <div className="aurora-blob aurora-c" />
      <div className="aurora-blob aurora-d" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_50%,transparent_55%,rgba(0,0,0,0.55)_100%)]" />

      {/* Grain / noise overlay for premium feel */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.045] mix-blend-overlay">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Fine grid mask */}
      <div className="absolute inset-0 grid-bg opacity-[0.18]" />
    </div>
  );
}
