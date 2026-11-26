"use client";

import { useRef, useState, type ReactNode } from "react";

import type { PullRequest } from "@/components/ui/3d-folder";

const STATUS_STYLES: Record<PullRequest["status"], { label: string; className: string }> = {
  merged: { label: "Merged", className: "bg-[#8250df] text-white" },
  open: { label: "Open", className: "bg-[#1f883d] text-white" },
  closed: { label: "Closed", className: "bg-[#cf222e] text-white" },
};

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      {direction === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  );
}

interface PrCarouselProps {
  prs: PullRequest[];
  renderDetails: (text: string) => ReactNode;
}

/** One detailed card per pull request, stepped through with arrow buttons (or ←/→ keys). */
export function PrCarousel({ prs, renderDetails }: PrCarouselProps) {
  const [index, setIndex] = useState(0);
  const cardRef = useRef<HTMLElement>(null);
  const pr = prs[index];
  const status = STATUS_STYLES[pr.status];
  const isFirst = index === 0;
  const isLast = index === prs.length - 1;

  const go = (next: number) => {
    const clamped = Math.min(Math.max(next, 0), prs.length - 1);
    if (clamped === index) return;
    setIndex(clamped);
    // The arrows sit below a long card; if its top has scrolled away, bring the new PR's title back into view.
    // Scroll vertically only: scrollIntoView would also nudge overflow-hidden ancestors sideways.
    const card = cardRef.current;
    if (!card) return;
    let scroller: HTMLElement | null = card.parentElement;
    while (scroller && !(/(auto|scroll)/.test(getComputedStyle(scroller).overflowY) && scroller.scrollHeight > scroller.clientHeight)) {
      scroller = scroller.parentElement;
    }
    const cardTop = card.getBoundingClientRect().top;
    let pageTarget = cardTop;
    if (scroller) {
      // Desktop: the detail panel scrolls on its own; bring the card to its top.
      const scrollerTop = scroller.getBoundingClientRect().top;
      const offset = cardTop - scrollerTop - 16;
      if (offset < 0) scroller.scrollBy({ top: offset, behavior: "smooth" });
      pageTarget = scrollerTop;
    }
    // Then make sure the page itself isn't scrolled past the card (or its panel).
    if (pageTarget < 80) window.scrollBy({ top: pageTarget - 80, behavior: "smooth" });
  };

  const arrowClass =
    "inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-[#0b0d12] text-white dark:border-white/10 dark:bg-[#f3e6d8] dark:text-[#1a1512] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-30";

  return (
    <div
      className="flex flex-col gap-4"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") go(index - 1);
        if (event.key === "ArrowRight") go(index + 1);
      }}
    >
      <article
        ref={cardRef}
        aria-roledescription="slide"
        aria-label={`Pull request ${index + 1} of ${prs.length}`}
        className="glass-inset relative flex flex-col gap-5 rounded-2xl p-4 pt-14 md:p-8 md:pt-8"
      >
        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] md:right-6 md:top-6 ${status.className}`}
        >
          {status.label}
        </span>

        <span className="sr-only" aria-live="polite">
          PR #{pr.number}, {status.label}
        </span>

        <div className="md:pr-28">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-black/65 dark:text-white/60">
            PR #{pr.number} · {index + 1} / {prs.length}
          </p>
          <h4 className="mt-2 text-xl font-semibold leading-snug tracking-tight text-foreground md:text-2xl">
            <a
              href={pr.url}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-black/20 dark:decoration-white/25 underline-offset-4 transition hover:decoration-black/60 dark:hover:decoration-white/60"
            >
              {pr.title}
            </a>
          </h4>
          <p className="mt-2 text-sm leading-6 text-black/65 dark:text-white/60">{pr.meta}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {pr.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-black/10 bg-white/50 dark:border-white/10 dark:bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-black/65 dark:text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="text-sm leading-7 text-foreground/85 md:text-[0.98rem]">{renderDetails(pr.details)}</div>

        <div className="flex items-center justify-between gap-3 border-t border-black/10 dark:border-white/10 pt-4">
          <button type="button" onClick={() => go(index - 1)} disabled={isFirst} aria-label="Previous pull request" className={arrowClass}>
            <ArrowIcon direction="left" />
          </button>

          <div className="flex items-center gap-2">
            {prs.map((item, i) => (
              <button
                key={item.number}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show PR #${item.number}`}
                aria-current={i === index}
                className="flex h-6 w-6 cursor-pointer items-center justify-center"
              >
                <span
                  className={`block h-2 rounded-full transition-all ${
                    i === index ? `w-5 ${STATUS_STYLES[item.status].className}` : "w-2 bg-black/20 dark:bg-white/20"
                  }`}
                />
              </button>
            ))}
          </div>

          <button type="button" onClick={() => go(index + 1)} disabled={isLast} aria-label="Next pull request" className={arrowClass}>
            <ArrowIcon direction="right" />
          </button>
        </div>
      </article>
    </div>
  );
}
