"use client";

import { useState } from "react";

import SakuraEditorialPoster from "@/components/ui/sakura-editorial-poster";
import { AnimatedFolder } from "@/components/ui/3d-folder";

const folderData = [
  {
    title: "Open Source Contributions",
    projects: [
      {
        id: "osc-1",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
        title: "GrowthBook REST API",
        summary: "Built a public REST endpoint for posting comments to experiments programmatically.",
        details:
          "Engineered a public REST API endpoint at POST /experiments/:id/comment for GrowthBook, enabling programmatic comment posting while reusing the existing backend logic for permission checks, data models, and validation.",
        highlights: [
          "Enabled structured feedback from automation and internal tools.",
          "Kept permission checks and validation aligned with the backend.",
          "Exposed a documented API surface for contributor workflows.",
        ],
        tags: ["REST API", "Backend", "GrowthBook"],
      },
      {
        id: "osc-2",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
        title: "Saved Groups Pagination",
        summary: "Fixed a client-side pagination issue so search filters stayed in sync across pages.",
        details:
          "Resolved a client-side pagination bug within the Saved Groups interface by synchronizing search filters with pagination state, restoring accurate data retrieval and search functionality across multi-page datasets.",
        highlights: [
          "Prevented stale results during pagination.",
          "Restored accurate search behavior for large datasets.",
          "Improved the workflow for grouped records and filters.",
        ],
        tags: ["Pagination", "Search", "Frontend"],
      },
      {
        id: "osc-3",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
        title: "Maintainer Collaboration",
        summary: "Modernized low-level C/C++ type declarations while collaborating through review and issues.",
        details:
          "Merged a contribution modernizing kernel-level C/C++ type declarations across Quasar and Wormhole components, while collaborating with maintainers through issue discussions and code review to keep the change aligned with upstream expectations.",
        highlights: [
          "Worked through issue discussions before merging changes.",
          "Helped modernize low-level declarations across components.",
          "Kept the contribution aligned with maintainer feedback.",
        ],
        tags: ["C/C++", "Code Review", "Collaboration"],
      },
    ],
  },
  {
    title: "Projects",
    projects: [
      {
        id: "proj-1",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
        title: "CSC Sarthi",
        summary: "An AI-powered pre-submission assistant for 30+ government services with validation and OCR.",
        details:
          "Architected an AI-powered pre-submission validation platform for 30+ government services, performing real-time form validation and rejection-risk prediction. The system combined a machine learning risk engine, OCR-based document verification, and a WhatsApp chatbot workflow with a Django analytics dashboard.",
        highlights: [
          "Reached around 87% validation accuracy with field-level explainability.",
          "Detected 3+ mismatch types by cross-validating documents against form inputs.",
          "Visualized the top 5 rejection causes across 30+ districts.",
        ],
        tags: ["Python", "Django", "Scikit-learn", "OCR"],
      },
      {
        id: "proj-2",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
        title: "Website Security Scanner API",
        summary: "A REST API that ran 10 parallel security checks and returned a scored JSON risk report.",
        details:
          "Programmed and shipped a REST API running 10 parallel security checks, including HTTP security headers, TLS/SSL certificate validation, DNS-based email spoofing checks, CORS misconfiguration, cookie security, exposed credential files, CMS fingerprinting, and more. The service returned a scored JSON risk report and was later published on RapidAPI.",
        highlights: [
          "Reached 264+ users after publishing on RapidAPI.",
          "Added SSRF protections, per-IP rate limiting, and honest failure reporting.",
          "Launched a public web demo for in-browser scans without an API key.",
        ],
        tags: ["Node.js", "Vercel", "REST API", "DNS/TLS"],
      },
      {
        id: "proj-3",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
        title: "LiteLLM Gateway",
        summary: "A micro-subscription SaaS platform for premium LLM access with rate limiting and streaming.",
        details:
          "Engineered a micro-subscription SaaS platform providing short-term access to premium LLMs such as Claude Sonnet and GPT-4o. The architecture used a Redis-based hybrid rate limiter with a hidden ~100K token ceiling, a three-tier storage setup, prompt caching, and Server-Sent Events for real-time token responses.",
        highlights: [
          "Replaced recurring $20/month subscriptions with short-term access.",
          "Structured storage with PostgreSQL, MongoDB, and S3/Cloudflare R2.",
          "Reduced inference costs while streaming token responses in real time.",
        ],
        tags: ["React", "Node.js", "PostgreSQL", "MongoDB", "Redis"],
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
        summary: "Won first place at E-Summit 2026 by pitching a civic-tech automation tool.",
        details:
          "Secured first place by pitching a civic-tech automation tool to an expert panel, showcasing live document parsing and compliance-check capabilities during the E-Summit 2026 hackathon.",
        highlights: [
          "Delivered a live demo focused on document parsing.",
          "Showcased compliance-check capabilities under panel review.",
          "Presented a solution aimed at civic-tech automation.",
        ],
        tags: ["E-Summit 2026", "Hackathon", "Civic Tech"],
      },
      {
        id: "ach-2",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
        title: "Case Study Winner",
        summary: "Won the Xcelerate 2026 case study competition with a proposal for a Central India manufacturing hub.",
        details:
          "Proposed a strategic 'Three pillars solution' for a Central India Manufacturing Hub and successfully defended the proposal and counter-questions from the judging panel during Xcelerate 2026.",
        highlights: [
          "Built a strategy centered on three pillars.",
          "Defended the proposal against panel counter-questions.",
          "Won the case study competition at Xcelerate 2026.",
        ],
        tags: ["Xcelerate 2026", "Strategy", "Competition"],
      },
      {
        id: "ach-3",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
        title: "Head of Art Society",
        summary: "Led a team of 50 students organizing campus-wide cultural events and workshops.",
        details:
          "As Head of Art Society (Indradhanush), led a team of 50 students in organizing campus-wide cultural events and workshops at IIIT Naya Raipur from Aug 2025 to July 2026, combining leadership and coordination across the society's programming.",
        highlights: [
          "Managed a 50-student team across events and workshops.",
          "Supported campus-wide cultural programming and coordination.",
          "Built leadership experience alongside technical work.",
        ],
        tags: ["Leadership", "Indradhanush", "Community"],
      },
    ],
  },
];

