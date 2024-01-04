<template>
  <q-card
    class="q-ma-md project-card"
    v-ripple
    @click="goToProject"
  >
    <q-card-section class="q-pa-xs relative-position">
      <!-- Edit Button -->
      <div class="edit-button">
        <q-btn
          class="q-ma-xs"
          color="white"
          icon="edit"
          flat
          round
          @click="console.log('Edit')"
        />
      </div>  
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />
    </q-card-section>
    <q-card-section class="q-pa-xs">
      <q-card-title class="full-width row justify-center">
        <span class="text-h6">Project Name</span>
      </q-card-title>
    </q-card-section>

    <q-separator />

    <q-card-section class="row">
      <q-card-title class="col-12">
        <span class="q-ml-sm">Routes: 7</span>
      </q-card-title>
      <q-card-title class="col-12">
        <span class="q-ml-sm">Errors: 7</span>
      </q-card-title>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-pa-xs row">
      <q-card-actions class="col-12">
        <q-btn
          class=""
          color="primary"
          label="Run Tests"
          icon="api"
          flat
          @click="console.log('View')"
        />
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.project-card {
  width: 20em;
  max-width: 100vw;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.project-card:hover {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  transform: translateY(1%);
}

.edit-button {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}
</style>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToProject = () => {
  router.push('/project')
}
</script>
