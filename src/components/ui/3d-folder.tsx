"use client";

import { forwardRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface Project {
  id: string;
  image: string;
  title: string;
  summary: string;
  details: string;
  liveUrl?: string;
  repoUrl?: string;
  highlights: string[];
  tags: string[];
}

interface AnimatedFolderProps {
  title: string;
  projects: Project[];
  className?: string;
  selectedProjectId?: string | null;
  onSelectProject?: (project: Project, folderTitle: string) => void;
}

interface ProjectCardProps {
  image: string;
  title: string;
  delay: number;
  isVisible: boolean;
  index: number;
  onClick: () => void;
  isSelected: boolean;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(function ProjectCard(
  { image, title, delay, isVisible, index, onClick, isSelected },
  ref,
) {
  const rotations = [-18, -6, 6, 18];
  const translations = [-75, -25, 25, 75];

  return (
    <div
      ref={ref}
      className={cn(
        "absolute h-28 w-20 overflow-hidden rounded-lg border border-border bg-card shadow-xl",
        "cursor-pointer hover:ring-2 hover:ring-accent/50",
        isSelected && "opacity-0",
      )}
      style={{
        transform: isVisible
          ? `translateY(-90px) translateX(${translations[index]}px) rotate(${rotations[index]}deg) scale(1)`
          : "translateY(0px) translateX(0px) rotate(0deg) scale(0.5)",
        opacity: isSelected ? 0 : isVisible ? 1 : 0,
        transition: `all 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
        zIndex: 10 - index,
        left: "-40px",
        top: "-56px",
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <img src={image || "/placeholder.svg"} alt={title} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
      <p className="absolute bottom-1.5 left-1.5 right-1.5 truncate text-[10px] font-medium text-primary-foreground">
        {title}
      </p>
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";

export function ImageLightbox() {
  return null;
}

export function AnimatedFolder({
  title,
  projects,
  className,
  selectedProjectId = null,
  onSelectProject,
}: AnimatedFolderProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleProjectClick = (project: Project) => {
    onSelectProject?.(project, title);
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "group relative flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 cursor-pointer transition-all duration-500 ease-out hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/10",
        )}
        style={{
          minWidth: "280px",
          perspective: "1000px",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle at 50% 70%, var(--accent) 0%, transparent 70%)",
            opacity: isHovered ? 0.08 : 0,
          }}
        />

        <div className="relative mb-4 flex items-center justify-center" style={{ height: "160px", width: "200px" }}>
          <div
            className="absolute h-24 w-32 rounded-lg bg-folder-back shadow-md"
            style={{
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(-15deg)" : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 10,
            }}
          />

          <div
            className="absolute h-4 w-12 rounded-t-md bg-folder-tab"
            style={{
              top: "calc(50% - 48px - 12px)",
              left: "calc(50% - 64px + 16px)",
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(-25deg) translateY(-2px)" : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 10,
            }}
          />

          <div
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 20,
            }}
          >
            {projects.slice(0, 4).map((project, index) => (
              <ProjectCard
                key={project.id}
                image={project.image}
                title={project.title}
                delay={index * 80}
                isVisible={isHovered}
                index={index}
                onClick={() => handleProjectClick(project)}
                isSelected={selectedProjectId === project.id}
              />
            ))}
          </div>

          <div
            className="absolute h-24 w-32 rounded-lg bg-folder-front shadow-lg"
            style={{
              top: "calc(50% - 48px + 4px)",
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(25deg) translateY(8px)" : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 30,
            }}
          />

          <div
            className="absolute h-24 w-32 overflow-hidden rounded-lg pointer-events-none"
            style={{
              top: "calc(50% - 48px + 4px)",
              background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)",
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(25deg) translateY(8px)" : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 31,
            }}
          />
        </div>

        <h3
          className="mt-4 text-lg font-semibold text-foreground transition-all duration-300"
          style={{
            transform: isHovered ? "translateY(4px)" : "translateY(0)",
          }}
        >
          {title}
        </h3>

        {title === "Projects" && (
          <p
            className="text-sm text-muted-foreground transition-all duration-300"
            style={{
              opacity: isHovered ? 0.7 : 1,
            }}
          >
            {projects.length} projects
          </p>
        )}

        <div
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 text-xs text-muted-foreground transition-all duration-300"
          style={{
            opacity: isHovered ? 0 : 0.6,
            transform: isHovered ? "translateY(10px)" : "translateY(0)",
          }}
        >
          <span>{selectedProjectId ? "Selected file opens below" : "Hover to explore"}</span>
        </div>
      </div>
    </div>
  );
}

export default AnimatedFolder;
