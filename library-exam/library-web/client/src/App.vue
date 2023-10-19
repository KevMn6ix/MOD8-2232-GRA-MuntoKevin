<script setup>
import { RouterView } from 'vue-router'
import PageHeader from './components/PageHeader.vue'
import PageFooter from './components/PageFooter.vue'
</script>

<template>
  <PageHeader />
  <RouterView />
  <PageFooter />
</template>

<style>
#app > header,
#app > main,
#app > footer {
  padding: var(--padding-large);
}

#app > main {
  flex-grow: 1;
}

.content {
  max-width: var(--max-width);
  margin: 0 auto;
}

.app-link * {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-heading);

  & a:link,
  a:visited {
    color: var(--color-heading);
  }
}

@media (min-width: 768px) {
  form {
    max-width: 512px;
    margin: 0 auto;
  }
}
</style>
