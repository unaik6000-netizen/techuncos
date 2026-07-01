import { forwardRef } from "react";
import { Slot } from "./slot";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-primary-foreground font-medium shadow-[0_0_0_1px_rgba(56,189,248,0.2)] hover:brightness-110 active:brightness-95",
  secondary:
    "border border-border-strong bg-transparent text-foreground hover:bg-muted hover:border-border-strong",
  ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px] gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-[15px] gap-2",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Render as a child element (e.g. a Next.js <Link>) via Slot. */
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex select-none items-center justify-center rounded-lg transition-[filter,background-color,border-color,color] duration-200 [touch-action:manipulation] disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
