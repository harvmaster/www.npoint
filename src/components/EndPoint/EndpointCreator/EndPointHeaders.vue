<template>
  <div class="row">
    <div v-for="(header, index) of headers" :key="header.id" class="col-12 row">
      <div class="col-5">
        <autocomplete-input v-model="header.key" :options="headerKeys" placeholder="Key" />
      </div>
      <div class="col-auto">
        <q-separator vertical class="q-mx-xs" />
      </div>
      <div class="col">
        <autocomplete-input v-model="header.value" :options="headerValueOptions[index]" placeholder="Value" />
      </div>
      <div class="col-auto self-center">
        <q-btn class="q-ma-xs" color="blue-grey-3" flat round dense icon="close" @click="() => removeHeader(header.id)" />
      </div>

      <div v-if="index+1 != headers.length" class="col-12">
        <q-separator class="q-my-sm"/>
      </div>
    </div>
    
    <div class="col-12 q-mt-xs">
      <q-btn class="animate-expand-item" icon="add" color="blue-grey-3" round flat @click="addHeader" />
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
import { onMounted, computed, defineModel, nextTick } from 'vue'
import headerOptions from './HeaderData'
import AutocompleteInput from 'src/components/Inputs/AutocompleteInput.vue';

interface Header {
  id: string;
  key: string;
  value: string;
}

const headers = defineModel<Header[]>({
  default: () => [],
})

const addHeader = () => {
  headers.value.push({
    id: Math.random().toString(36).substring(7),
    key: '',
    value: ''
  })
}

const removeHeader = (id: string) => {
  headers.value = headers.value.filter(header => header.id != id)

  nextTick(() => {
    if (headers.value.length == 0) {
      addHeader()
    }
  })
  // console.log(headers.value.length)
  // console.log(headers.value)
  // if (headers.value.length == 0) {
  //   addHeader()
  // }
}

const headerValueOptions = computed(() => {
  const options = headers.value.map(header => {
    return headerOptions.find(option => option.header == header.key)?.recommendedValues.map(val => val.toString()) || []
  })
  return options
})

const headerKeys = computed(() => {
  return headerOptions.map(header => header.header)
})

onMounted(() => {
  if (headers.value.length == 0) {
    addHeader()
  }
})


</script>