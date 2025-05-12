import { motion } from "framer-motion";
import { ProjectCardProps } from "../types/project";

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-widget/50 rounded-xl border border-border/50 hover:border-primary/50 hover:shadow-md overflow-hidden cursor-pointer transition-all duration-300"
      onClick={() => onClick(project)}
    >
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline text-sm font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            View Project →
          </a>
          {project.featured && (
            <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              Featured
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
