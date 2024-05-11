// Define a formatter for currency amounts in Canadian dollars (CAD)
// This formatter is created using Intl.NumberFormat with options for currency style and currency code
// It formats numbers into currency strings with the specified currency symbol and locale
const formatter = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
});

export default formatter;
