import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible]   = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // The ring lags behind — springy follow gives the Johny-Vino feel
  const springX = useSpring(mouseX, { stiffness: 140, damping: 18, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 140, damping: 18, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        'button, a, [data-cursor="hover"], [role="button"]'
      );
      setIsHovering(!!el);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  const ringSize  = isHovering ? 52 : 36;
  const dotSize   = isHovering ? 4  : 5;

  return (
    <>
      {/* Dot — instant */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          backgroundColor: "#ddd5f0",
          pointerEvents: "none",
          zIndex: 99999,
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          transition: "width 0.25s ease, height 0.25s ease, opacity 0.3s ease",
        }}
      />

      {/* Ring — spring lag */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: ringSize,
          height: ringSize,
          borderRadius: "50%",
          border: "1px solid rgba(221, 213, 240, 0.55)",
          backgroundColor: isHovering ? "rgba(221, 213, 240, 0.06)" : "transparent",
          pointerEvents: "none",
          zIndex: 99998,
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          transition: "width 0.35s cubic-bezier(0.25,0,0,1), height 0.35s cubic-bezier(0.25,0,0,1), opacity 0.3s ease, background-color 0.25s ease",
        }}
      />
    </>
  );
}
