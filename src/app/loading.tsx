import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="skeleton h-40 w-full rounded-box" />
      <ProductSkeleton count={8} />
    </div>
  );
}
