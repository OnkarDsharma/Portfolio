"use client";

import { useEffect, useState } from "react";

import SakuraEditorialPoster from "@/components/ui/sakura-editorial-poster";
import { AnimatedFolder, type Project } from "@/components/ui/3d-folder";
import { OriginButton } from "@/components/ui/origin-button";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M12 .5A12 12 0 0 0 8.21 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.74.08-.74 1.21.09 1.85 1.24 1.85 1.24 1.08 1.85 2.83 1.32 3.52 1 .11-.8.42-1.32.76-1.62-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.53.12-3.18 0 0 1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.3-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.4a1.56 1.56 0 0 1 0 3.1ZM5.5 10.2h2.88v8.4H5.5v-8.4Zm4.4 0h2.76v1.15h.04c.38-.72 1.32-1.48 2.72-1.48 2.91 0 3.44 1.92 3.44 4.4v4.33h-2.88v-4.05c0-1.01-.02-2.3-1.4-2.3-1.41 0-1.63 1.1-1.63 2.23v4.12H9.9v-8.4Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M18.9 2h3.41l-7.46 8.52L22.7 22h-6.77l-5.3-7.77L4.65 22H1.23L9.1 12.94 1.3 2h6.93l4.79 7.12L18.9 2Zm-1.2 18h1.88L7.13 3.9H5.16L17.7 20Z" />
    </svg>
  );
}