type SelectedFile = {
  folderTitle: string;
  project: (typeof folderData)[number]["projects"][number];
} | null;

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<SelectedFile>(null);

  const handleSelectProject = (
    project: (typeof folderData)[number]["projects"][number],
    folderTitle: string,
  ) => {
    setSelectedFile((current) => {
      if (current?.project.id === project.id) return null;
      return { folderTitle, project };
    });
  };

  return (
    <main className="min-h-screen">
      <SakuraEditorialPoster
        title="ONKARESHWAR SHARMA"
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

      <section className="relative overflow-hidden border-x border-black/10 bg-[radial-gradient(circle_at_1px_1px,rgba(120,120,120,0.18)_1px,transparent_0)] [background-size:18px_18px] py-24 md:py-32">
        <div className="absolute inset-x-0 top-0 h-px bg-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-black/10" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="-mt-24 mb-16 flex items-start justify-between gap-8">
            <div className="ml-[clamp(0rem,4vw,3rem)] mt-8 max-w-[min(100%,34rem)] rounded-[2rem] border border-[#d8b48b]/70 bg-[linear-gradient(180deg,rgba(255,252,248,0.96)_0%,rgba(251,247,241,0.96)_100%)] p-7 shadow-[0_20px_60px_rgba(60,40,20,0.08)] md:p-10">
              <p className="font-['Cormorant_Garamond'] text-4xl leading-none text-[#cf7a2a] md:text-5xl">
                tldr;
              </p>
              <div className="mt-6 space-y-6 text-[1.05rem] leading-8 text-slate-600 md:text-[1.1rem]">
                <p>
                  i&apos;m obsessed with ideas, especially the ones that turn into products and keep evolving after the first draft.
                </p>
                <p>
                  i build across web, backend, and systems work. from AI-assisted validation tools to security scanners and micro-subscription gateways, i like shipping things that are useful, measurable, and a little sharper than average.
                </p>
                <p>
                  i adapt fast. tools change, but the focus stays on clean execution, strong logic, and work that holds up under review.
                </p>
              </div>
            </div>

            <div className="mr-[clamp(0rem,4vw,3rem)] hidden shrink-0 self-start md:mt-10 md:block lg:mt-14">
              <div className="rounded-full border border-[#d8b48b]/80 bg-[linear-gradient(180deg,rgba(255,252,248,0.96)_0%,rgba(251,247,241,0.96)_100%)] p-2 shadow-[0_20px_60px_rgba(60,40,20,0.08)]">
                <div
                  className="relative h-32 w-32 overflow-hidden rounded-full border border-white/80 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.92),rgba(246,219,199,0.88)_48%,rgba(215,143,108,0.92))] md:h-40 md:w-40"
                  style={{
                    backgroundImage: "url('/photo.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  aria-label="Onkareshwar Sharma portrait frame"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(0,0,0,0.06)_100%)]" />
                  <span className="sr-only">Onkareshwar Sharma</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-2xl">
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
                selectedProjectId={selectedFile?.project.id ?? null}
                onSelectProject={handleSelectProject}
              />
            ))}
          </div>

          <div className="mt-12">
            <div
              className="overflow-hidden rounded-[2rem] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(248,244,238,0.98)_100%)] shadow-[0_26px_70px_rgba(40,20,20,0.12)] transition-all duration-500"
              style={{
                maxHeight: selectedFile ? "460px" : "0px",
                opacity: selectedFile ? 1 : 0,
                transform: selectedFile ? "translateY(0)" : "translateY(24px)",
                pointerEvents: selectedFile ? "auto" : "none",
              }}
            >
              {selectedFile ? (
                <div className="flex flex-col gap-5 p-6 md:p-8 lg:p-10">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                      {selectedFile.folderTitle}
                    </p>
                    <h3 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                      {selectedFile.project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
                      {selectedFile.project.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedFile.project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-border bg-background/75 p-5">
                    <p className="text-sm leading-7 text-foreground/85 md:text-[0.98rem]">
                      {selectedFile.project.details}
                    </p>
                  </div>

                  <ul className="space-y-3 text-sm leading-6 text-muted-foreground md:text-[0.95rem]">
                    {selectedFile.project.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
