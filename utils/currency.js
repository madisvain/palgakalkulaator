const formatCurrency = (amount, locale = "et-EE") =>
  new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(
    amount
  );

export default formatCurrency;
