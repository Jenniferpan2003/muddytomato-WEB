import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { motion } from "motion/react";
import resumeBg from "../../imports/________.png";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FONT = "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif";

const S = {
  label: {
    fontSize: "11px",
    letterSpacing: "0.12em",
    color: "rgba(221,213,240,0.45)",
    marginBottom: "2px",
  } as React.CSSProperties,
  value: {
    fontSize: "13px",
    color: "rgba(221,213,240,0.85)",
    letterSpacing: "0.06em",
    lineHeight: 1.7,
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: "11px",
    letterSpacing: "0.18em",
    color: "rgba(221,213,240,0.4)",
    textTransform: "uppercase" as const,
    marginBottom: "14px",
    paddingBottom: "8px",
    borderBottom: "0.5px solid rgba(180,150,220,0.18)",
  } as React.CSSProperties,
  entryTitle: {
    fontSize: "13px",
    color: "#ddd5f0",
    letterSpacing: "0.08em",
    lineHeight: 1.5,
    marginBottom: "2px",
  } as React.CSSProperties,
  entryMeta: {
    fontSize: "11px",
    color: "rgba(221,213,240,0.45)",
    letterSpacing: "0.06em",
    marginBottom: "6px",
  } as React.CSSProperties,
  entryDesc: {
    fontSize: "12px",
    color: "rgba(221,213,240,0.65)",
    letterSpacing: "0.05em",
    lineHeight: 1.8,
  } as React.CSSProperties,
};

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <motion.div
      initial={false}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ duration: 1, ease: [0.32, 0, 0.18, 1] }}
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        2000,
        overflow:      "hidden",
        pointerEvents: isOpen ? "auto" : "none",
        color:         "#ddd5f0",
        fontFamily:    FONT,
        fontWeight:    300,
      }}
    >
      {/* Fixed background image */}
      <img
        src={resumeBg as unknown as string}
        alt=""
        style={{
          position:       "absolute",
          inset:          0,
          width:          "100%",
          height:         "100%",
          objectFit:      "cover",
          objectPosition: "center top",
          maxWidth:       "1920px",
          left:           "50%",
          transform:      "translateX(-50%)",
          pointerEvents:  "none",
        }}
      />

      {/* Scrollable layer */}
      <div style={{ position: "absolute", inset: 0, overflowY: "auto", overflowX: "hidden" }}>

        {/* Sticky nav bar */}
        <div
          style={{
            position:        "sticky",
            top:             0,
            zIndex:          10,
            height:          "52px",
            backgroundColor: "#09060f",
            borderBottom:    "1px solid rgba(180,140,220,0.65)",
            display:         "flex",
            alignItems:      "center",
            padding:         "0 48px",
          }}
        >
          <button
            data-cursor="hover"
            onClick={onClose}
            style={{
              background:    "none",
              border:        "none",
              cursor:        "none",
              color:         "#ddd5f0",
              display:       "flex",
              alignItems:    "center",
              gap:           "8px",
              opacity:       0.7,
              transition:    "opacity 0.2s ease",
              fontFamily:    FONT,
              fontWeight:    300,
              fontSize:      "13px",
              letterSpacing: "0.08em",
              padding:       0,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.7"; }}
          >
            <ArrowLeft size={16} strokeWidth={1} />
            关闭简历
          </button>
        </div>

        {/* Content */}
        <div style={{ maxWidth: "820px", margin: "0 auto", padding: "52px 40px 80px", textAlign: "left" }}>

          {/* Header */}
          <div style={{ marginBottom: "36px" }}>
            <h1 style={{ fontSize: "26px", color: "#ddd5f0", letterSpacing: "0.14em", marginBottom: "16px", fontWeight: 300 }}>
              潘嘉霓
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 32px" }}>
              {[
                ["电话", "13873666150"],
                ["邮箱", "muddytomato@163.com"],
                ["小红书", "番茄泥巴"],
                ["性别", "女"],
                ["生日", "2003.06.03"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div style={S.label}>{k}</div>
                  <div style={S.value}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <Hr />
          <Section title="教育经历">
            <Entry title="四川美术学院" meta="数字媒体艺术 | 艺术学学士　2021.9 – 2025.6" />
            <Entry title="香港理工大学" meta="创新多媒体娱乐 IME | 理学硕士　2025.9 – 至今" />
          </Section>

          <Hr />
          <Section title="实习经历">
            <Entry title="助理编辑 | 湖南省常德市广播电视台" meta="2024.11 – 2025.2"
              desc="统筹短视频制作排期与交付，跟进素材、剪辑、上线全流程；建立素材资产归档规范，独立完成短视频制作。" />
            <Entry title="网络系统运营 | 联合施工图审查有限公司" meta="2024.11 – 2025.2"
              desc="负责项目进度管控与跨部门协作，跟进全流程节点并建立周报机制；梳理流程卡点并优化链路，提升项目交付效率。" />
          </Section>

          <Hr />
          <Section title="在校经历">
            <Entry title="团支书" meta="2021.9 – 2023.6" />
            <Entry title="学生会主席" meta="2023.9 – 2024.6" />
          </Section>

          <Hr />
          <Section title="项目经历">
            <Entry title="香港国际授权展 2026 | 游戏项目《PooTective》" meta="2026.04.27"
              desc="参与 3D 剧情推理游戏联合开发，负责场景美术制作、美术资产统筹，统一美术风格；梳理角色、场景等美术素材，统一输出标准，配合展会要求跟进内容调整，保障项目顺利完成。" />
            <Entry title="京港文化交流项目" meta="2026.4 – 6"
              desc="参与两地高校联合创作项目，对接多方创作需求，统筹视觉类内容制作；跟进全流程进度，协调团队分工，规范产出内容，最终完成数字化文化作品并落地展示。" />
            <Entry title="Global Game Jam 2026 香港 | 游戏项目《Pretended Collector》" meta="2026.01.30 – 02.01"
              desc="48 小时限时开发关卡轻解谜 2D 游戏。负责场景美术、美术宣传、各类美术素材的制作与验收。" />
            <Entry title="青芽 GameJam | 游戏项目《生于忧患，X鱼安乐》" meta="2025.12 – 2026.01"
              desc="一个月独立开发游戏项目。负责角色美术、角色绑定与动画、美术宣传、美术资源管控，统一美术风格，跟进美术内容制作全流程。" />
          </Section>

          <Hr />
          <Section title="获奖经历">
            {[
              ["2026.04", "作品入选香港国际授权展"],
              ["2025.06", "作品入选四川美术学院优秀本科生毕业展"],
              ["2024.10", "获 2023–2024 学年校级三等奖学金"],
              ["2024.06", "香港当代设计奖 金奖"],
              ["2023.11", "川渝公益广告大赛 铜奖"],
              ["2023.02", "2023 伦敦中华艺术交流展 铜奖"],
              ["2022",    "获 2021–2022 学年校级三等奖学金"],
              ["2022.03", "作品入选四川美术学院优秀学生作品年展"],
            ].map(([date, award]) => (
              <div key={award} style={{ display: "flex", gap: "24px", marginBottom: "8px" }}>
                <span style={{ ...S.entryMeta, flexShrink: 0, minWidth: "56px" }}>{date}</span>
                <span style={S.entryDesc}>{award}</span>
              </div>
            ))}
          </Section>

          <Hr />
          <Section title="专业技能及语言">
            {[
              ["办公 / 管理", "Excel, WPS"],
              ["设计", "Canva, Adobe Illustrator, Adobe After Effects, Photoshop, Procreate, Figma, 剪映"],
              ["3D", "Blender, ZBrush, Maya, C4D"],
              ["编程与引擎", "Unreal Engine, Unity, TouchDesigner, Arduino IDE, VS Code"],
              ["语言", "雅思 6.0，普通话二甲"],
            ].map(([cat, val]) => (
              <div key={cat} style={{ marginBottom: "10px" }}>
                <div style={S.label}>{cat}</div>
                <div style={S.value}>{val}</div>
              </div>
            ))}
          </Section>

          <Hr />
          <Section title="个人优势">
            <p style={{ ...S.entryDesc, maxWidth: "620px" }}>
              本人热情开朗，沟通表达与统筹协调能力良好，工作积极主动，注重效率，具备优秀的团队协作意识与进取心。掌握平面设计、动态影像、视频剪辑及 3D 创作技能，可独立完成活动素材、短视频花絮等内容制作；熟悉游戏圈层文化，熟悉项目落地流程，擅长资料整理、数据汇总与线上内容归档，能高效配合完成线下活动执行与线上内容传播工作。
            </p>
          </Section>

        </div>
      </div>
    </motion.div>
  );
}

function Hr() {
  return <div style={{ borderTop: "0.5px solid rgba(180,150,220,0.10)", margin: "0 0 32px" }} />;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <div style={S.sectionTitle}>{title}</div>
      {children}
    </div>
  );
}

function Entry({ title, meta, desc }: { title: string; meta?: string; desc?: string }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={S.entryTitle}>{title}</div>
      {meta && <div style={S.entryMeta}>{meta}</div>}
      {desc && <p style={S.entryDesc}>{desc}</p>}
    </div>
  );
}
