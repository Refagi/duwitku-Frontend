export function HistorySkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="card animate-pulse rounded-xl border border-surface-variant/30 p-5 space-y-4"
        >
          <div className="h-4 w-36 rounded bg-surface-container-highest" />

          <div className="space-y-3 pt-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-surface-variant/10 last:border-none"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-surface-container-highest" />
                  
                  <div className="space-y-1.5">
                    <div className="h-4 w-32 rounded bg-surface-container-highest" />
                    <div className="h-3 w-20 rounded bg-surface-container-highest/60" />
                  </div>
                </div>

                <div className="space-y-1.5 text-right">
                  <div className="h-4 w-24 rounded bg-surface-container-highest ml-auto" />
                  <div className="h-3 w-12 rounded bg-surface-container-highest/60 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}