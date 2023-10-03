<script>
export default{
    name: 'BookItem',
    props : {
            id : String,
            bookName : String,
            bookAuthor : String,
            pageCount : Number
    },
    data () {
    },
}

</script>

<template>
    <p>Et je suis dans le book item !</p>
    <router-link :to="{name : 'bookpage', params : {id : id }}" >
        View In details
    </router-link>
</template>

<style>

</style>