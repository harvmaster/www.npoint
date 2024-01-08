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
  &nbsp {
    display: inline-block;
    width: 1em;
    height: 1em;
    background-color: $blue-grey-3;
    border-radius: 50%;
    margin-right: 0.5em;
    margin-left: 0.5em;
    transition: all 0.2s ease-in-out;
    &:hover {
      background-color: $blue-grey-5;
    }
  
  }
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { validMethods } from 'workbox-routing/utils/constants';

const content = ref<string>('')

const handleInput = (e: Event) => {
  console.log(`content: ${e.target.innerHTML}`)
}

const handleKeydown = (e: KeyboardEvent) => {
  console.log(`keydown: ${e}`)
}

const handleBlur = (e: FocusEvent) => {
  console.log(`blur: ${e}`)
  content.value = e.target.innerHTML
}

</script>