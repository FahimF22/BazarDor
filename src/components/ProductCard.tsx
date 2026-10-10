"use client";

import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice, formatPct, unitLabel } from "@/lib/utils";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { change } = product;
  const isUp = change.dir === "up";
  const isDown = change.dir === "down";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="card bg-base-100 shadow-md hover:shadow-xl transition-all border border-base-200 hover:border-primary/30"
    >
      <div className="card-body p-4 sm:p-5 gap-2">
        <div className="text-4xl sm:text-5xl text-center mb-1">{product.image}</div>
        <h3 className="font-bold text-base sm:text-lg text-center leading-snug line-clamp-2">
          {product.nameBn}
        </h3>
        <p className="text-xs sm:text-sm text-base-content/60 text-center">
          {unitLabel(product.unit)}
        </p>
        <div className="flex flex-col items-center gap-1 mt-2">
          <span className="text-xs text-base-content/50">আজকের দাম</span>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="font-bold text-lg sm:text-xl text-primary">
              {formatPrice(product.today)}
            </span>
            <span
              className={`badge badge-sm font-semibold ${
                isUp
                  ? "badge-success text-success-content"
                  : isDown
                  ? "badge-error text-error-content"
                  : "badge-ghost"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"} {formatPct(change.pct)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}