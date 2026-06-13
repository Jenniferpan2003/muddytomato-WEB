import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import type { Project, MediaSection } from "../App";

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

function VideoContainer({ section }: { section: MediaSection }) {
  return (
    <div
      data-cursor="hover"
      onClick={() => section.videoUrl && window.open(section.videoUrl, "_blank", "noopener,noreferrer")}
      style={{
        position: "relative",
        width: "100%",
        border: "1px solid rgba(180, 150, 220, 0.2)",
        overflow: "hidden",
        cursor: section.videoUrl ? "none" : "default",
        backgroundColor: "#140c23",
        aspectRatio: section.videoThumbnail ? undefined : "16 / 9",
      }}
    >
      {section.videoThumbnail && (
        <img src={section.videoThumbnail} alt="" style={{ display: "block", width: "100%", height: "auto" }} />
      )}
      <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", backgroundImage: GRAIN_SVG, backgroundSize: "180px 180px", opacity: 0.06, mixBlendMode: "overlay" }} />
      {section.videoUrl && (
        <div
          style={{ position: "absolute", inset: 0, zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "14px", opacity: 0, transition: "opacity 0.3s ease", background: "#09060f" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "1"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "0"; }}
        >
          <svg width="52" height="52" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="23" stroke="rgba(221,213,240,0.7)" strokeWidth="1" />
            <polygon points="20,16 34,24 20,32" fill="rgba(221,213,240,0.8)" />
          </svg>
          <span style={{ fontSize: "12px", color: "rgba(221,213,240,0.7)", letterSpacing: "0.14em", fontWeight: 300 }}>点击观看完整影片</span>
        </div>
      )}
      {!section.videoThumbnail && !section.videoUrl && (
        <div style={{ position: "absolute", inset: 0, zIndex: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.2 }}>
            <circle cx="24" cy="24" r="23" stroke="rgba(221,213,240,0.6)" strokeWidth="1" />
            <polygon points="20,16 34,24 20,32" fill="rgba(221,213,240,0.6)" />
          </svg>
        </div>
      )}
    </div>
  );
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const [contentVisible, setContentVisible] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const srcs = [
      project.heroImage,
      project.image,
      ...(project.mediaSections?.map((s) => s.videoThumbnail) ?? []),
    ].filter(Boolean) as string[];

    if (srcs.length === 0) {
      setPercent(100);
      setContentVisible(true);
      return;
    }

    let done = 0;
    const onSettle = () => {
      done++;
      setPercent(Math.round((done / srcs.length) * 100));
      if (done === srcs.length) setContentVisible(true);
    };
    srcs.forEach((src) => {
      const img = new Image();
      img.onload = onSettle;
      img.onerror = onSettle;
      img.src = src;
    });
  }, [project]);

  return (
    <motion.div
      key="detail"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 1, ease: [0.32, 0, 0.18, 1] }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        backgroundColor: "#09060f",
        color: "#ddd5f0",
        fontFamily: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
        fontWeight: 300,
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {/* Loading indicator */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 5,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none",
        opacity: contentVisible ? 0 : 1,
        transition: "opacity 0.5s ease",
      }}>
        <span style={{ fontSize: "24px", fontWeight: 300, color: "rgba(221,213,240,0.4)", letterSpacing: "0.1em", fontVariantNumeric: "tabular-nums" }}>
          {percent}%
        </span>
      </div>

      {/* All content fades in after load */}
      <div style={{ opacity: contentVisible ? 1 : 0, transition: "opacity 0.7s ease" }}>

        {/* ── STICKY NAV BAR — matches ResumeModal style ── */}
        <div style={{
          position:        "sticky",
          top:             0,
          zIndex:          10,
          height:          "52px",
          backgroundColor: "#09060f",
          borderBottom:    "1px solid rgba(180,140,220,0.65)",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "space-between",
          padding:         "0 48px",
        }}>
          <button
            data-cursor="hover"
            onClick={onBack}
            style={{
              background: "none", border: "none", cursor: "none",
              color: "#ddd5f0", display: "flex", alignItems: "center", gap: "8px",
              opacity: 0.7, transition: "opacity 0.2s ease",
              fontFamily: "inherit", fontWeight: 300, fontSize: "13px",
              letterSpacing: "0.08em", padding: 0,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.7"; }}
          >
            <ArrowLeft size={16} strokeWidth={1} />
            返回作品集
          </button>
          <span style={{ fontSize: "11px", letterSpacing: "0.2em", color: "rgba(221,213,240,0.4)", textTransform: "uppercase" }}>
            {project.category}
          </span>
        </div>

        {/* ── HERO SECTION ── full-viewport, bg image + overlaid text */}
        <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>

          {/* Background image */}
          {project.heroImage ? (
            <img
              src={project.heroImage}
              alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            />
          ) : (
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0d0818 0%, #1a0f2e 100%)" }} />
          )}

          {/* Dark gradient — fades bottom of hero into page bg */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(9,6,15,0.15) 0%, rgba(9,6,15,0.05) 35%, rgba(9,6,15,0.7) 65%, rgba(9,6,15,0.92) 82%, #09060f 93%, #09060f 100%)",
          }} />


          {/* Grain overlay */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN_SVG, backgroundSize: "180px", opacity: 0.04, pointerEvents: "none" }} />

          {/* Big title + tags — bottom left, Chinese/English split */}
          <div style={{ position: "absolute", bottom: "80px", left: "64px", right: "64px" }}>
            {(() => {
              const match = project.title.match(/^(.*?)\s+([A-Z].*)$/);
              const chinese = match ? match[1] : project.title;
              const english = match ? match[2] : null;
              return (
                <>
                  <div style={{ fontSize: "clamp(24px, 3.5vw, 48px)", fontWeight: 700, color: "#ddd5f0", letterSpacing: "0.04em", lineHeight: 1.1, marginBottom: english ? "4px" : "16px" }}>
                    {chinese}
                  </div>
                  {english && (
                    <div style={{ fontSize: "clamp(16px, 2.2vw, 32px)", fontWeight: 300, color: "rgba(221,213,240,0.7)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
                      {english}
                    </div>
                  )}
                </>
              );
            })()}
            {project.tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {project.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: "16.5px", color: "rgba(221,213,240,0.5)", letterSpacing: "0.08em" }}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── CONTENT SECTION ── row-per-pair: text left aligns with image right */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 3fr",
          alignItems: "start",
          rowGap: "64px",
          columnGap: "80px",
          padding: "80px 64px 120px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}>

          {/* Row 1: OVERVIEW text + card image (or first video if no image) */}
          {(() => {
            const noImage = !project.image;
            const firstSection = noImage ? project.mediaSections?.[0] : undefined;
            const restSections = noImage ? (project.mediaSections?.slice(1) ?? []) : (project.mediaSections ?? []);
            return (
              <>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.08em", color: "rgba(221,213,240,0.85)", marginBottom: "10px" }}>
                    简介 OVERVIEW
                  </p>
                  <div style={{ height: "1px", backgroundColor: "rgba(221,213,240,0.15)", marginBottom: "20px" }} />
                  <p style={{ fontSize: "14px", lineHeight: 2, letterSpacing: "0.05em", color: "rgba(221,213,240,0.65)", whiteSpace: "pre-line", textAlign: "justify" }}>
                    {project.description}
                  </p>
                  {project.descriptionImageBelow && (
                    <div style={{ width: "100%", overflow: "hidden", border: "1px solid rgba(180,150,220,0.12)", marginTop: "24px" }}>
                      <img src={project.descriptionImageBelow} alt="" style={{ display: "block", width: "100%", height: "auto" }} />
                    </div>
                  )}
                </div>
                <div>
                  {project.image && (
                    <div style={{ width: "100%", overflow: "hidden", border: "1px solid rgba(180,150,220,0.12)" }}>
                      <img src={project.image} alt={project.title} style={{ display: "block", width: "100%", height: "auto" }} />
                    </div>
                  )}
                  {firstSection && (firstSection.videoUrl || firstSection.videoThumbnail) && (
                    <VideoContainer section={firstSection} />
                  )}
                </div>

                {/* Remaining mediaSections */}
                {restSections.map((s, i) => (
                  <React.Fragment key={i}>
                    {s.sectionImage ? (
                      // Image-left layout: image in left col, text in right col
                      <>
                        <div>
                          <div style={{ width: "100%", overflow: "hidden", border: "1px solid rgba(180,150,220,0.12)" }}>
                            <img src={s.sectionImage} alt={s.title ?? ""} style={{ display: "block", width: "100%", height: "auto" }} />
                          </div>
                        </div>
                        <div>
                          {s.title && (
                            <>
                              <p style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.08em", color: "rgba(221,213,240,0.85)", marginBottom: "10px" }}>
                                {s.title}
                              </p>
                              <div style={{ height: "1px", backgroundColor: "rgba(221,213,240,0.15)", marginBottom: "16px" }} />
                            </>
                          )}
                          {s.description && (
                            <p style={{ fontSize: "14px", lineHeight: 2, letterSpacing: "0.05em", color: "rgba(221,213,240,0.65)", whiteSpace: "pre-line", textAlign: "justify" }}>
                              {s.description}
                            </p>
                          )}
                        </div>
                      </>
                    ) : s.sectionImageRight ? (
                      // Image-right layout: text in left col, image in right col
                      <>
                        <div>
                          {s.title && (
                            <>
                              <p style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.08em", color: "rgba(221,213,240,0.85)", marginBottom: "10px" }}>
                                {s.title}
                              </p>
                              <div style={{ height: "1px", backgroundColor: "rgba(221,213,240,0.15)", marginBottom: "16px" }} />
                            </>
                          )}
                          {s.description && (
                            <p style={{ fontSize: "14px", lineHeight: 2, letterSpacing: "0.05em", color: "rgba(221,213,240,0.65)", whiteSpace: "pre-line", textAlign: "justify" }}>
                              {s.description}
                            </p>
                          )}
                          {s.sectionImageBelow && (
                            <div style={{ width: "100%", overflow: "hidden", border: "1px solid rgba(180,150,220,0.12)", marginTop: "24px" }}>
                              <img src={s.sectionImageBelow} alt="" style={{ display: "block", width: "100%", height: "auto" }} />
                            </div>
                          )}
                        </div>
                        <div>
                          <div style={{ width: "100%", overflow: "hidden", border: "1px solid rgba(180,150,220,0.12)" }}>
                            <img src={s.sectionImageRight} alt={s.title ?? ""} style={{ display: "block", width: "100%", height: "auto" }} />
                          </div>
                        </div>
                      </>
                    ) : (
                      // Default layout: text in left col, video in right col
                      <>
                        <div>
                          {s.title && (
                            <>
                              <p style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.08em", color: "rgba(221,213,240,0.85)", marginBottom: "10px" }}>
                                {s.title}
                              </p>
                              <div style={{ height: "1px", backgroundColor: "rgba(221,213,240,0.15)", marginBottom: "16px" }} />
                            </>
                          )}
                          {s.description && (
                            <p style={{ fontSize: "14px", lineHeight: 2, letterSpacing: "0.05em", color: "rgba(221,213,240,0.65)", whiteSpace: "pre-line", textAlign: "justify" }}>
                              {s.description}
                            </p>
                          )}
                        </div>
                        <div>
                          {(s.videoUrl || s.videoThumbnail) && <VideoContainer section={s} />}
                        </div>
                      </>
                    )}
                  </React.Fragment>
                ))}
              </>
            );
          })()}
        </div>

      </div>
    </motion.div>
  );
}
