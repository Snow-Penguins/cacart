"use client";

import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex items-center justrify-between border-b border-gray-200 p-4">
      <div className="ml-4 text-h4 text-primary">
        <Link href="/">CaCart</Link>
      </div>

      <div className="flex flex-1 justify-center gap-4">
        <button className="px-4 h-12">Categories</button>
        <div className="flex w-3/4 max-w-xl border border-gray-300 rounded-3xl overflow-hidden">
          <input
            type="search"
            className="w-full px-4 h-12 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search Your Item"
            required
          />
          <button
            type="submit"
            className="px-4 h-12 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-r-md"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex gap-2 mr-4">
        <button className="px-4 py-2 hover:text-blue-500">Login</button>
        <button className="px-4 py-2 hover:text-blue-500">My Orders</button>
        <button className="px-4 py-2 hover:text-blue-500">Cart</button>
      </div>
    </nav>
  );
}
