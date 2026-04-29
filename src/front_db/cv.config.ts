import type { Publication, ResearchProject } from "./typing";

const researchProjects: ResearchProject[] = [
  {
    title: "MES: Memory Substrate for Embodied AI",
    rp_id: "1112360",
    tags: [
      {
        text: "Embodied Memory",
        color: "#DDF3E9",
        fontColor: "#174B38",
      },
      {
        text: "VLA / TAMP Augmentation",
        color: "#E7F0FF",
        fontColor: "#1D4678",
      },
      {
        text: "C-Day Demo Focus",
        color: "#B45309",
        fontColor: "white",
      },
    ],
    routeUrl: "/rp/memory_substrate",
    time: "2026 Spring - Ongoing",
    description:
      "Building an external memory substrate that stores task-relevant embodied experience as retrievable, evidence-backed memories for safer and more adaptive downstream robot decisions.",
    bullets: [
      "Projects upstream robot traces into task-conditioned object graph transitions instead of dumping raw logs.",
      "Controls memory with explicit write, merge, stub, and forget decisions under a risk-coverage constraint.",
      "Retrieves risk warnings, action priors, and repair strategies that can condition VLA or planner decisions before retraining.",
    ],
    media: {
      type: "image",
      sourceKey: "mes_stage_a_runtime",
      alt: "MES Stage A runtime architecture",
    },
  },
  {
    title: "Synthetic-First Data Engine for Medical Segmentation",
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
        text: "KSU C-day finalist research - 2025Fall",
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
      type: "image",
      sourceKey: "overall_architecture_v2",
      alt: "Deltoid injection perception pipeline",
    },
  },
  {
    title: "VLA Safety for Embodied AI",
    tags: [
      {
        text: "Vision–Language–Action Models",
      },
    ],
    rp_id: "1112358",
    url: "",
    time: "",
    description:
      "Exploring safety-aware perception and data-centric pipelines for embodied AI agents operating in medical and assistive scenarios.",
    bullets: [
      "Investigates how synthetic data and uncertainty signals can guide safer policy behaviors.",
      "Connects perception quality to task-level safety constraints in injection and AR-assist settings.",
      "Connects perception quality to task-level safety constraints in injection and AR-assist settings.",
      "Explores cross-disciplinary, physics-informed spatial perception to achieve higher geometric precision and interpretable structure understanding.",
    ],
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
    url: "https://arxiv.org/abs/2204.06192",
    media: {
      type: "image",
      sourceKey: "paper1",
      alt: "JCIN journal cover",
    },
  },
];

export { publications, researchProjects };
