import { useState, useEffect } from "react";

type Category = {
  id: number;
  name: string;
};

const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/product-category`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const fetchedCategories = await response.json();
        setCategories([
          "All Categories",
          ...fetchedCategories.map((cat: Category) => cat.name),
        ]);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategories;
