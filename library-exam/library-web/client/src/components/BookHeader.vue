<script setup>
const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <header>
    <h1>{{ book.title }}</h1>
    <p class="subtitle">{{ book.year }}. {{ book.pageCount }} {{ book.pageCount == 1 ? 'page' : 'pages' }}.</p>
    <p class="subtitle">Written by {{ book.author }}.</p>
  </header>
</template>
