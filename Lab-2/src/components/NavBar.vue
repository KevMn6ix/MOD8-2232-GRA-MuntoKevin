<script setup>
</script>

<template>
    <div class="header">
        <router-link to="/">HomePage</router-link>
        <router-link to="/books/add">AddBookPage</router-link>
        <router-link to="/books/:id">BookPage</router-link>          
    </div> 
</template>

<style>
.header{
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;
}

</style>

