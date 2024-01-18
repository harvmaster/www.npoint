<template>
  <div class="row">
    <div v-for="(param, index) of params" :key="param.id" class="col-12 row">
      <div class="col-4">
        <input v-model="param.key" class="text-input autocomplete-input full-width" placeholder="Key" />
      </div>
      <div class="col-auto">
        <q-separator vertical class="q-mx-xs" />
      </div>
      <div class="col">
        <input v-model="param.value" class="text-input full-width" placeholder="Value" />
      </div>
      <div class="col-auto self-center">
        <q-btn class="q-ma-xs" color="blue-grey-3" flat round dense icon="close" @click="() => removeParam(param.id)" />
      </div>

      <div v-if="index+1 != params.length" class="col-12">
        <q-separator class="q-my-sm"/>
      </div>
    </div>
    
    <div class="col-12 q-mt-xs">
      <q-btn class="animate-expand-item" icon="add" color="blue-grey-3" round flat @click="addParam" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.text-input {
  border-radius: 0.5em;
  height: 2em;
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
import { onMounted, ref, computed, defineModel } from 'vue'

interface Option {
  value: string;
  color: string;
}

const primitives: Option[] = [
  { value: 'string', color: '#ff0000'},
  { value: 'number', color: '#00ff00'},
  { value: 'boolean', color: '#0000ff'},
  { value: 'object', color: '#ff00ff'},
  { value: 'array', color: '#00ffff'},
  { value: 'null', color: '#ffff00'}
]

interface Param {
  id: string;
  key: string;
  value: string;
}

const params = defineModel<Param[]>({
  default: () => [],
})

const addParam = () => {
  params.value.push({
    id: Math.random().toString(36).substring(7),
    key: '',
    value: ''
  })
}

const removeParam = (id: string) => {
  params.value = params.value.filter(param => param.id != id)
  if (params.value.length == 0) {
    addParam()
  }
}

onMounted(() => {
  if (params.value.length == 0) {
    addParam()
  }
})
</script>