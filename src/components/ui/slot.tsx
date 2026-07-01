import { cloneElement, forwardRef, isValidElement } from "react";
import type { ReactElement, Ref } from "react";
import { cn } from "@/lib/utils";

type SlotProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

/**
 * Minimal Slot: merges its props onto a single child element, so components
 * like <Button asChild><Link/></Button> render as the child while keeping
 * the parent's styling. Avoids pulling in a Radix dependency.
 */
export const Slot = forwardRef<HTMLElement, SlotProps>(
  ({ children, className, ...props }, ref) => {
    if (!isValidElement(children)) return null;
    const child = children as ReactElement<Record<string, unknown>>;
    return cloneElement(child, {
      ...props,
      ...child.props,
      ref,
      className: cn(className, child.props.className as string | undefined),
    } as Record<string, unknown> & { ref?: Ref<HTMLElement> });
  },
);
Slot.displayName = "Slot";
