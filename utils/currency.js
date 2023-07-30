const formatCurrency = (amount) =>
  new Intl.NumberFormat("et-EE", { style: "currency", currency: "EUR" }).format(
    amount
  );

export default formatCurrency;
