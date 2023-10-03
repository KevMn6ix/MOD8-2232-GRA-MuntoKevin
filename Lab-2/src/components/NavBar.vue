<script setup>
</script>

<template>
    <div class="header">
        <router-link to="/" class="router-link" >HomePage</router-link>|
        <router-link to="/books/add" class="router-link" >AddBookPage</router-link>
    </div> 
</template>

<style>
@import '../assets/styles/base.css';

.header{
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;
}

.header .router-link{
    text-decoration: none;
    color: var(--color-text);
}

</style>