const folderData: { title: string; projects: Project[] }[] = [
  {
    title: "Open Source Contributions",
    projects: [
      {
        id: "osc-1",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
        title: "GrowthBook Rest API Endpoint",
        summary: "Built a public REST endpoint for posting comments to experiments programmatically.",
        details:
          "I contributed to GrowthBook by building a public REST API endpoint (POST /experiments/:id/comment) that allows users to add comments to experiments programmatically. Instead of duplicating existing logic, I connected the endpoint to GrowthBook’s internal discussion system, so it automatically follows the same permission checks and validation rules already used by the UI. I also tested the endpoint end-to-end across different edge cases, which helped close feature #6478. As part of the contribution, I updated the OpenAPI specification as well, making the API easier to extend for future MCP server integration.",
        highlights: [],
        tags: ["REST API", "Backend", "GrowthBook"],
      },
      {
        id: "osc-2",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
        title: "GrowthBook Pagination Fix",
        summary: "Fixed a client-side pagination issue so search filters stayed in sync across pages.",
        details:
          "I resolved a client-side pagination bug in the Saved Groups feature where search queries executed on subsequent pages failed to display valid results. By diagnosing the issue as a stale pagination offset applied to a dynamically filtered data array, I implemented a state reset within the search handler to ensure the data sliced correctly on every keystroke. After conducting thorough local testing to verify edge cases, including sorting interactions and enterprise feature flags, this fix successfully closed bug #6889 and restored seamless search functionality to the UI.",
        highlights: [],
        tags: ["Pagination", "Search", "Frontend"],
      },
      {
        id: "osc-3",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
        title: "Tenstorrent",
        summary: "Modernized low-level C/C++ type declarations in the tt-metal repo of Tenstorrent while collaborating through review and issues.",
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
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
        title: "Website Security Scanner API",
        summary: "A production-ready REST API that scans any website across 10 parallel security checks, including HTTP headers, TLS/SSL, SPF/DMARC, CORS, cookie security, exposed files, and CMS detection, and returns a scored JSON security report.",
        details:
          "I built the system with security and reliability in mind, adding SSRF protection, private IP and cloud metadata blocking, per-IP rate limiting, and accurate failure handling to avoid misleading scan results. The API was published on RapidAPI with tiered pricing and has grown to 265+ users, turning a technical security tool into a real-world product. I also built a public web demo that lets non-technical users run scans directly from their browser, creating a simple funnel into the API.",
        liveUrl: "https://website-security-scanner-api.vercel.app/",
        repoUrl: "https://github.com/OnkarDsharma/website-security-api",
        highlights: [],
        tags: ["Node.js", "Vercel", "REST API", "DNS/TLS"],
      },
      {
        id: "proj-2",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
        title: "CSC Sarthi",
        summary: "An AI-powered pre-submission platform built to help citizens and CSC operators catch errors before submitting applications across 30+ government services.",
        details:
          "I developed the ML-based rejection-risk engine, achieving ~87% validation accuracy, along with field-level explanations to help users understand potential issues. I also built an OCR document verification pipeline that extracts Name, ID, and DOB and cross-checks them against form data to detect document mismatches. The platform also includes a WhatsApp pre-verification workflow and an analytics dashboard tracking rejection patterns across 30+ districts. The project was selected by the Chhattisgarh Government as a winning solution at E-Summit’26, where our team won the AIML category hackathon. This gave the project validation beyond a prototype and demonstrated its potential for solving a real government-service workflow problem.",
        repoUrl: "https://github.com/GAURAV-1313/csc",
        highlights: [],
        tags: ["Python", "Django", "Scikit-learn", "OCR"],
      },
      {
        id: "proj-3",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
        title: "LiteLLM Gateway",
        summary: "A micro-subscription SaaS platform for premium LLM access with rate limiting and streaming.",
        details:
          "Engineered a micro-subscription SaaS platform providing short-term access to premium LLMs such as Claude Sonnet and GPT-4o. The architecture used a Redis-based hybrid rate limiter with a hidden ~100K token ceiling, a three-tier storage setup, prompt caching, and Server-Sent Events for real-time token responses.",
        repoUrl: "https://github.com/OnkarDsharma/LiteLLM",
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

type GitHubDay = {
  date: string;
  level: number;
};

type GitHubContributionResponse = {
  total: number;
  cells: GitHubDay[];
};

const weekdayLabels = ["Mon", "Wed", "Fri"];

function buildContributionGrid(cells: GitHubDay[]) {
  if (!cells.length) {
    return { grid: Array.from({ length: 7 }, () => Array.from({ length: 1 }, () => 0)), monthLabels: [] };
  }

  const sorted = [...cells].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const firstDate = new Date(sorted[0].date);
  const lastDate = new Date(sorted[sorted.length - 1].date);
  const totalDays = Math.max(1, Math.ceil((lastDate.getTime() - firstDate.getTime()) / 86400000) + 1);
  const totalWeeks = Math.ceil(totalDays / 7);
  const grid = Array.from({ length: 7 }, () => Array.from({ length: totalWeeks }, () => 0));

  sorted.forEach(({ date, level }) => {
    const current = new Date(date);
    const diffDays = Math.round((current.getTime() - firstDate.getTime()) / 86400000);
    const row = current.getDay();
    const col = Math.floor(diffDays / 7);

    if (row >= 0 && row < 7 && col >= 0 && col < totalWeeks) {
      grid[row][col] = level;
    }
  });

  const monthLabels: { label: string; col: number }[] = [];
  const seenMonths = new Set<string>();

  sorted.forEach(({ date }) => {
    const parsed = new Date(date);
    const monthKey = `${parsed.getFullYear()}-${parsed.getMonth()}`;
    const diffDays = Math.round((parsed.getTime() - firstDate.getTime()) / 86400000);
    const col = Math.floor(diffDays / 7);

    if (!seenMonths.has(monthKey) && col >= 0 && col < totalWeeks) {
      seenMonths.add(monthKey);
      monthLabels.push({
        label: new Intl.DateTimeFormat("en-US", { month: "short" }).format(parsed).toLowerCase(),
        col,
      });
    }
  });

  return { grid, monthLabels };
}

type SelectedFile = {
  folderTitle: string;
  project: (typeof folderData)[number]["projects"][number];
} | null;

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<SelectedFile>(null);
  const [githubStats, setGithubStats] = useState<GitHubContributionResponse | null>(null);

  useEffect(() => {
    fetch("/api/github-contributions")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch GitHub contributions");
        return res.json() as Promise<GitHubContributionResponse>;
      })
      .then((data) => setGithubStats(data))
      .catch(() => {
        setGithubStats({ total: 0, cells: [] });
      });
  }, []);

  const contributionData = githubStats ? buildContributionGrid(githubStats.cells) : { grid: Array.from({ length: 7 }, () => Array.from({ length: 56 }, () => 0)), monthLabels: [] };

  const formatProjectDetails = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(/^https?:\/\//)) {
        return (
          <a
            key={`${part}-${index}`}
            href={part}
            target="_blank"
            rel="noreferrer"
            className="text-[#8c5a2d] underline decoration-[#8c5a2d]/60 underline-offset-4 transition hover:text-[#6a431e]"
          >
            {part}
          </a>
        );
      }

      return <span key={`${part}-${index}`}>{part}</span>;
    });
  };

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
        headline="heya, i'm onkareshwar"
        body="Passionate developer creating innovative solutions that bridge design and technology. Every pixel tells a story, every line of code shapes an experience."
        footerLeft="Onkareshwar Sharma"
        footerCenter="Portfolio"
        footerRight="2026"
        socialHandle="@onkareshwar"
        sceneSrc="https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1920&q=80"
        sceneAlt="Cherry blossom scene"
        className="w-full"
      />

      <section className="relative mx-4 my-6 overflow-hidden rounded-[2rem] border border-black/10 bg-[radial-gradient(circle_at_1px_1px,rgba(120,120,120,0.18)_1px,transparent_0)] [background-size:18px_18px] py-24 md:mx-8 md:py-32 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-black/15 before:content-[''] after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-black/15 after:content-['']">
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
                  i&apos;m obsessed with shipping features, applications which people actually use {":)"}
                </p>
                <p>
                  i love doing contributions across YC startups, global AI startups helping them ship new features or fix thier core bugs,
                  
                </p>
                <p>
                  recently shipped a website security scanner API with tier based subscription and scaled it to 264+ users in just 2 weeks.
                </p>
                <p>
                  i especialize across backend, systems and production AI (agents, pipelines, RAG).
                </p>
                <p>
                  I work with the intention of shipping.
                </p>
              </div>
            </div>

            <div className="mr-[clamp(0rem,4vw,3rem)] hidden shrink-0 self-start md:mt-12 md:block lg:mt-16">
              <div className="rounded-full border border-[#d8b48b]/80 bg-[linear-gradient(180deg,rgba(255,252,248,0.96)_0%,rgba(251,247,241,0.96)_100%)] p-2 shadow-[0_20px_60px_rgba(60,40,20,0.08)]">
                <div
                  className="relative h-36 w-36 overflow-hidden rounded-full border border-white/80 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.92),rgba(246,219,199,0.88)_48%,rgba(215,143,108,0.92))] md:h-48 md:w-48 lg:h-52 lg:w-52"
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

              <div className="mt-6 flex justify-center">
                <a href="/Onkareshwar_Sharma_Resume.pdf" download>
                  <OriginButton className="h-12 rounded-full border-[0.5px] border-[#d8b48b]/80 bg-[linear-gradient(180deg,rgba(255,252,248,0.96)_0%,rgba(251,247,241,0.96)_100%)] px-6 text-base font-medium tracking-[0.12em] shadow-[0_18px_38px_-24px_rgba(60,40,20,0.35)] hover:brightness-105 dark:bg-[linear-gradient(180deg,rgba(255,252,248,0.96)_0%,rgba(251,247,241,0.96)_100%)]">
                    Resume
                  </OriginButton>
                </a>
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
              Scroll into the archive and open each folder to reveal the files inside.
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
                  <div className="flex items-start justify-between gap-4">
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

                    <div className="flex shrink-0 items-center gap-2">
                      {selectedFile.project.repoUrl ? (
                        <a
                          href={selectedFile.project.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Open project repository"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-[#0b0d12] text-white transition hover:brightness-110"
                        >
                          <GitHubIcon />
                        </a>
                      ) : null}

                      {selectedFile.project.liveUrl ? (
                        <a
                          href={selectedFile.project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#c98d52]/80 bg-[linear-gradient(180deg,rgba(255,252,248,0.96)_0%,rgba(251,247,241,0.96)_100%)] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[#1f1a17] transition hover:brightness-105"
                        >
                          Live
                        </a>
                      ) : null}
                    </div>
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
                      {formatProjectDetails(selectedFile.project.details)}
                    </p>
                  </div>

                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-4 my-6 overflow-hidden rounded-[2rem] border border-black/10 bg-[radial-gradient(circle_at_1px_1px,rgba(120,120,120,0.18)_1px,transparent_0)] [background-size:18px_18px] py-20 md:mx-8 md:py-24 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-black/15 before:content-[''] after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-black/15 after:content-['']">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative pl-4 md:pl-6">
            <p className="text-[2.3rem] font-semibold tracking-[-0.06em] text-[#111827] md:text-[4rem]">
              github contributions
            </p>
          </div>

          <div className="relative mt-10 overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0d1117] p-4 text-white shadow-[0_24px_60px_rgba(2,6,23,0.45)] md:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-[1.1rem] font-medium text-white/90 md:text-[1.5rem]">
                {githubStats ? `${githubStats.total.toLocaleString()} contributions in the last year` : "Loading contributions..."}
              </p>
              <button className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 transition hover:bg-white/10">
                Contribution settings ▾
              </button>
            </div>

            <div className="flex items-start gap-2 pb-3 pl-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 md:gap-4">
              <div className="w-8 shrink-0" />
              <div className="grid flex-1 grid-cols-12 gap-1.5 md:gap-2">
                {contributionData.monthLabels.map((month) => (
                  <span key={`${month.label}-${month.col}`} className="text-center" style={{ gridColumnStart: month.col + 1 }}>
                    {month.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              <div className="flex flex-col gap-1 pt-1 text-[10px] font-medium text-white/45">
                {weekdayLabels.map((day) => (
                  <span key={day} className="h-4 leading-4">
                    {day}
                  </span>
                ))}
              </div>

              <div className="flex-1 overflow-hidden rounded-xl border border-white/5 bg-white/2 px-2 py-2">
                <div className="grid" style={{ gridTemplateColumns: `repeat(${contributionData.grid[0].length}, minmax(0, 1fr))`, gap: "3px" }}>
                  {contributionData.grid.map((row, rowIndex) =>
                    row.map((level, colIndex) => {
                      const colors = [
                        "#161b22",
                        "#0e4429",
                        "#006d32",
                        "#26a641",
                        "#39d353",
                      ];

                      return (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className="h-2.5 w-2.5 rounded-[2px] md:h-3 md:w-3"
                          style={{ backgroundColor: colors[level] ?? colors[0] }}
                          title={level > 0 ? `${level} contributions` : "No contributions"}
                        />
                      );
                    }),
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 text-[11px] text-white/55 md:text-[12px]">
              <span>Learn how we count contributions</span>
              <div className="flex items-center gap-2">
                <span className="text-white/60">Less</span>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <span
                      key={level}
                      className="h-2.5 w-2.5 rounded-sm border border-white/10"
                      style={{ backgroundColor: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"][level] }}
                    />
                  ))}
                </div>
                <span className="text-white/60">More</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-4 my-6 overflow-hidden rounded-[2rem] border border-black/10 bg-[radial-gradient(circle_at_1px_1px,rgba(120,120,120,0.18)_1px,transparent_0)] [background-size:18px_18px] py-20 md:mx-8 md:py-24 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-black/15 before:content-[''] after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-black/15 after:content-['']">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative pl-4 md:pl-6">
            <p className="text-[2.5rem] font-semibold tracking-[-0.06em] text-[#111827] md:text-[4rem]">
              about me
            </p>
          </div>

          <div className="mt-10 max-w-6xl text-[1.05rem] leading-[1.9] text-black/70 md:text-[1.35rem] md:leading-[2.1]">
            <p>
              i&apos;m a computer science undergrad at IIIT Naya Raipir who just likes building and shipping stuff with a product mindset. i especialize in working with backend, production AI (agents, pipelines, RAG) stuff with the goal of shipping.
            </p>
            <p className="mt-4">
              i love to work in a fast paced environment, spending nights on caffine shipping and fixing stuff. 
            </p>
            <p className="mt-4">
              aside from my tech side, i love to spend my free time creating art.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-x border-black/10 bg-[radial-gradient(circle_at_1px_1px,rgba(120,120,120,0.18)_1px,transparent_0)] [background-size:18px_18px] pb-28 pt-8 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-black/15 before:content-[''] after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-black/15 after:content-['']">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative border-t border-black/10 pt-6">
            <div className="flex flex-col items-center justify-center gap-5 pb-6 text-center text-[0.95rem] text-black/60 md:text-[1.1rem]">
              <p className="max-w-2xl text-[1.1rem] leading-7 text-black/70 md:text-[1.4rem]">
                built using html, tailwind, next.js.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#05070b] px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.42)] backdrop-blur-md">
          <a
            href="https://www.linkedin.com/in/onkareshwar-sharma-b1a40132a/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://x.com/HououinKyo1225"
            target="_blank"
            rel="noreferrer"
            aria-label="X"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <XIcon />
          </a>
          <a
            href="https://github.com/OnkarDsharma"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <GitHubIcon />
          </a>
        </div>
      </footer>
    </main>
  );
}
