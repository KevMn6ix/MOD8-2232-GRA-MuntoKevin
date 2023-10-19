<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import useAuthenticationService from '../services/authentication-service.js'

const router = useRouter()
const authenticationService = useAuthenticationService()

const username = ref('')
const password = ref('')
const errorMessage = ref('')

async function logIn() {
  errorMessage.value = ''

  const response = await authenticationService.logIn(username.value, password.value)

  if (response.error) {
    errorMessage.value = response.error.message
  } else {
    const previousRoute = getPreviousRoute()
    if (previousRoute && previousRoute.name !== 'signup') {
      router.push(previousRoute)
    } else {
      router.push({ name: 'home' })
    }
  }
}

function getPreviousRoute() {
  const previousPath = router.options.history.state.back

  if (previousPath) {
    return router.resolve({ path: previousPath })
  }

  return null
}
</script>

<template>
  <main>
    <div class="content">
      <form @submit.prevent="logIn">
        <input type="text" v-model="username" placeholder="Username" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <div v-if="errorMessage" class="danger">{{ errorMessage }}</div>
        <button class="success">Log in</button>
        <div>Don't have an account? <RouterLink :to="{ name: 'signup' }">Sign up</RouterLink></div>
      </form>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

.content {
  width: 100%;
}
</style>
