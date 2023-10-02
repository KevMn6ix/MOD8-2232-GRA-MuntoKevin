import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: HomePage
    },
    {
      path : '/books/add',
      name : 'addbookpage',
      component: ()=> import('../pages/AddBookPage.vue')
    },
    {
      path : '/books/:id',
      name : 'bookpage',
      component: ()=> import('../pages/BookPage.vue'),
      props : true,
    }
  ]
})

export default router
