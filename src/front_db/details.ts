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
  title: "MES: Lifecycle-Controlled MemoryIR for Embodied AI",
  subtitle:
    "A C-Day research demo on what current embodied memory systems miss, and how a MemoryIR substrate can preserve action-conditioned experience without becoming raw RAG, full episodic replay, or a closed-model hidden cache.",
  headerLabel: "C-Day Demo Project",

  summary: {
    problem:
      "Existing embodied memory often retrieves **what was seen** or stores long trajectories, but it rarely captures **what action changed what relation, what outcome followed, and what is safe to forget**.",
    theme:
      "MES is a **lifecycle-controlled embodied MemoryIR substrate**: action-conditioned, evidence-backed, hybrid structured-plus-embedding memory that stays model-agnostic and auditable.",
    result:
      "Stage A demonstrates **write / merge / compress / stub / forget / retrieve / score** over embodied traces, with risk coverage protecting safety memories and retrieved MemoryIR influencing downstream robot-facing decisions.",
  },

  background: {
    sectionTitle: "Research Background: What Current Memory Misses",
    challengesTitle: "Gaps In Existing Embodied Memory",
    mediaTitle: "Memory Substrate Design Targets",
    intro:
      "The core question is not whether a robot can retrieve more context. The harder question is what embodied experience should become memory, how it should be compressed, and when it is safe to forget. MES starts from the limitations of current memory lines and positions itself as a middle route between passive retrieval and expensive world-model training.",
    challenges: [
      {
        question: "RAG-style memory",
        answer:
          "Mostly recalls text or visual fragments. It can remember what was seen, but often misses the action-before/action-after causal structure that explains what changed.",
      },
      {
        question: "Episodic memory",
        answer:
          "Stores complete episodes or trajectories. It preserves information, but retrieval is slower, redundancy is high, and automatic compression is difficult.",
      },
      {
        question: "VLA internal memory / hidden state",
        answer:
          "Closer to model decisions, but tied to specific architectures, often unavailable in closed models, hard to audit, and weak for cross-model transfer.",
      },
      {
        question: "World models and video representation learning",
        answer:
          "Powerful, but costly to train and data hungry. They are not the fastest path for a short-term deployable research demo.",
      },
      {
        question: "Hand-designed symbolic memory",
        answer:
          "Interpretable, but fixed schemas generalize poorly and can collapse into a brittle rule database.",
      },
    ],
    images: [],
  },

  contributions: [
    "Reframes embodied memory from passive retrieval to lifecycle control: what should be written, merged, compressed, stubbed, or forgotten.",
    "Defines MemoryIR as a hybrid representation with structured action-conditioned transitions, summaries, embeddings, and evidence pointers.",
    "Protects safety-relevant experience through risk coverage, while keeping the substrate model-agnostic and future-training-ready.",
  ],

  methods: {
    sectionTitle: "Method: Lifecycle-Controlled MemoryIR",
    description:
      "MES is deliberately positioned as a middle route: not raw RAG, not a full world model, not a VLA-internal cache, and not a static symbolic database.",
    steps: [
      "Project upstream traces from VLMs, planners, simulations, or robot logs into task-conditioned object graph transitions: goal, before-state, action, after-state, outcome, evidence, and metadata.",
      "Build candidate MemoryIR items that preserve action-conditioned relation changes instead of only captions, screenshots, or full episode replay.",
      "Store each memory as a hybrid payload: structured IR for reasoning, natural-language summary for inspection, embedding for retrieval, and evidence refs for traceability.",
      "Run lifecycle control over new and existing memories: write useful new experience, merge repeated patterns, compress supported abstractions, stub low-value items, and forget only when risk coverage remains satisfied.",
      "Retrieve MemoryIR at decision time and translate it into risk warnings, action priors, feasibility signals, repair hints, and future dataset/fine-tuning candidates.",
    ],
    insight: {
      title: "Dissipation-Inspired Memory Lifecycle",
      body:
        "Inspired by dissipative systems that maintain useful structure under continuous exchange with the environment, MES treats embodied memory as an active substrate rather than a passive archive.",
      items: [
        {
          label: "Inflow",
          text: "new embodied traces enter the substrate.",
        },
        {
          label: "Structure",
          text: "repeated action-outcome patterns form MemoryIR.",
        },
        {
          label: "Preservation",
          text: "high-utility and risk-relevant memories stay protected.",
        },
        {
          label: "Dissipation",
          text: "redundant or low-value traces are compressed, stubbed, or forgotten.",
        },
      ],
      punchline:
        "Memory should not grow as a passive archive; it should maintain useful structure under continual experience flow.",
    },
    images: [
      {
        sourceKey: "mes_stage_a_runtime",
        alt: "MES runtime architecture",
        caption:
          "Runtime flow: embodied trace -> MemoryIR candidate -> lifecycle controller -> retrievable memory -> decision-facing context.",
      },
      {
        sourceKey: "mes_architecture",
        alt: "MES method architecture overview",
        caption:
          "Method architecture: MES separates upstream embodied traces, MemoryIR construction, lifecycle management, and downstream VLA / planner conditioning.",
      },
      {
        sourceKey: "mes_more_detail_overview",
        alt: "Detailed MES MemoryIR overview",
        caption:
          "Detailed MemoryIR view: the substrate combines action-conditioned relation changes, lifecycle state, retrieval signals, evidence pointers, and future training-ready experience records.",
      },
    ],
  },

  results: {
    sectionTitle: "Demo Result: Memory Retrieval Changes the Input Context",
    description:
      "The demo compares the same task with and without retrieved embodied memory. The memory-enhanced input provides risk and graspability context before action selection.",
    comparison: {
      leftTitle: "With Memory Retrieval",
      leftInput:
        'INPUT: "Put the cube on the red bowl."\n\n<RelevantMemory>: The red cube is unsafe and should be avoided. The yellow cube has a slippery surface and is hard to grasp. The green cube is fragile.',
      rightTitle: "Original Instruction Only",
      rightInput: 'INPUT: "Put the cube on the red bowl."',
    },
    figures: [
      {
        sourceKey: "memor_ehanced_test",
        type: "video",
        alt: "Memory-enhanced instruction demo",
        caption:
          "Memory-enhanced execution uses retrieved risk and manipulation context, while the baseline receives only the raw instruction.",
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
