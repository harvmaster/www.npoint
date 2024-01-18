export const getClosingPair = (symbol: string): string => {
  switch (symbol) {
    case "{":
      return "}";
    case "[":
      return "]";
    case "(":
      return ")";
    case '"':
      return '"';
    case "'":
      return "'";
    case '`':
      return '`';
    default:
      return "";
  }
}

export default getClosingPair;