import React from "react";
import useCategories from "@/hooks/useCategories";
import exp from "constants";

const CategoryDropdown = () => {
  const { categories, loading, error } = useCategories();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading categories</div>;
  }

  return (
    <div className="absolute mt-12 bg-white shadow-md p-2">
      {categories.map((category, index) => (
        <div key={index} className="p-2 hover:bg-gray-100">
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategoryDropdown;
