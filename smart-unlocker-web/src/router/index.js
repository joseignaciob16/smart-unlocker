import { createRouter, createWebHistory } from 'vue-router'
import ActivationView from '@/views/ActivationView.vue'
import LoginView from '@/views/LoginView.vue'
import UserView from '@/views/users/UserView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/inicio',
      name: 'inicio',
      component: HomeView,
      meta: { layout: 'AuthLayout' },
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: UserView,
      meta: { layout: 'AuthLayout' },
    },
    {
      path: '/activaciones',
      name: 'activaciones',
      component: ActivationView,
      meta: { layout: 'AuthLayout' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !localStorage.getItem('token')) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
