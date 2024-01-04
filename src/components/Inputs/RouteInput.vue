<template>
  <div class="input-container">
    <input class="route-input route" v-model="content" type="url" @focus="focusURL" @blur="blurURL" @keyup="onType" @mouseup="onMouseUp" />
    <div class="route-url route" :class="isFocused ? 'focused' : ''" v-html="formattedContent" data-placeholder="https://example.com/api/v1" />
  </div>
</template>

<style scoped lang="scss">
.input-container {
  position: relative;
  width: 100%;
  height: 3em;
  border-radius: 0.5em;

}

.input-container:hover .route {
  background-color: $blue-grey-8;
}

.route {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 1em;
  font-size: 1.5em;
  border-radius: 0.5em;
  background-color: $blue-grey-9;
  border: none;
  transition: all 0.2s ease-in-out;
}

.route-input {
  opacity: 0.25;
  z-index: 2;
  color: transparent;
  pointer-events: auto;
  &:focus, &:hover {
    outline: none;
    box-shadow: none;
    background-color: $blue-grey-8;
  }
}
.route-url {
  z-index: 1;
  color: $blue-grey-3;
  // overflow: hidden;
  &:focus, &:hover {
    outline: none;
    box-shadow: none;
    background-color: $red-5;
    // background-color: $blue-grey-8;
  }
  &focus:after{
    content: '';
    height: 80%;
    width: 1px;
    background-color: $blue-grey-3;
  } 
  &:empty:before {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    content: attr(data-placeholder);
    color: $blue-grey-5;
  }
}
.focused {
  overflow: hidden;
}

.focused:empty:before {
  content: '';
  height: 50%;
  width: 1px;
  background-color: $blue-grey-3;
  animation: blink 1s infinite;
}
.focused:not(:empty):after {
  content: '';
  height: 50%;
  margin-left: 0.05em;
  width: 1px;
  background-color: $blue-grey-3;
  animation: blink 1s infinite;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  49% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}

</style>

<script setup lang="ts"> 
import { ref, computed } from 'vue'

const parameterColor = '#ffeb50'

const content = ref('')
const isFocused = ref(false)

const selectionStart = ref(0)
const selectionEnd = ref(0)

const formattedContent = computed(() => {
  const path = content.value
  
  let paths = path.split('/')
  if (selectionStart.value !== selectionEnd.value) {
    const highlighted = `<span style="background-color: white">${path.slice(selectionStart.value, selectionEnd.value)}</span>`
    console.log(highlighted)
    const p = path.slice(0, selectionStart.value) + highlighted + path.slice(selectionEnd.value)
    console.log(p)
    paths = p.split('/')
  }
  // const paths = p.split('/')

  const formattedPaths = paths.map((path) => {
    if (path === '') {
      return ''
    }
    if (path.startsWith(':')) {
      console.log(path)
      return `<div style=\"color: ${parameterColor} !important\">${path}</div>`
    }
    return path
  })
  console.log(formattedPaths)
  return formattedPaths.join('/')
})

const focusURL = () => {
  isFocused.value = true
}

const blurURL = () => {
  isFocused.value = false
}

const onType = (e: KeyboardEvent) => {
  console.log(e.target?.selectionStart)
  console.log(e.target?.selectionEnd)
  
  selectionStart.value = e.target?.selectionStart || 0
  selectionEnd.value = e.target?.selectionEnd || 0
}

const onMouseUp = (e: MouseEvent) => {
  console.log('mouse', e.target.selectionStart)
  console.log('mouse', e.target.selectionEnd)

  selectionStart.value = e.target?.selectionStart || 0
  selectionEnd.value = e.target?.selectionEnd || 0
}

// https://example.com/api/v1/user/:id

</script>
```