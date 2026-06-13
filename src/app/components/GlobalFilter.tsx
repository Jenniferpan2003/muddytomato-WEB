export function GlobalFilter() {
  return (
    <div
      style={{
        position: "fixed",
        inset: "-8%",
        pointerEvents: "none",
        zIndex: 9999,
        animation: "grain-move 0.12s steps(1) infinite",
        willChange: "transform",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <filter
            id="portfolio-grain"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.78"
              numOctaves="4"
              stitchTiles="stitch"
              result="noiseOut"
            />
            <feColorMatrix
              in="noiseOut"
              type="matrix"
              /* lavender-tinted grain: R=0.65, G=0.57, B=0.87, alpha=0.082 */
              values="0 0 0 0 0.65  0 0 0 0 0.57  0 0 0 0 0.87  0 0 0 0.082 0"
            />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#portfolio-grain)" />
      </svg>
      {/* Subtle lavender film-tint vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(100, 70, 160, 0.04) 100%)",
        }}
      />
    </div>
  );
}
