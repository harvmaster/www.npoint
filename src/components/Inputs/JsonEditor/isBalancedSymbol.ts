import { getCursorPosition } from "./getCursorPosition";

export const isBalancedSymbol = (element: HTMLElement, symbol: string, pair: string): boolean => {
  const { start, end } = getCursorPosition(element);
  const text = element.textContent || "";
  const before = text.slice(0, start);
  const after = text.slice(end);
  const balanced = (before.match(new RegExp(symbol, "g")) || []).length === (after.match(new RegExp(pair, "g")) || []).length;
  return balanced;
};

export default isBalancedSymbol;