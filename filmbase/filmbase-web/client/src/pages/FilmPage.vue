<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import FilmHeader from '../components/FilmHeader.vue'
import FilmForm from '../components/FilmForm.vue'
import FilmbaseLogo from '../components/icons/FilmbaseLogo.vue'
import EditIcon from '../components/icons/EditIcon.vue'
import useAuthenticationService from '../services/authentication-service.js'
import useFilmService from '../services/film-service.js'

const route = useRoute()
const authenticationService = useAuthenticationService()
const filmService = useFilmService()

const id = Number.parseInt(route.params.id)
const film = ref(null)
const loading = ref(true)

const userCanEditFilms = authenticationService.userCanEditFilms
const formIsEnabled = ref(false)
const filmIsDeleted = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

watch(film, updateDocumentTitle)

onMounted(async () => {
  const response = await filmService.findFilm(id)
  film.value = response.film ?? null
  loading.value = false
})

function updateDocumentTitle() {
  document.title = film.value ? 'Filmbase: ' + film.value.title : 'Filmbase'
}

function editFilm() {
  if (!canEditFilm()) {
    return
  }

  formIsEnabled.value = !formIsEnabled.value

  if (!formIsEnabled.value) {
    clearMessages()
  }
}

async function saveFilm(title, director, year, duration, description) {
  if (!canEditFilm()) {
    return
  }

  clearMessages()

  const response = await filmService.updateFilm(id, title, director, year, duration, description)

  if (response.success) {
    film.value.title = title.trim()
    film.value.director = director.trim()
    film.value.year = Number.parseInt(year)
    film.value.duration = Number.parseInt(duration)
    film.value.description = description.trim()
    successMessage.value = response.success.message
  } else {
    errorMessage.value = response.error.message
  }
}

async function deleteFilm() {
  if (!canEditFilm()) {
    return
  }

  clearMessages()

  const response = await filmService.deleteFilm(film.value.id)

  if (response.success) {
    filmIsDeleted.value = true
    successMessage.value = response.success.message
  } else {
    errorMessage.value = response.error.message
  }
}

function clearMessages() {
  successMessage.value = ''
  errorMessage.value = ''
}

function canEditFilm() {
  return film.value && !filmIsDeleted.value && userCanEditFilms.value
}
</script>

<template>
  <main>
    <div v-if="loading" class="content"></div>

    <div v-else-if="film && !filmIsDeleted" class="content">
      <FilmHeader :film="film" />
      <p>{{ film.description }}</p>

      <button v-if="userCanEditFilms" @click="editFilm" class="edit"><EditIcon /></button>

      <FilmForm
        v-if="userCanEditFilms && formIsEnabled"
        primary-button="Save"
        primary-button-class="success"
        secondary-button="Delete"
        secondary-button-class="danger"
        :film="film"
        :success-message="successMessage"
        :error-message="errorMessage"
        @primary-button-clicked="saveFilm"
        @secondary-button-clicked="deleteFilm"
      />
    </div>

    <div v-else-if="film && filmIsDeleted" class="content">
      <FilmHeader :film="film" />
      <p class="success">{{ successMessage }}</p>
      <p>
        <RouterLink :to="{ name: 'home' }" class="button home">
          <FilmbaseLogo />
          <span>Home</span>
        </RouterLink>
      </p>
    </div>

    <div v-else class="content center">
      <header>
        <h1>Page not found</h1>
        <p>No film was found with id {{ route.params.id }}.</p>
      </header>
    </div>
  </main>
</template>

<style scoped>
.edit {
  padding: var(--padding-small);
  height: 38px;
  aspect-ratio: 1;
  border-radius: 2rem;
}

.edit,
form {
  margin-top: var(--margin-medium);
}

a.home {
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: var(--gap-small);
}

.center {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
</style>
