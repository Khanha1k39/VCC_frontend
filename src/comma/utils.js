export const getDiscountValue = (value, price) => {
  if (!value || !price) {
    return 0;
  }
  return (((value - price) * 100) / value).toFixed(0);
};
