<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import FilmForm from '../components/FilmForm.vue'
import useAuthenticationService from '../services/authentication-service.js'
import useFilmService from '../services/film-service.js'

const router = useRouter()
const authenticationService = useAuthenticationService()
const filmService = useFilmService()

const userCanEditFilms = authenticationService.userCanEditFilms
const errorMessage = ref('')

leaveIfUnauthorized()
watch(userCanEditFilms, leaveIfUnauthorized)

function leaveIfUnauthorized() {
  if (!userCanEditFilms.value) {
    router.replace({ name: 'home' })
  }
}

async function addFilm(title, director, year, duration, description) {
  if (!userCanEditFilms.value) {
    return leaveIfUnauthorized()
  }

  errorMessage.value = ''

  const response = await filmService.createFilm(title, director, year, duration, description)

  if (response.film) {
    router.push({ name: 'film', params: { id: response.film.id } })
  } else {
    errorMessage.value = response.error.message
  }
}
</script>

<template>
  <main>
    <div class="content">
      <FilmForm
        v-if="userCanEditFilms"
        primary-button="Add"
        primary-button-class="success"
        :error-message="errorMessage"
        @primary-button-clicked="addFilm"
      />
    </div>
  </main>
</template>
