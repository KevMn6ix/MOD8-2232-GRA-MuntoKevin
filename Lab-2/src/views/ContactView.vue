<script setup>
import WelcomeItem from '../components/WelcomeItem.vue'
import Phone from '../components/icons/IconPhone.vue'
import Mail from '../components/icons/IconMail.vue'
</script>

<template>
  <div class="contact">
    <h1>To Contact me :</h1>
    <h2>Follow me on instagram : kevmnt946</h2>
    <h3>Buy Me a coffee !</h3>
    <p>Name : </p>
    <input type="text" />
    <p>Number : </p>
    <input type="text"/>
    <p>Message : </p>
    <input type="text"/>
    <button>Send the message</button>
  </div>

  <div class="welcome-item-container">
    <WelcomeItem>
      <template #icon>
        <Phone />
      </template>
      <template #heading>Telephone</template>
      0762563717
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <Mail />
      </template>
      <template #heading>email</template>

      <a href="muntokevin@gmail.com ">muntokevin@gmail.com</a>
    </WelcomeItem>
  </div>
  
</template>

<style>
@media (min-width: 1024px) {
  .welcome-item-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
}
</style>