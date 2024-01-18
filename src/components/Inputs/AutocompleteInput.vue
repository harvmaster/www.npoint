<template>
  <div class="container"  @mouseenter="showOptionCount" @mouseleave="hideOptionCount" >
    <div class="autocomplete-text" v-html="autocompleteText"/>
    <div v-if="autocompleteOptions.length" :class="optionCountVisible ? 'visible': ''" class="options-count">{{ autocompleteOffset + 1 }}/{{ autocompleteOptions.length }}</div>
    <input ref="inputElement" class="text-input" v-model="model" :placeholder="placeholder" @input="onInput" @keydown="onKeydown" @blur="hideOptionCount" @focus="showOptionCount" />
  </div> 
</template>

<style scoped lang="scss">
.container {
  position: relative;
  width: 100%;
  height: 3em;
}

.options-count {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  opacity: 0;
  transition: all 0.2s ease-in-out;
  color: $blue-grey-5;
  font-size: 1.5em;
  padding: 0 1em;
  z-index: 1;
  pointer-events: none;
  &.visible {
    opacity: 1;
  }
}

.autocomplete-text {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  // height: 2em;
  z-index: 2;
  border-radius: 0.5em;
  padding: 0 1em;
  font-size: 1.5em;
  margin: auto;
  transform: translateY(-50%);
  pointer-events: none;
  overflow: hidden;
  display: flex;
  &:hover {
    transform: scale(2);
  }
}

.text-input {
  pointer-events: all;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2em;
  border-radius: 0.5em;
  padding: 0 1em;
  font-size: 1.5em;
  color: $blue-grey-3;
  background-color: $blue-grey-9;
  border: none;
  transition: all 0.2s ease-in-out;
  &:focus, &:hover {
    outline: none;
    box-shadow: none;
    background-color: $blue-grey-8;
  }
  &::placeholder {
    color: $blue-grey-5;
  }
  
}
</style>

<script setup lang="ts">
import { computed, ref, defineModel } from 'vue'

const props = defineProps({
  autocompleteColor: {
    type: String,
    default: 'blue-grey-6'
  },
  options: {
    type: Array<string>,
    default: () => []
  },
  filter: {
    type: Function,
    default: null
  },
  optionCount: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const defaultFilter = (list: string[], input: string | undefined) => {
  if (!input) return ''
  return list.filter((option: string) => option.toLowerCase().startsWith(input.toLowerCase()))
}

const model = defineModel<string>()
const autocompleteOffset = ref(0)
const optionCountVisible = ref(false)
const inputElement = ref<HTMLInputElement>()

const hideOptionCount = () => {
  if (document.activeElement == inputElement.value) return
  optionCountVisible.value = false
}
const showOptionCount = () => {
  if (props.optionCount == false) return
  optionCountVisible.value = true
}

const onInput = (event: Event | InputEvent) => {
  autocompleteOffset.value = 0
}

const autocompleteOptions = computed(() => {
  if (!props.filter) return defaultFilter(props.options, model.value)
  return props.filter(props.options, model.value)
})

const autocompleteText = computed(() => {
  if (autocompleteOptions.value.length == 0) return ''
  const optionIndex = autocompleteOffset.value
  const option = autocompleteOptions.value[optionIndex] || autocompleteOptions.value[0] || ''
  const transparentText = model.value
  // const transparentText = option.slice(0, model.value?.length)
  const opaqueText = option.slice(model.value?.length)
  return `<div class="text-transparent">${transparentText}</div><div class="text-${props.autocompleteColor}" style="overflow: hidden; text-wrap: nowrap">${opaqueText}</div>`
})

const onKeydown = (event: KeyboardEvent) => {
  interface Target extends EventTarget {
    blur: () => void
  }

  const blur = () => {
    (event.target as Target)?.blur()
  }

  const completeText = () => {
    model.value = autocompleteOptions.value[0]
    event.preventDefault()
    blur()
  }

  const adjustOffset = (val = 1) => {
    event.preventDefault()
    const items = autocompleteOptions.value.length
    if (autocompleteOffset.value + val < 0) autocompleteOffset.value = items - 1
    else if (autocompleteOffset.value + val >= items) autocompleteOffset.value = 0
    else autocompleteOffset.value += val
  }

  interface Handler {
    [key: string]: () => void
  }

  const handlers: Handler = {
    'Enter': completeText,
    'Escape': () => blur(),
    'Tab': completeText,
    'ArrowUp': () => adjustOffset(-1),
    'ArrowDown': () => adjustOffset(1)
  }

  if (handlers[event.key]) handlers[event.key]()
}
</script>