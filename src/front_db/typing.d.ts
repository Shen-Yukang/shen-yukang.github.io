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

export interface ResearchFigure {
  sourceKey: string;
  alt: string;
  type?: "image" | "video";
  caption: string;
  url?: string;
}

export interface ResourceLink {
  label: string;
  href?: string;
  pdfSourceKey?: string;
}

export interface ResearchProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  headerLabel?: string;

  summary: {
    problem: string;
    theme: string;
    result: string;
  };

  background: {
    sectionTitle: string;
    challengesTitle: string;
    mediaTitle: string;
    intro: string;
    challenges: {
      question: string;
      answer: string;
    }[];
    images: ResearchFigure[];
  };

  contributions: string[];

  methods: {
    sectionTitle: string;
    description: string;
    steps: string[];
    insight?: {
      title: string;
      body: string;
      items: {
        label: string;
        text: string;
      }[];
      punchline: string;
    };
    images: ResearchFigure[];
  };

  results: {
    sectionTitle: string;
    description: string;
    comparison?: {
      leftTitle: string;
      leftInput: string;
      rightTitle: string;
      rightInput: string;
    };
    figures: ResearchFigure[];
  };

  resources: {
    sectionTitle: string;
    links: ResourceLink[];
  };

  contact: {
    email: string;
  };
}
