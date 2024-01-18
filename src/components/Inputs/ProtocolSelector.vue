<template>
  <div class="full-height row cursor-pointer" :style="selectorStyle">
    <span class="row col-12 justify-center self-center text-weight-bolder col-12 text-h6 relative-position ">
      <div class="col-auto hover-underline-animation">{{ model }}</div>
      <q-menu
        fit
      >
        <q-list bordered>
          <q-item v-for="option of protocolOptions" :key="option.value" clickable v-ripple @click="() => selectProtocol(option)">
            <q-item-section>{{ option.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </span>
  </div>
</template>

<style lang="scss" scoped>
// .scale-hover {
//   transition: transform 0.25s ease-out;
// }
// .scale-hover:hover {
//   transform: scale(1.1);
// }
.hover-underline-animation {
  display: inline-block;
  position: relative;
}

.hover-underline-animation::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0) translateY(-150%);
  height: 0.15em;
  bottom: 0;
  left: 0;
  background-color: v-bind('selectorStyle?.color');
  transform-origin: bottom right;
  transition: transform 0.15s ease-out;
}

.hover-underline-animation:hover::after {
  transform: scaleX(1) translateY(-150%);
  transform-origin: bottom left;
}
</style>

<script setup lang="ts">
import { ref, computed, defineModel } from 'vue'

interface ProtocolOption {
  label: string;
  value: string;
  colors: {
    background: string;
    text: string;
  }
}
const protocolOptions: ProtocolOption[] = [
  { label: 'GET', value: 'GET', colors: { text: '#C9D8FB', background: '#86ADF7' }},
  { label: 'POST', value: 'POST', colors: { text: '#F9D8C9', background: '#A885F7'}},
  { label: 'PUT', value: 'PUT', colors: { text: '#C9FAC9', background: '#65bd65' }},
  { label: 'DELETE', value: 'DELETE', colors: { text: '#F6C4C2', background: '#EE7D76' }},
]

const model = defineModel<string>({ default: 'GET' })

const selectProtocol = (selected: ProtocolOption) => {
  model.value = selected.value;
}

const selectorStyle = computed(() => {
  const selected = protocolOptions.find(option => option.value === model.value) || protocolOptions[0]
  return {
    backgroundColor: selected.colors.background,
    color: selected.colors.text,
    borderRadius: '0.5em',
    width: '8rem',
    textAlign: 'center',
    transition: 'all 0.4s ease-in-out',
  }
})

</script>