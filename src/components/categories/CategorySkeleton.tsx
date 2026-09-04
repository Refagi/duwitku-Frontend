
export function CategorySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {[...Array(2)].map((_, groupIndex) => (
        <div
          key={groupIndex}
          className="card space-y-4 rounded-xl border border-surface-variant/30 p-5"
        >
          <div className="flex items-center justify-between pb-2 border-b border-surface-variant/20">
            <div className="h-6 w-32 animate-pulse rounded bg-surface-container-highest" />
            <div className="h-5 w-12 animate-pulse rounded-full bg-surface-container-highest/60" />
          </div>

          <div className="space-y-3 pt-2">
            {[...Array(5)].map((_, itemIndex) => (
              <div
                key={itemIndex}
                className="flex animate-pulse items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-surface-container-highest" />
                  <div className="h-4 w-28 rounded bg-surface-container-highest" />
                </div>
                <div className="h-6 w-6 rounded bg-surface-container-highest/60" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}