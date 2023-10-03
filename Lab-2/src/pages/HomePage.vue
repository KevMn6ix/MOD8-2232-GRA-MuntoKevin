<script >

import { books } from "../pages/AddBookPage.vue";
import BookItem from '../components/BookItem.vue'

console.log("books : ", books);



export default {
  data() {
    return {
      books: books,
      text : '',
    };
  },
  methods : {
    submit(){
      console.log(this.text)
    }
  },
  components : {
    BookItem
  }
};

</script>

<template>
  <div class="container">
    <input v-model="text" placeholder="Search for a book" class="search-bar"/>
  </div>

  <div v-for="book in books" :key="book.id">
    <ul>
      <li v-if="book.bookName === text">
        Title : {{ book.bookName }}
        <br>Author : {{ book.bookAuthor }}
        <br>Number of Pages : {{ book.pageCount }}
        <BookItem :id=book.id :bookName=book.bookName :bookAuthor= book.bookAuthor :pageCount=book.pageCount />
      </li>
    </ul>
  </div>
</template>

<style>
body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container{
  text-align: center;
  justify-content: space-between;
  row-gap: 2rem;
}

.search-bar{
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn{
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 15px;
}

</style>