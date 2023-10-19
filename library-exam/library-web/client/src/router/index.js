import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/AboutPage.vue'),
      meta: {
        title: 'Library: About'
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../pages/SignUpPage.vue'),
      meta: {
        title: 'Library: Sign up'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/LogInPage.vue'),
      meta: {
        title: 'Library: Log in'
      }
    },
    {
      path: '/books/add',
      name: 'add',
      component: () => import('../pages/AddBookPage.vue'),
      meta: {
        title: 'Library: Add book'
      }
    },
    {
      path: '/books/:id',
      name: 'book',
      component: () => import('../pages/BookPage.vue')
    }
  ],
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title ?? 'Library'
})

export default router
