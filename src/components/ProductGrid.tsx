"use client";

import { useState, useMemo } from "react";
import type { Product, SortOption } from "@/types";
import ProductCard from "./ProductCard";
import SortDropdown from "./SortDropdown";
import { sortProducts } from "@/lib/utils";

interface Props {
  products: Product[];
  showSort?: boolean;
  title?: string;
  subtitle?: string;
  id?: string;
}

export default function ProductGrid({
  products,
  showSort = false,
  title,
  subtitle,
  id,
}: Props) {
  const [sort, setSort] = useState<SortOption>("default");

  const sorted = useMemo(() => sortProducts(products, sort), [products, sort]);

  return (
    <section id={id} className="space-y-4">
      {(title || showSort) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            {title && <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>}
            {subtitle && <p className="text-sm text-base-content/60 mt-0.5">{subtitle}</p>}
          </div>
          {showSort && <SortDropdown value={sort} onChange={setSort} />}
        </div>
      )}

      {sorted.length === 0 ? (
        <div className="text-center py-12 space-y-3">
          <p className="text-4xl">😕</p>
          <p className="text-lg font-medium">কোনো পণ্য পাওয়া যায়নি</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {sorted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}