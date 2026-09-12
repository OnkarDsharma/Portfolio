"use client";

import SakuraEditorialPoster from "@/components/ui/sakura-editorial-poster";
import { AnimatedFolder } from "@/components/ui/3d-folder";

const folderData = [
  {
    title: "Open Source Contributions",
    projects: [
      {
        id: "osc-1",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
        title: "PR Reviews",
      },
      {
        id: "osc-2",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
        title: "Bug Fixes",
      },
      {
        id: "osc-3",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
        title: "Docs Improvements",
      },
    ],
  },
  {
    title: "Projects",
    projects: [
      {
        id: "proj-1",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
        title: "Portfolio Redesign",
      },
      {
        id: "proj-2",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
        title: "Design System",
      },
      {
        id: "proj-3",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
        title: "Analytics Dashboard",
      },
    ],
  },
  {
    title: "Achievements",
    projects: [
      {
        id: "ach-1",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
        title: "Hackathon Winner",
      },
      {
        id: "ach-2",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
        title: "Research Paper",
      },
      {
        id: "ach-3",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
        title: "Dean's List",
      },
    ],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <SakuraEditorialPoster
        title="ONKARESHWAR"
        headline="Crafting Digital Experiences | Building the Future"
        body="Passionate developer creating innovative solutions that bridge design and technology. Every pixel tells a story, every line of code shapes an experience."
        subheadline="Welcome to my portfolio. Let's create something extraordinary."
        footerLeft="Onkareshwar Sharma"
        footerCenter="Portfolio"
        footerRight="2026"
        socialHandle="@onkareshwar"
        sceneSrc="https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1920&q=80"
        sceneAlt="Cherry blossom scene"
        className="w-full"
      />

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ece8df_0%,#f6f1ea_44%,#efe7dc_100%)] py-24 md:py-32">
        <div className="absolute inset-x-0 top-0 h-px bg-black/5" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-black/45">
              Selected archive
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-black/90 md:text-5xl">
              Three folders, three chapters of the work.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-black/60 md:text-lg">
              Scroll into the archive and open each folder to reveal the files inside. Use this area for open source contributions,
              projects, and achievements.
            </p>
          </div>

          <div className="mt-12 grid gap-8 justify-items-center lg:grid-cols-3 lg:items-start">
            {folderData.map((folder) => (
              <AnimatedFolder
                key={folder.title}
                title={folder.title}
                projects={folder.projects}
                className="w-full max-w-[360px]"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
