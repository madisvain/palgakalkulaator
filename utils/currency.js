import { format } from "mathjs";

const formatCurreny = (amount, symbol) =>
  `${format(amount, { notation: "fixed", precision: 2 })} ${symbol}`;

export default formatCurreny;
