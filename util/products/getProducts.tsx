import { Product } from "@/entities/Product";
import { HttpError } from "@/lib/errors/httpError";

const getProducts = async (
  productUrl: string,
  optionId?: number,
): Promise<Product[] | undefined> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("API URL is not found");
    return [];
  }

  const url =
    optionId === 0
      ? `${apiUrl}/${productUrl}`
      : `${apiUrl}/${productUrl}?optionId=${optionId}`;

  try {
    const response = await fetch(url, {
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new HttpError(response);
    }
    const products: Product[] = await response.json();
    console.log(products);
    return products;
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

export default getProducts;
