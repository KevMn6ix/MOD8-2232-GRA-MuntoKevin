<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import WelcomeMessage from '../components/WelcomeMessage.vue'
import FilmItem from '../components/FilmItem.vue'
import useFilmService from '../services/film-service.js'

const route = useRoute()
const filmService = useFilmService()

const search = computed(() => route.query.search?.trim() ?? '')

const loading = ref(false)
const films = ref([])
const errorMessage = ref('')

onMounted(findFilms)
watch(search, findFilms)

async function findFilms() {
  if (!search.value) {
    films.value = []
    errorMessage.value = ''
    return
  }

  loading.value = true

  const response = await filmService.findFilms({ search: search.value })

  if (response?.films) {
    films.value = response.films
    errorMessage.value = ''
  } else {
    films.value = []
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
      <ul v-if="films.length > 0">
        <li v-for="film in films" :key="film.id">
          <FilmItem :film="film" />
        </li>
      </ul>

      <ul v-else>
        <li>No films were found matching "{{ search }}".</li>
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
