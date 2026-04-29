import type { ResearchProjectDetail } from "./typing";

const medicalAIProject: ResearchProjectDetail = {
  id: "1112356",
  title: "Synthetic-First Perception and Data Engine for Medical AI",
  subtitle:
    "Oriented research on high-precision spatial perception and data-centric pipelines for deltoid injection assistance and embodied medical intelligence.",
  headerLabel: "Research Project",

  summary: {
    problem:
      "Real deltoid-injection data are scarce, biased, and expensive to label, so current perception models struggle to generalize in clinics.",
    theme:
      "We build a synthetic-first data engine that mass-produces and filters anatomically valid deltoid scenes, plus an anthropometric model for safe intramuscular injection zones.",
    result:
      "Synthetic-only models reach **≥90% real-data AP** with **MAPE ≤ 8%** and **dist% ≤ 10%**. Mixed synthetic–real training improves performance further while keeping safety zones consistent and interpretable.",
  },

  background: {
    sectionTitle: "Background & Clinical Context",
    challengesTitle: "Key Questions",
    mediaTitle: "Data Collection & Labeling Gap",
    intro:
      "Deltoid intramuscular injection is a routine yet safety-critical clinical procedure. In busy clinics, inaccurate landmarking and cognitive overload can lead to misplaced injections and potential nerve damage. At the same time, privacy constraints and limited labeled data make it difficult to train robust vision models for this task.",
    challenges: [
      {
        question:
          "Q1 · Can a scalable Synthetic Data Engine accelerate training for rare, privacy-restricted medical perception tasks? ",
        answer:
          "The deltoid region, arm posture, anatomical landmarks, and safe-zone boundaries in RGB or AR views.",
      },
      {
        question:
          "Q2 · Can purely synthetic images achieve segmentation performance comparable to real-image training?",
        answer:
          "Injection images are constrained by medical privacy rules, uneven lighting, limited population coverage, and expensive expert annotation.",
      },
      {
        question:
          "Q3 · How can we provide explainable, anatomically grounded guidance for safe intramuscular injection based on perception outputs?",
        answer:
          "Generic segmentation models lack domain-specific priors and provide no interpretable concept of safe injection zones or safety margins.",
      },
    ],
    images: [
      {
        sourceKey: "bg_data_collection_issue1",
        alt: "Clinical data collection limitations",
        caption:
          "Limited real injection data due to privacy and clinical workflow constraints.",
      },
      {
        sourceKey: "bg_data_collection_issue2",
        alt: "Lighting and pose variation",
        caption:
          "Inconsistent lighting, arm posture, and occlusions affect data quality.",
      },
      {
        sourceKey: "bg_data_labeling_issue",
        alt: "Annotation burden",
        caption:
          "Expert labeling is costly and difficult to scale for medical datasets.",
      },
    ],
  },

  contributions: [
    "A modular, scalable Synthetic Data Engine for rare medical perception tasks.",
    "An anthropometry-based, explainable geometric framework for safe injection-zone estimation.",
    "Dataset quality evaluation and a curated deltoid-segmentation dataset for downstream training and benchmarking.",
  ],

  methods: {
    sectionTitle: "Method Design & Data Engine",
    description:
      "The system is organized as a high-efficiency data engine plus a safety-aware perception module:",
    steps: [
      "Cold-start: define the task, collect a small seed set of real images, and filter out low-quality examples.",
      "Controlled T2I synthesis: generate deltoid scenes with controlled pose, BMI, clothing, and lighting conditions.",
      "Quality filtering: use CLIP-based scores and geometric sanity checks to discard anatomically implausible images.",
      "Iterative segmentation training: train a YOLO-based segmentation model, periodically mixing in the limited real labels.",
      "Safe-zone inference and AR overlay: estimate the arm axis, project anthropometric safety bands, and overlay guidance in real time.",
    ],
    images: [
      {
        sourceKey: "overall_architecture_v2",
        alt: "Clinical data collection limitations",
        caption:
          "Limited real injection data due to privacy and clinical workflow constraints.",
      },
    ],
  },

  results: {
    sectionTitle: "Evaluation & Key Results",
    description:
      "We summarize core quantitative results and synthetic→real generalization.",
    figures: [
      {
        sourceKey: "result1",
        alt: "Performance across synthetic-only datasets",
        caption:
          "Performance across synthetic-only datasets of varying sizes (50–345).",
      },
      {
        sourceKey: "result3",
        alt: "Gap between real-test and synthetic-test evaluation",
        caption: "Gap between real-test and synthetic-test evaluation.",
      },
      {
        sourceKey: "result2",
        alt: "Performance effect of mixed synthetic-real training.",
        caption: "Performance effect of mixed synthetic-real training.",
      },
      {
        sourceKey: "perception_demo",
        type: "video",
        alt: "Performance across synthetic-only datasets",
        caption:
          "This is a visual demonstration of visual perception alone(With interpretability auxiliary lines).",
      },
      {
        sourceKey: "Integration_VLAs",
        type: "video",
        alt: "Integration into a robotic arm pipeline",
        caption:
          "We have integrated the perception stack into a robotic arm VLA workflow.",
      },
    ],
  },

  resources: {
    sectionTitle: "Resources & Contact",
    links: [
      {
        label: "GitHub Code",
        href: "https://github.com/Shen-Yukang/AxiomAgent",
      },
      {
        label: "C-Day Event Poster",
        pdfSourceKey: "Poster-GRM-1245",
      },
    ],
  },

  contact: {
    email: "yshen4@students.kennesaw.edu",
  },
};

