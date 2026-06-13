import { useRef, useEffect, useCallback } from "react";
import { ChevronArrow } from "./ChevronArrow";
import heroImgSrc from "../../imports/17_2x.png";

interface HeroSectionProps {
  onNext: () => void;
}

const BRUSH_INNER = 40; // fully opaque core radius (px)
const BRUSH_OUTER = 60; // feather-out radius (px)

export function HeroSection({ onNext }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const baseImgRef = useRef<HTMLImageElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);

  // Keep a loaded Image object for canvas drawImage
  const imgObjRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    const img = new Image();
    img.src = heroImgSrc as unknown as string;
    imgObjRef.current = img;
  }, []);

  // Resize canvas to section's physical pixel size
  const resizeCanvas = useCallback(() => {
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas) return;
    canvas.width  = section.clientWidth;
    canvas.height = section.clientHeight;
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // Draw one brush stroke of the inverted image onto the canvas
  const drawBrush = useCallback((clientX: number, clientY: number) => {
    const section  = sectionRef.current;
    const canvas   = canvasRef.current;
    const baseImg  = baseImgRef.current;
    const imgObj   = imgObjRef.current;
    if (!section || !canvas || !baseImg || !imgObj || !imgObj.complete || !imgObj.naturalWidth) return;

    const sRect = section.getBoundingClientRect();
    // Convert to canvas-local coords (canvas.width === section.clientWidth)
    const lx = clientX - sRect.left;
    const ly = clientY - sRect.top;

    const cw   = canvas.width;
    const ch   = canvas.height;
    if (!cw || !ch) return;
    const natW = imgObj.naturalWidth;
    const natH = imgObj.naturalHeight;

    // Replicate object-fit:cover in canvas pixel space
    const scale = Math.max(cw / natW, ch / natH);
    const iw    = natW * scale;
    const ih    = natH * scale;
    const ix    = (cw - iw) / 2;
    const iy    = (ch - ih) / 2;

    // ── Temp canvas: draw radial gradient mask, then clip inverted image to it ──
    const tmp    = document.createElement("canvas");
    tmp.width    = cw;
    tmp.height   = ch;
    if (!tmp.width || !tmp.height) return;
    const tmpCtx = tmp.getContext("2d")!;

    // Soft brush shape
    const grad = tmpCtx.createRadialGradient(lx, ly, 0, lx, ly, BRUSH_OUTER);
    grad.addColorStop(0,                        "rgba(255,255,255,1)");
    grad.addColorStop(BRUSH_INNER / BRUSH_OUTER, "rgba(255,255,255,1)");
    grad.addColorStop(1,                        "rgba(255,255,255,0)");
    tmpCtx.fillStyle = grad;
    tmpCtx.fillRect(0, 0, cw, ch);

    // Clip inverted image to the gradient shape
    tmpCtx.globalCompositeOperation = "source-in";
    tmpCtx.filter = "invert(1)";
    tmpCtx.drawImage(imgObj, ix, iy, iw, ih);

    // Accumulate stroke onto the persistent canvas (never cleared)
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(tmp, 0, 0);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect   = section.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top  && e.clientY <= rect.bottom;
      if (inside) drawBrush(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [drawBrush]);

  const imgStyle: React.CSSProperties = {
    position:       "absolute",
    inset:          0,
    width:          "100%",
    height:         "100%",
    objectFit:      "cover",
    objectPosition: "center",
    display:        "block",
  };

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      style={{
        position:        "relative",
        width:           "100%",
        height:          "100vh",
        overflow:        "hidden",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0px, black 20px, black calc(100% - 80px), transparent 100%)",
        maskImage:       "linear-gradient(to bottom, transparent 0px, black 20px, black calc(100% - 80px), transparent 100%)",
      }}
    >
      {/* Base image — always visible */}
      <img
        ref={baseImgRef}
        src={heroImgSrc as unknown as string}
        alt="Portfolio opening screen"
        style={imgStyle}
      />

      {/* Paint canvas — accumulates inverted brush strokes */}
      <canvas
        ref={canvasRef}
        style={{
          ...imgStyle,
          pointerEvents: "none",
        }}
      />

      <ChevronArrow onClick={onNext} />
    </section>
  );
}
