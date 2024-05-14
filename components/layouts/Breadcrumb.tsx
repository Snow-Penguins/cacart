"use client";

import Link from "next/link";

export default function Breadcrumb() {
  return (
    <div className="flex flex-row gap-8 justify-center items-center text-sm py-4 border-b border-gray-200">
      <Link href="/" className="text-primary_text hover:text-primary">
        Home
      </Link>
      <Link
        href="/best-seller"
        className="text-primary_text hover:text-primary"
      >
        🔥 Best Seller
      </Link>
      <Link
        href="/new-release"
        className="text-primary_text hover:text-primary"
      >
        New Releases
      </Link>
    </div>
  );
}
