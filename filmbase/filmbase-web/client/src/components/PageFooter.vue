<script setup>
import FilmbaseLogo from './icons/FilmbaseLogo.vue'
</script>

<template>
  <footer>
    <div class="content">
      <span>© 2023 Filmbase Web Services.</span>
      <span>All rights reserved.</span>
      <div class="app-link">
        <RouterLink :to="{ name: 'home' }"><FilmbaseLogo /></RouterLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  color: var(--color-text-soft);
  background: var(--color-background-soft);
  border-top: 1px solid var(--color-border);
  font-size: 0.9em;
}

.content {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  column-gap: var(--gap-medium);
}

.app-link {
  display: none;
}

@media (min-width: 480px) {
  .app-link {
    display: block;
  }
}

@media (min-width: 768px) {
  .content {
    justify-content: flex-end;
    text-align: right;
  }
}
</style>
