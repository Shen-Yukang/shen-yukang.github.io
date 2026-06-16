import type { Publication, ResearchProject } from "./typing";

const researchProjects: ResearchProject[] = [
  {
    title: "Brain-Inspired Dynamic Memory System for Embodied AI",
    rp_id: "1112360",
    tags: [
      {
        text: "Brain-Inspired Dynamic Memory",
        color: "#DDF3E9",
        fontColor: "#174B38",
      },
      {
        text: "VLA / TAMP Augmentation",
        color: "#E7F0FF",
        fontColor: "#1D4678",
      },
      {
        text: "In Development · 90%",
        color: "#16A34A",
        fontColor: "white",
      },
    ],
    time: "2026 Spring - Present",
    description:
      "A brain-inspired dynamic memory system for embodied AI, designed with security and safety as first-class goals for more adaptive and reliable downstream robot decisions.",
    bullets: [
      "Explores brain-inspired dynamic memory for more adaptive and reliable embodied decisions.",
      "Builds in security and safety as first-class design goals.",
      "Currently around 90% implemented and under active development.",
    ],
    locked: true,
  },

  {
    title: "Safety Benchmark for Embodied AI",
    tags: [
      {
        text: "Vision–Language–Action Models",
      },
    ],
    rp_id: "1112358",
    url: "",
    time: "",
    description:
      "Building a safety benchmark and safety-aware evaluation pipelines for embodied AI agents operating in medical and assistive scenarios.",
    bullets: [
      "Investigates how synthetic data and uncertainty signals can guide safer policy behaviors.",
      "Connects perception quality to task-level safety constraints in injection and AR-assist settings.",
      "Explores cross-disciplinary, physics-informed spatial perception to achieve higher geometric precision and interpretable structure understanding.",
    ],
  },
  {
    title: "A Real-Calibrated Synthetic-First Data Engine",
    rp_id: "1112356",
    tags: [
      {
        text: "Deltoid Injection Perception",
        color: "",
      },
      {
        text: "Synthetic Data Engine",
        color: "",
      },
      {
        text: "HITL",
        color: "",
      },
      {
        text: "Second Place · KSU C-Day 2025 Fall",
        color: "#f5a142",
        fontColor: "white",
      },
    ],
    routeUrl: "/rp/synthetic_data_engine",
    time: "",
    description:
      "Designing a synthetic-first data engine and perception pipeline for deltoid intramuscular injection, combining controlled T2I generation, CLIP-based filters, and segmentation models for safe-zone guidance.",
    bullets: [
      "Builds a scalable data engine integrating active learning and diffusion-based generation for dataset expansion.",
      "Evaluates synthetic → real transfer on deltoid-injection segmentation tasks.",
      "Studies reliability metrics (AP shift, JS divergence, task success rate) for cross-domain generalization.",
    ],
    media: {
      type: "video",
      sourceKey: "perception_demo",
      alt: "Synthetic-first data engine perception demo",
    },
  },
];

const publications: Publication[] = [
  {
    year: "2026",
    title: "A Real-Calibrated Synthetic-First Data Engine",
    authors: "Yukang Shen",
    venue: "Preprint.",
    url: "https://arxiv.org/pdf/2605.09699",
    media: {
      type: "image",
      sourceKey: "overall_architecture_v2",
      alt: "Deltoid injection perception pipeline",
    },
  },
  {
    year: "2022",
    title:
      "6G-enabled Edge AI for Metaverse: Challenges, Methods, and Future Research Directions",
    authors:
      "Luyi Chang, Zhe Zhang, Pei Li, Shan Xi, Wei Guo, Yukang Shen, Zehui Xiong, Jiawen Kang, Dusit Niyato, Xiuquan Qiao, Yi Wu",
    venue: "Journal of Communications and Information Networks.",
    url: "https://arxiv.org/abs/2204.06192",
    media: {
      type: "image",
      sourceKey: "paper1",
      alt: "JCIN journal cover",
    },
  },
];

export { publications, researchProjects };
