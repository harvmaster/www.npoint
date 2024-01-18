import getClosingPair from "./getClosingPair";
import getCursorPosition from "./getCursorPosition";

export const getClosingLocation = (element: HTMLElement, symbol: string): number => {
  const text = element.textContent || "";
  const { start } = getCursorPosition(element);
  const before = text.slice(0, start);
  const after = text.slice(start);
  const pair = getClosingPair(symbol);
  const index = after.indexOf(pair);
  return index === -1 ? -1 : index + start;
}

export default getClosingLocation;