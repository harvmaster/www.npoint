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
      <Headers v-model="headers" class="col-12" />
    </div>

    <div class="col-12">
      <q-separator class="q-my-md"/>
    </div>

    <div class="col-12 row">
      <div class="col-12">
        <span class="text-weight-light text-h5 text-blue-grey-3">Route Params</span>
      </div>
      <div class="col-12">
        <span class="text-weight-light text-h6 text-blue-grey-5">Route params are automatically generated from the route</span>
      </div>
      <div class="col-12">
        <div class="col-12 row">
          <div v-for="(param ) of routeParams" :key="param" class="col-12 col-md-auto">
            <q-chip class="q-ma-xs" color="blue-grey-3" outline>
              {{ param }}
            </q-chip>
          </div>
        </div>
      </div>
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
import { computed, ref } from 'vue'

import ProtocolSelector from 'components/Inputs/ProtocolSelector.vue'
import RouteInput from 'components/Inputs/RouteInput.vue'
import Headers from 'components/EndPoint/EndpointCreator/EndPointHeaders.vue'
import ParamsInput from 'components/EndPoint/EndpointCreator/EndPointParams.vue'

const protocol = ref('GET')

const route = ref('')
const routeParams = computed(() => {
  const routeComponents = route.value.split('/')
  const params = routeComponents.filter(component => component.startsWith(':'))
  // return params.map(param => param.replace(':', ''))
  return params
})


const headers = ref([])
const queryParams = ref([])

</script>
