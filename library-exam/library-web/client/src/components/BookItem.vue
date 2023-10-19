<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <RouterLink :to="{ name: 'book', params: { id: book.id } }">
    <h2>{{ book.title }}</h2>
    <p class="subtitle">{{ book.year }}. Written by {{ book.author }}.</p>
  </RouterLink>
</template>

<style scoped>
a * {
  color: inherit;
}
</style>
