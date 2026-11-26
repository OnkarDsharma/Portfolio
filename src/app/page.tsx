"use client";

import { useEffect, useRef, useState } from "react";

import SakuraEditorialPoster from "@/components/ui/sakura-editorial-poster";
import { AnimatedFolder, type Project } from "@/components/ui/3d-folder";
import { OriginButton } from "@/components/ui/origin-button";
import { PrCarousel } from "@/components/ui/pr-carousel";

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
        id: "osc-growthbook",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
        title: "GrowthBook (YCW22)",
        summary: "Open Source Contribution | 5 PRs: 2 merged, 1 closed, 2 open",
        // Not shown: projects with `prs` render a per-PR carousel instead.
        details: "",
        repoUrl: "https://github.com/growthbook/growthbook",
        highlights: [],
        tags: ["TypeScript", "REST API", "React", "GrowthBook"],
        prs: [
          {
            number: 6526,
            title: "Add API support for posting experiment comments",
            status: "merged",
            url: "https://github.com/growthbook/growthbook/pull/6526",
            meta: "TypeScript, Node.js, REST API, OpenAPI | Merged Sep 2026 | +155 −1 across 7 files | Closes #6478",
            tags: ["REST API", "Backend", "OpenAPI"],
            details: `
• Added a new public REST endpoint, \`POST /api/v1/experiments/:id/comment\`, so comments can be posted on experiments programmatically; before this it was only possible through the UI.
• Reused the internal \`addComment\` service from \`back-end/src/services/discussions.ts\`, so the API applies the same \`canAddComment\` permission check, data model and validation as the UI's comment feature, with no duplicated business logic.
• Registered the route in \`experiments.router.ts\` and added a request validator in \`shared/src/validators/experiments.ts\`, so empty comments are rejected with a clear validation error and unknown experiment IDs return "Could not find experiment with that id" instead of crashing.
• Regenerated the OpenAPI spec (\`pnpm generate-openapi\`) and added the API docs page, so the endpoint shows up in GrowthBook's public API reference.
• Tested end-to-end against a local dev instance: comments appear instantly in the UI attributed to the API key's user; lint, type-check and Prettier all pass.
• Kept the scope to this repo and left MCP support as a follow-up, since GrowthBook's MCP server lives in a separate repo and generates its bindings from this OpenAPI spec.
`,
          },
          {
            number: 6904,
            title: "fix(saved-groups): reset pagination to page 1 when search filter changes",
            status: "merged",
            url: "https://github.com/growthbook/growthbook/pull/6904",
            meta: "TypeScript, React | Merged Sep 2026 | 1-line fix in saved-groups/[sgid].tsx | Fixes #6889",
            tags: ["React", "Frontend", "Bug Fix"],
            details: `
• Fixed a bug on the Saved Groups "ID List" page where a search returned no results if the user was on any page other than page 1.
• Root cause: the table paginates client-side (\`NUM_PER_PAGE = 10\`) and filters correctly on every keystroke, but \`currentPage\` never reset, so the filtered array was sliced at a stale offset (e.g. \`slice(10, 20)\` on 3 matches) and came back empty.
• Fix: call \`setCurrentPage(1)\` in the search input's \`onChange\`, matching how the sort-order toggle in the same file already resets pagination.
• Verified with a 75-item list (8 pages): searching from page 2 and page 8 now finds matches in both directions, and search on page 1 plus sort + search together still work.
• Confirmed the Enterprise \`hasLargeSavedGroupFeature\` flag only affects a warning banner, so the fix applies on every plan.
• Ran lint, type-check and the test suite, and used \`git stash\` to show 33 failing \`RampMonitoringSignals\` tests also fail on unmodified \`main\`, so they're unrelated.
`,
          },
          {
            number: 6596,
            title: "Add namespace info to Start Experiment modal summary",
            status: "closed",
            url: "https://github.com/growthbook/growthbook/pull/6596",
            meta: "TypeScript, React | Closed Oct 2026 | +20 across StartExperimentModal.tsx | For #6594",
            tags: ["React", "Frontend", "UX"],
            details: `
• Added namespace targeting to the Summary section of the Start Experiment confirmation modal, which previously listed Traffic, Attribute Targeting, Saved Groups and Prerequisites but never mentioned namespaces.
• Without it, users could review the pre-launch summary and later find their traffic was limited to a namespace range they had configured earlier.
• Derived \`hasNamespace\`, \`namespaceName\` and \`namespaceCoverage\` from the experiment's latest phase using the existing \`getNamespaceDisplayData\` helper and \`useOrgSettings()\`, the same pattern used in \`TrafficAllocationFunnel.tsx\`.
• Rendered a conditional "Namespace" \`SummaryRow\` right after Traffic, shown only when a namespace is set (e.g. "test-adding-namespace (57%)").
• Front-end only, with no backend or schema changes; tested both the with- and without-namespace cases locally, and type-check, ESLint and Prettier pass.
`,
          },
          {
            number: 7347,
            title: "feat: add configurable maximum number of goal metrics per experiment",
            status: "open",
            url: "https://github.com/growthbook/growthbook/pull/7347",
            meta: "TypeScript, React, Node.js | Opened Oct 2026 | +431 −6 across 22 files | Closes #7317",
            tags: ["Full Stack", "Validation", "Testing"],
            details: `
• Added an organization setting, \`maxGoalMetricsPerExperiment\`, so teams can cap how many goal metrics an experiment tracks, which helps avoid false discoveries from having too many primary outcomes.
• Added the setting under Settings → General → Experiment Settings (empty or 0 means unlimited) and exposed it in the REST settings API and the OpenAPI spec.
• Enforced the limit in the UI: \`MetricsSelector\` and \`ExperimentMetricsSelector\` disable extra options with "(Maximum of X reached)", and the New Experiment, Edit Metrics and Analysis Settings forms block over-limit submissions.
• Wrote a shared \`validateMaxGoalMetrics(settings, goalMetrics, experimentType)\` and enforced it in \`ExperimentModel\` create/update, the internal controllers, and the public \`POST /api/v1/experiments\`, \`/api/v2/experiments\` and \`/api/v1/experiments/:id\` endpoints.
• Kept the existing rules: multi-armed bandits still need exactly one decision metric, holdouts are exempt, and secondary and guardrail metrics stay unlimited.
• Added unit tests for the validator (unlimited, 0, undefined and negative limits across experiment types) and REST API tests that over-limit creates and updates are rejected.
`,
          },
          {
            number: 6469,
            title: "Add ownerName to experiment API responses",
            status: "open",
            url: "https://github.com/growthbook/growthbook/pull/6469",
            meta: "TypeScript, Node.js, REST API | Opened Jul 2026 | +83 −45 across 4 files | Fixes #6435",
            tags: ["REST API", "Backend", "Caching"],
            details: `
• Added the owner's display name (\`ownerName\`) to experiment API responses alongside the raw \`owner\` user ID and \`ownerEmail\`, so the GrowthBook MCP server can show a readable creator instead of an ID.
• Changed the owner-info cache and resolver in \`services/owner.ts\` to store \`{ email, name }\` per user instead of just the email, so both fields come from a single lookup.
• Added \`ownerNameField\` next to \`ownerEmailField\` in the shared validators, added \`ownerName\` to \`apiExperimentShape\`, and regenerated the OpenAPI spec.
• Kept both fields optional: they're only filled when the owner resolves to a known user, and \`ownerName\` may be missing even when \`ownerEmail\` is present, since names are optional.
• Extended the owner service tests to cover \`ownerName\`, including users with no name, and checked that \`GET /experiments\` and \`GET /experiments/{id}\` return it.
`,
          },
        ],
      },
      {
        id: "osc-5",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
        title: "ParadeDB (YCS23): max_expansions for Fuzzy Search",
        summary: "Open Source Contribution | Rust, PostgreSQL (pgrx), Tantivy | Nov 2026",
        details: `
• Added \`max_expansions\` to ParadeDB's fuzzy search (\`pdb.fuzzy\`), capping each fuzzy term at the 50 closest matches by default (same as Elasticsearch/Lucene) to prevent query blow-up.
• Implemented bounded-heap top-k term selection in ParadeDB's Tantivy fork, so only the closest candidate terms are kept as the term dictionary is walked.
• Bit-packed the new option into a Postgres typmod while keeping previously stored values readable, preserving backward compatibility.
• Covered the change with proptest property tests, pg_regress and integration tests, reaching 95% patch coverage; PRs open across ParadeDB and its Tantivy fork.
`,
        highlights: [],
        tags: ["Rust", "PostgreSQL", "Tantivy", "Search"],
      },
      {
        id: "osc-4",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
        title: "Onyx (YCW24): GitLab Connector Branch Support",
        summary: "Open Source Contribution | Python, GitLab API | PR #12676",
        details: `
• Added configurable branch support to Onyx's GitLab connector, letting it sync from any branch instead of only the repo's default, with zero config change required for existing users.
• Threaded the new branch parameter through two separate GitLab API calls (file listing + file content) to keep them in sync and prevent mismatched file states.
• Replaced raw API exceptions with clear, descriptive errors for invalid or inaccessible branches, and fixed GitLab links to point to the correct branch instead of always defaulting to main.
• Wrote regression tests against a live GitLab repo covering branch override, default fallback, and error handling, verified full backward compatibility with the pinned python-gitlab version.
`,
        highlights: [],
        tags: ["Python", "GitLab API", "Backend"],
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
    title: "Experience",
    projects: [
      {
        id: "exp-1",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
        title: "BigBrick Technologies: Backend Developer Intern",
        summary: "BigBrick Technologies Private Limited | Remote | Oct 2026 – Present",
        details: `
• Engineered TenderHub, a government procurement intelligence platform on Node.js, Express.js and MongoDB, with REST APIs and 4 core data models for tenders, contractors, AI dossiers and Copilot sessions.
• Automated daily tender ingestion across 2 government procurement portals using Playwright/Puppeteer and PDF parsing to extract bid metadata and technical specifications; integrated Cloudflare R2 and Redis for document storage, caching, and rate limiting.
• Built a 3-stage AI analysis pipeline (Gemini, GPT-4o mini fallback, deterministic rules) across 5 tender domains, generating BOQ estimates, compliance checks and eligibility assessments in under 60 seconds.
`,
        highlights: [],
        tags: ["Node.js", "Express.js", "MongoDB", "Redis", "AI Pipeline"],
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
        liveUrl: "https://csc-ai-copilot.vercel.app/",
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

  // Drop a label when the next month starts too close for both to fit.
  const spacedLabels = monthLabels.filter((month, index) => {
    const next = monthLabels[index + 1];
    return !next || next.col - month.col >= 3;
  });

  return { grid, monthLabels: spacedLabels };
}

type SelectedFile = {
  folderTitle: string;
  project: (typeof folderData)[number]["projects"][number];
} | null;

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<SelectedFile>(null);
  const contributionsRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
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

  // On narrow screens the grid scrolls sideways; start at the most recent weeks.
  useEffect(() => {
    const el = contributionsRef.current;
    if (githubStats && el) el.scrollLeft = el.scrollWidth;
  }, [githubStats]);

  const contributionData = githubStats ? buildContributionGrid(githubStats.cells) : { grid: Array.from({ length: 7 }, () => Array.from({ length: 56 }, () => 0)), monthLabels: [] };

  const formatProjectDetails = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // If the text contains bullet markers, render as a list
    if (/^\s*(?:\u2022|\-|\*)/m.test(text)) {
      const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

      return (
        <ul className="list-disc pl-5 space-y-3">
          {lines.map((line, i) => {
            const content = line.replace(/^\s*(?:\u2022|\-|\*)\s*/, "");
            const parts = content.split(urlRegex);

            return (
              <li key={i} className="text-sm leading-7 text-foreground/85 md:text-[0.98rem]">
                {parts.map((part, index) => {
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

                  // Render inline code wrapped in backticks
                  const codeSplit = part.split(/(`[^`]+`)/g).filter(Boolean);
                  if (codeSplit.length > 1) {
                    return (
                      <span key={`${part}-${index}`}>
                        {codeSplit.map((seg, si) =>
                          /`[^`]+`/.test(seg) ? (
                            <code key={si} className="rounded bg-muted px-1 py-0.5 text-[0.92em] font-mono text-[#8c5a2d]">
                              {seg.replace(/`/g, "")}
                            </code>
                          ) : (
                            <span key={si}>{seg}</span>
                          ),
                        )}
                      </span>
                    );
                  }

                  return <span key={`${part}-${index}`}>{part}</span>;
                })}
              </li>
            );
          })}
        </ul>
      );
    }

    // Fallback: inline rendering with links preserved
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

      const codeSplit = String(part).split(/(`[^`]+`)/g).filter(Boolean);
      if (codeSplit.length > 1) {
        return (
          <span key={`${part}-${index}`}>
            {codeSplit.map((seg, si) =>
              /`[^`]+`/.test(seg) ? (
                <code key={si} className="rounded bg-muted px-1 py-0.5 text-[0.92em] font-mono text-[#8c5a2d]">
                  {seg.replace(/`/g, "")}
                </code>
              ) : (
                <span key={si}>{seg}</span>
              ),
            )}
          </span>
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

  const openFolder = folderData.find((folder) => folder.title === selectedFile?.folderTitle);

  const handleOpenFolder = (folderTitle: string) => {
    const folder = folderData.find((item) => item.title === folderTitle);
    if (!folder?.projects.length) return;

    setSelectedFile({ folderTitle, project: folder.projects[0] });
    requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      panelRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  };

  return (
    <main className="min-h-screen">
      <SakuraEditorialPoster
        title="ONKARESHWAR SHARMA"
        headline="heya, i'm onkareshwar"
        body=""
        footerLeft="Onkareshwar Sharma"
        footerCenter="Portfolio"
        footerRight="2026"
        socialHandle="@onkareshwar"
        sceneSrc="https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1920&q=80"
        sceneAlt="Cherry blossom scene"
        className="w-full"
      />

      <section className="relative mx-2 my-4 sm:mx-4 sm:my-6 overflow-hidden rounded-[2rem] border border-black/10 bg-[radial-gradient(circle_at_1px_1px,rgba(120,120,120,0.18)_1px,transparent_0)] [background-size:18px_18px] py-24 md:mx-8 md:py-32 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-black/15 before:content-[''] after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-black/15 after:content-['']">
        <div className="absolute inset-x-0 top-0 h-px bg-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-black/10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="-mt-24 mb-16 flex flex-col items-center justify-between gap-0 md:flex-row md:items-start md:gap-8">
            <div className="mt-8 max-w-[min(100%,34rem)] rounded-[2rem] md:ml-[clamp(0rem,4vw,3rem)] border border-[#d8b48b]/70 bg-[linear-gradient(180deg,rgba(255,252,248,0.96)_0%,rgba(251,247,241,0.96)_100%)] p-6 shadow-[0_20px_60px_rgba(60,40,20,0.08)] md:p-10">
              <p className="font-['Cormorant_Garamond'] text-4xl leading-none text-[#cf7a2a] md:text-5xl">
                tldr;
              </p>
              <div className="mt-6 space-y-6 text-[1.05rem] leading-8 text-slate-600 md:text-[1.1rem]">
                <p>
                  i&apos;m obsessed with shipping features, applications which people actually use {":)"}
                </p>
                <p>
                  i love contributing across YC startups, global AI startups helping them ship new features or fix their core bugs,
                  
                </p>
                <p>
                  recently shipped a website security scanner API with tier based subscription and scaled it to 264+ users in just 2 weeks.
                </p>
                <p>
                  i specialize across backend, systems and production AI (agents, pipelines, RAG).
                </p>
                <p>
                  I work with the intention of shipping.
                </p>
              </div>
            </div>

            <div className="order-first mt-10 shrink-0 md:order-none md:mr-[clamp(0rem,4vw,3rem)] md:mt-12 md:self-start lg:mt-16">
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

              <div className="mt-5 flex justify-center md:mt-6">
                <a href="/Onkareshwar_Sharma_Resume.pdf" download>
                  <OriginButton className="h-12 rounded-full border-[0.5px] border-[#d8b48b]/80 bg-[linear-gradient(180deg,rgba(255,252,248,0.96)_0%,rgba(251,247,241,0.96)_100%)] px-6 text-base font-medium tracking-[0.12em] shadow-[0_18px_38px_-24px_rgba(60,40,20,0.35)] hover:brightness-105 dark:bg-[linear-gradient(180deg,rgba(255,252,248,0.96)_0%,rgba(251,247,241,0.96)_100%)]">
                    Resume
                  </OriginButton>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-20 md:mt-40 2xl:-mx-20">
          <div className="relative z-10 grid grid-cols-2 gap-3 justify-items-center md:gap-8 xl:grid-cols-4 xl:items-start xl:gap-5">
            {folderData.map((folder) => (
              <AnimatedFolder
                key={folder.title}
                title={folder.title}
                projects={folder.projects}
                className="w-full max-w-[360px]"
                selectedProjectId={selectedFile?.project.id ?? null}
                onSelectProject={handleSelectProject}
                onOpenFolder={handleOpenFolder}
              />
            ))}
          </div>

          <div ref={panelRef} className="relative isolate mt-6 scroll-mt-4 md:mt-12">
            <div
              className="glass-backdrop transition-opacity duration-500"
              style={{ opacity: selectedFile ? 1 : 0 }}
              aria-hidden="true"
            />
            <div
              className={`glass overflow-hidden rounded-[1.5rem] transition-all duration-500 md:rounded-[2rem] ${
                selectedFile ? "max-h-[4000px] md:max-h-[min(80vh,880px)]" : "max-h-0"
              }`}
              style={{
                opacity: selectedFile ? 1 : 0,
                transform: selectedFile ? "translateY(0)" : "translateY(24px)",
                pointerEvents: selectedFile ? "auto" : "none",
              }}
            >
              {selectedFile ? (
                <>
                {openFolder && openFolder.projects.length > 1 ? (
                  <div className="hidden gap-2 overflow-x-auto p-4 pb-0 [scrollbar-width:none] max-md:flex [@media(hover:none)]:flex">
                    {openFolder.projects.map((project) => {
                      const isActive = project.id === selectedFile.project.id;

                      return (
                        <button
                          key={project.id}
                          type="button"
                          aria-pressed={isActive}
                          onClick={() => setSelectedFile({ folderTitle: openFolder.title, project })}
                          className={`min-h-11 max-w-[13rem] shrink-0 truncate rounded-full px-4 text-sm ${
                            isActive ? "bg-[#0b0d12] text-white" : "glass-inset text-black/70"
                          }`}
                        >
                          {project.title}
                        </button>
                      );
                    })}
                  </div>
                ) : null}
                <div key={selectedFile.project.id} tabIndex={0} role="region" aria-label={selectedFile.project.title} className="flex flex-col gap-5 rounded-[inherit] p-5 md:max-h-[min(80vh,880px)] md:overflow-y-auto *:shrink-0 md:p-8 lg:p-10">
                  <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-black/65">
                        {selectedFile.folderTitle}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-4xl">
                        {selectedFile.project.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-black/65 md:text-base">
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

                  {selectedFile.project.prs?.length ? (
                    <PrCarousel prs={selectedFile.project.prs} renderDetails={formatProjectDetails} />
                  ) : (
                    <>
                    <div className="flex flex-wrap gap-2">
                      {selectedFile.project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="glass-inset rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-black/65"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="glass-inset rounded-2xl p-4 md:p-8">
                      <div className="text-sm leading-7 text-foreground/85 md:text-[0.98rem]">
                        {formatProjectDetails(selectedFile.project.details)}
                      </div>
                    </div>
                    </>
                  )}

                </div>
                </>
              ) : null}
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className="relative mx-2 my-4 sm:mx-4 sm:my-6 overflow-hidden rounded-[2rem] border border-black/10 bg-[radial-gradient(circle_at_1px_1px,rgba(120,120,120,0.18)_1px,transparent_0)] [background-size:18px_18px] py-12 md:mx-8 md:py-24 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-black/15 before:content-[''] after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-black/15 after:content-['']">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative md:pl-6">
            <p className="text-[2.3rem] font-semibold tracking-[-0.06em] text-[#111827] md:text-[4rem]">
              github contributions
            </p>
          </div>

          <div className="relative mt-10 overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0d1117] p-4 text-white shadow-[0_24px_60px_rgba(2,6,23,0.45)] md:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-[1.1rem] font-medium text-white/90 md:text-[1.5rem]">
                {githubStats ? `${githubStats.total.toLocaleString()} contributions in the last year` : "Loading contributions..."}
              </p>
              <button className="hidden rounded-md border border-white/10 bg-white/5 sm:block px-3 py-1 text-xs font-medium text-white/80 transition hover:bg-white/10">
                Contribution settings ▾
              </button>
            </div>

            <div ref={contributionsRef} className="flex gap-3 overflow-x-auto pb-2">
              <div className="sticky left-0 z-10 flex flex-col justify-around bg-[#0d1117] pb-2 pr-1 pt-8 text-[10px] font-medium text-white/45">
                {weekdayLabels.map((day) => (
                  <span key={day} className="h-4 leading-4">
                    {day}
                  </span>
                ))}
              </div>

              <div className="min-w-[46rem] flex-1 overflow-hidden rounded-xl border border-white/5 bg-white/2 px-2 py-2">
                <div
                  className="mb-2 grid h-4 text-[10px] font-medium uppercase tracking-[0.12em] text-white/50"
                  style={{ gridTemplateColumns: `repeat(${contributionData.grid[0].length}, minmax(0, 1fr))`, gap: "3px" }}
                >
                  {contributionData.monthLabels.map((month) => (
                    <span key={`${month.label}-${month.col}`} className="row-start-1 whitespace-nowrap" style={{ gridColumnStart: month.col + 1 }}>
                      {month.label}
                    </span>
                  ))}
                </div>
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

      <section className="relative mx-2 my-4 sm:mx-4 sm:my-6 overflow-hidden rounded-[2rem] border border-black/10 bg-[radial-gradient(circle_at_1px_1px,rgba(120,120,120,0.18)_1px,transparent_0)] [background-size:18px_18px] py-12 md:mx-8 md:py-24 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-black/15 before:content-[''] after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-black/15 after:content-['']">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative md:pl-6">
            <p className="text-[2.5rem] font-semibold tracking-[-0.06em] text-[#111827] md:text-[4rem]">
              about me
            </p>
          </div>

          <div className="mt-10 max-w-6xl text-[1.05rem] leading-[1.9] text-black/70 md:text-[1.35rem] md:leading-[2.1]">
            <p>
              i&apos;m a computer science undergrad at IIIT Naya Raipur who just likes building and shipping stuff with a product mindset. i specialize in working with backend, production AI (agents, pipelines, RAG) stuff with the goal of shipping.
            </p>
            <p className="mt-4">
              i love to work in a fast paced environment, spending nights on caffeine shipping and fixing stuff. 
            </p>
            <p className="mt-4">
              aside from my tech side, i love to spend my free time creating art.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-x border-black/10 bg-[radial-gradient(circle_at_1px_1px,rgba(120,120,120,0.18)_1px,transparent_0)] [background-size:18px_18px] pb-28 pt-8 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-black/15 before:content-[''] after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-black/15 after:content-['']">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
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
