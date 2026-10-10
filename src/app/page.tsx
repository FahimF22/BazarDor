import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import { getTopMovers } from "@/lib/utils";

export default async function HomePage() {
  let products: Awaited<ReturnType<typeof getProducts>> = [];

  try {
    products = await getProducts();
  } catch {
    // empty
  }

  const risers = getTopMovers(products, "up", 6);
  const fallers = getTopMovers(products, "down", 6);

  return (
    <div className="space-y-10 pb-12">
      <Hero />

      <div className="max-w-6xl mx-auto px-4 space-y-10">
        {risers.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-success">
              আজ দাম বেড়েছে ▲
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {risers.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {fallers.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-error">
              আজ দাম কমেছে ▼
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {fallers.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        <ProductGrid
          id="সব-পণ্য"
          products={products}
          showSort
          title="সব পণ্য"
          subtitle="আজকের বাজারের সকল পণ্যের তালিকা"
        />
      </div>
    </div>
  );
}