const mesProject: ResearchProjectDetail = {
  id: "1112360",
  title: "MES: Memory Substrate for Embodied Decision-Making",
  subtitle:
    "A Stage A engineering prototype that turns embodied experience into evidence-backed, retrievable memory for safer and more adaptive robot decisions.",
  headerLabel: "C-Day Demo Project",

  summary: {
    problem:
      "Today's VLA and planner stacks are strong at perception and execution, but they still **forget past failures, risky relations, and repair strategies** unless we retrain or hand-script them.",
    theme:
      "MES builds an external **memory substrate**: adapt upstream traces into task-conditioned object-graph transitions, consolidate repeated interaction patterns into `MemoryIR`, and retrieve them as risk constraints, action priors, and repair hints.",
    result:
      "Stage A is already implemented and validated on synthetic and TiPToP-linked runs: **memory write / merge / risk-preserving forgetting / retrieval / scoring** all pass, and conditioned retrieval has already shifted downstream target selection in robot-facing experiments.",
  },

  background: {
    sectionTitle: "Why This Project Exists",
    challengesTitle: "Core Research Questions",
    mediaTitle: "What MES Must Solve",
    intro:
      "MES is not another monolithic robot model. It is a narrower and more practical layer: store the task-relevant spatial-temporal experience that robots accumulate, keep it evidence-backed, compress it into reusable abstractions, and surface it at decision time without taking over execution from the downstream controller.",
    challenges: [
      {
        question: "Q1 · What should a robot actually remember?",
        answer:
          "Not raw pixels forever. MES stores task-conditioned object relations, transition patterns, failure boundaries, and repair cues only when they can change a future decision.",
      },
      {
        question: "Q2 · How do we keep memory useful instead of noisy?",
        answer:
          "Stage A adds lifecycle control: write, merge, stub, and forget are all explicit decisions under a storage budget and a risk-coverage constraint.",
      },
      {
        question: "Q3 · How can memory help before model retraining?",
        answer:
          "Retrieved memories are converted into prompt constraints, action priors, safety gates, and later token-side integration paths for VLA systems.",
      },
    ],
    images: [
      {
        sourceKey: "mes_stage_a_runtime",
        alt: "MES Stage A runtime graph",
        caption:
          "Online path: adapt experience, build candidates, run lifecycle control, retrieve memory, and feed decisions back from outcomes.",
      },
      {
        sourceKey: "mes_stage_a_lifecycle",
        alt: "MES memory lifecycle decisions",
        caption:
          "Memory is actively managed: high-value patterns are preserved, low-value clutter is demoted, and risk-bearing memories remain protected.",
      },
      {
        sourceKey: "mes_integration_ladder",
        alt: "MES integration ladder",
        caption:
          "The integration roadmap starts with external decision support and grows toward deeper VLA conditioning.",
      },
    ],
  },

  contributions: [
    "Defines a clean Stage A substrate boundary: upstream traces are adapted into task-conditioned object graph transitions rather than raw visual dumps.",
    "Builds lifecycle-controlled memory with evidence refs, risk coverage protection, retrieval, and action scoring instead of passive logging.",
    "Provides a credible integration story for VLA/TAMP systems: prompt constraints first, action reranking next, token-style conditioning later.",
  ],

  methods: {
    sectionTitle: "System Design & Demo Flow",
    description:
      "For the C-Day talk, the cleanest story is to walk from embodied experience to decision influence in five stages:",
    steps: [
      "ExperienceInputAdapter converts upstream traces from VLMs, planners, simulations, or logs into task-conditioned object graph transitions `(g_t, G_t, a_t, G'_t, y_t, e_t, η_t)`.",
      "Episode buffering and projection preserve short-horizon temporal structure while extracting risk events, repair attempts, and evidence references.",
      "Consolidation lifts repeated fragments into `MemoryIR` patterns that capture preconditions, transition structure, failure boundaries, and support counts.",
      "Lifecycle control chooses whether to write, merge, stub, or forget each candidate memory under a storage budget while enforcing minimum risk coverage.",
      "At runtime, retrieval and scoring translate memory into actionable outputs for downstream systems: warnings, action priors, feasibility signals, and repair suggestions.",
    ],
    images: [
      {
        sourceKey: "mes_stage_a_runtime",
        alt: "MES runtime architecture",
        caption:
          "The runtime graph emphasizes that MES owns augmentation, not execution: downstream VLA or planner stacks still act, while MES contributes memory-conditioned guidance.",
      },
    ],
  },

  results: {
    sectionTitle: "Validation & Why It Matters",
    description:
      "Even in Stage A, MES already has a concrete validation story rather than only a conceptual pitch.",
    figures: [
      {
        sourceKey: "mes_stage_a_lifecycle",
        alt: "Lifecycle validation view",
        caption:
          "Synthetic Stage A tests already cover buffer chunking, consolidation, write/merge, risk-locked forgetting rejection, risk-preserving stubbing, retrieval, and candidate action scoring.",
      },
      {
        sourceKey: "mes_stage_a_runtime",
        alt: "Runtime retrieval story",
        caption:
          "The demo pipeline shows a collision-risk memory being written from an episode and later retrieved back as a risk constraint with evidence references.",
      },
      {
        sourceKey: "mes_integration_ladder",
        alt: "Integration roadmap for downstream policies",
        caption:
          "In TiPToP-linked validation, MES-style contextual memory already changed downstream grounding behavior, showing that the substrate can influence action choice before any end-to-end retraining.",
      },
    ],
  },

  resources: {
    sectionTitle: "Resources & Contact",
    links: [
      {
        label: "AxiomAgent Repository",
        href: "https://github.com/Shen-Yukang/AxiomAgent",
      },
      {
        label: "Project Email",
        href: "mailto:yshen4@students.kennesaw.edu",
      },
    ],
  },

  contact: {
    email: "yshen4@students.kennesaw.edu",
  },
};

const projectDetailsById: Record<string, ResearchProjectDetail> = {
  [medicalAIProject.id]: medicalAIProject,
  [mesProject.id]: mesProject,
};

export { medicalAIProject, mesProject, projectDetailsById };
