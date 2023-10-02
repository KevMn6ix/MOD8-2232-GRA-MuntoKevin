<script>
//import TheWelcome from '../components/TheWelcome.vue' 
import BookItem from '../components/BookItem.vue';
import BookForm from '../components/BookForm.vue';
import { books } from './AddBookPage.vue';

export default{
  name: 'BookPage',
  data() {
    return {
      books : books
    }
  },
  props : {
    id : String,
    bookName : String,
    bookAuthor : String,
    pageCount : Number
  },
  components : {
    
  },
}

</script>

<template>
  <h1>Je suis dans le bookPage</h1>
  <div v-for="book in books" :key=book.id>
    <div v-if="book.id == id">
      <p>Tittle : {{ book.bookName }} </p>
      <p>Author : {{ book.bookAuthor }}</p>
      <p>Number of Pages : {{ book.pageCount }}</p>
    </div>
    
  </div>
  
</template>
