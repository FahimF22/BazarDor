export default function ProductSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card bg-base-100 shadow border border-base-200">
          <div className="card-body p-4 gap-3 items-center">
            <div className="skeleton h-12 w-12 rounded-full" />
            <div className="skeleton h-4 w-24" />
            <div className="skeleton h-3 w-16" />
            <div className="skeleton h-5 w-20 mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
