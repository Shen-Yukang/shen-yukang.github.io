import type { ResearchProjectDetail } from "./typing";

const medicalAIProject: ResearchProjectDetail = {
  id: "1112356",
  title: "A Real-Calibrated Synthetic-First Data Engine",
  subtitle:
    "Independent, sole-author research on whether synthetic data can support vision models when labeled real data are scarce, using deltoid-region perception as a long-tail test case.",
  headerLabel: "Independent Research · 2025-2026",

  summary: {
    problem:
      "Side-view, shoulder-exposed images are rare, creating a long-tail data gap for deltoid-region perception.",
    theme:
      "The Python-based data engine combines diffusion-based image generation, SAM-based semantic filtering, and automated dataset packaging.",
    result:
      "Across **5 training configurations** and a **280-image real test set**, hybrid training improved YOLOv11-pose mAP@0.5:0.95 from **0.389 to 0.411 (+5.7% relative)**.",
  },

  background: {
    sectionTitle: "Background & Data Context",
    challengesTitle: "Key Questions",
    mediaTitle: "Long-Tail Data Gap",
    intro:
      "This work uses deltoid-region perception to study a broader data problem: whether synthetic data can carry a vision model when labeled real examples are scarce. Side-view, shoulder-exposed images form a particularly difficult long-tail case.",
    challenges: [
      {
        question:
          "Q1 · Can synthetic data carry a vision model where labeled real data are scarce?",
        answer:
          "The project treats rare side-view, shoulder-exposed images as a concrete long-tail test case for deltoid-region perception.",
      },
      {
        question:
          "Q2 · How can generated samples be filtered and packaged for repeatable training?",
        answer:
          "A Python pipeline combines diffusion-based generation, SAM-based semantic filtering, and automated dataset packaging.",
      },
      {
        question:
          "Q3 · Does hybrid synthetic-real training improve performance on real images?",
        answer:
          "On a 280-image real test set, hybrid training raised YOLOv11-pose mAP@0.5:0.95 from 0.389 to 0.411, a 5.7% relative improvement.",
      },
    ],
    images: [
      {
        sourceKey: "bg_data_collection_issue1",
        alt: "Long-tail data scarcity for deltoid-region perception",
        caption:
          "Rare side-view, shoulder-exposed examples motivate the synthetic-first approach.",
      },
      {
        sourceKey: "bg_data_collection_issue2",
        alt: "Visual variation in deltoid-region images",
        caption:
          "Synthetic generation expands the range of visual conditions represented during training.",
      },
      {
        sourceKey: "bg_data_labeling_issue",
        alt: "Semantic quality filtering for synthetic samples",
        caption:
          "SAM-based semantic filtering screens generated samples before dataset packaging.",
      },
    ],
  },

  contributions: [
    "A Python-based synthetic data engine integrating diffusion generation, SAM semantic filtering, and automated dataset packaging.",
    "A controlled comparison of 5 training configurations evaluated on a 280-image real test set.",
    "Evidence that hybrid training improved YOLOv11-pose mAP@0.5:0.95 from 0.389 to 0.411 (+5.7% relative).",
  ],

  methods: {
    sectionTitle: "Method Design & Data Engine",
    description:
      "The workflow connects synthetic data generation, semantic quality control, dataset packaging, and real-image evaluation:",
    steps: [
      "Frame the long-tail problem around scarce side-view, shoulder-exposed deltoid images.",
      "Generate additional training images with a diffusion-based image-generation pipeline.",
      "Apply SAM-based semantic filtering to screen generated samples.",
      "Package accepted samples automatically into training-ready datasets.",
      "Evaluate YOLOv11-pose across 5 training configurations on a 280-image real test set.",
    ],
    images: [
      {
        sourceKey: "overall_architecture_v2",
        alt: "Synthetic-first data engine workflow",
        caption: "The end-to-end synthetic data engine and evaluation workflow.",
      },
    ],
  },

  results: {
    sectionTitle: "Evaluation & Key Results",
    description:
      "Hybrid training improved real-test pose mAP@0.5:0.95 from 0.389 to 0.411, a 5.7% relative gain.",
    figures: [
      {
        sourceKey: "result1",
        alt: "Performance across synthetic-data training configurations",
        caption:
          "Comparison across synthetic-data training configurations.",
      },
      {
        sourceKey: "result3",
        alt: "Evaluation on the 280-image real test set",
        caption: "Evaluation on the 280-image real test set.",
      },
      {
        sourceKey: "result2",
        alt: "Performance effect of hybrid synthetic-real training",
        caption:
          "Hybrid training raised pose mAP@0.5:0.95 from 0.389 to 0.411 (+5.7% relative).",
      },
      {
        sourceKey: "perception_demo",
        type: "video",
        alt: "Deltoid-region perception demonstration",
        caption: "Visual demonstration of the deltoid-region perception task.",
      },
      {
        sourceKey: "Integration_VLAs",
        type: "video",
        alt: "Synthetic data engine integrated into a robotic arm workflow",
        caption:
          "Robotic integration demonstration of the perception stack in a VLA workflow.",
      },
    ],
  },

  resources: {
    sectionTitle: "Resources & Contact",
    links: [
      {
        label: "GitHub Code",
        href: "https://github.com/Yan-s-Lab/Data-Engine",
      },
      {
        label: "C-Day Event Poster",
        pdfSourceKey: "Poster-GRM-1245",
      },
    ],
  },

  contact: {
    email: "shenyukang99@gmail.com",
  },
};

const projectDetailsById: Record<string, ResearchProjectDetail> = {
  [medicalAIProject.id]: medicalAIProject,
};

export { medicalAIProject, projectDetailsById };
