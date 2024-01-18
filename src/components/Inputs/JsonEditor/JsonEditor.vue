<template>
  <div class="editor-container">
    <slot name="editor">
      <div class="editor" contenteditable v-html="content" @input="handleInput" @keydown="handleKeydown" @blur="handleBlur">

      </div> 
    </slot>
  </div>
</template>

<style scoped lang="scss">
.editor {
  display: inline-block;
  // flex-direction: column;
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

.json-key {
  color: $blue-grey-5;
}

.json-value {
  color: $blue-grey-7;
}

.json-string {
  color: $blue-7;
}

.json-boolean {
  color: $blue-1;
}

.json-number {
  color: $green-7;
}

.json-bracket {
  color: $amber-5;
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { validMethods } from 'workbox-routing/utils/constants';
import { cursor_position, getCaretPosition } from '../JSONEditor/handleKeys'
// import { getCursorPosition } from './getCursorPosition'

import { getCursorPosition, isBalancedSymbol, insertText, highlightText, getClosingPosition, applySyntaxHighlighting, setCursorPosition } from '../JsonEditor';

const content = ref<string>('')

const handleInput = (e: Event) => {
  console.log(e)
  console.log(cursor_position())
  const caret = getCursorPosition(e.target)
  console.log(`caret:`)
  console.log(caret)

  const char = e.data
  console.log(`char: ${char}`)

  if (char === '{') {
    const balance = isBalancedSymbol(e.target, char, '}')
    console.log(`balance: ${balance}`)
    if (!balance) insertText(e, '}', 0)
  }
  console.log(`content: ${e.target.innerHTML}`)

  applySyntaxHighlighting(e.target)

  setCursorPosition(e.target, caret.start)

  // highlight text
  // const styling = {
  //   'background-color': 'blue',
  // }
  // highlightText(e.target, caret, caret+1, styling)

  // const closingPosition = getClosingPosition(e.target, caret)
  // console.log(`closingPosition: ${closingPosition}`)
  // highlightText(e.target, closingPosition, closingPosition+1, styling)
}

const handleKeydown = (e: KeyboardEvent) => {
  console.log(`keydown: ${e}`)
  console.log(e)
}

const handleBlur = (e: FocusEvent) => {
  console.log(`blur: ${e}`)
  content.value = e.target.innerHTML
}

</script>