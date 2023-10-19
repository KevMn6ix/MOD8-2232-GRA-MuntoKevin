<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import BookForm from '../components/BookForm.vue'
import useAuthenticationService from '../services/authentication-service.js'
import useBookService from '../services/book-service'

const router = useRouter()
const authenticationService = useAuthenticationService()
const bookService = useBookService()

const errorMessage = ref('')
const userIsAuthenticated = authenticationService.userIsAuthenticated

leaveIfUnauthorized()
watch(userIsAuthenticated, leaveIfUnauthorized)

function leaveIfUnauthorized() {
  if (!userIsAuthenticated.value) {
    router.replace({ name: 'home' })
  }
}

async function addBook(title, author, year, pageCount, description) {
  errorMessage.value = ''
  const response = await bookService.createBook(title, author, year, pageCount, description)

  if (response.book) {
    router.push({ name: 'book', params: { id: response.book.id } })
  } else {
    errorMessage.value = response.error.message
  }
}
</script>

<template>
  <main>
    <div class="content">
      <BookForm
        primary-button="Add"
        primary-button-class="success"
        :error-message="errorMessage"
        @primary-button-clicked="addBook"
      />
    </div>
  </main>
</template>
