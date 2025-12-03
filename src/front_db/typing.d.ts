// 通用 media 类型
export type MediaType = "image" | "video";

export interface Media {
  type: MediaType;
  sourceKey: string;
  alt: string;
}

// tag 类型
export interface Tag {
  text: string;
  color?: string;
  fontColor?: string;
}

// Research Project 类型
export interface ResearchProject {
  title: string;
  rp_id: string;
  tags: Tag[];
  routeUrl?: string; // 有的用内部路由
  url?: string; // 有的可能直接外部 https 链接
  time: string;
  description: string;
  bullets: string[];
  media?: Media;
}

// Publication 类型
export interface Publication {
  year: string;
  title: string;
  authors: string;
  venue: string;
  url?: string;
  media?: Media;
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
    challenges: {
      question: string;
      answer: string;
    }[];
    images: {
      sourceKey: string;
      alt: string;
      type?: "image" | "video";
      caption: string;
      url?: string;
    }[];
  };

  contributions: string[];

  methods: {
    steps: string[];
    images: {
      sourceKey: string;
      alt: string;
      type?: "image" | "video";
      caption: string;
    }[];
  };

  resultsImages: {
    sourceKey: string;
    alt: string;
    type?: "image" | "video";
    caption: string;
    url?: string;
  }[];

  contact: {
    email: string;
  };
  openSourcedCode: string;
  paper: string;
  socialMediaPresentation: string;
}
