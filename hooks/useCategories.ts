import { useState, useEffect } from "react";

interface Category {
  id?: number;
  name: string;
  option_id?: number;
}

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/product-category`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const fetchedCategories = await response.json();
        setCategories([
          { id: 0, name: "All Caegories", option_id: 0 },
          ...fetchedCategories,
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
  }, [apiUrl]);

  return { categories, loading, error };
};

export default useCategories;
