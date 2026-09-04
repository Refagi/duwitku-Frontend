export function AccountSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="card animate-pulse space-y-4 rounded-xl p-5 border border-surface-variant/30"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-surface-container-highest" />
              <div className="space-y-1">
                <div className="h-4 w-28 rounded bg-surface-container-highest" />
                <div className="h-3 w-16 rounded bg-surface-container-highest/60" />
              </div>
            </div>
            <div className="h-6 w-6 rounded-full bg-surface-container-highest" />
          </div>

          <div className="pt-2">
            <div className="h-3 w-20 rounded bg-surface-container-highest/60 mb-2" />
            <div className="h-7 w-36 rounded bg-surface-container-highest" />
          </div>
        </div>
      ))}
    </div>
  );
}