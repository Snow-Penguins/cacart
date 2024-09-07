"use client";

import Image from "next/image";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";
import { LiaShoppingCartSolid } from "react-icons/lia";
import useCategories from "@/hooks/useCategories";
import { useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { RxHamburgerMenu } from "react-icons/rx";
import { useCategory } from "@/contexts/CategoryContext";

const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default function NavigationBar() {
  const { categories, loading, error } = useCategories();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { selectedCategory, setSelectedCategory } = useCategory();
  const { user, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSearch = async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product-search?q=${query}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 700), []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedHandleSearch(query);
  };

  const handleResultClick = () => {
    setSearchResults([]);
    setSearchQuery("");
  };

  const DefaultIconSize = 24;

  return (
    <nav className="flex flex-wrap items-center border-b border-gray-200 py-4">
      <div className="w-full tablet:w-auto flex items-center justify-between">
        {/* Logo and Categories */}
        <div>
          <Link href="/">
            <Image
              src="/logo/logo_150X60.png"
              alt="CaCart"
              width={150}
              height={60}
              priority
            />
          </Link>
        </div>
        <div className="pl-10 pr-2">
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="mr-3 h-12 text-sm bg-white border-none flex flex-row items-center gap-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <RxHamburgerMenu />
              {selectedCategory.name}
            </button>
            {isDropdownOpen && (
              <ul
                tabIndex={0}
                className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {loading && <li>Loading...</li>}
                {error && <li>Error loading categories</li>}
                {!loading &&
                  !error &&
                  categories.map((category: any) => (
                    <li
                      key={category.id}
                      onClick={() => handleCategorySelect(category)}
                    >
                      <a>{category.name}</a>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full tablet:w-auto flex flex-grow justify-center gap-4 my-2">
        <form className="flex items-center w-full max-w-xl rounded-full overflow-hidden bg-gray-200 border-2 border-black focus-within:border-blue-500">
          <input
            type="search"
            className="flex-grow px-4 h-12 text-sm text-gray-700 bg-gray-200 rounded-full outline-none"
            placeholder="Search Your Item"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
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

        {/* Search Result */}
        {searchResults.length > 0 && (
          <div className="absolute left-0 right-0 mx-auto top-full bg-white shadow-lg rounded-lg z-10 w-full max-w-xl mt-1">
            <ul>
              {searchResults.map((result: { id: string; name: string }) => (
                <li
                  key={result.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                >
                  <Link
                    href={`/product/${result.id}`}
                    onClick={handleResultClick}
                    className="flex items-center w-full"
                  >
                    <svg
                      className="w-5 h-5 mr-2 text-gray-500"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    {result.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="w-full tablet:w-auto flex gap-2 justify-center px-2 desktop:pr-10">
        {user ? (
          <div className="flex items-center px-4 py-2 hover:text-blue-500 relative">
            <button onClick={toggleDropdown} className="flex items-center">
              <RxAvatar size={DefaultIconSize} className="mr-2" />
              {user.email_address}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-1.5 top-7 py-2 bg-white shadow-lg rounded-lg">
                <Link
                  href="/profile-setting"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                  onClick={toggleDropdown}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    toggleDropdown();
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex">
            <Link href="/auth/signin">
              <button className="flex items-center px-4 py-2 hover:text-blue-500">
                <RxAvatar size={DefaultIconSize} className="mr-2" />
                Login
              </button>
            </Link>
          </div>
        )}

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
