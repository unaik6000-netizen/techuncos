/** Streaming skeleton shown while an article is fetched/rendered. */
export default function ArticleLoading() {
  return (
    <div className="container-shell max-w-prose pt-8 sm:pt-12" aria-hidden="true">
      <div className="skeleton h-4 w-48 rounded" />
      <div className="mt-6 skeleton h-6 w-16 rounded-full" />
      <div className="mt-4 space-y-3">
        <div className="skeleton h-9 w-full rounded" />
        <div className="skeleton h-9 w-3/4 rounded" />
      </div>
      <div className="mt-6 flex items-center gap-3">
        <div className="skeleton h-10 w-10 rounded-full" />
        <div className="skeleton h-4 w-40 rounded" />
      </div>
      <div className="mt-8 skeleton aspect-[16/9] w-full rounded-panel" />
      <div className="mt-8 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="skeleton h-4 rounded"
            style={{ width: `${90 - (i % 3) * 12}%` }}
          />
        ))}
      </div>
      <span className="sr-only">Loading article…</span>
    </div>
  );
}
