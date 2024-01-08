export const handleKeyDown = (e: KeyboardEvent, target: HTMLElement) => {
  if (e.key === 'Tab') {
    append(e, '  ', -1, target)
  }
  if (e.key === 'Enter') {
    handleEnter(e, target)
  }
}

export const handleInput = (e: Event, target: HTMLElement) => {
  if (e.data === '[') {
    append(e, ']', 0, target)
  }
  if (e.data === '{') {
    append(e, '}', 0, target)
  }
  if (e.data === '(') {
    append(e, ')', 0, target)
  }
  if (e.data === '"') {
    if (isUnescaped('"', target)) {
      append(e, '"', 0, target)
    }
  }
  if (e.data === "'") {
    if (!isUnescaped("'", target)) {
      append(e, "'", 0, target)
    }
  }
  if (e.data === '`') {
    if (!isUnescaped('`', target)) {
      append(e, '`', 0, target)
    }
  }


}

export const append = (e: Event, str: string, newPosition = -1, target: HTMLElement) => {
  e.preventDefault()
  const selection = window.getSelection()
  if (!selection) return

  const range = selection?.getRangeAt(0)
  const tabNode = document.createTextNode(str)
  range.insertNode(tabNode)
  range.setStartAfter(tabNode)
  range.setEndAfter(tabNode)
  selection.removeAllRanges()
  selection.addRange(range)
  if (newPosition !== -1) {
    range.setStart(tabNode, newPosition)
    range.setEnd(tabNode, newPosition)
    selection.removeAllRanges()
    selection.addRange(range)
  }
}

const cursor_position = () => {
  const sel = document.getSelection();
  if (!sel) return 0;

  sel.modify("extend", "backward", "lineboundary");
  const pos = sel.toString().length;
  if (sel.anchorNode !== undefined) sel.collapseToEnd();

  return pos;
}

// Keep previous indentation
export const handleEnter = (e: KeyboardEvent, target: HTMLElement) => {
  const pos = cursor_position();
  const selection = window.getSelection();
  if (!selection) return

  const range = selection.getRangeAt(0);

  // Get the text content of the line before the cursor
  const content = range.startContainer.textContent;
  if (!content) return

  const lineStartPos = content.lastIndexOf('\n', pos - 1) + 1;
  const lineBeforeCursor = content.substring(lineStartPos, pos);
  if (!lineBeforeCursor) return

  // Get the indentation of the current line, considering empty but indented lines
  let indentation = lineBeforeCursor.match(/^\s*/)?.[0];

  // If the line is completely empty, use the previous non-empty line's indentation
  if (lineBeforeCursor.trim() === '') {
    const lines = content.split('\n');
    let prevIndentation = '';
    for (let i = lineStartPos - 2; i >= 0; i--) {
      if (content[i] === '\n') {
        prevIndentation = lines[i].match(/^\s*/)[0];
        if (prevIndentation.trim() !== '') {
          indentation = prevIndentation;
          break;
        }
      }
    }
  }

  // Insert a new line and the calculated indentation
  const newline = document.createTextNode('\n' + indentation);
  range.insertNode(newline);
  range.setStartAfter(newline);
  range.setEndAfter(newline);
  selection.removeAllRanges();
  selection.addRange(range);

  e.preventDefault();
}

export const isUnescaped = (char: string, target: HTMLElement) => {
  const pos = cursor_position();
  const selection = window.getSelection();
  if (!selection) return false

  const range = selection.getRangeAt(0);
  const content = range.startContainer.textContent;
  if (!content) return false
  console.log(content)

  const lineStartPos = content.lastIndexOf('\n', pos - 1) + 1;
  const lineBeforeCursor = content.substring(lineStartPos, pos);
  if (!lineBeforeCursor) return false

  console.log(pos)
  console.log(lineStartPos)
  console.log(lineBeforeCursor)

  const lineBeforeCursorEscaped = lineBeforeCursor.replace(new RegExp(`\\\\${char}`, 'g'), '');
  console.log(lineBeforeCursorEscaped)
  if (lineBeforeCursorEscaped.match(new RegExp(char, 'g'))?.length % 2 === 0) {
    return true
  }
  return false
}