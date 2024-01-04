<template>
  <div class="row editor-container">
    <div class="col-12">
      <div class="editor" contenteditable @input="onInput" @keydown="handleKeys" @blur="saveLines">
        {{ lines }}
      </div>
    </div>
    <div class="output">
      <pre>{{ jsonOutput }}</pre>
    </div>
  </div>
</template>

<style scoped lang="scss">
.editor-container {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: $blue-grey-9;
  border-radius: 0.5em;
  padding: 0.5em 1em;
  font-size: 1.5em;
  border: none;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  color: $blue-grey-3;

  caret-color: $blue-grey-3;

  
  &:focus, &:hover {
    outline: none;
    box-shadow: none;
    background-color: $blue-grey-8;
  }
  &:empty:before {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    content: attr(data-placeholder);
    color: $blue-grey-5;
  }
  &::-webkit-scrollbar {
    height: 4px;
    width: 100%;
    margin-top: 1em;
    transform: translateY(5px);
  }
  &::-webkit-scrollbar-track {
    transform: translateY(5px);
    background-color: $blue-grey-9;
  }
  &::-webkit-scrollbar-thumb {
    transform: translateY(5px);
    background-color: $blue-grey-7;
    border-radius: 3px;
  }

}

.editor {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0.5em 0;
  font-family: monospace;
  white-space: pre;
  overflow-x: auto;
  overflow-y: hidden;

  &::selection {
    background-color: $blue-grey-7;
    color: $blue-grey-9;
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }

  &::-webkit-scrollbar {
    height: 4px;
    width: 100%;
    margin-top: 1em;
    transform: translateY(5px);
  }
  &::-webkit-scrollbar-track {
    transform: translateY(5px);
    background-color: $blue-grey-9;
  }
  &::-webkit-scrollbar-thumb {
    transform: translateY(5px);
    background-color: $blue-grey-7;
    border-radius: 3px;
  }


}
.line-number {
  width: 2em;
  min-width: fit-content;
  text-align: right;
  padding-right: 0.5em;
  color: $blue-grey-5;
  border-right: 1px solid $blue-grey-8;
}
.line-content {
  padding-left: 0.5em;
  color: $blue-grey-3;
  font-family: monospace;
  white-space: pre;
  overflow-x: auto;
  overflow-y: hidden;

  &::selection {
    background-color: $blue-grey-7;
    color: $blue-grey-9;
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }

  &::-webkit-scrollbar {
    height: 4px;
    width: 100%;
    margin-top: 1em;
    transform: translateY(5px);
  }
  &::-webkit-scrollbar-track {
    transform: translateY(5px);
    background-color: $blue-grey-9;
  }
  &::-webkit-scrollbar-thumb {
    transform: translateY(5px);
    background-color: $blue-grey-7;
    border-radius: 3px;
  }

}
</style>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'

// const lines = ref<string[]>([
//   // '{',
//   // '  "name": "test"',
//   // '  "age": 20',
//   // '}',
// ])
const lines = ref<string>('{\n  "name": "test"\n  "age": 20\n}')
const json = ref('')

const jsonOutput = computed(() => {
  try {
    // clean up the lines
    const cleanedLines = json.value
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '')
      .join('')
    console.log(cleanedLines)
    return JSON.stringify(JSON.parse(cleanedLines), null, 2)
  } catch (e) {
    return e.message
  }
})

const onInput = (e) => {
  console.log(e)
}

const handleKeys = (e: KeyboardEvent) => {
  // Get current caret position
  function cursor_position() {
    var sel = document.getSelection();
    sel.modify("extend", "backward", "lineboundary");
    var pos = sel.toString().length;
    if (sel.anchorNode !== undefined) sel.collapseToEnd();

    return pos;
  }

  let addedKey = false
  const addKeys = (keys: string, setPosition = -1) => {
    e.preventDefault()
    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    const tabNode = document.createTextNode(keys)
    range.insertNode(tabNode)
    range.setStartAfter(tabNode)
    range.setEndAfter(tabNode)
    selection.removeAllRanges()
    selection.addRange(range)
    if (setPosition !== -1) {
      range.setStart(tabNode, setPosition)
      range.setEnd(tabNode, setPosition)
      selection.removeAllRanges()
      selection.addRange(range)
    }
    addedKey = true
  }

  if (e.key === 'Tab') {
    addKeys('  ')
  }

  // Autocomplete [] and {} and ()
  if (e.key === '(') {
    addKeys('()', 1)
  }

  if (e.key === '{') {
    addKeys('{}', 1)
  }

  if (e.key === '[') {
    addKeys('[]', 1)
  }
  
  // Handle quotes
  if (e.key === '"') {
    addKeys('""', 1)
  }

  if (e.key === "'") {
    addKeys("''", 1)
  }

  if (e.key === '`') {
    addKeys('``', 1)
  }
  
  // On Enter get the correct indentation - This is broken. On an empty lines, it will lose an indentation on every subsequent empty line
  if (e.key === 'Enter') {
    const pos = cursor_position();
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    // Get the text content of the line before the cursor
    const content = range.startContainer.textContent;
    const lineStartPos = content.lastIndexOf('\n', pos - 1) + 1;
    const lineBeforeCursor = content.substring(lineStartPos, pos);

    // Get the indentation of the current line, considering empty but indented lines
    let indentation = lineBeforeCursor.match(/^\s*/)[0];

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
    addedKey = true
  }

  // Filter silent keys
  const silentKeys = [
    'Shift',
    'Control',
    'Alt',
    'Meta',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Home',
    'End',
    'PageUp',
    'PageDown',
    'CapsLock',
    'Tab',
    'Enter',
    'Escape',
    'Backspace',
    'Delete',
    'Insert',
    'F1',
    'F2',
    'F3',
    'F4',
    'F5',
    'F6',
    'F7',
    'F8',
    'F9',
    'F10',
    'F11',
    'F12'
  ]
  if (silentKeys.includes(e.key)) {
    addedKey = true
  }

  if (!addedKey) {
    e.preventDefault()
    addKeys(e.key)
  }

  const position = cursor_position()

  console.log(e.key)

  // Update the lines
  const content = e.target.innerHTML || ''
  json.value = content
}

const saveLines = (e: FocusEvent) => {
  console.log(`lines: ${lines.value}`)
  const content = e.target.innerHTML || ''
  lines.value = content
  json.value = content
}
</script>