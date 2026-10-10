import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="skeleton h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <div className="skeleton h-6 w-32" />
          <div className="skeleton h-4 w-20" />
        </div>
      </div>
      <ProductSkeleton count={8} />
    </div>
  );
}
