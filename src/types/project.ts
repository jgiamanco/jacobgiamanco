export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  technologies: string[];
  imageUrl?: string;
  featured?: boolean;
}

export interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}
