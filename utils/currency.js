import { format } from "mathjs";

const formatCurrency = (amount, symbol) =>
  `${format(amount, { notation: "fixed", precision: 2 })} ${symbol}`;

export default formatCurrency;
