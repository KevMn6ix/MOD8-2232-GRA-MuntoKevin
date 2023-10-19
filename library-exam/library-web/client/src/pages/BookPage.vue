<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BookHeader from '../components/BookHeader.vue'
import BookForm from '../components/BookForm.vue'
import LibraryLogo from '../components/icons/LibraryLogo.vue'
import EditIcon from '../components/icons/EditIcon.vue'
import useAuthenticationService from '../services/authentication-service.js'
import useBookService from '../services/book-service.js'

const route = useRoute()
const authenticationService = useAuthenticationService()
const bookService = useBookService()

const id = Number.parseInt(route.params.id)
const book = ref(null)
const loading = ref(true)

const formIsEnabled = ref(false)
const bookIsDeleted = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

watch(book, updateDocumentTitle)

onMounted(async () => {
  const response = await bookService.findBook(id)
  book.value = response.book ?? null
  loading.value = false
})

function updateDocumentTitle() {
  document.title = book.value ? 'Library: ' + book.value.title : 'Library'
}

function editBook() {
  if (!canEditBook()) {
    return
  }

  formIsEnabled.value = !formIsEnabled.value

  if (!formIsEnabled.value) {
    clearMessages()
  }
}

async function saveBook(title, author, year, pageCount, description) {
  if (!canEditBook()) {
    return
  }

  clearMessages()

  const response = await bookService.updateBook(id, title, author, year, pageCount, description)

  if (response.success) {
    book.value.title = title.trim()
    book.value.author = author.trim()
    book.value.year = Number.parseInt(year)
    book.value.pageCount = Number.parseInt(pageCount)
    book.value.description = description.trim()
    successMessage.value = response.success.message
  } else {
    errorMessage.value = response.error.message
  }
}

async function deleteBook() {
  if (!canEditBook()) {
    return
  }

  clearMessages()

  const response = await bookService.deleteBook(book.value.id)

  if (response.success) {
    bookIsDeleted.value = true
    successMessage.value = response.success.message
  } else {
    errorMessage.value = response.error.message
  }
}

function clearMessages() {
  successMessage.value = ''
  errorMessage.value = ''
}

function canEditBook() {
  return book.value && !bookIsDeleted.value
}
</script>

<template>
  <main>
    <div v-if="loading" class="content"></div>

    <div v-else-if="book && !bookIsDeleted" class="content">
      <BookHeader :book="book" />
      <p>{{ book.description }}</p>

      <button @click="editBook" class="edit"><EditIcon /></button>

      <BookForm
        v-if="formIsEnabled"
        primary-button="Save"
        primary-button-class="success"
        secondary-button="Delete"
        secondary-button-class="danger"
        :book="book"
        :success-message="successMessage"
        :error-message="errorMessage"
        @primary-button-clicked="saveBook"
        @secondary-button-clicked="deleteBook"
      />
    </div>

    <div v-else-if="book && bookIsDeleted" class="content">
      <BookHeader :book="book" />
      <p class="success">{{ successMessage }}</p>
      <p>
        <RouterLink :to="{ name: 'home' }" class="button home">
          <LibraryLogo />
          <span>Home</span>
        </RouterLink>
      </p>
    </div>

    <div v-else class="content center">
      <header>
        <h1>Page not found</h1>
        <p>No book was found with id {{ route.params.id }}.</p>
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
