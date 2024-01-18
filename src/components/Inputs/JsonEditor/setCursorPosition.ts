
export const setCursorPosition = (element: HTMLElement, start: number, end: number): void => {
  const doc = element.ownerDocument;
  if (!doc) return;

  const win = doc.defaultView || (doc as Document & { parentWindow: Window }).parentWindow;

  if (typeof win?.getSelection !== "undefined") {
    const sel = win.getSelection();
    if (sel) {
      const range = doc.createRange();
      let currentNode: Node | null = element;
      let previousLength = 0;

      while (currentNode) {
        if (currentNode.nodeType === Node.TEXT_NODE) {
          const textLength = currentNode.textContent ? currentNode.textContent.length : 0;
          if (previousLength + textLength >= start) {
            range.setStart(currentNode, start - previousLength);
            break;
          }
          previousLength += textLength;
        } else {
          const children = currentNode.childNodes;
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child.nodeType === Node.TEXT_NODE) {
              const textLength = child.textContent ? child.textContent.length : 0;
              if (previousLength + textLength >= start) {
                range.setStart(child, start - previousLength);
                break;
              }
              previousLength += textLength;
            }
          }
        }
        currentNode = currentNode.nextSibling;
      }

      // If you want to set the end position as well, use range.setEnd similarly
      range.collapse(true); // Collapses the range to the start

      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
};

export default setCursorPosition;