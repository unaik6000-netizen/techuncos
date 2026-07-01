"use client";

import { useId } from "react";

/** Build a smooth-ish polyline path from values normalised into a viewBox. */
function toPath(data: number[], w: number, h: number, pad = 2) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = (w - pad * 2) / (data.length - 1);
  return data.map((v, i) => {
    const x = pad + i * step;
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  });
}

/** Full-width area chart used in the analytics overview card. */
export function AreaChart({
  data,
  labels,
  className,
}: {
  data: number[];
  labels?: string[];
  className?: string;
}) {
  const id = useId();
  const W = 600;
  const H = 200;
  const segs = toPath(data, W, H, 8);
  const line = segs.join(" ");
  const area = `${line} L${W - 8},${H - 8} L8,${H - 8} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className={className}
      role="img"
      aria-label="Article views over the last 14 days"
    >
      <defs>
        <linearGradient id={`fill-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--brand-sky)" stopOpacity="0.28" />
          <stop offset="1" stopColor="var(--brand-sky)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1="8"
          x2={W - 8}
          y1={H * f}
          y2={H * f}
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="3 5"
        />
      ))}
      <path d={area} fill={`url(#fill-${id})`} />
      <path
        d={line}
        fill="none"
        stroke="var(--brand-sky)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
