<script setup>
const props = defineProps({
  film: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <header>
    <h1>{{ film.title }}</h1>
    <p class="subtitle">{{ film.year }}. {{ film.duration }} {{ film.duration == 1 ? 'minute' : 'minutes' }}.</p>
    <p class="subtitle">Directed by {{ film.director }}.</p>
  </header>
</template>
