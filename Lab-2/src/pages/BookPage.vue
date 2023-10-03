<script>
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
    BookForm
  },
  methods : {
    editBook(book){
      books[this.id].bookName = book.bookName;
      books[this.id].bookAuthor = book.bookAuthor;
      books[this.id].pageCount = book.pageCount;
    },

    deleteBook(id, book){
      console.log(book.bookName);
      book.bookName = '';
      book.bookAuthor = '';
      book.pageCount = '';
      console.log(id)
      const index = books.map(b => b.id).indexOf(book.id);
      if(index === -1){return}
      console.log(index)
      books.splice(index, 1)
      console.log(books)
    }
  }
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

  <div v-for="book in books" :key=book.id>
    <div v-if="book.id == id">
      <p>Edit book</p>
      <BookForm buttonText="Save" :saveBook=editBook />
      <button @click="deleteBook(book.id, book)" type="button" >Delete book</button>
    </div>
    
  </div>
  
</template>
