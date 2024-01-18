export const insertText = (e: Event, str: string, newPosition = -1): void => {
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
};

export default insertText;