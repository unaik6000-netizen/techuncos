import { Info, TriangleAlert, CircleCheck } from "lucide-react";
import { renderInline } from "@/lib/inline";
import type { Locale } from "@/types";

type Variant = "info" | "warning" | "success";

const CONFIG: Record<
  Variant,
  { icon: typeof Info; color: string; label: string }
> = {
  info: { icon: Info, color: "var(--info)", label: "Note" },
  warning: { icon: TriangleAlert, color: "var(--warning)", label: "Warning" },
  success: { icon: CircleCheck, color: "var(--success)", label: "Tip" },
};

export function Callout({
  variant,
  title,
  text,
  lang,
}: {
  variant: Variant;
  title?: string;
  text: string;
  lang?: Locale;
}) {
  const { icon: Icon, color } = CONFIG[variant];

  return (
    <div
      className="my-7 flex gap-3 rounded-xl border p-4"
      style={{
        borderColor: `color-mix(in srgb, ${color} 30%, transparent)`,
        backgroundColor: `color-mix(in srgb, ${color} 8%, transparent)`,
      }}
    >
      <Icon
        className="mt-0.5 h-5 w-5 shrink-0"
        style={{ color }}
        aria-hidden="true"
      />
      <div className="min-w-0">
        {title && (
          <p className="mb-1 font-semibold text-foreground" style={{ color }}>
            {title}
          </p>
        )}
        <p
          {...(lang ? { lang } : {})}
          className="text-[15px] leading-relaxed text-muted-foreground"
        >
          {renderInline(text)}
        </p>
      </div>
    </div>
  );
}
