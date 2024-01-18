interface Styling {
  [key: string]: string;
}

export const highlightText = (element: HTMLElement, start: number, end: number, styling: Styling): void => {
  const text = element.textContent || "";
  const before = text.slice(0, start);
  const selected = text.slice(start, end);
  const after = text.slice(end);
  const html = `${before}<span style="${Object.entries(styling).map(([key, value]) => `${key}: ${value}`).join("; ")}">${selected}</span>${after}`;
  element.innerHTML = html;
}

export default highlightText;