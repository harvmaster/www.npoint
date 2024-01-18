<template>
  <!-- <div class="input-container">
    <input class="route-input route" v-model="content" type="url" @focus="focusURL" @blur="blurURL" @keyup="onType" @mouseup="onMouseUp" />
    <div class="route-url route" :class="isFocused ? 'focused' : ''" v-html="formattedContent" data-placeholder="https://example.com/api/v1" />
  </div> -->
  <div ref="routeInput" class="route" contenteditable v-html="content" @blur="onBlur" @keydown="filterKeys" data-placeholder="https://example.com/api/v1" spellcheck="false" />

</template>

<style scoped lang="scss">
.route {
  height: 2.5em;
  overflow-y: hidden;
  overflow-x: auto;
  white-space: nowrap;
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

.route > div {
  &::selection {
    background-color: $blue-grey-7;
    color: $blue-grey-9;
  }
}
</style>

<script setup lang="ts"> 
import { defineModel, ref } from 'vue'

const route = defineModel<string>({
  default: () => '',
})
const content = ref('')
const routeInput = ref<HTMLElement | null>(null)

const parameterColor = '#ffeb50'
const onBlur = (e: Event) => {
  const path = e.target.textContent || ''

  const formattedContent = formatContent(path)
  content.value = formattedContent
  
  routeInput.value?.scrollTo({
    left: 0,
    behavior: 'smooth'
  })
  console.log(content.value)

  // Remove html from text
  const plainText = content.value.replace(/<[^>]*>?/gm, '')
  console.log(plainText)
  route.value = plainText
}

const filterKeys = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.stopPropagation()
    return
  }
}

const formatContent = (content: string) => {
  const paths = content.split('/')
  const formattedPaths = paths.map((path: string) => {
    if (path === '') {
      return ''
    }
    if (path.startsWith(':') || path.startsWith('<')) {
      return `<div style=\"color: ${parameterColor} !important\">${path}</div>`
    }
    return`${path}`
  })

  return formattedPaths.join('/')
}

// // https://example.com/api/v1/user/:id

</script>
```