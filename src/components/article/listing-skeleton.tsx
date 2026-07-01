/** Shared skeleton for article listing pages (category + all-articles). */
export function ListingSkeleton() {
  return (
    <div className="container-shell py-12 sm:py-16" aria-hidden="true">
      <div className="skeleton h-4 w-24 rounded" />
      <div className="mt-3 skeleton h-9 w-64 rounded" />
      <div className="mt-3 skeleton h-4 w-96 max-w-full rounded" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-card border border-border">
            <div className="skeleton aspect-[16/9] w-full" />
            <div className="space-y-3 p-5">
              <div className="skeleton h-4 w-16 rounded-full" />
              <div className="skeleton h-5 w-full rounded" />
              <div className="skeleton h-4 w-2/3 rounded" />
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Loading articles…</span>
    </div>
  );
}
