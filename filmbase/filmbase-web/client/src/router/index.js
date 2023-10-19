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
        title: 'Filmbase: About'
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../pages/SignUpPage.vue'),
      meta: {
        title: 'Filmbase: Sign up'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/LogInPage.vue'),
      meta: {
        title: 'Filmbase: Log in'
      }
    },
    {
      path: '/films/add',
      name: 'add',
      component: () => import('../pages/AddFilmPage.vue'),
      meta: {
        title: 'Filmbase: Add film'
      }
    },
    {
      path: '/films/:id',
      name: 'film',
      component: () => import('../pages/FilmPage.vue')
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
  document.title = to.meta.title ?? 'Filmbase'
})

export default router
