"use client";

import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex items-center justrify-between border-b border-gray-200 p-4">
      <div className="ml-4 text-h4 text-primary">
        <Link href="/">CaCart</Link>
      </div>

      <div className="flex flex-1 justify-center gap-4">
        <div className="flex items-center">
          <div className="flex flex-col justify-center items-center mr-2">
            <span className="block w-3 min-h-0.5 bg-black" />
            <span className="block w-3 min-h-0.5 bg-black my-0.5" />
            <span className="block w-3 min-h-0.5 bg-black" />
          </div>
          <button className="mr-3 h-12 text-sm">Categories</button>
        </div>
        <form className="flex items-center w-3/4 max-w-xl rounded-full overflow-hidden bg-gray-200 border-2 border-black focus-within:border-blue-500">
          <input
            type="search"
            className="flex-grow px-4 h-12 text-sm text-gray-700 bg-gray-200 rounded-full outline-none"
            placeholder="Search Your Item"
            required
          />
          <button
            type="submit"
            className="flex items-center justify-center mr-1.5 text-white bg-primary rounded-full"
            style={{
              width: "2.25rem",
              height: "80%",
            }}
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
        </form>
      </div>

      <div className="flex gap-2 mr-4">
        <button className="px-4 py-2 hover:text-blue-500">Login</button>
        <button className="px-4 py-2 hover:text-blue-500">My Orders</button>
        <button className="px-4 py-2 hover:text-blue-500">Cart</button>
      </div>
    </nav>
  );
}
