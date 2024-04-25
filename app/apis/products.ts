export async function FetchProducts(apiUrl: string) {
  try {
    if (!apiUrl) {
      console.error("API URL is not defined");
      return;
    }

    const response = await fetch(`${apiUrl}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data from lcoalhost:8000 -", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
