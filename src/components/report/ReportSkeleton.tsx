export function ReportSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="card animate-pulse space-y-3 rounded-xl border border-surface-variant/30 p-5"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-28 rounded bg-surface-container-highest" />
              <div className="h-9 w-9 rounded-full bg-surface-container-highest" />
            </div>
            <div className="h-8 w-36 rounded bg-surface-container-highest" />
            <div className="h-3 w-20 rounded bg-surface-container-highest/60" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card animate-pulse space-y-4 rounded-xl border border-surface-variant/30 p-5 lg:col-span-2">
          <div className="h-6 w-44 rounded bg-surface-container-highest" />
          <div className="h-64 w-full rounded-lg bg-surface-container-highest/40" />
        </div>

        <div className="card animate-pulse space-y-4 rounded-xl border border-surface-variant/30 p-5">
          <div className="h-6 w-40 rounded bg-surface-container-highest" />
          <div className="flex h-64 items-center justify-center">
            <div className="h-44 w-44 rounded-full border-8 border-surface-container-highest" />
          </div>
        </div>
      </div>

      <div className="card animate-pulse space-y-4 rounded-xl border border-surface-variant/30 p-5">
        <div className="h-6 w-48 rounded bg-surface-container-highest" />
        <div className="space-y-3 pt-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <div className="h-4 w-32 rounded bg-surface-container-highest" />
                <div className="h-4 w-20 rounded bg-surface-container-highest" />
              </div>
              <div className="h-2.5 w-full rounded-full bg-surface-container-highest" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}