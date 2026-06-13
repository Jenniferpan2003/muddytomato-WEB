import { ChevronDown } from "lucide-react";

interface ChevronArrowProps {
  onClick: () => void;
}

export function ChevronArrow({ onClick }: ChevronArrowProps) {
  return (
    <div
      data-cursor="hover"
      style={{
        position: "absolute",
        bottom: "48px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "none",
        animation: "chevron-float 2s ease-in-out infinite",
        zIndex: 10,
        opacity: 0.65,
        transition: "opacity 0.3s ease",
        userSelect: "none",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.opacity = "0.7";
      }}
    >
      <ChevronDown
        size={28}
        style={{ color: "#ddd5f0", strokeWidth: 1 }}
      />
    </div>
  );
}
