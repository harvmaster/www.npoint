<template>
  <q-page class="row items-start justify-evenly bg-blue-grey-10">
    <div class="col-12 col-md-6 row q-pa-md">

      <div class="col-12 row bg-blue-grey-9 route-section q-pa-sm">
        
        <!-- Protocol and Route -->
        <div class="col-12 row">
          <protocol-selector />

          <div class="col q-pl-sm">
            <route-input class="full-width" />
            <!-- <div class="route-input full-width" data-placeholder="https://example.com/api/v1/" contenteditable="true">

            </div> -->
            <!-- <input v-model="route" class="route-input full-width" placeholder="https://example.com/api/v1/" /> -->
          </div>
        </div>

        <div class="col-12">
          <q-separator class="q-my-sm"/>
        </div>
  
        <!-- Headers -->
        <div class="col-12 q-pa-sm">
          <div class="col-12 q-pl-sm">
            <span class="text-weight-light text-h5 text-blue-grey-3">Headers</span>
          </div>
          <TransitionGroup name="list" class="container">
            <div class="" v-for="header of headers" :key="header.id">
              <div class="row route-section-item">
                <div class="col-4">
                  <input v-model="header.key" class="route-input full-width" placeholder="Key" />
                </div>
                <div class="col-auto">
                  <q-separator vertical class="q-mx-xs" />
                </div>
                <div class="col">
                  <input v-model="header.value" class="route-input full-width" placeholder="Value" />
                </div>
                <div class="col-auto self-center">
                  <q-btn class="q-ma-none" color="blue-grey-3" flat round dense icon="close" @click="() => removeHeader(header.id)" />
                </div>
              </div>
              <q-separator class="q-my-sm"/>
            </div>
          </TransitionGroup>
          <q-btn class="animate-expand-item" icon="add" color="blue-grey-3" round flat @click="addHeader" />
        </div>

        <div class="col-12 row animate-expand animate-expand-item">
          <div class="col-12">
            <q-separator class="q-my-sm"/>
          </div>

          <!-- Body -->
          <div class="col-12 q-pa-sm">
            <div class="col-12 q-pl-sm">
              <span class="text-weight-light text-h5 text-blue-grey-3">Body</span>
            </div>
            <div class="col-12 q-pa-sm">
              <input class="full-width" type="textarea" />
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="col-12 col-md-6">
      <q-btn @click="console.log(route)" />
    </div>
  </q-page>
</template>

<style scoped lang="scss">

.route-section {
  border-radius: 1em;
  transition: all 0.5s ease-in-out;
}
.route-section-item {
  height: 3em;
}

.route-input {
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
  
}

.container {
  position: relative;
  padding: 0;
}
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}

.animate-expand {
  animation: expand 0.5s ease-out 1;
}
@keyframes expand {
  0% {
    transform: translateY(-3em);
  }
  100% {
    transform: translateY(0);
  }
}
.animate-shrink {
  animation: shrink 0.5s ease-out 1;
}
@keyframes shrink {
  0% {
    transform: translateY(3em);
  }
  100% {
    transform: translateY(0);
  }
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'

import ProjectCard from 'components/Project/ProjectCard.vue';
import ProtocolSelector from 'components/Inputs/ProtocolSelector.vue';
import RouteInput from 'components/Inputs/RouteInput.vue';

const route = ref('')

interface Header {
  id: string;
  key: string;
  value: string;
}
const headers = ref<Header[]>([])
const addHeader = () => {
  headers.value.push({
    id: Math.random().toString(36).substring(7),
    key: '',
    value: '',
  })
  animateExpand()
}
const removeHeader = (id: string) => {
  headers.value = headers.value.filter(header => header.id !== id)
  animateShrink()
}
const animateExpand = () => {
  animateItem('animate-expand')
}
const animateShrink = () => {
  animateItem('animate-shrink')
}
let animationTimeouts: NodeJS.Timeout[] = []
const animateItem = (animation: string) => {
  const elements = document.getElementsByClassName('animate-expand-item')
  animationTimeouts.forEach(timeout => clearTimeout(timeout))
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove(animation)
    void elements[i].offsetWidth
    elements[i].classList.add(animation)
    animationTimeouts.push(setTimeout(() => {
      elements[i].classList.remove(animation)
    }, 500))
  } 
}
// route
// Protocol
// headers
// body
// Expected Response

</script>