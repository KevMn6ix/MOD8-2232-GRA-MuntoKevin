<script setup>
import { ref } from 'vue'

const props = defineProps({
  primaryButton: {
    type: String,
    required: true
  },
  primaryButtonClass: {
    type: String,
    default: 'primary'
  },
  secondaryButton: {
    type: String,
    default: ''
  },
  secondaryButtonClass: {
    type: String,
    default: 'secondary'
  },
  book: Object,
  successMessage: String,
  errorMessage: String
})

const title = ref(props.book?.title ?? '')
const author = ref(props.book?.author ?? '')
const year = ref(props.book?.year ?? '')
const pageCount = ref(props.book?.pageCount ?? '')
const description = ref(props.book?.description ?? '')

const emit = defineEmits(['primaryButtonClicked', 'secondaryButtonClicked'])

function primaryButtonClicked() {
  emit('primaryButtonClicked', title.value, author.value, year.value, pageCount.value, description.value)
}

function secondaryButtonClicked() {
  emit('secondaryButtonClicked', title.value, author.value, year.value, pageCount.value, description.value)
}
</script>

<template>
  <form @submit.prevent="primaryButtonClicked">
    <input type="text" v-model="title" placeholder="Title" required />
    <input type="text" v-model="author" placeholder="Author" required />
    <input type="number" v-model="year" placeholder="Year" required />
    <input type="number" v-model="pageCount" placeholder="Page count" required />
    <textarea v-model="description" placeholder="Description" required />

    <div v-if="successMessage" class="success">{{ successMessage }}</div>
    <div v-if="errorMessage" class="danger">{{ errorMessage }}</div>

    <button :class="primaryButtonClass">{{ primaryButton }}</button>
    <input type="button" v-if="secondaryButton" @click="secondaryButtonClicked" :class="secondaryButtonClass" :value="secondaryButton" />
  </form>
</template>
