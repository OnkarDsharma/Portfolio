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
  /** Phones and touch screens: tapping the folder opens its first file. */
  onOpenFolder?: (folderTitle: string) => void;
}

interface ProjectCardProps {
  image: string;
  title: string;
  delay: number;
  isVisible: boolean;
  index: number;
  total: number;
  onClick: () => void;
  isSelected: boolean;
}

const MAX_VISIBLE_CARDS = 5;

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(function ProjectCard(
  { image, title, delay, isVisible, index, total, onClick, isSelected },
  ref,
) {
  // Fan cards symmetrically; tighten spacing when there are more than 4.
  const offset = index - (total - 1) / 2;
  const spacing = total > 4 ? 40 : 50;
  const tilt = total > 4 ? 9 : 12;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute hidden h-28 w-20 overflow-hidden md:block rounded-lg border border-border bg-card shadow-xl",
        "cursor-pointer hover:ring-2 hover:ring-accent/50",
        isSelected && "opacity-0",
      )}
      style={{
        transform: isVisible
          ? `translateY(-90px) translateX(${offset * spacing}px) rotate(${offset * tilt}deg) scale(1)`
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
  onOpenFolder,
}: AnimatedFolderProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleProjectClick = (project: Project) => {
    onSelectProject?.(project, title);
  };

  const handleFolderClick = () => {
    if (window.matchMedia("(hover: none), (max-width: 767px)").matches) {
      onOpenFolder?.(title);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "group soft-card flex h-full min-h-[215px] flex-col items-center justify-center rounded-3xl p-3 pb-9 md:min-h-[390px] md:min-w-[240px] md:p-8 cursor-pointer transition-all duration-500 ease-out",
        )}
        style={{
          perspective: "1000px",
        }}
        onClick={handleFolderClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="absolute inset-0 rounded-3xl transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle at 50% 70%, var(--accent) 0%, transparent 70%)",
            opacity: isHovered ? 0.08 : 0,
          }}
        />

        <div className="relative -mb-3 -mt-3 flex shrink-0 scale-[0.7] md:mb-8 md:mt-0 md:scale-125 items-center justify-center" style={{ height: "160px", width: "200px" }}>
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
            {projects.slice(0, MAX_VISIBLE_CARDS).map((project, index) => (
              <ProjectCard
                key={project.id}
                image={project.image}
                title={project.title}
                delay={index * 80}
                isVisible={isHovered}
                index={index}
                total={Math.min(projects.length, MAX_VISIBLE_CARDS)}
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
          className="text-center text-base leading-snug md:mt-4 md:text-xl font-semibold text-foreground transition-all duration-300"
          style={{
            transform: isHovered ? "translateY(4px)" : "translateY(0)",
          }}
        >
          {title}
        </h3>

        {title === "Projects" && (
          <p
            className="hidden text-sm text-muted-foreground md:block transition-all duration-300"
            style={{
              opacity: isHovered ? 0.7 : 1,
            }}
          >
            {projects.length} projects
          </p>
        )}

        <div
          className="absolute bottom-3 left-1/2 flex w-max md:bottom-4 -translate-x-1/2 items-center gap-1.5 text-xs text-muted-foreground transition-all duration-300"
          style={{
            opacity: isHovered ? 0 : 0.6,
            transform: isHovered ? "translateY(10px)" : "translateY(0)",
          }}
        >
          <span className="md:hidden">Tap to open</span>
          <span className="hidden md:inline">
            {selectedProjectId ? "Selected file opens below" : "Hover to explore"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AnimatedFolder;
