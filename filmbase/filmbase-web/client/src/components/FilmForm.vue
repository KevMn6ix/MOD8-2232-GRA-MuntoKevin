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
  film: Object,
  successMessage: String,
  errorMessage: String
})

const title = ref(props.film?.title ?? '')
const director = ref(props.film?.director ?? '')
const year = ref(props.film?.year ?? '')
const duration = ref(props.film?.duration ?? '')
const description = ref(props.film?.description ?? '')

const emit = defineEmits(['primaryButtonClicked', 'secondaryButtonClicked'])

function primaryButtonClicked() {
  emit('primaryButtonClicked', title.value, director.value, year.value, duration.value, description.value)
}

function secondaryButtonClicked() {
  emit('secondaryButtonClicked', title.value, director.value, year.value, duration.value, description.value)
}
</script>

<template>
  <form @submit.prevent="primaryButtonClicked">
    <input type="text" v-model="title" placeholder="Title" required />
    <input type="text" v-model="director" placeholder="Director" required />
    <input type="number" v-model="year" placeholder="Year" required />
    <input type="number" v-model="duration" placeholder="Duration" required />
    <textarea v-model="description" placeholder="Description" required />

    <div v-if="successMessage" class="success">{{ successMessage }}</div>
    <div v-if="errorMessage" class="danger">{{ errorMessage }}</div>

    <button :class="primaryButtonClass">{{ primaryButton }}</button>
    <input type="button" v-if="secondaryButton" @click="secondaryButtonClicked" :class="secondaryButtonClass" :value="secondaryButton" />
  </form>
</template>
