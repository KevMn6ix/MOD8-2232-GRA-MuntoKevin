<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import WelcomeMessage from '../components/WelcomeMessage.vue'
import BookItem from '../components/BookItem.vue'
import useBookService from '../services/book-service.js'

const route = useRoute()
const bookService = useBookService()

const search = computed(() => route.query.search?.trim() ?? '')

const loading = ref(false)
const books = ref([])
const errorMessage = ref('')

onMounted(findBooks)
watch(search, findBooks)

async function findBooks() {
  if (!search.value) {
    books.value = []
    errorMessage.value = ''
    return
  }

  loading.value = true

  const response = await bookService.findBooks({ search: search.value })

  if (response?.books) {
    books.value = response.books
    errorMessage.value = ''
  } else {
    books.value = []
    errorMessage.value = response?.error?.message ?? 'Something went wrong.'
  }

  loading.value = false
}
</script>

<template>
  <main v-if="!search">
    <div class="content">
      <WelcomeMessage />
    </div>
  </main>

  <main v-else id="main-list">
    <div class="content search-results">
      <ul v-if="books.length > 0">
        <li v-for="book in books" :key="book.id">
          <BookItem :book="book" />
        </li>
      </ul>

      <ul v-else>
        <li>No books were found matching "{{ search }}".</li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
#main-list {
  padding: 0;
}

.search-results {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

ul {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  list-style-type: none;
  padding-inline-start: 0;
}

li {
  padding: var(--padding-medium) var(--padding-large);
}

li:not(:last-child) {
  border-bottom: 1px solid var(--color-border);
}

@media (min-width: 768px) {
  #main-list {
    padding: 0 var(--padding-large);
  }

  ul {
    width: inherit;
    min-width: 512px;
  }

  li {
    padding-left: inherit;
    padding-right: inherit;
  }
}
</style>
