<template>
  <q-page class="row bg-blue-grey-10 q-pa-md">
    <div class="col-7">
      <EndpointCreator style="border-radius: 2em;" v-model="endpoints" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import EndpointCreator from 'components/EndPoint/EndpointCreator/EndPointCreator.vue'
import { ref } from 'vue'

const endpoints = ref<any[]>([])
</script>