// This is the free demo API that gives us the product data.
// Open this link in your browser to see the raw data: https://dummyjson.com/products?limit=5
const API_URL = "https://dummyjson.com/products?limit=100";

// This function asks the API for products and returns them.
export async function fetchProducts() {
  const response = await fetch(API_URL); // 1. send the request

  if (!response.ok) {
    // 2. if something went wrong, stop and show an error
    throw new Error("Could not load products. Check your internet and try again.");
  }

  const data = await response.json(); // 3. convert the response into a JavaScript object
  return data.products; // 4. return the list of products
}
