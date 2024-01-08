<template>
  <div class="row editor-container">
    <div class="col-12">
      <div class="editor" contenteditable @input="onInput" @keydown="onKeydown" @blur="saveLines">
        {{ lines }}
      </div>
    </div>

    <div class="output">
      <div v-if="jsonOutput.error">
        <span class="text-danger">{{ jsonOutput.error }}</span>
      </div>
      <!-- <pre v-else>{{ jsonOutput.json }}</pre> -->
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

.output {
  text-wrap: pretty;
}
</style>

<script setup lang="ts">
import { ref, computed, defineModel } from 'vue'

import { handleInput, handleKeyDown } from './JSONEditor/handleKeys'

const json = defineModel<string>({ default: '' })
const lines = ref<string>()

const jsonOutput = computed(() => {
  try {
    // clean up the lines
    const cleanedLines = json.value
      // .replace(/<div>/g, '')
      // .replace(/<\/div>/g, '')
      // .replace(/<br>/g, '')
      // .replace(/&nbsp;/g, '')
      // .replace(/&lt;/g, '<')
      // .replace(/&gt;/g, '>')
      // .replace(/&amp;/g, '&')
    console.log(cleanedLines)
    const parsed = JSON.parse(cleanedLines)
    console.log(parsed)
    return {
      json: JSON.stringify(JSON.parse(cleanedLines), null, 2),
      error: null
    }
  } catch (e) {
    return {
      json: null,
      error: e.message
    }
  }
})

const onInput = (e: Event) => {
  handleInput(e, e.target)
  const content = e.target.innerHTML || ''
  json.value = content
}
const onKeydown = (e: KeyboardEvent) => {
  handleKeyDown(e, e.target)
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