"use client";

import Image from "next/image";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";
import { LiaShoppingCartSolid } from "react-icons/lia";
import useCategories from "@/hooks/useCategories";
import { useState } from "react";

export default function NavigationBar() {
  const { categories, loading, error } = useCategories();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const DefaultIconSize = 24;
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 p-4">
      {/* Logo */}
      <div className="ml-4 text-h4 text-primary">
        <Link href="/">
          <Image
            src="../logo/logo_150X60.png"
            alt="CaCart"
            width={150}
            height={60}
          />
        </Link>
      </div>

      {/* Categories and Search Bar */}
      <div className="flex flex-1 justify-center gap-4">
        <div className="flex items-center relative">
          <div className="flex flex-col justify-center items-center mr-2">
            <span className="block w-3 min-h-0.5 bg-black" />
            <span className="block w-3 min-h-0.5 bg-black my-0.5" />
            <span className="block w-3 min-h-0.5 bg-black" />
          </div>
          <button onClick={toggleDropdown} className="mr-3 h-12 text-sm">
            {selectedCategory}
          </button>
          {isDropdownOpen && (
            <div className="absolute w-32 mt-2 py-2 bg-white shadow-lg rounded-lg top-3/4 right-0">
              {loading && <div>Loading...</div>}
              {error && <div>Error loading categories</div>}
              {!loading &&
                !error &&
                categories.map((category, index) => (
                  <button
                    key={index}
                    className="absoulte top-100% block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 w-full text-left"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </button>
                ))}
            </div>
          )}
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
        {/* Login */}
        <div className="flex ">
          <Link href="/auth/signin">
            <button className="flex items-center px-4 py-2 hover:text-blue-500">
              <RxAvatar size={DefaultIconSize} className="mr-2" />
              Login
            </button>
          </Link>
        </div>
        {/* My Orders */}
        <div>
          <Link href="/order">
            <button className="flex items-center px-4 py-2 hover:text-blue-500">
              My Orders
            </button>
          </Link>
        </div>
        {/* Cart */}
        <div>
          <Link href="/cart">
            <button className="flex items-center px-4 py-1 hover:text-blue-500">
              <LiaShoppingCartSolid size={30} />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
