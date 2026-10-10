"use client";

import type { SortOption } from "@/types";

interface Props {
  value: SortOption;
  onChange: (v: SortOption) => void;
}

const options: { value: SortOption; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

export default function SortDropdown({ value, onChange }: Props) {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-outline btn-sm gap-1">
        সাজান
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </label>
      <ul tabIndex={0} className="dropdown-content z-20 menu p-2 shadow bg-base-100 rounded-box w-52 border border-base-200">
        {options.map((opt) => (
          <li key={opt.value}>
            <button
              className={value === opt.value ? "active font-semibold" : ""}
              onClick={() => onChange(opt.value)}
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}