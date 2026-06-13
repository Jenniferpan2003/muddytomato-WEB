import { useState, useRef, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import cosmicTiesImg from "../imports/_____-2.png";
import cosmicTiesHeroImg from "../imports/_____20250111000456.png";
import cosmicTiesThumbImg from "../imports/______-1.png";
import woundedWorldImg from "../imports/llbimage1.JPG";
import woundedWorldCardImg from "../imports/_____-3.png";
import woundedWorldHeroImg from "../imports/1bd174cbcq1f8f8d417f5e063803cb06.JPG";
import part1Img from "../imports/part1.png";
import part2Img from "../imports/part2.png";
import brainSymphonyHeroImg from "../imports/12F6C1EAB97843559FA4525BDB474D14.png";
import brainSymphonyCardImg from "../imports/______-2.png";
import brainImage2 from "../imports/brainimage2.JPG";
import brainSymphonyImg from "../imports/______.png";
import brainSymphonyNewHeroImg from "../imports/_____2x.png";
import brainBCIImg from "../imports/_______.png";
import swzcImage1 from "../imports/swzcimage1.JPG";
import swzcImage2 from "../imports/swzcimage2.jpg";
import swzcImage3 from "../imports/swzcimage3.JPG";
import swzcHeroImg from "../imports/swzc_hero_image.png";
import qingImg from "../imports/____.png";
import qingImage1 from "../imports/qingimage1.jpg";
import qingImage2 from "../imports/qingimage2.png";
import qingHeroImg from "../imports/16.png";
import { GlobalFilter } from "./components/GlobalFilter";
import { CustomCursor } from "./components/CustomCursor";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { Navbar } from "./components/Navbar";
import { PortfolioSection } from "./components/PortfolioSection";
import { ResumeModal } from "./components/ResumeModal";
import { ProjectDetail } from "./components/ProjectDetail";

export interface MediaSection {
  title?: string;
  description?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  sectionImage?: string;
  sectionImageRight?: string;
  fullWidthImage?: string;
  sectionImageBelow?: string;
}

export interface Project {
  id: string;
  title: string;
  tags: string[];
  category: string;
  image?: string;
  cardImage?: string;
  heroImage?: string;
  descriptionImageBelow?: string;
  description?: string;
  mediaSections?: MediaSection[];
}

const PROJECTS: Project[] = [
  {
    id: "1",
    title: "宇宙纽带 Cosmic Ties",
    tags: ["#音乐可视化", "#UE5音频交互", "#三维动态艺术", "#VJ动画"],
    category: "交互装置",
    cardImage: cosmicTiesImg as unknown as string,
    heroImage: cosmicTiesHeroImg as unknown as string,
    description: "宇宙浩瀚，奥秘无垠，它是人类迄今尚未完全理解的最遥远却又最根本的领域。这种矛盾性令人着迷。现代科学揭示，微观与宏观世界虽常与日常经验脱节，却存在本质关联。本项目汇聚艺术、音乐、环境与宇宙多重维度，探索人类如何在这一宏大框架中自我定义。面对无垠太空，它试图重构人类与生态的宇宙关系。",
    mediaSections: [
      {
        videoThumbnail: cosmicTiesThumbImg as unknown as string,
        videoUrl: "http://xhslink.com/o/1NheNCwXNcW",
      },
    ],
  },
  {
    id: "2",
    title: "致受伤世界的童谣 Lullabies For a Wounded World",
    tags: ["#面部表情识别交互设计", "#实时视听表演", "#音乐可视化", "#艺术疗愈"],
    category: "交互装置",
    cardImage: woundedWorldCardImg as unknown as string,
    image: woundedWorldImg as unknown as string,
    heroImage: woundedWorldHeroImg as unknown as string,
    description: "该互动设计旨在引发人们对战争中最脆弱群体——儿童——所受影响的深刻反思，以多媒体艺术表演抚慰战火中的儿童，传递希望。",
    mediaSections: [
      {
        title: "PART 1：面部表情识别交互设计",
        description: "该部分交互式数字媒体艺术作品通过面部识别技术捕捉儿童的笑容，将一朵冰冷的金属玫瑰转化为绚烂绽放的粒子形态。借助这种视觉转化，使作品引发人们对战乱地区儿童生存困境的思考，邀请观者直面纯真与冲突之间的强烈反差。作品通过融合科技与艺术语言，旨在唤起深层反思，提升公众对战争给脆弱群体带来的情感与心理影响的认知。",
        videoUrl: "https://www.bilibili.com/video/BV1QcoyBSEAr/?spm_id_from=333.1387.homepage.video_card.click&vd_source=0b20335266b2ee5df7f70025eed2d258",
        videoThumbnail: part1Img as unknown as string,
      },
      {
        title: "PART 2：观众可参与的实时视听音乐表演",
        description: "童谣与音乐具有提供情感慰藉与心理疗愈的独特功效。对于冲突地区的儿童而言，这些熟悉的声音能够在混乱中重建安全感与常态感知。\n童谣特有的韵律结构与旋律单纯性可有效缓解焦虑情绪、降低应激反应，甚至能唤醒冲突前生活的积极记忆。",
        videoUrl: "https://www.bilibili.com/video/BV1gAoyBEEsV/?spm_id_from=333.1387.homepage.video_card.click",
        videoThumbnail: part2Img as unknown as string,
      },
    ],
  },
  {
    id: "3",
    title: "脑内交响曲",
    tags: ["#艺术化交互式科普", "#音乐可视化", "#裸眼3D", "#跨媒介交互"],
    category: "交互装置",
    cardImage: brainSymphonyCardImg as unknown as string,
    image: brainSymphonyHeroImg as unknown as string,
    heroImage: brainSymphonyNewHeroImg as unknown as string,
    description: "《脑内交响曲》是一个探索音乐与大脑关系的互动装置，旨在通过多感官体验揭示声音对大脑神经活动的影响。通过对比不同音乐的体验，观众不仅能感受音乐对大脑的独特影响，还能思考声音、大脑与记忆之间的深层联系，体会科学与艺术结合的力量与美感。",
    mediaSections: [
      {
        title: "设计目的 DESIGN PURPOSE",
        description: `《脑内交响曲》多感官艺术互动装置旨在以艺术化的方式向公众科普"莫扎特效应"的科学内涵和实际效应。本作品通过构建沉浸式的多感官体验环境，让观众能更深切的感受到音乐对大脑神经活动的强烈影响。装置采用随机播放不同风格钢琴曲的交互方式，配合TouchDesigner等软件制作的可视化脑部模拟影像，生动展现音乐刺激下前额叶区域被影响的过程以及α波的释放状态。这种艺术化的科学表达，不仅能够帮助观众理解音乐与大脑互动的复杂机制，更能引导他们思考音乐与认知之间的奇妙关联。作品突破传统科普的单向传播模式，通过视听结合的沉浸互动装置，让抽象的科学概念变得可感可知，在艺术审美中完成科学认知的传递，展现跨学科创作的独特魅力。`,
        sectionImage: brainImage2 as unknown as string,
      },
    ],
  },
  {
    id: "9",
    title: "思维之窗：如何与大脑对话？——脑机接口",
    tags: ["#艺术化交互式科普", "#跨媒介交互", "#动态影像", "#数字孪生大脑"],
    category: "交互装置",
    cardImage: swzcHeroImg as unknown as string,
    image: swzcImage2 as unknown as string,
    heroImage: swzcHeroImg as unknown as string,
    description: `《思维之窗》是一场关于生命科学与未来媒介的对话试验。通过 AE 动态图形的深入解构与 TD 粒子算法的视觉模拟，项目将脑机接口（BCI）这一深奥科技转化为可触达的跨媒介交互体验。在向公众科普脑机接口技术的同时，借由沉浸式感官反馈触发关于技术普惠、公平性与未来伦理的社会性思辨。`,
    mediaSections: [
      {
        title: "背景 BACKGROUND",
        description: `在现代社会，科技迅猛发展，脑机接口技术逐渐成为值得关注的科技焦点。然而，对于大多数人来说，脑机接口仍然是一项陌生而遥远的技术，这不仅影响了人们对于科技发展的理解，也制约了脑机接口技术的广泛应用。为了加深公众对脑机接口的了解，本项目应运而生，该项目运用脑机接口科普交互装置，用直观、易懂的方式向大众普及脑机接口的基本原理和应用。\n脑机接口技术的推广和使用可能会受到经济、文化等因素的影响。然而，在伦理问题的背后，是科技发展的势不可挡，该项目通过基础性的科普，唤起人们对于技术发展为社会带来的潜在影响的关注，促使人们思考如何确保脑机接口技术的公平和平等应用。`,
        sectionImageRight: swzcImage1 as unknown as string,
      },
    ],
  },
  {
    id: "4",
    title: "清Qing",
    tags: ["#角色设计", "#3D建模", "#武侠机器人"],
    category: "游戏设计",
    cardImage: qingImg as unknown as string,
    heroImage: qingHeroImg as unknown as string,
    descriptionImageBelow: qingImage2 as unknown as string,
    description: "「清」是一款以水为魂、武侠为韵、金属为骨的原创机甲。冷硬合金撑起利落轮廓，精密细节透着工业质感；线条藏着武侠兵刃的锋锐与侠客风骨，自带东方侠气；机身流动的蓝银水纹光效，揉进水的灵动与包容，刚柔并济，如行走于未来的武道行者。",
    mediaSections: [
      {
        videoThumbnail: qingImage1 as unknown as string,
        videoUrl: "https://www.bilibili.com/video/BV1Nro4BbE65/?spm_id_from=333.1387.homepage.video_card.click&vd_source=0b20335266b2ee5df7f70025eed2d258",
      },
    ],
  },
  {
    id: "5",
    title: "薇薇手记 Crape Diary",
    tags: ["#策略游戏", "#规则设计", "#原型开发"],
    category: "游戏设计",
  },
  {
    id: "6",
    title: "青春岛奇遇记",
    tags: ["#动态图形", "#品牌动画", "#视觉叙事", "#运动设计"],
    category: "动态视觉设计",
  },
  {
    id: "7",
    title: "纸牌之旅",
    tags: ["#生成艺术", "#算法视觉", "#色彩系统", "#数据可视化"],
    category: "动态视觉设计",
  },
  {
    id: "8",
    title: "娱红乌",
    tags: ["#空间设计", "#展览策划", "#体验设计"],
    category: "其他",
  },
];

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [navHiddenBySection, setNavHiddenBySection] = useState(true);

  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const check = () => {
      const el = portfolioRef.current;
      if (!el) return;
      setNavHiddenBySection(el.getBoundingClientRect().top > window.innerHeight * 0.5);
    };
    const t = setTimeout(check, 50);
    window.addEventListener("scroll", check, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", check);
    };
  }, []);

  const scrollSmooth = useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const navHidden = navHiddenBySection || !!activeProject;

  return (
    <div
      style={{
        fontFamily: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', sans-serif",
        fontWeight: 300,
        color: "#ddd5f0",
        backgroundColor: "#09060f",
        overscrollBehavior: "none",
      }}
    >
      <CustomCursor />
      <GlobalFilter />

      <Navbar
        onAbout={() => scrollSmooth(aboutRef)}
        onPortfolio={() => scrollSmooth(categoryRef)}
        onResume={() => setResumeOpen(true)}
        hidden={navHidden}
      />

      <div ref={heroRef}>
        <HeroSection onNext={() => scrollSmooth(aboutRef)} />
      </div>

      <div ref={aboutRef}>
        <AboutSection onNext={() => scrollSmooth(portfolioRef)} />
      </div>

      <div ref={portfolioRef}>
        <PortfolioSection
          categoryRef={categoryRef as React.RefObject<HTMLDivElement>}
          projects={PROJECTS}
          onProjectClick={setActiveProject}
        />
      </div>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

      <AnimatePresence>
        {activeProject && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 498,
              backgroundColor: "#09060f",
              pointerEvents: "none",
            }}
          />
        )}
        {activeProject && (
          <ProjectDetail
            key={activeProject.id}
            project={activeProject}
            onBack={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
