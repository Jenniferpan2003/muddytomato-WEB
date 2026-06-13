import { useState, type RefObject } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Project } from "../App";

interface PortfolioSectionProps {
  categoryRef: RefObject<HTMLDivElement>;
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const CATEGORIES = ["交互装置", "游戏设计", "动态视觉设计", "其他"] as const;

// ── 名片图片透明度 — 改这两行即可全局生效 ──
const CARD_IMG_OPACITY       = 0.3;   // 默认（未悬停）
const CARD_IMG_OPACITY_HOVER = 0.6;   // 鼠标悬停时

// Shared easing used throughout — smooth deceleration, like johnyvino.com
const EASE_OUT = [0.25, 0, 0, 1] as const;

export function PortfolioSection({
  categoryRef,
  projects,
  onProjectClick,
}: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]);
  const [hoveredId, setHoveredId]           = useState<string | null>(null);

  const filtered = projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="portfolio-section"
      style={{
        minHeight: "100vh",
        backgroundColor: "#09060f",
        paddingTop: "52px",
      }}
    >
      {/* Category filter bar */}
      <div
        ref={categoryRef}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "48px",
          padding: "48px 80px 40px",
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat}
              data-cursor="hover"
              onClick={() => setActiveCategory(cat)}
              style={{
                background: "none",
                border: "none",
                cursor: "none",
                color: "#ddd5f0",
                fontFamily: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
                fontWeight: 300,
                fontSize: "14px",
                letterSpacing: "0.1em",
                padding: "0 0 6px",
                borderBottom: isActive ? "1px solid #ddd5f0" : "1px solid transparent",
                opacity: isActive ? 1 : 0.5,
                transition: "opacity 0.3s ease, border-color 0.3s ease",
                lineHeight: 1.5,
              }}
              onMouseEnter={(e) => {
                if (!isActive)(e.currentTarget as HTMLButtonElement).style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                if (!isActive)(e.currentTarget as HTMLButtonElement).style.opacity = "0.5";
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Cards — AnimatePresence with mode="wait" for crossfade on category change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{
            padding: "0 0 120px",
            display: "flex",
            flexDirection: "column",
            gap: "0px",
            maxWidth: "1920px",
            margin: "0 auto",
          }}
        >
          {filtered.map((project, i) => {
            const isHovered = hoveredId === project.id;
            return (
              <motion.div
                key={project.id}
                data-cursor="hover"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.07,
                  ease: EASE_OUT,
                }}
                onClick={() => onProjectClick(project)}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  position:             "relative",
                  width:                "100%",
                  height:               "240px",
                  borderTop:            "1px solid rgba(180, 150, 220, 0.10)",
                  borderBottom:         i === filtered.length - 1
                    ? "1px solid rgba(180, 150, 220, 0.10)"
                    : "none",
                  cursor:               "none",
                  display:              "flex",
                  alignItems:           "center",
                  justifyContent:       "center",
                  overflow:             "hidden",
                  /* 上下 10px 羽化 */
                  WebkitMaskImage:      "linear-gradient(to bottom, transparent 0px, black 10px, black calc(100% - 10px), transparent 100%)",
                  maskImage:            "linear-gradient(to bottom, transparent 0px, black 10px, black calc(100% - 10px), transparent 100%)",
                }}
              >
                {/* Background — image if provided, else gray placeholder */}
                <motion.div
                  style={{ position: "absolute", inset: 0, overflow: "hidden" }}
                  animate={{ scale: isHovered ? 1.03 : 1 }}
                  transition={{ duration: 0.65, ease: EASE_OUT }}
                >
                  {(project.cardImage ?? project.image) ? (
                    <motion.img
                      src={project.cardImage ?? project.image}
                      alt={project.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        display: "block",
                      }}
                      animate={{
                        opacity: isHovered ? CARD_IMG_OPACITY_HOVER : CARD_IMG_OPACITY,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", backgroundColor: "#808080", opacity: 0.5 }} />
                  )}
                </motion.div>

                {/* Hover radial glow */}
                <motion.div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(ellipse at 50% 60%, rgba(160,120,220,0.10) 0%, transparent 65%)",
                    pointerEvents: "none",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />

                {/* Content — lifts up on hover */}
                <motion.div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "13px",
                  }}
                  animate={{ y: isHovered ? -6 : 0 }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                >
                  <motion.h3
                    style={{
                      color: "#ddd5f0",
                      fontFamily:
                        "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
                      fontWeight: 300,
                      fontSize: "18px",
                      letterSpacing: "0.14em",
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                    animate={{ opacity: isHovered ? 1 : 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.title}
                  </motion.h3>

                  {/* Tags fade in on hover */}
                  <motion.div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                    initial={false}
                    animate={{
                      opacity: isHovered ? 1 : 0.55,
                      y: isHovered ? 0 : 4,
                    }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          color: "rgba(221, 213, 240, 0.7)",
                          fontFamily:
                            "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
                          fontWeight: 300,
                          fontSize: "12px",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
