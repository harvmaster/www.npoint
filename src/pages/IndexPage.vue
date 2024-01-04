<template>
  <q-page class="row items-center justify-evenly">
    <div class="col-12 row">
      <project-card class="col-12 col-md-auto"/>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { Todo, Meta } from 'components/models';
import { ref } from 'vue';
import ProjectCard from 'components/Project/ProjectCard.vue';


</script>
