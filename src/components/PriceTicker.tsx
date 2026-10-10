"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types";
import { formatPrice, formatPct } from "@/lib/utils";

interface Props {
  products: Product[];
}

export default function PriceTicker({ products }: Props) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    setItems([...products, ...products]);
  }, [products]);

  if (!items.length) return null;

  return (
    <div className="bg-base-200 border-y border-base-300 overflow-hidden py-2">
      <div className="ticker-track flex gap-8 whitespace-nowrap">
        {items.map((p, i) => {
          const isUp = p.change.dir === "up";
          const isDown = p.change.dir === "down";
          return (
            <span
              key={`${p.id}-${i}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium"
            >
              <span>{p.image}</span>
              <span>{p.nameBn}</span>
              <span className="text-primary font-semibold">
                {formatPrice(p.today)}/{p.unit === "kg" ? "কেজি" : p.unit}
              </span>
              <span
                className={
                  isUp ? "text-success" : isDown ? "text-error" : "text-base-content/50"
                }
              >
                {isUp ? "▲" : isDown ? "▼" : "—"} {formatPct(p.change.pct)}
              </span>
            </span>
          );
        })}
      </div>

      <style jsx>{`
        .ticker-track {
          animation: marquee 40s linear infinite;
          width: max-content;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}