export function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 rounded-xl bg-gray-100 dark:bg-gray-800" />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="h-80 rounded-xl bg-gray-100 dark:bg-gray-800 lg:col-span-2" />
        <div className="h-80 rounded-xl bg-gray-100 dark:bg-gray-800" />
      </div>

      <div className="h-64 rounded-xl bg-gray-100 dark:bg-gray-800" />
    </div>
  );
}