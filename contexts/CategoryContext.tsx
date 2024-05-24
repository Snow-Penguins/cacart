"use client";

import { createContext, useState, useContext, ReactNode } from "react";

interface Category {
  id?: number;
  name: string;
  option_id?: number;
}

interface CategoryContextType {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined,
);

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    id: 0,
    name: "All Categories",
    option_id: 0,
  });

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
