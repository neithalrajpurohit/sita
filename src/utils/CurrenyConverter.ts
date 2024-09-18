export function formatCurrencyWithCommas(
  amount: number,
  currencySymbol: string
): string {
  const formattedAmount = amount.toLocaleString(undefined, {
    style: "currency",
    currency: currencySymbol,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formattedAmount;
}

// Example usage with multiple currency symbols
// const amount = 1234567.89;

// const usdFormatted = formatCurrencyWithCommas(amount, "USD");
// console.log(usdFormatted); // Outputs: "$1,234,567.89"

// const eurFormatted = formatCurrencyWithCommas(amount, "EUR");
// console.log(eurFormatted); // Outputs: "€1,234,567.89"

// const gbpFormatted = formatCurrencyWithCommas(amount, "GBP");
// console.log(gbpFormatted); // Outputs: "£1,234,567.89"
