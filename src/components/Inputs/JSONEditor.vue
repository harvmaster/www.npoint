<template>
  <div class="row editor">
    <div class="line row col-12" v-for="(line, index) of lines" :key="index">
      <div class="line-number col-auto">
        {{ index + 1 }}
      </div>
      <div class="line-content col">
        <div class="line-content" contenteditable>
          {{ line }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.editor {
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
import { ref } from 'vue'

const lines = ref<string[]>([
  '{',
  '  "name": "test"',
  '  "age": 20',
  '}',
])
</script>