import type { Transition, Variants } from "framer-motion";

/**
 * Central motion tokens. Every animation across the site consumes these,
 * so the whole product shares one rhythm. Enter = ease-out, exits shorter.
 * Only transform/opacity animate — never layout properties (CLS-safe).
 */
export const ease = [0.25, 0.46, 0.45, 0.94] as const;

export const transitions = {
  fast: { duration: 0.15, ease } satisfies Transition,
  base: { duration: 0.28, ease } satisfies Transition,
  slow: { duration: 0.45, ease } satisfies Transition,
  spring: { type: "spring", stiffness: 380, damping: 30 } satisfies Transition,
} as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: transitions.base },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transitions.base },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: transitions.base },
};

/** Container that reveals its children one after another. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

/** Standard viewport config for scroll-reveal: fire once, slightly early. */
export const viewportOnce = { once: true, margin: "-80px" } as const;
