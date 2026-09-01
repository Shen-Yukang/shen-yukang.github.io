import type { Publication, ResearchProject } from "./typing";

const researchProjects: ResearchProject[] = [
  {
    title: "Similarity Is Not Identity: Evidence-Gated Writes for Embodied Memory",
    rp_id: "1112360",
    tags: [
      {
        text: "Embodied Memory",
        color: "#DDF3E9",
        fontColor: "#174B38",
      },
      {
        text: "Evidence-Gated Writes",
        color: "#E7F0FF",
        fontColor: "#1D4678",
      },
      {
        text: "In Progress",
        color: "#16A34A",
        fontColor: "white",
      },
    ],
    time: "2026 - Present",
    description:
      "Can continuity-gated writes reduce wrong-object updates among visually similar objects?",
    bullets: [
      "Modeled object identity tracking as a memory write-verification problem to reduce false updates among visually similar objects.",
      "Developed a multi-stage filtering pipeline combining geometric constraints and visual feature similarity, enforcing strict continuity checks (e.g., uninterrupted tracking) before updating object records.",
    ],
    locked: true,
  },
  {
    title: "A Real-Calibrated Synthetic-First Data Engine",
    rp_id: "1112356",
    tags: [
      {
        text: "Independent Research",
      },
      {
        text: "Sole-Author Preprint",
      },
      {
        text: "YOLOv11-Pose",
      },
    ],
    routeUrl: "/rp/synthetic_data_engine",
    time: "2025 - 2026",
    description:
      "Can synthetic data carry a vision model where labeled real data are scarce? Side-view, shoulder-exposed images are rare, creating a long-tail gap for deltoid-region segmentation.",
    bullets: [
      "Developed a Python-based synthetic data engine combining diffusion-based image generation, SAM-based semantic filtering, and automated dataset packaging.",
      "Evaluated YOLOv11-pose across 5 training configurations on a 280-image real test set, improving pose mAP@0.5:0.95 from 0.389 to 0.411 (+5.7% relative) with hybrid training.",
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
    year: "2022",
    title:
      "6G-enabled Edge AI for Metaverse: Challenges, Methods, and Future Research Directions",
    authors:
      "Luyi Chang, Zhe Zhang, Pei Li, Shan Xi, Wei Guo, Yukang Shen, Zehui Xiong, Jiawen Kang, Dusit Niyato, Xiuquan Qiao, Yi Wu",
    venue: "Journal of Communications and Information Networks.",
    url: "https://ieeexplore.ieee.org/document/9815195",
    media: {
      type: "image",
      sourceKey: "paper1",
      alt: "JCIN journal cover",
    },
  },
  {
    year: "2026",
    title: "A Real-Calibrated Synthetic-First Data Engine",
    authors: "Yukang Shen (sole author)",
    venue: "Preprint, arXiv:2605.09699.",
    url: "https://arxiv.org/abs/2605.09699",
    media: {
      type: "image",
      sourceKey: "overall_architecture_v2",
      alt: "Deltoid injection perception pipeline",
    },
  },
  {
    year: "",
    title:
      "Job Entry Guiding Method and Device, Electronic Equipment, Storage Medium and Program Product",
    authors: "",
    venue: "Patent No. CN114581057.",
    url: "https://patentscope.wipo.int/search/en/detail.jsf?docId=CN365365552",
  },
];

export { publications, researchProjects };
