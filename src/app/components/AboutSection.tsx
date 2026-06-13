import { ChevronArrow } from "./ChevronArrow";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import aboutImg from "../../imports/17_1_2x.png";

interface AboutSectionProps {
  onNext: () => void;
}

export function AboutSection({ onNext }: AboutSectionProps) {
  return (
    <section
      id="about-section"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        marginTop: "-80px",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0px, black 80px, black calc(100% - 20px), transparent 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0px, black 80px, black calc(100% - 20px), transparent 100%)",
      }}
    >
      <ImageWithFallback
        src={aboutImg}
        alt="Personal introduction"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
        }}
      />

      <ChevronArrow onClick={onNext} />
    </section>
  );
}
