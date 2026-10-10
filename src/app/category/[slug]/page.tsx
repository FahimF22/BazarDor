import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { getProducts, getCategory } from "@/lib/api";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const [category, products] = await Promise.all([
    getCategory(slug),
    getProducts(slug),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-base-content/60">
            {products.length} টি পণ্য পাওয়া গেছে
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <p className="text-5xl">😕</p>
          <p className="text-xl font-medium">এই ক্যাটাগরিতে কোনো পণ্য নেই</p>
          <Link href="/" className="btn btn-primary">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <ProductGrid products={products} showSort />
      )}
    </div>
  );
}