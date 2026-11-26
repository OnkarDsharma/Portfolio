"use client";

import * as React from "react";
import { useRef } from "react";
import { type MotionValue, motion, useMotionValue, useSpring, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

export interface DockItemData {
  /** Accessible name for the item. */
  label: string;
  Icon?: React.ReactNode;
  link?: string;
  target?: string;
  title?: string;
  /** Render a custom control (e.g. a button) instead of a link. It should fill its parent. */
  element?: React.ReactNode;
  /** Draw a thin divider before this item. */
  dividerBefore?: boolean;
}

export interface AnimatedDockProps {
  className?: string;
  items: DockItemData[];
}

const itemContentClass =
  "flex h-full w-full grow cursor-pointer items-center justify-center rounded-full text-white/80 transition-colors hover:text-white";

export const AnimatedDock = ({ className, items }: AnimatedDockProps) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 items-end gap-3 rounded-2xl border border-white/10 bg-[#05070b] px-3 pb-3 shadow-[0_12px_40px_rgba(0,0,0,0.42)] backdrop-blur-md dark:border-[#ffecd6]/12 dark:bg-[#1d1815]/90",
        className,
      )}
    >
      {items.map((item) => (
        <React.Fragment key={item.label}>
          {item.dividerBefore && <span className="mb-2 h-6 w-px self-end bg-white/15" aria-hidden="true" />}
          <DockItem mouseX={mouseX}>
            {item.element ?? (
              <a
                href={item.link}
                target={item.target}
                rel={item.target === "_blank" ? "noreferrer" : undefined}
                aria-label={item.label}
                title={item.title}
                className={itemContentClass}
              >
                {item.Icon}
              </a>
            )}
          </DockItem>
        </React.Fragment>
      ))}
    </motion.div>
  );
};

interface DockItemProps {
  mouseX: MotionValue<number>;
  children: React.ReactNode;
}

export const DockItem = ({ mouseX, children }: DockItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 72, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const iconScale = useTransform(width, [40, 72], [1, 1.5]);
  const iconSpring = useSpring(iconScale, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="flex aspect-square w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
    >
      <motion.div style={{ scale: iconSpring }} className="flex h-full w-full grow items-center justify-center">
        {children}
      </motion.div>
    </motion.div>
  );
};
