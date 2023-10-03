<script>
//import TheWelcome from '../components/TheWelcome.vue'
import BookForm from '../components/BookForm.vue';  

let id = 0;
let books = []
export default {
  
  name: "AddBookPage",
  data(){
    return{
      booksData: {
        id: '',
        bookName: '',
        bookAuthor: '',
        pageCount: ''
      },
    }
  },
  components: {
    BookForm
  },
  methods: {
    id : 0,
    getNewBook(b){
      books.push({
        id : id++, 
        bookName : b.bookName, 
        bookAuthor : b.bookAuthor, 
        pageCount : b.pageCount
      });
      //console.log(books)
      b = []
    }
  },

}

export { books };

</script>

<template>
  <BookForm buttonText="Add" :saveBook=getNewBook />
</template>

<style>


</style>
