import { useRef } from "react";

interface NavbarProps {
  onAbout: () => void;
  onPortfolio: () => void;
  onResume: () => void;
  hidden?: boolean;
}

const FONT = "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif";

export function Navbar({ onAbout, onPortfolio, onResume, hidden = false }: NavbarProps) {
  const handlers = {
    about:     onAbout,
    portfolio: onPortfolio,
    resume:    onResume,
  } as const;

  return (
    <div
      style={{
        position:       "fixed",
        top:            "16px",
        left:           0,
        right:          0,
        zIndex:         1000,
        display:        "flex",
        justifyContent: "center",
        pointerEvents:  "none",
        transform:      hidden ? "translateY(-70px)" : "translateY(0)",
        opacity:        hidden ? 0 : 1,
        transition:     "transform 0.5s cubic-bezier(0.32,0,0.18,1), opacity 0.5s cubic-bezier(0.32,0,0.18,1)",
      }}
    >
      <nav
        style={{
          width:                "60vw",
          height:               "46px",
          pointerEvents:        "auto",  /* re-enable clicks on the nav itself */
          display:              "flex",
          alignItems:           "center",
          justifyContent:       "center",   /* 居中 */
          gap:                  "40px",
          padding:              "0 28px",
          borderRadius:         "6px",
          backgroundColor:      "#07050d",
          border:               "1px solid rgba(221, 213, 240, 0.18)",
          boxShadow:            "0 1px 0 rgba(255,255,255,0.03), 0 12px 40px rgba(0,0,0,0.4)",
        }}
      >
        {(
          [
            { label: "个人介绍", key: "about"     },
            { label: "作品集",   key: "portfolio" },
            { label: "简历",     key: "resume"    },
          ] as const
        ).map(({ label, key }) => (
          <NavLink key={key} label={label} onClick={handlers[key]} />
        ))}
      </nav>
    </div>
  );
}

function NavLink({ label, onClick }: { label: string; onClick: () => void }) {
  const lineRef = useRef<HTMLSpanElement>(null);

  return (
    <button
      data-cursor="hover"
      onClick={onClick}
      style={{
        position:      "relative",
        background:    "none",
        border:        "none",
        cursor:        "none",
        padding:       "3px 0",
        fontFamily:    FONT,
        fontWeight:    300,
        fontSize:      "12px",
        letterSpacing: "0.14em",
        color:         "rgba(221, 213, 240, 0.72)",
        lineHeight:    1,
        transition:    "color 0.3s ease, letter-spacing 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "#ddd5f0";
        (e.currentTarget as HTMLButtonElement).style.letterSpacing = "0.18em";
        if (lineRef.current) lineRef.current.style.transform = "scaleX(1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "rgba(221, 213, 240, 0.72)";
        (e.currentTarget as HTMLButtonElement).style.letterSpacing = "0.14em";
        if (lineRef.current) lineRef.current.style.transform = "scaleX(0)";
      }}
    >
      {label}
      <span
        ref={lineRef}
        style={{
          position:        "absolute",
          bottom:          "-1px",
          left:            0,
          right:           0,
          height:          "0.5px",
          backgroundColor: "rgba(221, 213, 240, 0.55)",
          transform:       "scaleX(0)",
          transformOrigin: "left center",
          transition:      "transform 0.35s cubic-bezier(0.25, 0, 0, 1)",
        }}
      />
    </button>
  );
}
