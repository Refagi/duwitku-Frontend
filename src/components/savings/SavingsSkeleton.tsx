export function SavingsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="card animate-pulse space-y-4 rounded-2xl p-5 border border-surface-variant/30"
        >
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 shrink-0 rounded-full bg-surface-container-highest" />
        
            <div className="flex-1 space-y-2 pt-1">
              <div className="h-5 w-3/4 rounded bg-surface-container-highest" />
              <div className="h-3 w-1/2 rounded bg-surface-container-highest/60" />
            </div>

            <div className="h-6 w-6 shrink-0 rounded-full bg-surface-container-highest/60" />
          </div>

          <div className="pt-2">
            <div className="flex items-end justify-between gap-4 mb-2">
              <div className="h-8 w-2/3 rounded bg-surface-container-highest" />
              <div className="h-5 w-10 rounded bg-surface-container-highest/60" />
            </div>
          </div>

          <div className="pt-1">
            <div className="h-2 w-full rounded-full bg-surface-container-highest">
              <div className="h-2 w-4 rounded-full bg-surface-container-highest" />
            </div>
          </div>
        </div>
      ))}

      <div className="flex min-h-55.5 animate-pulse flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-outline-variant/30 text-on-surface-variant/60">
        <div className="h-10 w-10 rounded-full bg-surface-container-highest" />
        <div className="h-4 w-24 rounded bg-surface-container-highest" />
      </div>
    </div>
  );
}