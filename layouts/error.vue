<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <h2>Status Code: {{ error.statusCode }}</h2>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script lang="ts">
import { NuxtError } from '@nuxt/types/app';
import { PropType } from 'vue';

export default {
  name: 'ErrorLayout',
  layout: 'shop',
  props: {
    error: {
      type: Object as PropType<NuxtError>,
      required: true
    }
  }
};
</script>
