export function computePricing({ pricePerNight, nights, cleaningFee, serviceFee, taxes }) {
  const nightsSubtotal = pricePerNight * nights;
  const total = nights > 0 ? nightsSubtotal + cleaningFee + serviceFee + taxes : 0;
  return {
    nightsSubtotal,
    cleaningFee: nights > 0 ? cleaningFee : 0,
    serviceFee: nights > 0 ? serviceFee : 0,
    taxes: nights > 0 ? taxes : 0,
    total,
  };
}

export function formatCurrency(amount, currency = "₹") {
  return `${currency}${Math.round(amount).toLocaleString("en-IN")}`;
}
