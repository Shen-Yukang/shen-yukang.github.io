import type { MedicalAIProject } from "./typing";

const medicalAIProject:MedicalAIProject = {
  title: "Synthetic-First Perception and Data Engine for Medical AI",
  subtitle:
    "Oriented research on high-precision spatial perception and data-centric pipelines for deltoid injection assistance and embodied medical intelligence.",

  summary: {
    problem:
      "Real medical perception data are rare due to privacy restrictions, uneven lighting, limited patient diversity, and expensive expert labeling. These constraints limit the performance and generalizability of models designed for deltoid injection understanding.",
    theme:
      "We build a scalable Synthetic Data Engine that can generate, filter, and iterate on large volumes of anatomically valid training data, enabling synthetic-only or synthetic-first training. We further integrate an anthropometric, explainable framework for projecting safe intramuscular injection zones.",
    result:
      "Synthetic-only training achieves ≥90% real-data AP, with MAPE ≤ 8% and dist% ≤ 10%. Mixed synthetic–real training further improves performance, and our anthropometric framework provides consistent, interpretable safety-zone guidance.",
  },

  background: {
    intro:
      "Deltoid intramuscular injection is a routine yet safety-critical clinical procedure. In busy clinics, inaccurate landmarking and cognitive overload can lead to misplaced injections and potential nerve damage. At the same time, privacy constraints and limited labeled data make it difficult to train robust vision models for this task.",
    challenges: [
      {
        question: "Q1 · Can a scalable Synthetic Data Engine accelerate training for rare, privacy-restricted medical perception tasks? ",
        answer:
          "The deltoid region, arm posture, anatomical landmarks, and safe-zone boundaries in RGB or AR views.",
      },
      {
        question: "Q2 · Can purely synthetic images achieve segmentation performance comparable to real-image training?",
        answer:
          "Injection images are constrained by medical privacy rules, uneven lighting, limited population coverage, and expensive expert annotation.",
      },
      {
        question: "Q3 · How can we provide explainable, anatomically grounded guidance for safe intramuscular injection based on perception outputs?",
        answer:
          "Generic segmentation models lack domain-specific priors and provide no interpretable concept of safe injection zones or safety margins.",
      },
    ],
    images: [
      {
        sourceKey: "bg_data_collection_issue1",
        alt: "Clinical data collection limitations",
        caption: "Limited real injection data due to privacy and clinical workflow constraints."
      },
      {
        sourceKey: "bg_data_collection_issue2",
        alt: "Lighting and pose variation",
        caption: "Inconsistent lighting, arm posture, and occlusions affect data quality."
      },
      {
        sourceKey: "bg_data_labeling_issue",
        alt: "Annotation burden",
        caption: "Expert labeling is costly and difficult to scale for medical datasets."
      }
    ]
  },

  contributions: [
    "A modular, scalable Synthetic Data Engine for rare medical perception tasks.",
    "An anthropometry-based, explainable geometric framework for safe injection-zone estimation.",
    "Dataset quality evaluation and a curated deltoid-segmentation dataset for downstream training and benchmarking.",
  ],

  methods: {
    steps: [
      "Cold-start: define the task, collect a small seed set of real images, and filter out low-quality examples.",
      "Controlled T2I synthesis: generate deltoid scenes with controlled pose, BMI, clothing, and lighting conditions.",
      "Quality filtering: use CLIP-based scores and geometric sanity checks to discard anatomically implausible images.",
      "Iterative segmentation training: train a YOLO-based segmentation model, periodically mixing in the limited real labels.",
      "Safe-zone inference and AR overlay: estimate the arm axis, project anthropometric safety bands, and overlay guidance in real time.",
    ],
    images: [
      {
        sourceKey: "overall_architecture",
        alt: "Clinical data collection limitations",
        caption: "Limited real injection data due to privacy and clinical workflow constraints."
      },
    ]
  },

  resultsImages: [
    {
      sourceKey: "result1",
      alt: "Performance across synthetic-only datasets",
      caption: "Performance across synthetic-only datasets of varying sizes (50–345).",
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
      sourceKey: "result4",
      alt: "We have integrated into the robotic arm VLAs",
      caption: "We have integrated into the robotic arm VLAs.",
    },
    {
      sourceKey: "perception_demo",
      type: "video",
      alt: "Performance across synthetic-only datasets",
      caption: "This is a visual demonstration of visual perception alone(With interpretability auxiliary lines).",
    },
  ],

  contact: {
    email: "yshen4@students.kennesaw.edu",
  },
  openSourcedCode: "https://github.com/",
  paper: ""
};


export {
  medicalAIProject
}