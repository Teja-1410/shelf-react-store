// The demo API gives prices in US dollars.
// This number is how many rupees equal 1 dollar.
// Search "1 USD to INR" on Google and update it when needed.
const DOLLAR_TO_RUPEE = 88;

// Takes a dollar price and returns text like "₹4,224"
export function formatPrice(dollarPrice) {
  const rupees = Math.round(dollarPrice * DOLLAR_TO_RUPEE); // convert and remove decimals
  return "₹" + rupees.toLocaleString("en-IN"); // add commas in Indian style
}
