<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import LibraryLogo from './icons/LibraryLogo.vue'
import useAuthenticationService from '../services/authentication-service.js'

const home = 'home'
const route = useRoute()
const router = useRouter()
const authenticationService = useAuthenticationService()
const searchText = ref(route.query.search || '')

router.afterEach((to, from) => {
  if (to.name === home) {
    const search = collapseWhitespace(searchText.value)
    const query = collapseWhitespace(route.query.search || '')
    if (search !== query) {
      searchText.value = query
    }
  }
})

function updateHomeRouteQuery() {
  if (route.name === home) {
    const search = collapseWhitespace(searchText.value)
    const query = search ? { search } : {}
    router.replace({ name: home, query })
  }
}

function navigateToHomeRoute() {
  if (route.name !== home) {
    const search = collapseWhitespace(searchText.value)
    const query = search ? { search } : {}
    router.push({ name: home, query })
  }
}

function collapseWhitespace(string) {
  return string?.trim().replace(/\s+/g, ' ') ?? ''
}
</script>

<template>
  <header>
    <div class="content">
      <div class="app-link">
        <RouterLink :to="{ name: 'home' }">
          <LibraryLogo />
          <span class="app-name">LIBRARY</span>
        </RouterLink>
      </div>
      <nav>
        <ul>
          <li>
            <div><RouterLink :to="{ name: 'home' }">Home</RouterLink></div>
          </li>
          <li>
            <div><RouterLink :to="{ name: 'about' }">About</RouterLink></div>
          </li>
          <li>
            <div><RouterLink :to="{ name: 'add' }">Add book</RouterLink></div>
          </li>
          <li>
            <div><RouterLink :to="{ name: 'signup' }">Sign up</RouterLink></div>
          </li>
          <li>
            <div><RouterLink :to="{ name: 'login' }">Log in</RouterLink></div>
          </li>
          <li>
            <div><a @click="authenticationService.logOut">Log out</a></div>
          </li>
        </ul>
      </nav>
      <input
        v-model="searchText"
        @input="updateHomeRouteQuery"
        @keypress.enter="navigateToHomeRoute"
        type="search"
        class="search"
        placeholder="Search"
      />
    </div>
  </header>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  background: var(--color-background-soft);
  border-bottom: 1px solid var(--color-border);
  font-size: 0.9em;
}

.content {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  column-gap: var(--gap-large);
  row-gap: var(--gap-medium);
}

.app-link a {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  gap: var(--gap-small);
}

.app-link .app-name {
  display: none;
}

ul {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
}

li {
  margin-bottom: 0;
}

li:not(:first-of-type) div {
  border-left: 1px solid var(--color-border);
  padding-left: var(--padding-medium);
  margin-left: var(--margin-medium);
}

a:visited {
  color: var(--color-link);
}

.search {
  flex-grow: 1;
  min-width: 0;
  width: 100%;
  border-radius: 2rem;
}

@media (min-width: 480px) {
  .app-link .app-name {
    display: block;
  }
}

@media (min-width: 768px) {
  .search {
    width: auto;
    order: 1;
  }

  nav {
    order: 2;
  }
}
</style>
