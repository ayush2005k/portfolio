export interface Project {
  id: string;
  title: string;
  subtitle: string;
  headline: string;
  category: string;
  year: string;
  tags: string[];
  tech: string[];
  description: string;
  keyContributions: string[];
  gradientTheme: string;
  metrics?: { label: string; value: string }[];
  accentColor?: string;
  isFeatured: boolean;
  techStackTable?: { category: string; technologies: string }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companySubtitle?: string;
  employmentType: string;
  location: string;
  duration: string;
  techAreas?: string[];
  responsibilities: string[];
  logoUrl: string;
  logoAlt: string;
  logoText?: string;
  logoBg?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
  iconName?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year?: string;
}

export interface Achievement {
  title: string;
  detail: string;
  event: string;
  rank: string;
}
