<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  film: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <RouterLink :to="{ name: 'film', params: { id: film.id } }">
    <h2>{{ film.title }}</h2>
    <p class="subtitle">{{ film.year }}. Directed by {{ film.director }}.</p>
  </RouterLink>
</template>

<style scoped>
a * {
  color: inherit;
}
</style>
