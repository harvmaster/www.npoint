interface CaretPosition {
  start: number;
  end: number;
}

export const getCursorPosition = (element: HTMLElement): CaretPosition => {
  let start = 0;
  let end = 0;
  const doc = element.ownerDocument;
  if (!doc) return { start: 0, end: 0 };

  const win = doc.defaultView || (doc as Document & { parentWindow: Window }).parentWindow;

  let sel: Selection | null = null;
  if (typeof win?.getSelection !== "undefined") {
    sel = win.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.startContainer, range.startOffset);
      start = preCaretRange.toString().length;
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      end = preCaretRange.toString().length;
    }
  }

  return { start, end };
};

export default getCursorPosition;