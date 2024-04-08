import { useState, useEffect } from "react";

const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch categories here from the DB
        // mock data below
        const fetchedCategories = [
          "All Categories",
          "Category 1",
          "Category 2",
          "Category 3",
        ];
        setCategories(fetchedCategories);
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
