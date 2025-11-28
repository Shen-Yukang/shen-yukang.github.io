

export interface BackgroundChallenge {
  question: string;
  answer: string;
}

export interface BackgroundImage {
  sourceKey: string;
  alt: string;
}

export interface ResultMedia {
  sourceKey: string;
  type: 'image' | 'video';
  alt: string;
  caption?: string;
}

export interface MedicalAIProject {
  title: string;
  subtitle: string;
  summary: {
    problem: string;
    theme: string;
    result: string;
  };
  background: {
    intro: string;
    challenges: BackgroundChallenge[];
    images?: BackgroundImage[];
  };
  contributions: string[];
  methods: {
    steps: string[];
    images: BackgroundImage[];
  };
  resultsImages?: ResultMedia[];
  openSourcedCode: string;
  paper: string;
  contact: {
    email: string;
  };
}