<template>
  <div class="row q-pa-lg bg-blue-grey-9">
    <!-- Set Protocol -->
    <!-- Set Route -->
    <div class="col-12 row">
      <div class="col-12 col-md-auto">
        <ProtocolSelector v-model="protocol" />
      </div>
      <div class="col-auto q-px-sm" />
      <div class="col-12 col-md">
        <RouteInput v-model="route" />
      </div> 
    </div>

    <div class="col-12">
      <q-separator class="q-my-md"/>
    </div>
    

    <!-- Set Headers -->
    <div class="col-12 row">
      <div class="col-12 ">
        <span class="text-weight-light text-h5 text-blue-grey-3">Headers</span>
      </div>
      <headers v-model="headers" class="col-12" />
    </div>

    <div class="col-12">
      <q-separator class="q-my-md"/>
    </div>

    <!-- Set Query Params or Body Params -->
    <div v-if="protocol == 'GET'" class="col-12 row">
      <div class="col-12 ">
        <span class="text-weight-light text-h5 text-blue-grey-3">Query Params</span>
      </div>
      <ParamsInput v-model="queryParams" class="col-12" />
    </div>
    <div class="col-12">
      <q-separator class="q-my-md"/>
    </div>


    <!-- Set Response -->

    <!-- Set Response Code -->
  </div>
</template>

<style scoped lang="scss">

</style>

<script setup lang="ts">
import { ref } from 'vue'

import ProtocolSelector from 'components/Inputs/ProtocolSelector.vue'
import RouteInput from 'components/Inputs/RouteInput.vue'
import Headers from 'components/EndPoint/EndpointCreator/EndPointHeaders.vue'
import ParamsInput from 'components/EndPoint/EndpointCreator/EndPointParams.vue'

const protocol = ref('GET')
const route = ref('')
const headers = ref([])
const queryParams = ref([])

</script>
