<script >
let id = 0;
export default{
    name: "BookForm",
    data(){
        return{
            bookData: {
                id: id++,
                bookName: '',
                bookAuthor: '',
                pageCount: ''
            }
        }
    },
    props: {
        addBook: Function,
        buttonText : String
    }
}


</script>

<template>
    <div class="form">
        <form>
            <label id="bookName">Book Name</label>
            <input type='text' v-model="bookData.bookName"/>

            <label id="bookAuthor">Author name</label>
            <input type='text' v-model="bookData.bookAuthor"/>

            <label id="pageCount" >Page Count</label>
            <input type="number" v-model="bookData.pageCount"/>

            <button className='btn' @click="addBook(bookData)"  type="button">{{ buttonText }}</button>
        </form>
    </div>
</template>

<style>
label{
    color: black  ;
    margin-bottom: 0.5rem;
}

form{
    display: flex;
    flex-direction: column;
    padding: 4rem 1rem;
    margin: auto;
    max-width: 600px;
}

form input, form textarea{
    margin-bottom: 1rem;
    padding: 10px 18px;
    font-size: 1.2rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.1);
    color: #f4f 4f4;
}

.btn{
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100px;
    height: 25px;
}
</style>