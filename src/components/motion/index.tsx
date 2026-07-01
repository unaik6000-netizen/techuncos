"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

type DivProps = HTMLMotionProps<"div"> & { className?: string };

/** Reveals content once as it scrolls into view (respects reduced-motion). */
export function Reveal({ children, className, ...props }: DivProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Fades + rises immediately on mount — for above-the-fold content. */
export function FadeIn({ children, className, ...props }: DivProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Staggers its <StaggerItem> children into view. */
export function Stagger({
  children,
  className,
  onMount = false,
  ...props
}: DivProps & { onMount?: boolean }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      {...(onMount
        ? { animate: "show" }
        : { whileInView: "show", viewport: viewportOnce })}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, ...props }: DivProps) {
  return (
    <motion.div variants={fadeInUp} className={className} {...props}>
      {children}
    </motion.div>
  );
}

export { motion };
